#!/usr/bin/env python
# -*- coding: utf-8 -*-
# --------------------------------------------
# env: python3
# --------------------------------------------
# 从MF文库原版连载网站中爬取小说内容（需要翻墙）
# usage: 
#   python ./script/onekey.py -c -s "{proxy_ip}" -p {proxy_port} -a "{trans_api}" -i "{api_id}" -k "{api_key}"
#   python ./script/onekey.py -r -a "{trans_api}" -i "{api_id}" -k "{api_key}"
# eg:
#   python ./py/onekey.py -c -s "127.0.0.1" -p 18888 -a "tencent" -i "api_id" -k "api_key"
#   python ./py/onekey.py -r -a "tencent" -i "api_id" -k "api_key"
# --------------------------------------------


import argparse
from common.settings import *
from common.utils import *
from common.trans import *
from translate import trans
from crawler import crawler
from format import *
from index import update_index
from color_log.clog import log


CRAWLER_PATH = "./py/crawler.paths"
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

    parser.add_argument('-g', '--git', dest='git', type=str, default=GIT_CRAWL_PWD, help='Github Action 的启动密码（避免被 Fork 时别人可以直接运行，导致目标站点被 DDos）')

    # 爬虫参数
    parser.add_argument('-r', '--read', dest='read', action='store_true', default=False, help='是否读取 crawler.paths 中的文件路径代替爬虫（一般用于测试或已爬取文件）')
    parser.add_argument('-c', '--proxy', dest='proxy', action='store_true', default=False, help='是否启用 HTTP 爬虫代理')
    parser.add_argument('-s', '--host', dest='host', type=str, default="127.0.0.1", help='HTTP 代理 IP')
    parser.add_argument('-p', '--port', dest='port', type=int, default=18888, help='HTTP 代理端口')

    # 翻译参数
    parser.add_argument('-a', '--trans_api', dest='trans_api', type=str, default=TENCENT, help='翻译 API 的服务提供商，可选： baidu, tencent （默认）')
    parser.add_argument('-i', '--api_id', dest='api_id', type=str, default="", help='翻译 API ID')
    parser.add_argument('-k', '--api_key', dest='api_key', type=str, default="", help='翻译 API KEY')
    return parser.parse_args()



def main(args) :
    if args.git != GIT_CRAWL_PWD :
        # Github Action 调用了 -g 参数，若仓库没有设置 secrets.CRAWL_PWD 会赋予为空值
        # 导致验证 Github Action 的 secrets.CRAWL_PWD 失败，爬虫进程终止执行
        # 目的是在仓库被 Fork 时，可以保护目标站点不被 DDos
        exit(0)


    log.info('正在爬取网页内容 ...')
    if args.read :
        tmp_paths = []
        with open(CRAWLER_PATH, 'r', encoding=CHARSET) as file :
            lines = file.readlines()
            for line in lines :
                tmp_paths.append(line.strip())
    else :
        tmp_paths = crawler(args)
    
    for tmp_path in tmp_paths :
        update_chapter(args, tmp_path)

    log.info('全部章节已处理完成.')
    


def update_chapter(args, src_path) :
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
    trans(args, ch_path)

    log.info('正在格式化: %s' % ch_path)
    format_file(ch_path)

    log.info('正在更新目录索引 ...')
    update_index(jp_path)
    update_index(ch_path)




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




if __name__ == '__main__' :
    main(args())
