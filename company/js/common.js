gsap.registerPlugin(ScrollTrigger);
const scrollContainer = document.querySelector("[data-scroll-container]");
// 한 번만 설정
ScrollTrigger.defaults({
    scroller: scrollContainer,
    scrub: 1
});

const locoScroll = new LocomotiveScroll({
    el: scrollContainer,  // 전체 페이지에 적용
    smooth: true, // 부드러운 스크롤 활성화
    lerp: 0.08, // 부드러운 감속 정도 (0~1)
});

// Locomotive Scroll과 ScrollTrigger 동기화
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
});

// Locomotive Scroll 적용 후 ScrollTrigger 업데이트
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();



const nav = document.querySelector('nav');
nav.addEventListener('mouseenter', (e) => {
    e.target.classList.add('on');
})
nav.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('on');
});

const p = document.querySelector('.r_menu .sel p');
if (p) {
    p.addEventListener('click', function () {
        const selElement = this.closest('.sel');
        if (selElement) {
            selElement.classList.toggle('on');
        }
    });
}

let mainSlide = new Swiper('.main_slide_wrap', {
    loop: true,
    autoplay: {
        delay: 3000,        // 3초마다 자동 넘김
        disableOnInteraction: false,
    },
    effect: 'fade',
    keyboard: {
        enabled: true,      // 키보드로 넘기기 가능
    },
    navigation: {
        nextEl: ".main_visual .next", // 오른쪽 버튼
        prevEl: ".main_visual .prev", // 왼쪽 버튼
    },
    on: {
        // autoplayTimeLeft 콜백: time은 남은 시간(ms), progress는 남은 비율(1 ~ 0)
        autoplayTimeLeft(swiper, time, progress) {
            // progress가 1일 때 채워진 높이는 0%, 0일 때 100%
            document.querySelector('.swiper-pagination-line-fill').style.height = (1 - progress) * 100 + '%';
        },
        init(swiper) {
            updatePagination(swiper); // 처음 슬라이드 번호 표시
        },
        slideChangeTransitionEnd(swiper) {
            updatePagination(swiper); // 슬라이드 바뀔 때 번호 변경
        },
    }
})

//슬라이드 번호 보여주는 함수
function updatePagination(swiper) {
    const curentNum = swiper.realIndex + 1;//현재 슬라이드 번호(0부터 시작이라 +1)
    const fomattedNum = curentNum < 10 ? `0${curentNum}` : curentNum;
    document.querySelector('.swiper-pagination-current').textContent
        = fomattedNum;
}

//마우스 따라다니는 커서 + 드래그 효과
const cursor = document.querySelector('.custom_cursor');
const businessSection = document.querySelector('.business ul');

//마우스가 움직일때마다 커서 따라가기
document.addEventListener('mousemove', (e) => {
    // locomotive scroll의 현재 스크롤 오프셋 (수직)
    const scrollY = locoScroll.scroll.instance.scroll.y;
    //const scrollY
    cursor.style.left = `${e.clientX}px`; //가로위치
    cursor.style.top = `${e.clientY + scrollY}px`; //세로위치  
})
if (businessSection && cursor) {
    businessSection.addEventListener('mouseenter', () => {
        cursor.classList.add('drag');
    })
    businessSection.addEventListener('mouseleave', () => {
        cursor.classList.remove('drag');
    })
}



let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.txt_area',
        start: 'top 20%',
        end: 'bottom bottom',
        scrub: true,
    }
})

tl.to('.txt_area strong.tit', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none'
}).to('.txt_area b.tit', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none'
}, '+=0.4')
    .to('.txt_area em.tit', {
        backgroundSize: '100%',
        duration: 1,
        ease: 'none'
    }, '+=0.8').to('.txt_area i.tit', {
        backgroundSize: '100%',
        duration: 1,
        ease: 'none'
    }, '+=1.2')


// 카드 한바뀌 돌기
const brandCards = gsap.utils.toArray('.brand .card');
brandCards.forEach((card, i) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.brand',
            start: `top+=${i * 250} center`,
            end: `top+=${(i + 1) * 250} center`,
            scrub: 1.2,
        }
    });
    tl.fromTo(card, { rotationY: 0 }, {
        rotationY: 180,
        transformOrigin: "center center",
        ease: "power2.out"
    })
})

