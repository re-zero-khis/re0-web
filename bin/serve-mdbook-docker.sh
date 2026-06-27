#!/bin/sh
# Docker 容器内的 mdBook 预览入口脚本
# 由 bin/run-mdbook.ps1 调用
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
echo "==> Building book and generating SEO files ..."
echo ""

ROOT=$(pwd)

# 1. 用 mdbook build 生成静态站点
cd "$ROOT/mdbook" && mdbook build

# 2. 生成 sitemap 和 RSS（mdbook 的 warp 路由不认识这些外来文件，不能依赖它服务）
SITE_URL="http://localhost:4000"
echo "[serve] Generating sitemap.xml..."
python3 "$ROOT/bin/gen-sitemap.py" "$ROOT/mdbook/book" "$SITE_URL" "$ROOT/mdbook/book/sitemap.xml"
echo "[serve] Generating rss.xml..."
python3 "$ROOT/bin/gen-rss.py" "$ROOT/mdbook/src/SUMMARY.md" "$SITE_URL" "$ROOT/mdbook/book/rss.xml"

# 3. 用 Python http.server 服务整个 book 目录（确保 rss/sitemap 等所有文件均可访问）
echo ""
echo "==> Serving on http://localhost:4000"
echo "    Home:    http://localhost:4000/"
echo "    RSS:     http://localhost:4000/rss.xml"
echo "    Sitemap: http://localhost:4000/sitemap.xml"
echo "    (Ctrl+C to stop)"
echo ""

cd "$ROOT/mdbook/book" && python3 -m http.server --bind 0.0.0.0 4000
