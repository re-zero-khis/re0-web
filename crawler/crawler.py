# -*- coding: utf-8 -*-
# 从MF文库原版连载网站中爬取小说内容（需要爬梯）

import os
import requests
import json
import re
import time
import traceback

PROGRESS_FILE = './progress.bar'
DOWNLOAD_DIR = './downloads'
URL = 'http://ncode.syosetu.com/n2267be'
HEADER = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.9',
	'Cache-Control': 'max-age=0',
	'Connection': 'keep-alive',
	'Cookie': 'ks2=3s2cgquxgpqa; sasieno=0; lineheight=0; fontsize=0; novellayout=0; fix_menu_bar=1; _ga=GA1.2.1684055411.1576383558; _gid=GA1.2.843358413.1576383558; OX_plg=pm; nlist1=6h7h.a5',
	'Host': 'ncode.syosetu.com',
	'Upgrade-Insecure-Requests': '1',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
}



def main() :
	take_index()


def load_progress() :
	progress = -1
	if os.path.exists(PROGRESS_FILE) :
		with open(PROGRESS_FILE, 'r') as file :
			progress = int(file.read())
	return progress


def save_progress(progress) :
	with open(PROGRESS_FILE, 'w') as file :
		file.write(str(progress))


def take_index() :
	response = requests.get(url=URL, headers=HEADER)
	html = response.text.encode('utf-8')

	grps = re.findall(r'<a href="(/n2267be/\d+/)">([^<]+)</a>', html)
	for uri, title in grps :
		title = title.replace('０　　', '00　')
		title = title.replace('１　　', '01　')
		title = title.replace('２　　', '02　')
		title = title.replace('３　　', '03　')
		title = title.replace('４　　', '04　')
		title = title.replace('５　　', '05　')
		title = title.replace('６　　', '06　')
		title = title.replace('７　　', '07　')
		title = title.replace('８　　', '08　')
		title = title.replace('９　　', '09　')
		title = title.replace('０', '0')
		title = title.replace('１', '1')
		title = title.replace('２', '2')
		title = title.replace('３', '3')
		title = title.replace('４', '4')
		title = title.replace('５', '5')
		title = title.replace('６', '6')
		title = title.replace('７', '7')
		title = title.replace('８', '8')
		title = title.replace('９', '9')
		print('%s : %s' % (uri, title))
		save_page(uri, title)



def save_page(uri, title) :
	mth = re.search(r'/(\d+)/', uri)
	if mth :
		urlidx = int(mth.group(1))
		_urlidx = load_progress()
		if _urlidx >= 0 and urlidx <= _urlidx :
			return
	else :
		return

	PAGE_URL = '%s/%i' % (URL, urlidx)
	grps = re.findall(r'(\D+?)(\d*)　(.+)', title)
	chapter = grps[0][0]
	segidx = grps[0][1]
	segidx = segidx if segidx else ('%i' % time.time())	# 若无分节编号，则使用时间戳代替
	title = grps[0][2]
	
	_dir = ('%s/%s' % (DOWNLOAD_DIR, chapter)).decode('utf-8').encode('gbk')	# windows 文件夹名称要转码为GBK
	if not os.path.exists(_dir) :
		os.makedirs(_dir) 

	response = requests.get(url=PAGE_URL, headers=HEADER)
	html = response.text.encode('utf-8')

	lines = [
		'# %s\n' % title, 
		'\n------\n',
		'\n'
	]
	grps = re.findall(r'<p id="L\d+">(.+?)</p>', html)
	cnt = 0
	for line in grps :
		line = line.replace('　', '')
		if '<br />' == line :
			cnt += 1
		else :
			if cnt > 0 :
				lines.append('　\n\n')
				cnt = 0
			lines.append('%s\n\n' % line)
	lines.append('\n\n')

	_path = '%s/%s.md' % (_dir, segidx)
	with open(_path, 'w') as file :
		file.write(''.join(lines))
	save_progress(urlidx)
	print('download finish')



if __name__ == '__main__' :
	main()
