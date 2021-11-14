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
    print("正在准备翻译 [%s]" % filepath)
    order_dict = load_dict()        # 加载翻译字典
    translate(order_dict, filepath) # 翻译指定文件
    print("翻译完成，译文已存储到 [%s]" % filepath)
    


# 读取专有名词字典
def load_dict() :
    print("正在读取专有名词翻译字典 ...")
    translations = {}
    lines = []
    with open(DICT_PATH, "r", encoding=CHARSET) as file :
        lines = file.readlines()

    for line in lines :
        if line.startswith("|") :
            args = line.split("|")
            key = args[1].strip()
            val = args[2].strip()
            if invaild(key) or invaild(val) :
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
    print("共读取专有名词 [%i] 个。" % len(translations))
    return translations
            

# 无效名词
def invaild(arg) :
    return not arg or "?" in arg or "？" in arg
        

# 翻译
def translate(dict, filepath) :
    data = ""
    with open(filepath, "r", encoding=CHARSET) as file :
        data = file.read()
    
    data = translate_work(dict, data)
    data = translate_baidu(data)
        
    with open(filepath, "w", encoding=CHARSET) as file :
        file.write(data)


# 专有名词翻译
def translate_work(dict, data) :
    print("正在翻译专有名词 ...")
    for key in sorted(dict, key=len, reverse=True) :
        data = data.replace(key, dict[key])
    return data


# 百度机翻接口（比谷歌准确）
def translate_baidu(data) :
    print("正在机翻内容 ...")
    # TODO
    return data


def sys_args(sys_args) :
    filepath = '.'

    idx = 1
    size = len(sys_args)
    while idx < size :
        try :
            if sys_args[idx] == '-f' :
                idx += 1
                filepath = sys_args[idx]
        except :
            pass
        idx += 1
    return [ filepath ]



if __name__ == "__main__" :
    main(*sys_args(sys.argv))