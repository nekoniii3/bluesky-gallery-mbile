# Bluesky Gallery Mobile

[→日本語](./docs/README_JP.md)

A mobile web app for browsing Bluesky images with swipe functionality.
<br>

<img src="./docs/sample.gif" width="30%">

<br>

Running on Vercel. ※PC version will be displayed when opened on PC<br>
https://bluesky-media-gallery.vercel.app



※PC version source code is not publicly available<br>
※API for data retrieval is separate (built with Python)<br>
https://github.com/nekoniii3/bluesky-media-api

<br>

## Overview

You can search for images posted on Bluesky. (Search is based on post content, not image information.) Images are displayed in chronological order with newest posts first.

<br>

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Others**: Swiper, shadcn/ui

<br>

## Requirements

- Node.js (18.0.0 or higher)
- npm / yarn / pnpm / bun

<br>

## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/nekoniii3/bs-gallery-mbile.git
cd bs-gallery-mbile
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

<br>

※Please configure API server information in "\constants\server.ts"

<br>

## Notice & Disclaimer
- This was created using Vercel's AI service ["v0"](https://v0.app). Please note that the code may contain redundant parts.
- Top trends are retrieved from trendingjapan.bsky.social by a separate program. Please note that this program may stop functioning.

<br>

## Other Information

For usage instructions and troubleshooting, please also refer to [note](https://note.com/nekoniii3/n/n1c337bec8e61).

<br>

## Update History

- 2025/8/26  v1.0.0 - Initial release

<br>

---