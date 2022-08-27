#!/usr/bin/env python
# -*- coding: utf-8 -*-
# --------------------------------------------
# env: python3
# --------------------------------------------
# 从MF文库原版连载网站中爬取小说内容（需要翻墙）
# usage: 
#   python ./script/onekey.py
# --------------------------------------------

import argparse
from crawler import crawler
from color_log.clog import log


MD_DIR = "./gitbook/markdown"
JP_NAME = "jp"
CH_NAME = "ch"
DIR_MAP = {
    "第一章": "chapter010", 
    "第二章": "chapter020", 
    "第三章": "chapter030", 
    "第四章": "chapter040", 
    "第五章": "chapter050", 
    "第六章": "chapter060", 
    "第七章": "chapter070", 
    "第八章": "chapter080", 
    "第九章": "chapter090", 
    "第十章": "chapter100", 
    # ... ... 若以后还有新章节，需要手动增加
}



def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='python ./py/crawler.py',  
        description='一键爬取最新的 re0 章节',  
        epilog='更多参数可用 python ./py/crawler.py -h 查看'
    )
    parser.add_argument('-c', '--proxy', dest='proxy', action='store_true', default=False, help='是否启用 HTTP 爬虫代理')
    parser.add_argument('-s', '--host', dest='host', type=str, default="127.0.0.1", help='HTTP 代理 IP')
    parser.add_argument('-p', '--port', dest='port', type=int, default=18888, help='HTTP 代理端口')
    return parser.parse_args()



def main(args) :
    log.info('正在爬取网页内容 ...')
    save_paths = crawler(args)
    for save_path in save_paths :
        log.info(save_path)

    
    
    # 2. 复制到日文和中文目录
    # 3. 中文目录机翻
    # 4. 格式化
    # 5. 修改索引（两处）


if __name__ == '__main__' :
    main(args())
