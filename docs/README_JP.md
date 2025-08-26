# Bluesky Gallery Mobile

→in Japanese

Blueskyの画像をスワイプして閲覧できるスマホ向けWebアプリです。
<br>

<img src="../docs/sample.gif" width="30%">

<br>

Vercelで稼働しています。 ※PCで開くとPC版が表示されます<br>
https://bluesky-media-gallery.vercel.app



※PC版はソースを公開していません<br>
※データを取得するAPIは別です（Pythonで製作）<br>
https://github.com/nekoniii3/bluesky-media-api

<br>

## 概要

Blueskyに投稿された画像の検索ができます。（検索はポストの内容からの検索で画像の情報からの検索をしているわけではありません。）画像は投稿日が新しい順に表示されます。

<br>

## 技術スタック

- **フレームワーク**: Next.js
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **その他**: Swiper, shadcn/ui, 

<br>

## 必要な環境

- Node.js (18.0.0以上)
- npm / yarn / pnpm / bun

<br>

## インストールと起動

1. リポジトリをクローン
```bash
git clone https://github.com/nekoniii3/bs-gallery-mbile.git
cd bs-gallery-mbile
```

2. 依存関係をインストール
```bash
npm install
# または
yarn install
# または
pnpm install
```


4. 開発サーバーを起動
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

<br>

※APIサーバの情報は"\constants\server.ts"に設定して下さい

<br>

## 注意・免責
- これはVercel社のAIサービス[「v0」](https://v0.app)を利用して作られています。コードに冗長な点があることをご了承ください。
- トップのトレンドは別のプログラムによりtrendingjapan.bsky.socialから取得しています。そちらのプログラムが停止する可能性があることをご了承下さい。

<br>

## その他

利用方法や問題点などについては[note](https://note.com/nekoniii3/n/n1c337bec8e61)もご参照下さい。

<br>

## 更新履歴

- 2025/8/26  v1.0.0 - 初回リリース

<br>

---

