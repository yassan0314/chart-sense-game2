# Chart Sense Gameをスマホで外から遊ぶ方法

このサイトは静的サイトなので、`outputs` フォルダの中身をそのまま無料ホスティングへ置けます。

## 一番簡単: Netlify Drop

1. `chart-sense-game.zip` を作る、または `outputs` フォルダを使う
2. Netlify Drop にドラッグ&ドロップ
3. 発行されたURLをスマホで開く

## しっかり管理: GitHub Pages

1. GitHubで新しいリポジトリを作る
2. `outputs` フォルダ内のファイルをアップロード
3. Settings → Pages → Deploy from branch を有効化
4. 発行された `https://...github.io/...` をスマホで開く

## スマホでアプリっぽく使う

公開URLをスマホで開いたあと、ブラウザの共有メニューから「ホーム画面に追加」を選びます。

## 公開するファイル

- `index.html`
- `style.css`
- `script.js`
- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`
