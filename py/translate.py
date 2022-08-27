#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 自动机翻指定的 *.md 文件
# --------------------------------------------
# env: python3
# Baidu API Doc : https://api.fanyi.baidu.com/doc/21
# --------------------------------------------
# usage: 
#   python ./py/translate.py -a {api_type} -i {api_id} -k {api_pass} -t {want to translate filepath}
# eg:
#   python ./py/translate.py -a "tencent" -i "api_id" -k "api_key" -t "./gitbook/markdown/ch/chapter070/01.md"
# --------------------------------------------

import re
import argparse
from common.trans import *
from common.settings import *
from color_log.clog import log


def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='对某个日语文件进行机翻',  
        description='一键爬取最新的 re0 章节',  
        epilog='更多参数可用 python ./py/onekey.py -h 查看'
    )
    parser.add_argument('-a', '--trans_api', dest='trans_api', type=str, default=TENCENT, help='翻译 API 的服务提供商，可选： baidu, tencent （默认）')
    parser.add_argument('-i', '--api_id', dest='api_id', type=str, default="", help='翻译 API ID')
    parser.add_argument('-k', '--api_key', dest='api_key', type=str, default="", help='翻译 API KEY')
    parser.add_argument('-t', '--trans_path', dest='trans_path', type=str, default="", help='待翻译的文件路径')
    return parser.parse_args()
    

def main(args) :
    trans(args, args.trans_path)



def trans(args, filepath) :
    log.info("正在准备翻译 [%s]" % filepath)
    data = ""
    with open(filepath, "r", encoding=CHARSET) as file :
        data = file.read()

    title, content = split_data(data)
    
    log.info("正在翻译专有名词 ...")
    wt = WordTranslation()
    wt.load_dict()
    title = wt.translate(title)
    content = wt.translate(content)

    log.info("正在机翻内容 ...")
    title = machine_translate(args, title)
    content = machine_translate(args, content)
    content = "%s%s%s" % (DOUBLE_CRLF, content, DOUBLE_CRLF)

    # 通用字符转换
    content = content.replace(" ", "")
    content = content.replace("《", "『").replace("》", "』")
    content = content.replace("‘", "『").replace("’", "』")
    content = content.replace("“", "「").replace("”", "」")
    content = content.replace("·", "・")

    # 特殊翻译器的字符转换
    if args.trans_api == TENCENT :
        content = content.replace("\n」「", "\n「")
        content = content.replace("」「\n", "」\n")
        content = content.replace("\n「」", "\n「")
        content = content.replace("「」\n", "」\n")
        content = content.replace("\n」", "\n「")
        content = content.replace("「\n", "」\n")
        content = content.replace("「「", "「")
        content = content.replace("」」", "」")

    content = content.replace(SEGMENT_SPLIT, "※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※")

    with open(filepath, "w+", encoding=CHARSET) as file :
        file.write("# 『%s』\n" % title)
        file.write(DATA_SPLIT)
        file.write(content)
    log.info("翻译完成，译文已存储到 [%s]" % filepath)




def split_data(data) :
    tmps = data.split(DATA_SPLIT)
    title = re.findall(r'# 『(.+)?』', tmps[0])[0]
    content = tmps[1]
    return title, content



if __name__ == "__main__" :
    main(args())
    
