$DOCKER_ID = (docker ps -aq --filter name=re0-web)
if(![String]::IsNullOrEmpty($DOCKER_ID)) {
    docker stop $DOCKER_ID
    # docker rm $DOCKER_ID
}
    
