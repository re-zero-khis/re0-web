# Re0 Web - 停止 mdBook Docker 容器
# 用法：在仓库根目录执行  .\bin\stop-mdbook.ps1

$IMAGE = "re0-mdbook"

Write-Host "==> Stopping mdBook containers (image: $IMAGE) ..." -ForegroundColor Yellow

$CONTAINERS = docker ps -q --filter "ancestor=$IMAGE"
if ($CONTAINERS) {
    docker stop $CONTAINERS
    Write-Host "    Stopped: $($CONTAINERS -join ', ')" -ForegroundColor Green
} else {
    Write-Host "    No running $IMAGE containers found." -ForegroundColor DarkGray
}
