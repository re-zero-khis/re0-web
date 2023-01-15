#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 格式化目录下所有 *.md 文件
# --------------------------------------------
# env: python3
# --------------------------------------------
# usage: 
#   python ./py/format.py -d {format dir path}
#   python ./py/format.py -f {format file path}
# eg:
#   python ./py/format.py -d "./gitbook/markdown/ch/chapter070/"
#   python ./py/format.py -f "./gitbook/markdown/ch/chapter070/01.md"
# --------------------------------------------

import os
import argparse
from common.settings import *
from color_log.clog import log


def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='python ./py/format.py -d {format dir path} -f {format file path}',  
        description='格式化指定目录或文件',  
        epilog='更多参数可用 python ./py/format.py -h 查看'
    )
    parser.add_argument('-d', '--dir_path', dest='dir_path', type=str, default="", help='待格式化的目录')
    parser.add_argument('-f', '--filepath', dest='filepath', type=str, default="", help='待格式化的文件')
    return parser.parse_args()


def main(args) :
    if args.dir_path :
        format_dir(args.dir_path)

    if args.filepath :
        format_file(args.filepath)



def format_dir(rootdir) :
    for dir_path, dir_names, filenames in os.walk(rootdir) :   # 迭代目录
        if rootdir != dir_path :
            continue
        
        for filename in filenames :
            if ('.md' not in filename) or ('README' in filename) :
                continue
            
            filepath = dir_path + "/" + filename
            format_file(filepath)



def format_file(filepath) :
    format_lines = []
    with open(filepath, 'r', encoding=CHARSET) as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            if line :
                format_lines.append('%s\n\n' % line)

    with open(filepath, 'w', encoding=CHARSET) as file:
        file.write(''.join(format_lines))

    log.info("格式化完成: %s" % filepath)



if __name__ == "__main__" :
    main(args())
