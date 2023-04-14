#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ----------------------------------------------------

import os
import re
import shutil
from common.settings import *


# 切割文件（提取标题和内容）
def split_article(data) :
    tmps = data.split(DATA_SPLIT)
    title = re.findall(r'# 『(.+)?』', tmps[0])[0]
    content = tmps[1]
    return title, content



# 删除文件/目录
def remove(filepath) :
    if os.path.exists(filepath) :
        if os.path.isfile(filepath) :
            os.remove(filepath)
        else :
            shutil.rmtree(filepath)



# 复制文件/目录
def copy(srcpath, snkpath) :
    snk_dir = os.path.dirname(snkpath)
    try :
        os.makedirs(snk_dir)
    except :
        pass

    if os.path.isfile(srcpath) :
        shutil.copyfile(srcpath, snkpath)
    else :
        shutil.copytree(srcpath, snkpath)



# 替换文件内容
def replace(filepath, placeholder, value) :
    with open(filepath, 'r', encoding=CHARSET) as file :
        data = file.read()

    data = data.replace(placeholder, value)
    with open(filepath, 'w', encoding=CHARSET) as file :
        file.write(data)