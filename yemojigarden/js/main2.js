$(function () {
  window.history.scrollRestoration = 'manual';

  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });

  /* 메뉴버튼 */
  $('header nav ul.gnb > li').hover(function () {
    $(this).find('ul').stop().slideDown();
  }, function () {
    $(this).find('ul').stop().slideUp();
  })
  /* 언어 */
  $('.lang-btn').click(function (event) {
    event.stopPropagation(); // 다른 곳을 클릭해도 드롭다운이 닫히지 않도록
    $('.lang-dropdown').toggleClass('visible');  // 'visible' 클래스를 추가하거나 제거
  });

  // 드롭다운 항목 클릭 시 언어 변경 처리 (이 예시에서는 클릭 후 드롭다운 닫기)
  $('.lang-dropdown li').click(function () {
    const selectedLang = $(this).data('lang');
    console.log('Selected Language:', selectedLang);
    // 이 부분에서 언어를 변경하는 실제 로직을 추가해야 합니다.

    // 드롭다운 닫기
    $('.lang-dropdown').removeClass('visible');  // 드롭다운 닫기
  });


  // 드롭다운 외부 클릭 시 드롭다운 닫기
  $(document).click(function (event) {
    if (!$(event.target).closest('.language-selector').length) {
      $('.lang-dropdown').removeClass('visible');  // 드롭다운 닫기
    }
  });


// 오픈채팅방
    const $talkbox = $('.talkbox');
    const $openBtn = $('.tlaktlak');
    const $closeBtn = $('.x_box');

    $openBtn.on('click', function () {
      $talkbox.show(); // 또는 fadeIn()
    });

    $closeBtn.on('click', function () {
      $talkbox.hide(); // 또는 fadeOut()
    });



  /* 메인 비주얼 스와이퍼 */
  let swiper = new Swiper(".yeomiji-main", {
    loop: true,  // 무한 루프
    speed: 1500,  // 슬라이드 전환 속도 (1.5초)
    autoplay: {
      delay: 6000,  // 6초마다 자동 전환
      disableOnInteraction: false,
    },
    effect: 'fade', // 페이드 효과 적용
    fadeEffect: {
      crossFade: true // 자연스럽게 전환
    },
    pagination: {
      el: ".yeomiji-pagination",  // 페이지네이션을 지정
      clickable: true, // 클릭 가능하게 설정
      type: 'bullets',  // 불렛 타입으로 설정
    },
  });




  /* 하이라이터 부분 스와이퍼 */
  let swiperHighlight = new Swiper('.slide_hi', {
    loop: true,
    // slidesPerView: 1,
    navigation: {
      nextEl: '.highlight-swiper-next',
      prevEl: '.highlight-swiper-prev',
    },

  });







/* 이벤트냐옹옹  */
gsap.registerPlugin(ScrollTrigger);

const groupList = [
  document.querySelector('.con_1'),
  document.querySelector('.con_2'),
  document.querySelector('.con_3')
];

const eventSection = document.querySelector('.event');

let index = 1;
let isAnimating = false;
let hasStarted = false;
let hasFirstScrollSkipped = false;
let lastEnteredFromTop = false;

// ✅ 스크롤 잠금 / 해제
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

// ✅ 초기화 함수
function initSlides() {
  groupList.forEach((el, i) => {
    gsap.set(el, {
      y: i === 0 ? '0%' : '100%',
      opacity: i === 0 ? 1 : 0
    });
  });
  index = 1;
  isAnimating = false;
  hasFirstScrollSkipped = false;
}

// ✅ ScrollTrigger 설정
ScrollTrigger.create({
  trigger: ".e_container",
  start: "top+=340 center", // .e_container의 top에서 100px 아래 지점이 center에 도달할 때
  end: "bottom top",

  onEnter: (self) => {
    if (self.direction === 1) {
      hasStarted = true;
      lastEnteredFromTop = true;
      initSlides();
      disableScroll();
    }
  },

  onLeave: () => {
    hasStarted = false;
    enableScroll();
  },

  onLeaveBack: () => {
    hasStarted = false;
    lastEnteredFromTop = false; // 아래에서 올라오는 건 다시 true 되지 않음
    enableScroll();
  }
});

// ✅ wheel 이벤트 처리
eventSection.addEventListener("wheel", (e) => {
  if (!hasStarted || !lastEnteredFromTop || isAnimating || e.deltaY <= 0) return;

  e.preventDefault(); // 기본 스크롤 막기
  disableScroll();    // 전체 고정

  if (!hasFirstScrollSkipped) {
    hasFirstScrollSkipped = true;
    enableScroll();
    return;
  }

  if (index >= groupList.length) {
    enableScroll();
    return;
  }

  isAnimating = true;

  gsap.to(groupList[index - 1], {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  });

  gsap.to(groupList[index], {
    y: "0%",
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      index++;
      isAnimating = false;
      enableScroll();
    }
  });
}, { passive: false });





  /* 갤러리 부분 스와이퍼 */
  let gallerySwiper = new Swiper('.myGallery', {
    effect: "coverflow",
    slidesPerView: 4.4, // 화면에 항상 5개 보이도록
    centeredSlides: true,
    spaceBetween: 1.5, // 각 슬라이드 사이 간격 (원하는 만큼 조정)
    loop: true,
    coverflowEffect: {
      scale: 0.84,
      rotate: 0,
      stretch: 0, // 균등 간격을 위해 0으로 유지
      depth: 100, // 입체감 조절
      modifier: 1,
      slideShadows: false
    },
    navigation: {
      nextEl: '.myGallery .swiper-button-next',
      prevEl: '.myGallery .swiper-button-prev',
    }
  });





  /* 플라워 페스티벌 부분 효과*/
  const bg = document.querySelector(".festival-bg");

  const bgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !bg.classList.contains("show")) {
        bg.classList.add("show");
        observer.unobserve(bg);
      }
    });
  }, { threshold: 0.3 });

  bgObserver.observe(bg);

  /* 플라워 페스티벌 부분 스와이퍼 */
  let swiperFestival = new Swiper('.slide_ff', {
    loop: true,

    navigation: {
      nextEl: '.festival-swiper-next',
      prevEl: '.festival-swiper-prev',
    },

  });



  /* 아이콘 떠올리기 */

  AOS.init({
    duration: 1000,  // 애니메이션 지속 시간 (1초)
    easing: "ease-out", // 자연스러운 움직임
    once: false,  // 여러 번 실행 가능하도록 설정
  });




});

/* sns 배경변경  */

document.addEventListener("DOMContentLoaded", function () {
  // ✅ 이미지 미리 로딩 (배경, 전면 이미지)
  const preloadBg = new Image();
  preloadBg.src = '../img/sns/bgbg_2.svg';

  const preloadFront = new Image();
  preloadFront.src = '../img/sns/hoverfonrt.svg';

  // ✅ 요소 선택
  const phone = document.querySelector(".sns_enter .contents .phone");
  const contents = document.querySelector(".sns_enter .contents");
  const frontHover = document.querySelector(".sns_enter .fronthover");

  // ✅ 마우스 진입 시 효과
  phone.addEventListener("mouseenter", function () {
    contents.classList.add("hovered-bg");
    frontHover.classList.add("show");
  });

  // ✅ 마우스 나갈 시 원상복구
  phone.addEventListener("mouseleave", function () {
    contents.classList.remove("hovered-bg");
    frontHover.classList.remove("show");
  });
});