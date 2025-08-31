// ナビゲーションリンクの処理を修正
// 外部ページへのリンクは通常通り動作させ、同一ページ内のアンカーリンクのみスムーススクロールを適用
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // 外部ページへのリンク（.htmlファイル）の場合は通常の動作を許可
        if (href.endsWith('.html')) {
            return; // preventDefault()を呼ばずに通常のページ遷移を許可
        }
        
        // 同一ページ内のアンカーリンク（#で始まる）の場合のみスムーススクロール
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// スクロールアニメーションの初期化
document.addEventListener('DOMContentLoaded', function() {
    // アニメーション対象のセクションを取得
    const sections = document.querySelectorAll('#skill, #works, #about, #contact');
    
    // セクションに初期クラスを追加
    sections.forEach(section => {
        section.classList.add('section-animate');
    });

    // Intersection Observerのオプション
    const observerOptions = {
        root: null, // ビューポートをルートとして使用
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発火
    };

    // コールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // 一度表示された要素は監視をやめる（パフォーマンスのため）
                observer.unobserve(entry.target);
            }
        });
    };

    // Intersection Observerのインスタンスを作成
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 各セクションを監視対象に追加
    sections.forEach(section => {
        observer.observe(section);
    });
});
