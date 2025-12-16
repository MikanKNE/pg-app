#!/bin/bash

# 変数定義
NEXT_APP="next-app"
declare -A BACKEND_URLS
BACKEND_URLS["spring-boot-app"]="https://symmetrical-space-goldfish-gjjrppqg7v6c9rwj-8080.app.github.dev"
BACKEND_URLS["flask-app"]="https://symmetrical-space-goldfish-gjjrppqg7v6c9rwj-5000.app.github.dev"
BACKEND_URLS["gin-app"]="https://symmetrical-space-goldfish-gjjrppqg7v6c9rwj-8180.app.github.dev"
BACKEND_URLS["actix-web-app"]="https://symmetrical-space-goldfish-gjjrppqg7v6c9rwj-8280.app.github.dev"

# 引数設定
COMMAND=$1
BACKEND_APP=$2

# BACKEND_URL取得
BACKEND_URL=${BACKEND_URLS[$BACKEND_APP]}
if [[ -z "$BACKEND_URL" ]]; then
  echo "使い方: $0 {build|up|upbuild|down} {spring-boot-app|flask-app|gin-app|actix-web-app}"
  exit 0
fi

# コマンド実行
case $COMMAND in
  "build")
    # ビルド
    echo "--- docker compose build ---"
    docker compose -f docker-compose.multi.yml build --build-arg NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL $NEXT_APP $BACKEND_APP
    echo "--- build end ---"
    ;;

  "up")
    # 起動(実行)
    echo "--- docker compose down ---"
    docker compose -f docker-compose.multi.yml down $NEXT_APP $BACKEND_APP
    echo "--- docker compose up ---"
    docker compose -f docker-compose.multi.yml up -d $NEXT_APP $BACKEND_APP
    echo "--- up end ---"
    ;;

  "upbuild")
    # ビルド + 起動(実行)
    echo "--- docker compose down ---"
    docker compose -f docker-compose.multi.yml down $NEXT_APP $BACKEND_APP
    echo "--- docker compose build ---"
    docker compose -f docker-compose.multi.yml build --build-arg NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL $NEXT_APP $BACKEND_APP
    echo "--- docker compose up ---"
    docker compose -f docker-compose.multi.yml up -d $NEXT_APP $BACKEND_APP
    echo "--- upbuild end ---"
    ;;

  "down")
    # 停止・削除
    echo "--- docker compose down ---"
    docker compose -f docker-compose.multi.yml down $NEXT_APP $BACKEND_APP
    echo "--- down end ---"
    ;;

  *)
    echo "使い方: $0 {build|up|upbuild|down} {spring-boot-app|flask-app|gin-app|actix-web-app}"
    ;;
esac