function applySimolyScroll(selector, speed = 4, direction = 'forwards') {
    $(selector).simplyScroll({
        speed,
        direction,
        pauseOnHover: true,
        pauseOnTouch: true,
    })
}
applySimolyScroll('.brand .list');



let businessSwiper = new Swiper('.business .slide', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 30,
    touchStartPreventDefault: false,  // 기본 터치 이벤트 방지를 비활성화
    navigation: {
        nextEl: ".business .next",
        prevEl: ".business .prev",
    },
})

/* vid에 토글 클래스 적용 */
// .vid에 on 클래스 토글 + opacity 보장
// .vid에 스크롤 진입 시 .on 클래스 토글 + opacity 전환
gsap.timeline({
    scrollTrigger: {
      trigger: '.vid',
      start: 'top 13%',
      end: 'bottom center',
      scrub: true,
      toggleClass: {
        targets: '.vid',
        className: 'on'
      },
      onEnter: () => gsap.to(".vid", { opacity: 1, duration: 0.5 }),
      onLeaveBack: () => gsap.to(".vid", { opacity: 0, duration: 0.5 })
    }
  });
  
  // 초기 상태 설정
  gsap.set(".vid_box", {
    scale: 0.5,
    borderRadius: "50%",
    transformOrigin: "center center"
  });
  gsap.set(".vid", { opacity: 0 });
  
  // vid_box 스크롤 인터랙션 타임라인
  gsap.timeline({
    scrollTrigger: {
      trigger: ".vid_box",
      start: "top 50%",
      end: "top 50%+=1500",
      scrub: 1,
      pin: ".vid_box",
      pinSpacing: true,
      pinReparent: true
    }
  })
  .to(".vid_box", {
    scale: 1,
    borderRadius: "0%",
    ease: "power1.inOut"
  })
  .to(".vid_box iframe, .vid_box video", {
    scale: 1,
    opacity: 1,
    transformOrigin: "center center",
    ease: "power2.out",
    duration: 2
  }, "<"); // 동시에 실행





//trust 섹션 애니메이션

const cards = document.querySelectorAll('.card-list li');
let started = false;
let index = 0;

function animateCards() {
  if (index >= cards.length) return;

  const card = cards[index];
  card.classList.add('active');

  setTimeout(() => {
    card.classList.remove('active');
    card.classList.add('shrink');
    index++;
    setTimeout(animateCards, 400);
  }, 1000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const target = entry.target;

    if (entry.isIntersecting) {
      if (target.classList.contains('trust') && !started) {
        started = true;
        index = 0;
        cards.forEach(card => card.classList.remove('shrink', 'active'));

        // 가구 요소 초기화
        document.querySelector('.trust .fur_all_1')?.classList.remove('show');
        document.querySelector('.trust .fur_all_2')?.classList.remove('show');

        animateCards();

        // 3초 후에 가구 요소 등장
        setTimeout(() => {
          document.querySelector('.trust .fur_all_1')?.classList.add('show');
          document.querySelector('.trust .fur_all_2')?.classList.add('show');
        }, 5000);

        // 7초 후 다시 재실행 가능
        setTimeout(() => {
          started = false;
        }, 7000);
      }
    }

    if (!entry.isIntersecting && target.classList.contains('trust')) {
      started = false;

      // 카드 초기화
      cards.forEach(card => card.classList.remove('shrink', 'active'));

      // 가구 숨김 처리
      document.querySelector('.trust .fur_all_1')?.classList.remove('show');
      document.querySelector('.trust .fur_all_2')?.classList.remove('show');
    }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector('.trust'));








let newsSwiper = new Swiper('.news .con', {
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".news .swiper-pagination",
        type: "progressbar",
    },
    spaceBetween: 70,
})



function applySimolyScroll(selector, speed = 4, direction = 'forwards') {
    $(selector).simplyScroll({
        speed,
        direction,
        pauseOnHover: true,
        pauseOnTouch: true,
    })
}
applySimolyScroll('.footer .list2'); 