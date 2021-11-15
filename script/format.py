#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 格式化目录下所有 *.md 文件
# --------------------------------------------
# env: python3
# --------------------------------------------
# usage: 
#   python ./format.py -d {format dir path}
# eg:
#   python ./format.py -d "../gitbook/markdown/ch/chapter070/"
# --------------------------------------------

import os
import sys

def main(dirpath) :
    DIR = dirpath
    
    for dirPath, dirNames, fileNames in os.walk(DIR):   #迭代目录
        if DIR != dirPath :
            continue
        
        print(dirPath)
        for fileName in fileNames :
            if ('.md' not in fileName) or ('README' in fileName) :
                continue
            
            filepath = dirpath + fileName
            format_lines = []
            with open(filepath, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                for line in lines:
                    line = line.strip()
                    if line :
                        format_lines.append('%s\n\n' % line)

            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(''.join(format_lines))



def sys_args(sys_args) :
    dirpath = '.'

    idx = 1
    size = len(sys_args)
    while idx < size :
        try :
            if sys_args[idx] == '-d' :
                idx += 1
                dirpath = sys_args[idx]
        except :
            pass
        idx += 1
    return [ dirpath ]



if __name__ == "__main__" :
    main(*sys_args(sys.argv))
