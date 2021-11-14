# -*- coding: utf-8 -*-
# 自动机翻指定的 *.md 文件
# --------------------------------------------
# env: python3
# --------------------------------------------
# usage: 
#   python ./translate.py -f {want to translate filepath}
# eg:
#   python ./translate.py -f "../gitbook/markdown/ch/chapter070/34.md"
# --------------------------------------------


import os
import sys

CHARSET = "utf-8"
DICT_PATH = "../gitbook/markdown/translation.md"


def main(filepath) :
    order_dict = load_dict()        # 加载翻译字典
    translate(order_dict, filepath) # 翻译指定文件
    


def load_dict() :
    translations = {}
    lines = []
    with open(DICT_PATH, "r", encoding=CHARSET) as file :
        lines = file.readlines()

    for line in lines :
        if line.startswith("|") :
            args = line.split("|")
            key = args[1].strip()
            val = args[2].strip()
            if unknow(key) or unknow(val) :
                continue

            translations[key] = val
            if "・" in key and "・" in val :
                ks = key.split("・")
                vs = val.split("・")
                for k, v in zip(ks, vs) :
                    if len(k) <= 1 :
                        continue
                    translations[k.strip()] = v.strip()
    
    translations.pop(":---:")
    translations.pop("日文")
    return translations
            

def unknow(arg) :
    return not arg or "?" in arg or "？" in arg
        

def translate(dict, filepath) :
    data = ""
    with open(filepath, "r", encoding=CHARSET) as file :
        data = file.read()
    
    for key in sorted(dict, key=len, reverse=True) :
        data = data.replace(key, dict[key]))
        
    with open(filepath, "w", encoding=CHARSET) as file :
        file.write(data)


def sys_args(sys_args) :
    dirpath = '.'

    idx = 1
    size = len(sys_args)
    while idx < size :
        try :
            if sys_args[idx] == '-f' :
                idx += 1
                dirpath = sys_args[idx]
        except :
            pass
        idx += 1
    return dirpath



if __name__ == "__main__" :
    main(*sys_args(sys.argv))