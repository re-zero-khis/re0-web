#!/usr/bin/env python
# -*- coding: utf-8 -*-
# --------------------------------------------
# env: python3
# --------------------------------------------
# 从MF文库原版连载网站中爬取小说内容（需要翻墙）
# usage: 
#   python ./script/onekey.py
# --------------------------------------------

import os
import shutil
import argparse
from crawler import crawler
from color_log.clog import log


CHARSET = "utf-8"
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
        usage='python ./py/onekey.py',  
        description='一键爬取最新的 re0 章节',  
        epilog='更多参数可用 python ./py/onekey.py -h 查看'
    )
    parser.add_argument('-c', '--proxy', dest='proxy', action='store_true', default=False, help='是否启用 HTTP 爬虫代理')
    parser.add_argument('-s', '--host', dest='host', type=str, default="127.0.0.1", help='HTTP 代理 IP')
    parser.add_argument('-p', '--port', dest='port', type=int, default=18888, help='HTTP 代理端口')
    return parser.parse_args()



def main(args) :
    log.info('正在爬取网页内容 ...')
    tmp_paths = crawler(args)
    for tmp_path in tmp_paths :
        update_chapter(tmp_path)
    


def update_chapter(src_path) :
    log.info('正在处理: %s' % src_path)
    jp_path = find_snk_path(src_path, JP_NAME)
    ch_path = find_snk_path(src_path, CH_NAME)

    if jp_path is None or ch_path is None :
        log.warn("章节目录不存在，需要手动更新 DIR_MAP")
        return

    log.info('正在复制文件: %s' % src_path)
    copy(src_path, jp_path)
    copy(src_path, ch_path)

    
    log.info('正在机翻: %s' % ch_path)
    

    # 3. 中文目录机翻
    # 4. 格式化
    # 5. 修改索引（两处）


def find_snk_path(src_path, lang) :
    chapter = None
    for k, v in DIR_MAP.items() :
        if k in src_path :
            chapter = v
            break
    
    md_path = None
    if chapter :
        filename = src_path.split('/')[-1]
        md_path = "%s/%s/%s/%s" % (MD_DIR, lang, chapter, filename)
    return md_path



# 删除文件/目录
def remove(filepath) :
    if os.path.exists(filepath) :
        if os.path.isfile(filepath) :
            os.remove(filepath)
        else :
            shutil.rmtree(filepath)



# 复制文件/目录
def copy(srcpath, snkpath) :
    if os.path.isfile(srcpath) :
        shutil.copyfile(srcpath, snkpath)
    else :
        shutil.copytree(srcpath, snkpath)



# 替换文件内容
def replace(filepath, ip) :
    with open(filepath, 'r', encoding=CHARSET) as file :
        data = file.read()

    # data = data.replace(DEFAULT_SERVER_IP, ip)
    # with open(filepath, 'w', encoding=CHARSET) as file :
    #     file.write(data)


if __name__ == '__main__' :
    main(args())
