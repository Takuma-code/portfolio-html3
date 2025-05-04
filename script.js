// DOM要素の取得
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const contactForm = document.getElementById('contactForm');
const currentYearEl = document.getElementById('current-year');

// 現在の年を設定
currentYearEl.textContent = new Date().getFullYear();

// テーマ切り替え
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// 保存されたテーマを適用
function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // システムの設定がダークモードの場合
    document.body.setAttribute('data-theme', 'dark');
  }
}

// モバイルメニューの切り替え
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
}

// タブの切り替え
function switchTab(e) {
  const tabId = e.target.getAttribute('data-tab');
  
  // アクティブなタブボタンを更新
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  
  // アクティブなタブコンテンツを更新
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// スクロールアニメーション
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight * 0.85) {
      element.classList.add('fade-in');
    }
  });
}

// フォーム送信処理
function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // ここに実際のフォーム送信処理を追加
  // 例: fetch APIを使用したサーバーへの送信など
  
  // 送信成功メッセージ（デモ用）
  alert(`${name}様、お問い合わせありがとうございます。\n内容を確認次第、${email}宛にご連絡いたします。`);
  
  // フォームをリセット
  contactForm.reset();
}

// ナビゲーションリンクのスムーススクロール
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // モバイルメニューが開いている場合は閉じる
      if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ヘッダーのスクロール効果
function handleHeaderScroll() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.style.boxShadow = 'var(--shadow)';
  } else {
    header.style.boxShadow = 'none';
  }
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
  // 保存されたテーマを適用
  applyTheme();
  
  // スムーススクロールの設定
  setupSmoothScroll();
  
  // 初期アニメーション
  animateOnScroll();
  
  // イベントリスナー
  themeToggle.addEventListener('click', toggleTheme);
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', switchTab);
  });
  
  contactForm.addEventListener('submit', handleFormSubmit);
  
  window.addEventListener('scroll', () => {
    animateOnScroll();
    handleHeaderScroll();
  });
});