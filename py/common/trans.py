#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ----------------------------------------------------


from common.settings import *
from color_log.clog import log
import time
import hashlib
import requests
import json
from tencentcloud.common.credential import Credential
from tencentcloud.tmt.v20180321.tmt_client import TmtClient
from tencentcloud.tmt.v20180321.models import TextTranslateRequest
from tencentcloud.tmt.v20180321.models import TextTranslateResponse

# 翻译提供商
BAIDU = "baidu"
TENCENT = "tencent"

 # 百度限制一次只能翻译 2000 个字
 # 按这个标准对被翻译的内容进行分段切割
EACH_LIMIT = 2000



def machine_translate(args, data) :
    if args.trans_api == BAIDU :
        client = BaiduTranslation(args.api_id, args.api_key)
    else :
        client = TencentTranslation(args.api_id, args.api_key)

    trans_result = []
    segs = _cut(data)
    log.info("切割为 [%i] 段翻译 ..." % len(segs))

    cnt = 0
    for seg in segs :
        cnt += 1
        log.info("正在翻译第 [%i] 段 ..." % cnt)
        trans_seg = client.translate(seg)
        trans_result.append(trans_seg)
        time.sleep(1)

    trans_data = DOUBLE_CRLF.join(trans_result)
    return trans_data


def _cut(data) :
    segs = []
    lines = data.split('\n')

    seg_len = 0
    seg = []
    for line in lines :
        line = line.strip()
        if not line :
            continue

        line_len = len(line)
        if seg_len + line_len > EACH_LIMIT :
            segs.append("\n".join(seg))
            seg_len = 0
            seg = []

        seg.append(line)
        seg_len += line_len

    segs.append("\n\n".join(seg))
    return segs



# 专有名词翻译器
DICT_PATH = "./gitbook/markdown/translation.md"
class WordTranslation :

    def __init__(self, dict_path=DICT_PATH) :
        self.dict_path = dict_path
        self.words_dict = {}


    # 读取专有名词字典
    def load_dict(self) :
        log.info("正在读取专有名词翻译字典 ...")
        lines = []
        with open(self.dict_path, "r", encoding=CHARSET) as file :
            lines = file.readlines()

        for line in lines :
            if line.startswith("|") :
                args = line.split("|")
                key = args[1].strip()
                val = args[2].strip()
                if self.invaild(key) or self.invaild(val) :
                    continue    # 判断无效名词

                self.words_dict[key] = val
                if "・" in key and "・" in val :
                    ks = key.split("・")
                    vs = val.split("・")
                    for k, v in zip(ks, vs) :
                        if len(k) <= 1 :
                            continue    # 长度小于等于 1 的名词出错率太多，不独立翻译
                        self.words_dict[k.strip()] = v.strip()
        
        self.words_dict.pop(":---:")
        self.words_dict.pop("日文")
        log.info("共读取专有名词 [%i] 个。" % len(self.words_dict))
        return self.words_dict


    def invaild(self, word) :
        return not word or "?" in word or "？" in word


    def translate(self, data) :
        log.info("正在翻译专有名词 ...")
        for key in sorted(self.words_dict, key=len, reverse=True) :
            data = data.replace(key, self.words_dict[key])
        return data



# 百度机翻器（比谷歌准确，且每个月有 200 万字的免费额度）
BAIDU_API = "https://fanyi-api.baidu.com/api/trans/vip/translate"
class BaiduTranslation :

    def __init__(self, app_id, app_pass, url=BAIDU_API) :
        self.url = url
        self.app_id = app_id
        self.app_pass = app_pass


    def to_sign(self, data) :
        salt = int(time.time())
        sign = hashlib.md5(
            ("%s%s%i%s" % (
                self.app_id, 
                data,
                salt, 
                self.app_pass
            )).encode(encoding=CHARSET)
        ).hexdigest()
        return salt, sign


    def translate(self, data_seg) :
        salt, sign = self.to_sign(data_seg)
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        body = {
            'q': data_seg, 
            'from': 'jp', 
            'to': 'zh', 
            'appid': self.app_id, 
            'salt': salt, 
            'sign': sign
        }
        response = requests.post(self.url, headers=headers, data=body)
        trans_result = []
        try :
            if response.status_code == 200:
                rst = json.loads(response.text)
                for line in rst.get("trans_result") :
                    trans_result.append(line.get("dst").strip())
            else :
                log.info("翻译段落失败")
        except :
            log.error("翻译段落失败: %s" % response.text)
        return "\n\n".join(trans_result)



# 百度机翻器（比谷歌准确，且每个月有 200 万字的免费额度）
TX_REGION = "ap-guangzhou"
class TencentTranslation :

    def __init__(self, secret_id, secret_key, region=TX_REGION) :
        cred = Credential(secret_id, secret_key)
        self.client = TmtClient(cred, region)

    
    def translate(self, data_seg) :
        req = TextTranslateRequest()
        req.SourceText = data_seg
        req.Source = 'ja'
        req.Target = 'zh'
        req.ProjectId = 0
        req.UntranslatedText = SEGMENT_SPLIT
        rsp = self.client.TextTranslate(req)
        return rsp.TargetText
