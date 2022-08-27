#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 格式化目录下所有 *.md 文件
# --------------------------------------------
# env: python3
# --------------------------------------------
# usage: 
#   python ./py/index.py -f {update index file path}
# eg:
#   python ./py/index.py -f "./gitbook/markdown/ch/chapter070/01.md"
# --------------------------------------------

import re
import argparse
from common.settings import *
from color_log.clog import log

SUMMARY_PATH = "./gitbook/SUMMARY.md"
README_PATH = "./gitbook/markdown/%s/%s/README.md"


def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='./py/index.py -f {update index file path}',  
        description='更新指定文件在目录中的索引',  
        epilog='更多参数可用 python ./py/index.py -h 查看'
    )
    parser.add_argument('-f', '--filepath', dest='filepath', type=str, default="", help='待更新索引的文件')
    return parser.parse_args()


def main(args) :
    update_index(args.filepath)



# ./gitbook/markdown/ch/chapter070/68.md
def update_index(filepath) :
    tmps = re.findall(r'.*?markdown/(\w+)/(\w+)/(\w+)\.md', filepath)[0]
    lang = tmps[0]
    chapter = tmps[1]
    id = tmps[2]

    
    print(lang)
    print(chapter)
    print(id)


# '''

# 	* [60　『乱世的私生子』](markdown/ch/chapter070/60.md)
# 	* [60　『波乱の胤蒔き』](markdown/jp/chapter070/60.md)
# '''
# '''

# - [60　『波乱の胤蒔き』](60.html)
# - [60　『波乱の胤蒔き』](60.html)
# '''


if __name__ == "__main__" :
    main(args())
