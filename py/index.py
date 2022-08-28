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
from common.utils import *
from color_log.clog import log

SUMMARY_PATH = "./gitbook/SUMMARY.md"
_README_PATH = "./gitbook/markdown/%s/%s/README.md"


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



def update_index(filepath) :
    tmps = re.findall(r'.*?markdown/(\w+)/(\w+)/([\w-]+)\.md', filepath)[0]
    lang = tmps[0]
    chapter = tmps[1]
    id = tmps[2]

    with open(filepath, 'r', encoding=CHARSET) as file :
        data = file.read()
    title, content = split_article(data)

    readme_path = _README_PATH % (lang, chapter)
    readme_idx = "- [%s　『%s』（未润色）](%s.html)" % (id, title, id)
    update_readme(readme_path, readme_idx)

    summary_idx = "	* [%s　『%s』](markdown/%s/%s/%s.md)" % (id, title, lang, chapter, id)
    update_summary(SUMMARY_PATH, summary_idx, lang)
    


def update_readme(filepath, dataline) :
    lines = []
    with open(filepath, 'r', encoding=CHARSET) as file :
        flag = -1
        for line in file.readlines() :
            line = line.strip()
            if flag < 1 :
                if line.startswith("- [") :
                    flag = 0
                
                if flag == 0 and not line :
                    lines.append(dataline)
                    flag = 1
            lines.append(line)

    content = "\n".join(lines)
    with open(filepath, 'w', encoding=CHARSET) as file :
        file.write(content)



def update_summary(filepath, dataline, lang) :
    features = "* [ReZeroEX" if lang == CH_NAME else "* [リゼロＥＸ"
    lines = []
    with open(filepath, 'r', encoding=CHARSET) as file :
        flag = False
        for line in file.readlines() :
            if not flag and line.startswith(features) :
                lines.append(dataline + "\n")
                flag = True

            lines.append(line)

    content = "".join(lines)
    with open(filepath, 'w', encoding=CHARSET) as file :
        file.write(content)



if __name__ == "__main__" :
    main(args())
