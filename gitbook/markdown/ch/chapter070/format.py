# -*- coding: utf-8 -*-
# 格式化目录下所有 *.md 文件
# usage: 
#   1. 复制此脚本到需要格式化的 md 目录下
#   2. python3 ./format.py
# --------------------------------------------

import os

def main() :
    DIR = '.'
    
    for dirPath, dirNames, fileNames in os.walk(DIR):   #迭代目录
        if DIR != dirPath :
            continue

        for fileName in fileNames :
            if ('.md' not in fileName) or ('README' in fileName) :
                continue

            print(fileName)
            format_lines = []
            with open(fileName, 'r', encoding='utf-8') as file:
                lines = file.readlines()
                for line in lines:
                    line = line.strip()
                    if line :
                        format_lines.append('%s\n\n' % line)

            with open(fileName, 'w', encoding='utf-8') as file:
                file.write(''.join(format_lines))



if __name__ == '__main__' :
    main()
