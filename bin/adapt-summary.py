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
import re
import sys


def adapt_summary(input_path: str, output_path: str) -> None:
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 移除 HTML 注释块（日文版被注释掉的部分）
    content = re.sub(r"<!--.*?-->", "", content, flags=re.DOTALL)

    # 移除指向外部 URL 的条目
    # mdBook 会把 SUMMARY.md 里的每个链接都尝试作为本地文件处理，
    # 外部 http/https 链接会报 "Unable to create missing file" 错误
    content = re.sub(
        r"^\t*[*\-]\s+\[.*?\]\(https?://[^\)]+\)\s*\n",
        "",
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

    print(f"[adapt-summary] {input_path} -> {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} <input_SUMMARY.md> <output_SUMMARY.md>")
        sys.exit(1)
    adapt_summary(sys.argv[1], sys.argv[2])
