#!/bin/sh
# Docker 容器内的 mdBook 预览入口脚本
# 由 bin/run-mdbook.ps1 / bin/run-mdbook.sh 调用
# 运行环境：容器内，工作目录 = /workspace（即仓库根目录）

set -e

SRC=mdbook/src

echo "==> Preparing mdBook source..."
mkdir -p "$SRC"

echo "    Copying markdown..."
cp -r gitbook/markdown "$SRC/markdown"

echo "    Copying resources..."
cp -r gitbook/res "$SRC/res"

cp gitbook/README.md "$SRC/README.md"
cp gitbook/ads.txt   "$SRC/ads.txt"

echo "    Fixing .html links in chapter README.md..."
find "$SRC/markdown" -name "README.md" -print0 \
    | xargs -0 sed -i 's/\.html)/.md)/g'

echo "    Fixing absolute /res/ paths..."
python3 bin/fix-res-paths.py "$SRC"

echo "    Adapting SUMMARY.md..."
python3 bin/adapt-summary.py gitbook/SUMMARY.md "$SRC/SUMMARY.md"

echo ""
echo "==> Starting mdbook serve ..."
echo "    Open browser: http://localhost:4000"
echo ""

cd mdbook && mdbook serve --hostname 0.0.0.0 --port 4000
