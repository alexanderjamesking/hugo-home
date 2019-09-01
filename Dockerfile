FROM alpine:3.9

ENV HUGO_VERSION=0.55.6 \
    HUGO_SITE=/srv/hugo

RUN apk --no-cache add \
    curl \
    git \
    && curl -SL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz \
    -o /tmp/hugo.tar.gz \
    && tar -xzf /tmp/hugo.tar.gz -C /tmp \
    && mv /tmp/hugo /usr/local/bin/ \
    && apk del curl \
    && mkdir -p ${HUGO_SITE} \
    && rm -rf /tmp/*

WORKDIR ${HUGO_SITE}

COPY . ${HUGO_SITE}

RUN hugo

# Stage 2: Copy compiled static website into an nginx Docker image
FROM nginx:latest

COPY --from=0 /srv/hugo/public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
