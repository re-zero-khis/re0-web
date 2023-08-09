#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ----------------------------------------------------


from common.settings import *
from color_log.clog import log


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


