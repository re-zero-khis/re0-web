# -*- coding: utf-8 -*-
# 格式化目录下所有 *.md 文件

import os

def main() :
    DIR = '.'
    SUFFIX = '.md'
    
    for dirPath, dirNames, fileNames in os.walk(DIR):   #迭代目录
        if DIR != dirPath :
                continue

        for fileName in fileNames :
            if SUFFIX not in fileName :
                continue

            print(fileName)
            format_lines = []
            with open(fileName, 'r') as file:
                lines = file.readlines()
                for line in lines:
                    line = line.strip()
                    if line :
                        format_lines.append('%s\n\n' % line)

            with open(fileName, 'w') as file:
                file.write(''.join(format_lines))



if __name__ == '__main__' :
    main()
