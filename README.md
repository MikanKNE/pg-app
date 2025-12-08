# pg-app

# 各FWアプリ
## 共通実行
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  リポジトリ直下に移動
    ```bash
    cd /workspaces/リポジトリ名
    ```
3.  docker compose を実行・停止 etc
    ```bash
    # ビルド＆起動 (引数にサービス名追加でサービス指定して実行)
    docker compose up --build -d
    # 起動 (引数にサービス名追加でサービス指定して実行)
    docker compose up -d
    # 停止
    docker compose stop
    # ログ確認 (引数にサービス名追加でサービス指定して実行)
    docker compose logs -f サービス名
    # 停止/削除
    docker compose down
    # 指定コンテナ削除 (引数にサービス名追加でサービス指定して実行)
    docker compose rm サービス名
    ```

## spring-boot-app
### 通常実行
1.  Codespaces のターミナル開く
2.  spring-boot-app ディレクトリ直下に移動
    ```bash
    cd spring-boot-app
    ```
3.  spring-boot-app 実行
    ```bash
    ./mvnw spring-boot:run
    ```
4. 自動的にポート8080のURL生成されるので確認してブラウザで開く
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  spring-boot-app ディレクトリ直下に移動
    ```bash
    cd spring-boot-app
    ```
3.  docker compose を実行
    ```bash
    # ビルド＆起動
    docker compose up --build -d
    # 起動
    docker compose up -d
    ```
4. 自動的にポート8080のURL生成されるので確認してブラウザで開く

## flask-app
### 通常実行
1.  Codespaces のターミナル開く
2.  flask-app ディレクトリ直下に移動
    ```bash
    cd flask-app
    ```
3.  flask-app 実行
    ```bash
    python ./src/app.py
    ```
4. 自動的にポート5000のURL生成されるので確認してブラウザで開く
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  flask-app ディレクトリ直下に移動
    ```bash
    cd flask-app
    ```
3.  docker compose を実行
    ```bash
    # ビルド＆起動
    docker compose up --build -d
    # 起動
    docker compose up -d
    ```
4. 自動的にポート5000のURL生成されるので確認してブラウザで開く

## gin-app
### 通常実行
1.  Codespaces のターミナル開く
2.  gin-app ディレクトリ直下に移動
    ```bash
    cd gin-app
    ```
3.  gin-app 実行
    ```bash
    go run main.go
    ```
4. 自動的にポート8180のURL生成されるので確認してブラウザで開く
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  gin-app ディレクトリ直下に移動
    ```bash
    cd gin-app
    ```
3.  docker compose を実行
    ```bash
    # ビルド＆起動
    docker compose up --build -d
    # 起動
    docker compose up -d
    ```
4. 自動的にポート8180のURL生成されるので確認してブラウザで開く

## actix-web-app
### 通常実行
1.  Codespaces のターミナル開く
2.  actix-web-app ディレクトリ直下に移動
    ```bash
    cd actix-web-app
    ```
3.  actix-web-app 実行
    ```bash
    cargo run
    ```
4. 自動的にポート8280のURL生成されるので確認してブラウザで開く
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  actix-web-app ディレクトリ直下に移動
    ```bash
    cd actix-web-app
    ```
3.  docker compose を実行
    ```bash
    # ビルド＆起動
    docker compose up --build -d
    # 起動
    docker compose up -d
    ```
4. 自動的にポート8280のURL生成されるので確認してブラウザで開く

## next-app
### 通常実行
1.  Codespaces のターミナル開く
2.  next-app ディレクトリ直下に移動
    ```bash
    cd next-app
    ```
3.  next-app 実行
    ```bash
    npm run dev
    ```
4. 自動的にポート3000のURL生成されるので確認してブラウザで開く
### Docker(docker-compose)
1.  Codespaces のターミナル開く
2.  next-app ディレクトリ直下に移動
    ```bash
    cd next-app
    ```
3.  docker compose を実行
    ```bash
    # ビルド＆起動
    docker compose up --build -d
    # 起動
    docker compose up -d
    ```
4. 自動的にポート3000のURL生成されるので確認してブラウザで開く
