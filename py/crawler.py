#!/usr/bin/env python
# -*- coding: utf-8 -*-
# --------------------------------------------
# env: python3
# --------------------------------------------
# 从MF文库原版连载网站中爬取小说内容（需要翻墙）
# usage: 
#   python ./py/crawler.py -c -s "127.0.0.1" -p 18888
# --------------------------------------------

from mimetypes import common_types
import platform
import os
import requests
import re
import time
import argparse
from common.settings import *
from color_log.clog import log


PY_DIR = './py'
PROGRESS_FILE = '%s/progress.bar' % PY_DIR
DOWNLOAD_DIR = '%s/downloads' % PY_DIR
HOME_URL = 'http://ncode.syosetu.com/n2267be'
HEADER = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Host': 'ncode.syosetu.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
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
    crawler(args)



def crawler(args) :
    save_paths = []
    html = http_request(args, HOME_URL)
    grps = re.findall(r'<a href="(/n2267be/\d+/)">([^<]+)</a>', html)
    for uri, title in grps :
        title = conver_full_char(title)
        save_path = save_page(args, uri, title)
        if save_path is not None :
            save_paths.append(save_path)
    return save_paths



# 全角转半角
def conver_full_char(string) :
    string = string.replace('０　　', '00　')
    string = string.replace('１　　', '01　')
    string = string.replace('２　　', '02　')
    string = string.replace('３　　', '03　')
    string = string.replace('４　　', '04　')
    string = string.replace('５　　', '05　')
    string = string.replace('６　　', '06　')
    string = string.replace('７　　', '07　')
    string = string.replace('８　　', '08　')
    string = string.replace('９　　', '09　')
    string = string.replace('０', '0')
    string = string.replace('１', '1')
    string = string.replace('２', '2')
    string = string.replace('３', '3')
    string = string.replace('４', '4')
    string = string.replace('５', '5')
    string = string.replace('６', '6')
    string = string.replace('７', '7')
    string = string.replace('８', '8')
    string = string.replace('９', '9')
    string = string.replace('Ａ', 'A')
    string = string.replace('Ｂ', 'B')
    return string



# 保存页面内容到本地
def save_page(args, uri, html_title) :

    # 解析 html 标题获取必要参数
    grps = re.findall(r'(\D+?)(\d*)([a-z]?)　(.+)', html_title)[0]
    chapter = grps[0]
    idx1 = grps[1]
    idx2 = grps[2]
    chapter_idx = "%s%s" % (idx1, "" if not idx2 else ("-" + idx2))
    chapter_idx = chapter_idx if chapter_idx else ('%i' % time.time())    # 若无分节编号，则使用时间戳代替
    chapter_title = grps[3]
    chapter_dir = create_chapter_dir(chapter)

    # 检查爬虫进度
    log.info('* [%s](chapter/%s.md)' % (html_title, chapter_idx))
    urlidx = get_chapter_index(uri)
    if urlidx < 0 :
        log.info('%s : Skip Download' % uri)
        return None
    
    # 爬取章节内容
    page_url = '%s/%i' % (HOME_URL, urlidx)
    html = http_request(args, page_url)
    content = parse_html(chapter_title, html)

    # 保存章节内容
    save_path = '%s/%s.md' % (chapter_dir, chapter_idx)
    with open(save_path, 'w+', encoding='utf-8') as file :
        file.write(content)

    # 保存爬虫进度
    save_progress(urlidx)
    log.info('%s : Finish Download' % uri)
    return save_path



# 检查当前页面是否已经下载过
# 若已下载过则返回 -1
def get_chapter_index(uri) :
    urlidx = -1
    mth = re.search(r'/(\d+)/', uri)
    if mth :
        urlidx = int(mth.group(1))
        last_urlidx = load_progress()
        if 0 <= urlidx and urlidx <= last_urlidx  :
            urlidx = -1
    else :
        log.debug("[跳过] 这不是章节的链接: %s" % uri)
    return urlidx


# 创建本地的章节目录
def create_chapter_dir(chapter) :
    chapter_dir = '%s/%s' % (DOWNLOAD_DIR, chapter)    
    if not os.path.exists(chapter_dir) :

        # windows 文件夹名称要转码为GBK
        if platform.system().lower() == 'windows' :
            unicode_chapter_dir = chapter_dir.decode('utf-8')
            chapter_dir = unicode_chapter_dir.encode('gbk')

        os.makedirs(chapter_dir)
    return chapter_dir



# 发起 http 请求（支持代理）
def http_request(args, url) :
    if args.proxy :
        proxy_svc = 'http://%s:%d' % (args.host, args.port)
        proxy = { "http": proxy_svc, "https": proxy_svc } if proxy_svc else {}
        response = requests.get(url=url, headers=HEADER, proxies=proxy)
    else :
        response = requests.get(url=url, headers=HEADER)
    return response.text



# 解析 html 内容
def parse_html(chapter_title, html) :
    grps = re.findall(r'<p id="L\d+">(.+?)</p>', html)
    cnt = 0
    lines = [
        '# %s\n' % chapter_title, 
        '\n------\n',
        '\n'
    ]
    for line in grps :
        line = line.replace('　', '')
        if '<br />' == line :
            cnt += 1
        else :
            if cnt > 0 :
                lines.append('　\n\n')
                cnt = 0
            lines.append('%s\n\n' % line)
    content = ''.join(lines)
    return content



def load_progress() :
    progress = -1
    if os.path.exists(PROGRESS_FILE) :
        with open(PROGRESS_FILE, 'r') as file :
            progress = int(file.read())
    return progress



def save_progress(progress) :
    with open(PROGRESS_FILE, 'w') as file :
        file.write(str(progress))



if __name__ == '__main__' :
    main(args())

