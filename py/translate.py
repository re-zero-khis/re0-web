#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 自动机翻指定的 *.md 文件
# --------------------------------------------
# env: python3
# Baidu API Doc : https://api.fanyi.baidu.com/doc/21
# --------------------------------------------
# usage: 
#   python ./py/translate.py -t {api_type} -i {api_id} -p {api_pass} -f {want to translate filepath}
# eg:
#   python ./py/translate.py -t "baidu" -i "api_id" -p "api_pass" -f "./gitbook/markdown/ch/chapter070/75.md"
# --------------------------------------------

import argparse
from common.trans import *
from common.settings import *
from color_log.clog import log


def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='python ./py/translate.py -t {api_type} -i {api_id} -p {api_pass} -f {want to translate filepath}',  
        description='一键爬取最新的 re0 章节',  
        epilog='更多参数可用 python ./py/onekey.py -h 查看'
    )
    parser.add_argument('-t', '--trans_api', dest='trans_api', type=str, default="baidu", help='翻译 API，默认 baidu')
    parser.add_argument('-i', '--api_id', dest='api_id', type=str, default="", help='翻译 API ID')
    parser.add_argument('-k', '--api_key', dest='api_key', type=str, default="", help='翻译 API KEY')
    parser.add_argument('-f', '--filepath', dest='filepath', type=str, default="", help='待翻译的文件路径')
    return parser.parse_args()
    

def main(args) :
    trans(args)



def trans(args) :
    log.info("正在准备翻译 [%s]" % args.filepath)
    data = ""
    with open(args.filepath, "r", encoding=CHARSET) as file :
        data = file.read()

    log.info("正在翻译专有名词 ...")
    wt = WordTranslation()
    wt.load_dict()
    data = wt.translate(data)

    log.info("正在机翻内容 ...")
    bt = machine_translate(args, data)
    data = bt.translate(data)
    data = data.replace("《", "『").replace("》", "』")
    data = data.replace("‘", "『").replace("’", "』")
    data = data.replace("“", "「").replace("”", "」")
    data = data.replace("·", "・")
    data = data.replace("△▼△▼△▼△", "※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※")

    with open(args.filepath, "w", encoding=CHARSET) as file :
        file.write(data)
    log.info("翻译完成，译文已存储到 [%s]" % args.filepath)



if __name__ == "__main__" :
    main(args())