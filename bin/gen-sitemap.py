#!/usr/bin/env python3
"""
生成 sitemap.xml。
扫描 mdBook 输出目录中的所有 .html 文件并生成标准 sitemap。

用法:
  python3 bin/gen-sitemap.py <book_dir> <base_url> <output_path>

例:
  python3 bin/gen-sitemap.py mdbook/book https://re0zero.top/mdbook/book mdbook/book/sitemap.xml
"""
import os
import sys
from datetime import datetime, timezone


def gen_sitemap(book_dir: str, base_url: str, output_path: str) -> None:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    base_url = base_url.rstrip("/")
    urls = []

    for root, dirs, files in os.walk(book_dir):
        # 跳过搜索、打印等辅助页面的目录
        dirs[:] = [d for d in dirs if d not in ("searchindex",)]
        for filename in sorted(files):
            if not filename.endswith(".html"):
                continue
            if filename in ("print.html", "404.html"):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, book_dir).replace("\\", "/")
            url = f"{base_url}/{rel_path}"
            urls.append(url)

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url in urls:
        xml_lines += [
            "  <url>",
            f"    <loc>{url}</loc>",
            f"    <lastmod>{today}</lastmod>",
            "  </url>",
        ]
    xml_lines.append("</urlset>")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_lines) + "\n")

    print(f"[gen-sitemap] {len(urls)} URLs -> {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <book_dir> <base_url> <output_path>")
        sys.exit(1)
    gen_sitemap(sys.argv[1], sys.argv[2], sys.argv[3])
