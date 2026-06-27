# mdBook 本地部署 SOP

本文档用于本地预览和构建 mdBook 版本站点。旧 GitBook 构建链路已不再作为本地开发入口。

## 前置条件

- 已安装 Docker Desktop，并确保 Docker Engine 正在运行。
- 在仓库根目录执行命令。
- 本地预览默认占用 `http://localhost:4000`。

## 首次部署镜像

PowerShell：

```powershell
docker build -f Dockerfile.mdbook -t re0-mdbook .
```

`bin/run-mdbook.ps1` 会在本地没有 `re0-mdbook` 镜像时自动执行上述构建；通常不需要手动执行。

## 启动本地预览

PowerShell：

```powershell
.\bin\run-mdbook.ps1
```

脚本会执行以下动作：

1. 检查并按需构建 `re0-mdbook` 镜像。
2. 清理上次生成的 `mdbook/src`。
3. 从 `gitbook/` 复制 markdown 和资源到 `mdbook/src`。
4. 转换 `SUMMARY.md` 为 mdBook 格式。
5. 启动 `mdbook serve --hostname 0.0.0.0 --port 4000`。

启动完成后打开：

```text
http://localhost:4000
```

serve 启动后约 60 秒会自动生成 RSS 和 sitemap，可通过以下地址验证：

- 首页：`http://localhost:4000/`
- RSS：`http://localhost:4000/rss.xml`
- Sitemap：`http://localhost:4000/sitemap.xml`

## 停止本地预览

`run-mdbook.ps1` 默认以前台方式运行，停止方式是：

```text
Ctrl+C
```

如果终端已关闭但容器仍在运行，可手动停止 mdBook 容器：

```powershell
docker ps --filter ancestor=re0-mdbook
docker stop <CONTAINER_ID>
```

只停止 `re0-mdbook` 容器，不要误停数据库、Redis 或其他本地服务容器。

## 一次性构建静态站点

用于验证发布产物、RSS 和 sitemap：

```powershell
docker run --rm -v "${PWD}:/workspace" re0-mdbook sh bin/build-mdbook.sh
```

构建完成后主要产物为：

- `mdbook/book/index.html`
- `mdbook/book/rss.xml`
- `mdbook/book/sitemap.xml`

`mdbook/src` 和 `mdbook/book` 都是构建产物，已在 `.gitignore` 中忽略。

## 清理构建产物

使用传统 cmd 方式（Docker 挂载卷下最可靠）：

```powershell
cmd /c "rmdir /s /q mdbook\src & rmdir /s /q mdbook\book"
```

PowerShell 的 `Remove-Item -Recurse -Force` 在 Docker 挂载卷上可能因"目录非空"而失败；容器内 `rm -rf` 同样会因为 Windows 文件系统权限失败。`cmd /c rmdir /s /q` 是目前验证最可靠的清理方式。

## 常见问题

### 端口 4000 被占用

先检查占用方：

```powershell
docker ps --format "{{.ID}} {{.Image}} {{.Ports}}"
netstat -ano | findstr ":4000"
```

如果占用方是旧的 mdBook 预览容器，执行：

```powershell
docker stop <CONTAINER_ID>
```

### 外链菜单不显示

mdBook 不能在 `SUMMARY.md` 中直接使用 `http://` 或 `https://` 作为章节路径。`bin/adapt-summary.py` 会自动把外链转换为 `mdbook/src/external-links/*.md` 跳转页，从而保留左侧菜单项。

### 构建耗时或搜索索引过大

mdBook 构建速度明显快于旧 GitBook，但中文全文搜索仍会生成较大的 `searchindex.json`。本地构建时看到 `searchindex.json is very large` 警告属于已知现象。
