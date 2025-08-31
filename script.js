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

// ハンバーガーメニューの処理
document.addEventListener('DOMContentLoaded', function() {
    // 要素を取得
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header-nav');
    const body = document.body;
    
    // オーバーレイ要素を作成
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // メニューの状態を管理
    let isMenuOpen = false;
    
    // メニューを開く関数
    function openMenu() {
        isMenuOpen = true;
        hamburger.classList.add('active');
        nav.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
    }
    
    // メニューを閉じる関数
    function closeMenu() {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }
    
    // メニューのトグル
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // ハンバーガーメニュークリック時の処理
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    });
    
    // オーバーレイをクリックしたらメニューを閉じる
    overlay.addEventListener('click', closeMenu);
    
    // メニュー内のリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 現在のページへのリンクの場合はデフォルトの動作を防ぐ
            if (this.getAttribute('href') === window.location.pathname.split('/').pop()) {
                e.preventDefault();
            }
            closeMenu();
        });
    });
    
    // ウィンドウリサイズ時の処理
    function handleResize() {
        // タブレット/デスクトップサイズに戻ったらメニューを閉じる
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    }
    
    // リサイズイベントの設定（スロットリング付き）
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
    });
    
    // メニュー外をクリックしたら閉じる
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
});
