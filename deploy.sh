docker ps --filter "name=stafeeva"
docker pull $IMAGE
docker rm -f stafeeva || true
docker run -d \
       --network web \
       --name stafeeva \
       --restart unless-stopped \
       -l traefik.backend=stafeeva \
       -l traefik.docker.network=web \
       -l traefik.enable=true \
       -l traefik.port=80 \
       -l traefik.frontend.rule=Host:stafeeva.ajk.cloud,stafeeva.co.uk,www.stafeeva.co.uk \
       $IMAGE
docker ps --filter "name=stafeeva"
