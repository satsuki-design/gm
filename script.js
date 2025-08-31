// メニュー状態の管理
let isMenuOpen = false;
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const headerNav = document.querySelector('.header-nav');
const body = document.body;

// メニューを開く関数
function openMenu() {
    isMenuOpen = true;
    headerNav.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    
    // メニューテキストが正しく表示されるようにする
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.whiteSpace = 'nowrap';
        link.style.overflow = 'visible';
        link.style.textOverflow = 'clip';
    });
}

// メニューを閉じる関数
function closeMenu() {
    isMenuOpen = false;
    headerNav.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
}

// メニューをトグルする関数
function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// イベントリスナーを設定
if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
}

if (overlay) {
    overlay.addEventListener('click', closeMenu);
}

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
    // ウィンドウ幅が1025px以上の場合はメニューを閉じる
    if (window.innerWidth >= 1025) {
        closeMenu();
    }
}

// リサイズイベントの設定（スロットリング付き）
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
});

// 初期化
handleResize();

// ナビゲーションリンクの処理（スムーススクロール）
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
