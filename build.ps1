# Github Pages 要求所发布的 Html 路径不能有下划线，否则无法解析
# 此脚本的目的是把 GitBook 生成的 _book 目录复制到 book

echo "Remove gitbook/_book ..."
Remove-Item gitbook/_book -recurse
Sleep 1

echo "Remove gitbook/book ..."
Remove-Item gitbook/book -recurse
Sleep 1

echo "GitBook Building ..."
docker run --rm -v "$PWD/gitbook:/gitbook" expm02/gitbook-server gitbook build
Sleep 2

echo "Building for GitHub Pages ..."
Copy-Item gitbook/_book gitbook/book -recurse

echo "Build Finish."
echo "You can push to github now."