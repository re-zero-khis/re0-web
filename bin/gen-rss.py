#!/usr/bin/env python3
"""
生成 rss.xml。
从 SUMMARY.md 中提取最近更新的章节条目，生成 RSS 2.0 订阅源。

用法:
  python3 bin/gen-rss.py <summary_md> <base_url> <output_path> [max_items]

例:
  python3 bin/gen-rss.py mdbook/src/SUMMARY.md https://re0zero.top/mdbook/book mdbook/book/rss.xml
"""
import re
import sys
from datetime import datetime, timezone
from xml.sax.saxutils import escape


def gen_rss(
    summary_path: str,
    base_url: str,
    output_path: str,
    max_items: int = 30,
) -> None:
    with open(summary_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 提取所有指向本地 .md 文件的条目（跳过外部 URL）
    pattern = r"[*\-]\s+\[([^\]]+)\]\((markdown/[^\)]+\.md)\)"
    matches = re.findall(pattern, content)

    # 取最后 N 条（最新章节靠近文件末尾）
    recent = list(reversed(matches[-max_items:]))

    base_url = base_url.rstrip("/")
    pub_date = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")

    items_xml = []
    for title, md_path in recent:
        html_path = md_path.replace(".md", ".html")
        url = f"{base_url}/{html_path}"
        items_xml.append(
            f"    <item>\n"
            f"      <title>{escape(title)}</title>\n"
            f"      <link>{url}</link>\n"
            f"      <guid isPermaLink=\"true\">{url}</guid>\n"
            f"      <pubDate>{pub_date}</pubDate>\n"
            f"    </item>"
        )

    rss = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n'
        "  <channel>\n"
        "    <title>Re：从零开始的异世界生活</title>\n"
        f"    <link>{base_url}/</link>\n"
        f"    <atom:link href=\"{base_url}/rss.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n"
        "    <description>RE0：从零开始的异世界生活 WEB版 汉化连载</description>\n"
        "    <language>zh-cn</language>\n"
        f"    <lastBuildDate>{pub_date}</lastBuildDate>\n"
        + "\n".join(items_xml) + "\n"
        "  </channel>\n"
        "</rss>\n"
    )

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(rss)

    print(f"[gen-rss] {len(items_xml)} items -> {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(f"Usage: {sys.argv[0]} <summary_md> <base_url> <output_path> [max_items]")
        sys.exit(1)
    max_items = int(sys.argv[4]) if len(sys.argv) > 4 else 30
    gen_rss(sys.argv[1], sys.argv[2], sys.argv[3], max_items)
