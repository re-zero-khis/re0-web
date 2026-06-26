#!/bin/sh
# mdBook 构建脚本
# 从 gitbook/ 源文件生成 mdBook 格式并构建输出到 mdbook/book/

set -e

MDBOOK_VERSION="0.4.40"
MDBOOK_BIN="mdbook/bin/mdbook"
SRC_DIR="mdbook/src"

# ── 1. 准备 src 目录 ─────────────────────────────────────────
echo "==> Preparing mdBook source..."
mkdir -p "$SRC_DIR"

# 复制正文 markdown
echo "    Copying markdown..."
rm -rf "$SRC_DIR/markdown"
cp -r gitbook/markdown "$SRC_DIR/markdown"

# 复制资源（图片、打赏二维码等）
echo "    Copying resources..."
rm -rf "$SRC_DIR/res"
cp -r gitbook/res "$SRC_DIR/res"

# 复制首页和广告声明
cp gitbook/README.md "$SRC_DIR/README.md"
cp gitbook/ads.txt   "$SRC_DIR/ads.txt"

# ── 2. 修复章节索引页的 .html 链接 ───────────────────────────
# README.md 里的 (01.html) 链接需要改成 (01.md)，mdBook 才能正确解析
echo "==> Fixing .html links in chapter README.md files..."
find "$SRC_DIR/markdown" -name "README.md" -print0 \
    | xargs -0 sed -i 's/\.html)/.md)/g'

# ── 3. 修复 /res/ 绝对路径为相对路径 ─────────────────────────
# mdBook 不会转换根路径，需要预处理
echo "==> Fixing absolute /res/ paths to relative..."
python3 bin/fix-res-paths.py "$SRC_DIR"

# ── 4. 转换 SUMMARY.md 格式 ──────────────────────────────────
echo "==> Adapting SUMMARY.md..."
python3 bin/adapt-summary.py gitbook/SUMMARY.md "$SRC_DIR/SUMMARY.md"

# ── 5. 下载 mdBook 二进制（如不存在）────────────────────────
if [ ! -f "$MDBOOK_BIN" ]; then
    echo "==> Downloading mdBook v${MDBOOK_VERSION}..."
    mkdir -p mdbook/bin
    curl -sSL \
        "https://github.com/rust-lang/mdBook/releases/download/v${MDBOOK_VERSION}/mdbook-v${MDBOOK_VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
        | tar -xz -C mdbook/bin
fi

# ── 6. 构建 ─────────────────────────────────────────────────
echo "==> Building with mdBook v${MDBOOK_VERSION}..."
START=$(date +%s)

cd mdbook && ./bin/mdbook build

END=$(date +%s)
echo "==> Build finished in $((END - START)) seconds."
echo "    Output: mdbook/book/"
