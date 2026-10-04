#!/usr/bin/env python
# -*- coding: utf-8 -*-
# --------------------------------------------
# 自动机翻指定的 *.md 文件
# --------------------------------------------

import argparse
from common.utils import *
from common.trans import *
from format import format_dir, format_file
from transgpt.translate import *
from common.settings import *
from color_log.clog import log


def args() :
    parser = argparse.ArgumentParser(
        prog='', # 会被 usage 覆盖
        usage='python ./py/translate.py -i {api_id} -k {api_pass} -g {gpt_key} -t {want to translate filepath}',  
        description='对某个日语文件进行机翻',  
        epilog='更多参数可用 python ./py/onekey.py -h 查看'
    )
    parser.add_argument('-i', '--api_id', dest='api_id', type=str, default="", help='腾讯翻译 API ID')
    parser.add_argument('-k', '--api_key', dest='api_key', type=str, default="", help='腾讯翻译 API KEY')
    parser.add_argument('-g', '--gpt_key', dest='gpt_key', type=str, default="", help='ChatGPT KEY')
    parser.add_argument('-t', '--trans_path', dest='trans_path', type=str, default="", help='待翻译的文件路径')
    parser.add_argument('-d', '--trans_dir', dest='trans_dir', type=str, default="", help='待翻译的目录路径')
    parser.add_argument('-s', '--host', dest='host', type=str, default="127.0.0.1", help='HTTP 代理 IP')
    parser.add_argument('-p', '--port', dest='port', type=int, default=0, help='HTTP 代理端口')
    return parser.parse_args()
    


def main(args) :
    # 翻译单个文件
    if args.trans_path:
        translate(args, args.trans_path)
        format_file(args.trans_path)

    # 翻译目录
    elif args.trans_dir:
        trans_dir(args, args.trans_dir)
        format_dir(args.trans_dir)



def trans_dir(args, dirpath) :
    for root, dirs, names in os.walk(dirpath):
        for name in names:
            if not name.endswith(".md") :
                continue
            
            if name == "README.md":
                continue

            filepath = os.path.join(root, name)
            translate(args, filepath)


def translate(args, filepath) :
    log.info("正在准备翻译 [%s]" % filepath)
    with open(filepath, "r", encoding=CHARSET) as file :
        data = file.read()
    title, content = split_article(data)
    
    log.info("正在翻译专有名词 ...")
    wt = WordTranslation()
    wt.load_dict()
    title = wt.translate(title)
    content = wt.translate(content)

    log.info("正在机翻内容 ...")
    # title = trans(title, from_lang='ja', to_lang='zh', 
    #               platform=TENCENT, api_id=args.api_id, api_key=args.api_key)
    title = trans(title, 
                    platform=CHATGPT, api_id='', api_key=args.gpt_key, 
                    args={ 
                        ARG_OPENAI_MODEL: TRANS_MODEL, 
                        ARG_ROLE: "你是《从零开始的异世界生活》小说的中文翻译官。你的任务是将提供的日文章节标题翻译成流畅、自然、富有小说风格的中文。严格遵守以下要求：仅返回润色后的中文译文；禁止增加任何与原文无关的内容；禁止解释、备注或评论；忠实保留原文信息、语气、留白与叙述距离；不扩写心理活动，不补设定，不改写剧情；中文自然但不过度文学化。"
                    }
    )
    content = trans(content, 
                    platform=CHATGPT, api_id='', api_key=args.gpt_key, 
                    args={ 
                        ARG_OPENAI_MODEL: TRANS_MODEL, 
                        ARG_ROLE: "你是《从零开始的异世界生活》小说的中文翻译官。你的任务是将提供的日文内容翻译成流畅、自然、富有小说风格的中文。严格遵守以下要求：仅返回润色后的中文译文；禁止增加任何与原文无关的内容；禁止解释、备注或评论；忠实保留原文信息、语气、留白与叙述距离；不扩写心理活动，不补设定，不改写剧情；中文自然但不过度文学化。"
                    }
    )
    content = re.sub(r'^"', '「', content, flags=re.MULTILINE)
    content = re.sub(r'"$', '」', content, flags=re.MULTILINE)
    content = "%s%s%s" % (DOUBLE_CRLF, content, DOUBLE_CRLF)
    content = convert(args, content)

    with open(filepath, "w+", encoding=CHARSET) as file :
        file.write("# 『%s』\n" % title)
        file.write(DATA_SPLIT)
        file.write(content)
    log.info("翻译完成，译文已存储到 [%s]" % filepath)



def convert(args, data) :

    # 通用字符转换
    data = data.replace(" ", "")
    data = data.replace("《", "『").replace("》", "』")
    data = data.replace("‘", "『").replace("’", "』")
    data = data.replace("“", "「").replace("”", "」")
    data = data.replace("·", "・")
    data = data.replace(SEGMENT_SPLIT, "※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※ ※")

    data = data.replace("\n」「", "\n「")
    data = data.replace("」「\n", "」\n")
    data = data.replace("\n「」", "\n「")
    data = data.replace("「」\n", "」\n")
    data = data.replace("\n」", "\n「")
    data = data.replace("「\n", "」\n")
    data = data.replace("「「", "「")
    data = data.replace("」」", "」")
    return data



if __name__ == "__main__" :
    main(args())

