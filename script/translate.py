#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 自动机翻指定的 *.md 文件
# --------------------------------------------
# env: python3
# Baidu API Doc : https://api.fanyi.baidu.com/doc/21
# --------------------------------------------
# usage: 
#   python ./translate.py -i {app_id} -p {app_pass} -f {want to translate filepath}
# eg:
#   python ./translate.py -i "app_id" -p "app_pass" -f "../gitbook/markdown/ch/chapter070/34.md"
# --------------------------------------------

import sys
import time
import hashlib
import requests
import json


CHARSET = "utf-8"
DICT_PATH = "../gitbook/markdown/translation.md"
BAIDU_API = "https://fanyi-api.baidu.com/api/trans/vip/translate"
BAIDU_LIMIT = 2000      # 百度限制一次只能翻译 2000 个字



def main(filepath, app_id, app_pass) :
    print("正在准备翻译 [%s]" % filepath)
    data = ""
    with open(filepath, "r", encoding=CHARSET) as file :
        data = file.read()

    print("正在翻译专有名词 ...")
    wt = WordTranslation(DICT_PATH)
    wt.load_dict()
    data = wt.translate(data)

    print("正在机翻内容 ...")
    bt = BaiduTranslation(BAIDU_API, app_id, app_pass)
    data = bt.translate(data)
    data = data.replace("《", "『").replace("》", "』")
    data = data.replace("‘", "『").replace("’", "』")
    data = data.replace("“", "「").replace("”", "」")
    data = data.replace("·", "・")
    data = data.replace("△▼△▼△▼△", "※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※")

    with open(filepath, "w", encoding=CHARSET) as file :
        file.write(data)
    print("翻译完成，译文已存储到 [%s]" % filepath)



# 专有名词翻译器
class WordTranslation :

    def __init__(self, dict_path) :
        self.dict_path = dict_path
        self.words_dict = {}

    # 读取专有名词字典
    def load_dict(self) :
        print("正在读取专有名词翻译字典 ...")
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
        print("共读取专有名词 [%i] 个。" % len(self.words_dict))
        return self.words_dict


    def invaild(self, word) :
        return not word or "?" in word or "？" in word


    def translate(self, data) :
        print("正在翻译专有名词 ...")
        for key in sorted(self.words_dict, key=len, reverse=True) :
            data = data.replace(key, self.words_dict[key])
        return data



# 百度机翻器（比谷歌准确，且每个月有 200 万字的免费额度）
class BaiduTranslation :

    def __init__(self, url, app_id, app_pass) :
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


    def translate(self, data) :
        trans_result = []
        segs = self._cut(data)
        print("切割为 [%i] 段翻译 ..." % len(segs))

        cnt = 0
        for seg in segs :
            cnt += 1
            print("正在翻译第 [%i] 段 ..." % cnt)
            trans_seg = self._translate(seg)
            trans_result.append(trans_seg)
            time.sleep(1)
        return "\n\n".join(trans_result)


    def _cut(self, data) :
        segs = []
        lines = data.split('\n')

        seg_len = 0
        seg = []
        for line in lines :
            line = line.strip()
            if not line :
                continue

            line_len = len(line)
            if seg_len + line_len > BAIDU_LIMIT :
                segs.append("\n".join(seg))
                seg_len = 0
                seg = []

            seg.append(line)
            seg_len += line_len

        segs.append("\n\n".join(seg))
        return segs
        


    def _translate(self, data_seg) :
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
                print("翻译段落失败")
        except :
            print("翻译段落失败")
        return "\n\n".join(trans_result)



def sys_args(sys_args) :
    filepath = ""   # 待翻译文件路径
    app_id = ""     # 百度翻译接口 APP_ID
    app_pass = ""   # 百度翻译接口密码

    idx = 1
    size = len(sys_args)
    while idx < size :
        try :
            if sys_args[idx] == '-f' :
                idx += 1
                filepath = sys_args[idx]

            elif sys_args[idx] == '-i' :
                idx += 1
                app_id = sys_args[idx]

            elif sys_args[idx] == '-p' :
                idx += 1
                app_pass = sys_args[idx]
        except :
            pass
        idx += 1
    return [ filepath, app_id, app_pass ]



if __name__ == "__main__" :
    main(*sys_args(sys.argv))