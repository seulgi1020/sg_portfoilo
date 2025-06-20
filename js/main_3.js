$(function () {

/* 프로필 라인 */


// 자전거 path 따라 스크롤 애니메이션
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const svg = document.getElementById('main-svg');
const path = document.getElementById('main-path');
const bike = document.getElementById('bike-img');

// SVG 경로 높이 기반으로 스크롤 길이 설정
const svgHeight = svg.viewBox.baseVal.height || svg.height.baseVal.value;
const scrollLength = svgHeight - window.innerHeight;
const bikeOffset = 0;
const scrollSpeed = 1.5;

// 자전거 중앙 정렬
gsap.set(bike, {
  xPercent: -50,
  yPercent: -50,
});

// 자전거 SVG 경로 따라 움직이기
gsap.to(bike, {
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: () => "+=" + (scrollLength * scrollSpeed),
    scrub: 3,
    pin: false,
    anticipatePin: 1
  },
  motionPath: {
    path: path,
    align: path,
   // autoRotate: true,
    alignOrigin: [0.5, 0.5],
    start: 0,
    end: 1,
    offsetY: bikeOffset
  }
});

// ✅ 등장 효과 등록 – 괄호 문제 수정!
requestAnimationFrame(() => {
  document.querySelectorAll('[class^="gg_"]').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      toggleClass: { targets: el, className: "show" },
      once: true
    });
  });

  document.querySelectorAll('[class^="sg"]').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      toggleClass: { targets: el, className: "show" },
      once: true
    });
  });

  ScrollTrigger.refresh(); // 마지막에 상태 갱신
});







// 프로그램 항목 순차 등장 애니메이션

let lastScrollTop = 0;
let hasActivated = false; // ✅ 상태 추적 변수

function isSectionInViewport(section) {
  const rect = section.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function handleScroll() {
  const section = document.querySelector(".avaliable");
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const isScrollingDown = currentScroll > lastScrollTop;
  lastScrollTop = currentScroll;

  if (!section) return;

  // 👇 아래로 스크롤 중 & 화면에 진입했으며, 아직 활성화되지 않은 경우
  if (isScrollingDown && isSectionInViewport(section) && !hasActivated) {
    section.classList.add("active");
    hasActivated = true;

    // ✅ 4초 뒤에 다시 초기화 (스크롤 위로 갔다 내려오면 재실행 가능)
    setTimeout(() => {
      section.classList.remove("active");
      hasActivated = false;
    }, 4000);
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);





/* mystory  애니메이션  */
gsap.registerPlugin(ScrollTrigger);

const elements = [
  ".music_1", ".music_2", ".music_3", ".music_4", ".music_5",
  ".shadowback", ".beskin", ".flower", ".clicktower", ".bag",
  ".fountain", ".austria", ".drawing", ".riding", ".jomal"
];

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".all",
    start: "top 50%", // 👉 화면 정중앙쯤에 올 때 시작
    toggleActions: "restart none none none", // 스크롤로 올 때마다 반복
    // markers: true // 디버깅시 사용
  },
  defaults: {
    duration: 0.2,
    ease: "power2.out"
  }
});

// 🎵 순서대로 등장
elements.forEach(selector => {
  tl.to(selector, { opacity: 1, y: 0 });
});

});