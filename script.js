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
