#!/usr/bin/env python3
"""
将 GitBook 格式的 SUMMARY.md 转换为 mdBook 格式。

主要变更：
  - 标题行改为 '# Summary'
  - ## 二级节标题 → # 一级节标题（mdBook Part 语法）
  - ---- 分隔符 → ---
  - 移除日文版注释块（<!-- ... -->）
  - 清理多余空行
"""
import json
import re
import sys
from hashlib import sha1
from html import escape
from pathlib import Path


def adapt_summary(input_path: str, output_path: str) -> None:
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 移除 HTML 注释块（日文版被注释掉的部分）
    content = re.sub(r"<!--.*?-->", "", content, flags=re.DOTALL)

    output_dir = Path(output_path).parent
    external_dir = output_dir / "external-links"
    external_pages = []

    def replace_external_link(match: re.Match) -> str:
        title = match.group("title")
        url = match.group("url")
        digest = sha1(url.encode("utf-8")).hexdigest()[:12]
        page_path = f"external-links/external-{len(external_pages) + 1:03d}-{digest}.md"
        external_pages.append((page_path, title, url))
        return f'{match.group("indent")}* [{title}]({page_path}){match.group("tail")}'

    # mdBook 的 SUMMARY.md 不支持 http/https 作为章节路径，会把它们当成本地文件创建。
    # 为了保留侧栏菜单里的外链，转换为本地跳转页。
    content = re.sub(
        r"^(?P<indent>[ \t]*)[*\-]\s+\[(?P<title>[^\]]+)\]\((?P<url>https?://[^\)]+)\)(?P<tail>\s*)$",
        replace_external_link,
        content,
        flags=re.MULTILINE,
    )

    # 替换第一行标题为 mdBook 要求的 # Summary
    content = re.sub(r"^# .+$", "# Summary", content, count=1, flags=re.MULTILINE)

    # ## 节标题 → # 节标题（mdBook Part 语法）
    content = re.sub(r"^## ", "# ", content, flags=re.MULTILINE)

    # ---- 分隔符 → ---
    content = re.sub(r"^-{4,}$", "---", content, flags=re.MULTILINE)

    # 清理连续超过两行的空行
    content = re.sub(r"\n{3,}", "\n\n", content)

    # 去除末尾多余空白
    content = content.strip() + "\n"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)

    if external_pages:
        external_dir.mkdir(parents=True, exist_ok=True)
        for page_path, title, url in external_pages:
            target = output_dir / page_path
            escaped_title = escape(title)
            escaped_url = escape(url, quote=True)
            js_url = json.dumps(url, ensure_ascii=False)
            target.write_text(
                f"# {title}\n\n"
                f"正在跳转到：[{url}]({url})\n\n"
                f'<meta http-equiv="refresh" content="0; url={escaped_url}">\n'
                f'<script>window.location.replace({js_url});</script>\n'
                f'<noscript><p><a href="{escaped_url}">打开 {escaped_title}</a></p></noscript>\n',
                encoding="utf-8",
            )

    print(f"[adapt-summary] {input_path} -> {output_path} ({len(external_pages)} external links)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input_SUMMARY.md> <output_SUMMARY.md>")
        sys.exit(1)
    adapt_summary(sys.argv[1], sys.argv[2])
