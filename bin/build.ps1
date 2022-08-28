# Github Pages 要求所发布的 Html 路径不能有下划线，否则无法解析
# 此脚本的目的是把 GitBook 生成的 _book 目录复制到 book

Write-Output "Remove gitbook/_book ..."
If(Test-Path 'gitbook/_book') {
    Remove-Item gitbook/_book -recurse
    Start-Sleep 1
}

Write-Output "Remove gitbook/book ..."
If(Test-Path 'gitbook/book') {
    Remove-Item gitbook/book -recurse
    Start-Sleep 1
}

If(!(Test-Path 'gitbook/node_modules')) {
    Write-Output "Download nodejs module ..."
    git clone https://github.com/lyy289065406/node_modules gitbook/node_modules
    Start-Sleep 2
}

Write-Output "GitBook Building ..."
docker run --rm -v "$PWD/gitbook:/gitbook" expm02/gitbook-server gitbook build
Start-Sleep 2

Write-Output "Building for GitHub Pages ..."
Copy-Item gitbook/_book gitbook/book -recurse

Write-Output "Build Finish."
Write-Output "You can push to github now."
