# Bluesky Gallery Mobile

→[in Japanese](README_ja.md)

A mobile web app that allows you to browse Bluesky images with swipe functionality.
<br>

<img src="./docs/sample.gif" width="30%">

<br>

Running on Vercel. ※PC version will be displayed when opened on desktop<br>
https://bluesky-media-gallery.vercel.app

※PC version source code is not publicly available<br>
※Data retrieval API is separate (built with Python)

<br>

## Overview

You can search for images posted on Bluesky. (The search is based on post content, not image information itself.) Images are displayed in order of newest post date.

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

3. Start the development server
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

## Notice
This project was created using Vercel's AI service ["v0"](https://v0.app). Please note that there may be redundant parts in the code.

<br>

## Additional Information

For usage instructions and known issues, please refer to this [note](https://note.com/nekoniii3/n/n1c337bec8e61) (Japanese).

<br>

## Update History

- 2025/8/20  v1.0.0 - Initial release

<br>

---