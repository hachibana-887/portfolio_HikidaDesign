// ====================
// loading
// ====================
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  const scrollContainer = document.querySelector("[data-scroll-container]");

  setTimeout(() => {
    loading.style.transition = "opacity 1s ease";
    loading.style.opacity = 0;
    setTimeout(() => {
      loading.style.display = "none";

      // ローディング消えたあとにフェードイン開始
      scrollContainer.classList.add("show");
    }, 1000); // ローディングフェード時間
  }, 1000); // ローディング待機時間
});

// ====================
// locomotive
// ====================
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector("[data-scroll-container]");
  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    direction: "horizontal",
    smartphone: { smooth: true, direction: "horizontal" },
    tablet: { smooth: true, direction: "horizontal" },
  });

  // =====================
  // スクロール監視
  // =====================
  scroll.on("scroll", (obj) => {
    const scrollX = obj.scroll.x;
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;
    const progress = (scrollX / totalWidth) * 100;

    const pagetop = document.querySelector(".pagetop_contents");
    const animationBox = document.querySelector(".animation-box");

    if (progress > 70) {
      animationBox.classList.add("hide");
      pagetop.classList.add("show");
    } else {
      animationBox.classList.remove("hide");
      pagetop.classList.remove("show");
    }
  });

  // =====================
  // アンカーリンク対応
  // =====================
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            scroll.scrollTo(target, {
              duration: 1200,
              offset: 0,
              easing: [0.25, 0.0, 0.35, 1.0],
            });

            // scrollTo後に状態を再反映（ズレ防止）
            setTimeout(() => scroll.update(), 1300);
          }
        }
      });
    });
  }

  // =====================
  // リサイズ対応
  // =====================
  window.addEventListener("resize", () => scroll.update());
});

// ====================
// hamburger
// ====================
//ハンバーガーメニュー
// スマホハンバーガーメニュー ナビゲーションクリックでも消える
$(".hamburger").click(function () {
  $("#footer").fadeToggle();
  $(".hamburger").toggleClass("open");
});


