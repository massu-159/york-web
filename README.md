# York Web

Next.jsを使用して構築された、3Dグラフィックスと包括的なUIコンポーネントライブラリを特徴とするモダンなWebアプリケーション。

## 🚀 技術スタック

- **フレームワーク**: Next.js 13.5.1
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **3Dグラフィックス**: Three.js with React Three Fiber
- **UIコンポーネント**: Radix UI + shadcn/ui
- **フォーム**: React Hook Form with Zod validation
- **チャート**: Recharts
- **テーマ**: next-themes でダーク/ライトモード対応
- **テスト**: Jest + React Testing Library + Playwright E2E
- **開発**: ESLint + Prettier

## 📋 前提条件

- Node.js 18.x以上
- npmまたはyarnパッケージマネージャー

## 🛠️ 開発環境のセットアップ

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd york-web
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

4. **ブラウザを開く**
   [http://localhost:3000](http://localhost:3000)にアクセス

## 📝 利用可能なスクリプト

| コマンド | 説明 |
|---------|-------------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクション用にビルド |
| `npm run start` | プロダクションサーバーを起動 |
| `npm run lint` | ESLintを実行 |
| `npm test` | Jestユニットテストを実行 |
| `npm run test:watch` | Jestをウォッチモードで実行 |
| `npm run test:coverage` | テストカバレッジレポートを生成 |
| `npm run test:e2e` | Playwright E2Eテストを実行 |
| `npm run test:e2e:ui` | E2EテストをUIで実行 |
| `npm run test:e2e:headed` | E2Eテストをheadedモードで実行 |
| `npm run test:e2e:debug` | E2Eテストをデバッグ |

## 🏗️ ビルド・デプロイ

1. **アプリケーションをビルド**
   ```bash
   npm run build
   ```

2. **プロダクションサーバーを起動**
   ```bash
   npm run start
   ```

アプリケーションは静的エクスポート用に設定されており（next.config.jsで`output: 'export'`）、静的ホスティングプラットフォームへのデプロイに適しています。

## 📁 プロジェクト構造

```
york-web/
├── app/                    # Next.js 13 appディレクトリ
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── ripple/           # 3Dリップルエフェクトコンポーネント
│   ├── sections/         # ページセクション（ヒーロー、アバウトなど）
│   ├── ui/               # 再利用可能なUIコンポーネント
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/                # カスタムReactフック
├── lib/                  # ユーティリティとヘルパー
├── public/               # 静的アセット
├── tests/                # E2Eテストファイル
└── __tests__/            # ユニットテストファイル
```

## 🧪 テスト

### ユニットテスト
```bash
# すべてのテストを実行
npm test

# ウォッチモードでテストを実行
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

### E2Eテスト
```bash
# E2Eテストを実行
npm run test:e2e

# UIで実行
npm run test:e2e:ui

# テストをデバッグ
npm run test:e2e:debug
```

## 🎨 主要機能

- **3Dグラフィックス**: Three.jsを使用したインタラクティブなリップルエフェクト
- **レスポンシブデザイン**: Tailwind CSSを使用したモバイルファーストアプローチ
- **ダーク/ライトテーマ**: シームレスなテーマ切り替え
- **コンポーネントライブラリ**: Radix UIを使用した包括的なUIコンポーネント
- **型安全性**: 完全なTypeScriptサポート
- **テスト**: ユニットテストとE2Eテストのカバレッジ
- **パフォーマンス**: プロダクションビルド用に最適化

## 🤝 コントリビューション

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更を行う
4. すべてが動作することを確認するためにテストを実行
5. 変更をコミット（`git commit -m 'Add amazing feature'`）
6. ブランチにプッシュ（`git push origin feature/amazing-feature`）
7. プルリクエストを開く

### 開発ガイドライン

- 既存のコードスタイルと規約に従う
- 新機能にはテストを書く
- PRを提出する前にすべてのテストが通ることを確認
- 意味のあるコミットメッセージを使用
- 必要に応じてドキュメントを更新

## 📄 ライセンス

このプロジェクトはプライベートで独占的です。全ての権利を保有します。
