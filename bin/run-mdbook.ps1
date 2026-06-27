# Re0 Web - mdBook 本地 Docker 预览
# 用法：在仓库根目录执行  .\bin\run-mdbook.ps1

$ErrorActionPreference = "Stop"
$ROOT = (Resolve-Path "$PSScriptRoot\..").Path
Set-Location $ROOT

$IMAGE = "re0-mdbook"

# ── 1. 构建 Docker 镜像（仅首次或 Dockerfile.mdbook 有更新时需要） ──
$imageExists = docker images -q $IMAGE 2>$null
if (-not $imageExists) {
    Write-Host "==> Building Docker image '$IMAGE' (only needed once)..." -ForegroundColor Cyan
    docker build -f Dockerfile.mdbook -t $IMAGE .
    Write-Host "==> Image built.`n" -ForegroundColor Green
} else {
    Write-Host "==> Using existing Docker image '$IMAGE'" -ForegroundColor Green
}

# ── 2. 清理上次生成的 src 目录（Windows 侧权限足够删，容器内 rm -rf 挂载卷会失败）
if (Test-Path "$ROOT/mdbook/src") {
    Write-Host "==> Cleaning previous src..." -ForegroundColor DarkGray
    Remove-Item "$ROOT/mdbook/src" -Recurse -Force
}

# ── 3. 启动预览服务 ────────────────────────────────────────────────────
Write-Host ""
Write-Host "==> Starting mdBook preview (Ctrl+C to stop) ..." -ForegroundColor Cyan
Write-Host "    Once ready, open: http://localhost:4000" -ForegroundColor Yellow
Write-Host ""

docker run --rm `
    -v "${ROOT}:/workspace" `
    -p 4000:4000 `
    $IMAGE `
    sh bin/serve-mdbook-docker.sh
