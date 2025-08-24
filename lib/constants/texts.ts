export const NAVIGATION_TEXTS = {
  HOME: 'ホーム',
  SERVICES: 'サービス',
  PORTFOLIO: '実績',
  ABOUT: '会社概要',
  CONTACT: 'お問い合わせ',
} as const;

export const HERO_TEXTS = {
  SUBTITLE: 'Creative Web Solutions',
  TITLE: 'Bringing Your Vision to Life',
  DESCRIPTION:
    '最新技術とクリエイティブなデザインで、あなたのビジネス成長をサポート。',
  CTA_BUTTON: '相談する',
} as const;

export const CONTACT_TEXTS = {
  TITLE: 'お問い合わせ',
  SUBTITLE:
    'プロジェクトのご相談やお見積もりのご依頼は、こちらからお気軽にお問い合わせください。',
  FORM: {
    NAME_PLACEHOLDER: 'お名前',
    EMAIL_PLACEHOLDER: 'メールアドレス',
    MESSAGE_PLACEHOLDER: 'お問い合わせ内容',
    SUBMIT_BUTTON: '送信',
  },
} as const;

export const ARIA_LABELS = {
  MAIN_NAVIGATION: 'メインナビゲーション',
  HOME_LINK: 'ホームページへ戻る',
  HERO_SECTION: 'メインビジュアル',
  CONTACT_SECTION: 'お問い合わせセクション',
  SERVICE_START: 'サービスを始める',
  SUBMIT_MESSAGE: 'メッセージを送信する',
  NAVIGATION_ITEMS: {
    HOME: 'ホームセクションへ移動',
    SERVICES: 'サービスセクションへ移動',
    PORTFOLIO: 'ポートフォリオセクションへ移動',
    ABOUT: '会社概要セクションへ移動',
    CONTACT: 'お問い合わせセクションへ移動',
  },
  FORM: {
    NAME_DESCRIPTION: 'お名前を入力してください',
    EMAIL_DESCRIPTION: 'メールアドレスを入力してください',
    MESSAGE_DESCRIPTION: 'お問い合わせ内容を入力してください',
  },
} as const;

export const ABOUT_TEXTS = {
  SECTION_LABEL: 'About',
  TITLE: 'お客様と共に歩みます',
  DESCRIPTION:
    'York.webはまだ創業まもないですが、複数のプロジェクトを経験しており、お客様のニーズに合わせた最適なソリューションを提供します。',
  INFO_LABEL: {
    COMPANY: '会社名',
    NAME: '代表者',
    BUSINESS: '事業名',
  },
  INFO_VALUE: {
    NAME: '増田 泰基',
    BUSINESS: 'アプリ・Web開発',
  },
} as const;

export const SERVICES_TEXTS = {
  TITLE: 'サービス',
  SUBTITLE:
    'お客様の特定のニーズに合わせた洗練されたWebソリューションを提供し、デジタルプレゼンスを競合他社から差別化いたします。',
  SERVICES: {
    AI_INTRODUCTION: {
      TITLE: 'AI導入',
      DESCRIPTION:
        '最新情報に基づいたAI活用の提案や、それぞれのニーズに合わせたAI導入を実現いたします。',
    },
    WEB_DEVELOPMENT: {
      TITLE: 'Web開発',
      DESCRIPTION:
        '信頼性、セキュリティ、拡張性を確保するため、最新技術を使用した高性能Webアプリケーションを開発いたします。',
    },
    RESPONSIVE_DESIGN: {
      TITLE: 'レスポンシブデザイン',
      DESCRIPTION:
        'あらゆるデバイスや画面サイズで美しく機能するレスポンシブWebデザインを確保いたします。',
    },
    SEO_OPTIMIZATION: {
      TITLE: 'SEO最適化',
      DESCRIPTION:
        '専門的なデジタル最適化戦略と分析を通じて、お客様のビジネスの可視性を最適化いたします。',
    },
    APP_DEVELOPMENT: {
      TITLE: 'アプリ開発',
      DESCRIPTION:
        'iOS・Androidアプリの開発・クロスプラットフォーム対応。ユーザビリティを重視した高品質なアプリケーションを開発いたします。',
    },
    MAINTENANCE: {
      TITLE: 'メンテナンス＆サポート',
      DESCRIPTION:
        '専門的なメンテナンスを通じて、Webサイトの継続的改善と安定運営をサポートいたします。',
    },
  },
} as const;

export const PORTFOLIO_TEXTS = {
  TITLE: '実績',
  SUBTITLE:
    '様々な業界のクライアント様に向けた革新的な取り組みを紹介し、卓越したデジタルソリューションをお届けしています。',
  NO_PORTFOLIO: {
    TITLE: '準備中...',
    SUBTITLE: '随時追加予定',
  },
} as const;

export const FOOTER_TEXTS = {
  COPYRIGHT: '© 2024 York.web All Rights Reserved.',
} as const;

export const ERROR_MESSAGES = {
  RIPPLE_LOAD_FAILED: '3Dエフェクトの読み込みに失敗しました',
  RELOAD_BUTTON: '再読み込み',
} as const;
