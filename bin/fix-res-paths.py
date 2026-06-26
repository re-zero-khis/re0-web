#!/usr/bin/env python3
"""
将 mdBook src/ 目录下 markdown 文件中的绝对路径 /res/ 转换为相对路径。

GitBook 在构建时会把 /res/... 这类根路径转换成相对路径写入 HTML，
mdBook 不做此转换，需要在源文件阶段预处理。

例如：
  src/markdown/ch/chapter010/01.md（depth=3）中的
    /res/imgs/article/foo.jpg
  → ../../../res/imgs/article/foo.jpg
"""
import os
import re
import sys


def fix_res_paths(src_dir: str) -> None:
    fixed_count = 0

    for root, dirs, files in os.walk(src_dir):
        for filename in files:
            if not filename.endswith(".md"):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, src_dir).replace("\\", "/")

            # 计算目录深度（相对于 src_dir）
            dir_part = os.path.dirname(rel_path)
            depth = len([p for p in dir_part.split("/") if p]) if dir_part else 0
            prefix = "../" * depth  # depth=0 → ""，depth=3 → "../../../"

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            if "/res/" not in content:
                continue

            # 替换所有 /res/ 为相对路径（避免替换 http://... 中的路径）
            new_content = re.sub(
                r'(?<![:/a-zA-Z0-9])/res/',
                (prefix + "res/") if prefix else "res/",
                content,
            )

            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                fixed_count += 1

    print(f"[fix-res-paths] Fixed {fixed_count} files in {src_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <src_dir>")
        sys.exit(1)
    fix_res_paths(sys.argv[1])
