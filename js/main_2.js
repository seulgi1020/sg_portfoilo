$(function () {
  $(window).on('load', function () {
    console.log("🔥 window load 완료, 인트로 애니메이션 시작");
  
    gsap.registerPlugin(MotionPathPlugin);
    gsap.ticker.fps(60);
    gsap.ticker.lagSmoothing(0); // 렉 방지
  
    // 초기화: 요소 세팅
    $('.intro_show').show(); // 인트로는 보여야 함
    document.querySelector('.intro_show').offsetHeight; // 강제 리플로우
  
    gsap.set(".f_light", {
      scale: 0.5,
      rotation: 0,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      y: 0
    });
    gsap.set(".outline", { opacity: 0 });
    gsap.set(".mid", { opacity: 0 });
  
    // requestAnimationFrame으로 더 부드럽게 시작
    requestAnimationFrame(() => {
      gsap.to(".mid", {
        duration: 2,
        opacity: 1,
        ease: "power2.out",
        onComplete: function () {
          gsap.to(".f_light", {
            duration: 3,
            opacity: 1,
            scale: 1,
            rotation: 360 * 4,
            ease: "power1.inOut",
            motionPath: {
              path: "#orbitPath",
              align: "#orbitPath",
              alignOrigin: [0.5, 0.5],
              autoRotate: false
            },
            onStart: function () {
              gsap.to(".outline", {
                duration: 3,
                opacity: 1,
                ease: "power2.inOut"
              });
            },
            onComplete: function () {
              gsap.to(".f_light", {
                duration: 1,
                rotation: 360 * 2,
                y: 126,
                ease: "power2.out",
                onComplete: function () {
                  setTimeout(function () {
                    console.log("🎭 인트로 사라짐 시작");
                    $('.intro_show').fadeOut(2000); // 그냥 사라지기만!
                  }, 1200);
                }
              });
            }
          });
        }
      });
    });
  
    // Retina 또는 resize 대응
    $(window).on('resize', function () {
      console.log("🔄 윈도우 리사이즈 감지됨, 레이아웃 안정화 필요 시 여기에 코드 추가");
      // 예: 위치 재조정 필요하면 여기에 gsap.set() 또는 계산 로직 추가
    });
  });
  
/* 인트로 쇼 구간 - 띠  */


/* 메인 화면 슬라이드 */
  let profileSwiper = new Swiper('.profileSwiper', {
    direction: 'vertical',
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1200,
    simulateTouch: false,
  
    on: {
      init: function () {
        $('.scroll-thumb').css('top', '5px'); // 처음 위치
      },
      slideChange: function () {
        const $scrollbar = $('.custom-scrollbar');
        const $thumb = $('.scroll-thumb');
  
        const trackHeight = $scrollbar.height();          // 전체 트랙 높이
        const thumbHeight = $thumb.outerHeight();         // thumb 높이
        const padding = 5;                                 // 위아래 여백
        const totalSlides = this.slides.length - 1;        // 슬라이드 개수
        const realIndex = this.realIndex;
  
        // 이동 가능한 실제 높이 (트랙 높이 - thumb 높이 - 위아래 padding)
        const movableHeight = trackHeight - thumbHeight - (padding * 2);
  
        // 슬라이드 인덱스에 따른 이동 비율
        const percent = realIndex / totalSlides;
  
        // 최종 위치 계산 (3px padding을 시작 위치로 추가)
        const newTop = padding + (percent * movableHeight);
  
        // 위치 적용
        $thumb.css('top', `${newTop}px`);
      }
    }
  });

// 


/* .b_story 화면 보이기 */
const $trigger = $('.b_story_trigger');
const $bgSpread = $('.bg_spread');
const $bStory = $('.b_story');
const $textboxP5 = $('.textbox_p5');  // .textbox_p5 선택자 추가
const $textboxP6 = $('.textbox_p6');  // .textbox_p6 선택자 추가
let triggered = false;

$(window).on('scroll', function () {
  const triggerTop = $trigger.offset().top;
  const scrollTop = $(window).scrollTop();
  const windowHeight = $(window).height();

  // 애니메이션이 실행되었으면, 다시 실행되지 않도록 방지
  if (scrollTop + windowHeight * 0.7 > triggerTop && !triggered) {
    triggered = true;

    $('body').addClass('lock-scroll');
    $trigger.addClass('spread-on');

    // 퍼짐 완료 후 스크롤
    setTimeout(() => {
      const offsetTop = $bStory.offset().top;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

      setTimeout(() => {
        $bStory.addClass('visible');
        $bgSpread.addClass('fade-out');

        setTimeout(() => {
          $bStory.addClass('text-on');
          $('body').removeClass('lock-scroll');

          // .textbox_p5와 .textbox_p6 애니메이션 시작
          $textboxP5.addClass('fade-left');
          $textboxP6.addClass('fade-right');

        }, 1000);

      }, 800); // scroll 후 delay

    }, 1000); // 퍼짐 시간
  }

  // 1분마다 trigger를 다시 활성화하여 애니메이션이 반복되도록 설정
  setTimeout(() => {
    triggered = false;  // 1분 후 triggered 플래그 초기화
  }, 60000); // 1분(60000ms) 후 애니메이션 재실행 가능
});
 // 전등 애니메이션
 $(window).on('scroll.revealUp', function () {
  const $target = $('.b_story .illust');
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();
  const offsetTop = $target.offset().top;
  const elementHeight = $target.outerHeight();
  const triggerEnter = scrollTop + windowHeight * 0.7 >= offsetTop + elementHeight * 0.3;
  const triggerLeave = scrollTop + windowHeight <= offsetTop + elementHeight * 0.3;
  if (triggerEnter) {
    $target.css('animation', 'revealUp 4s ease-out 0.3s forwards');
  } else if (triggerLeave) {
    $target.css('animation', 'none');
    void $target[0].offsetWidth;
  }
});


/* what to do  */
  // 요소 나타나기
  $(window).on('scroll', function () {
    const selectors = ['.br', '.ma', '.ap', '.we', '.sp', '.mark', '.text_con'];
    $.each(selectors, function (_, selector) {
      const $el = $(selector);
      if (!$el.length) return;
      const elTop = $el.offset().top;
      const elHeight = $el.outerHeight();
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const elVisibleHeight = (scrollTop + windowHeight) - elTop;
      const visibleRatio = elVisibleHeight / elHeight;
      if (visibleRatio >= 0.7 && !$el.hasClass('appear')) {
        $el.addClass('appear');
        if (selector === '.text_con') {
          setTimeout(() => $(".decotxt1").addClass("typing"), 2500);
          setTimeout(() => $(".decotxt2").addClass("typing"), 4500);
        }
      }
    });
  });



  // 스크롤 잠금/해제
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  
    // 전체 문서에 이벤트 리스너 등록
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });
  
 
  }
  
  function enableScroll() {
    document.body.style.overflow = '';
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('keydown', preventKeyScroll);
  }

  function preventScroll(e) { e.preventDefault(); }
  function preventKeyScroll(e) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    if (keys.includes(e.keyCode)) e.preventDefault();
  }



/* 보라영역 */

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// 타임라인 분리 방식
ScrollTrigger.create({
  trigger: ".mid_short_show",
  start: "top top",
  end: "+=2200",
  pin: true,
  scrub: false,
  anticipatePin: 1,
  toggleActions: "play none none none",
  onEnter: () => {
    disableScroll();

    gsap.set(".ligt", { scale: 0.5, opacity: 0 });
    const anim = gsap.timeline();
    anim
      .to(".mid_short_show", {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.3
      })
      .to(".ligt", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(".ligt", {
        duration: 3,
        ease: "power1.inOut",
        motionPath: {
          path: "#thePath",
          align: "#thePath",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 1.5,
          autoRotate: false
        }
      })
      .to(".ligt", {
        y: "+=312",
        scale: 12,
        rotation: 360,
        duration: 1,
        ease: "power2.out"
      })
      .to(".mid_short_show", {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut"
      })
      .fromTo("section.pofo_list", {
        top: '100vh',
        opacity: 0,
      }, {
        top: 0,
        duration: 1,
        opacity: 1,
        ease: "power2.inOut"
      })
      .call(enableScroll);
  }
});












/* 카드 안에 이메일 주소 타이핑 */


$(window).on('load', function() {
  var $section = $(".getin_t");
  var $email = $section.find(".email");
  
  if ($email.length) {
      var originalText = $email.text();

      $email.empty(); // 시작 시 비워두기

      let isTyping = false; // 현재 타이핑 중인지 체크

      function startTyping() {
        isTyping = true;
        $email.empty();
        let index = 0;

        let typingInterval = setInterval(function () {
          if (index < originalText.length) {
            $email.append(originalText[index]);
            index++;
          } else {
            clearInterval(typingInterval);
            isTyping = false;
          }
        }, 150);
      }

      // 스크롤 이벤트로 계속 감지
      $(window).on("scroll", function () {
        var emailTop = $email.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        // 스크롤 위치가 요소보다 아래로 내려왔을 때
        if (scrollTop + windowHeight > emailTop + 50 && !isTyping) {
          startTyping();
        }
      });

      // 초기 체크
      $(window).trigger("scroll");
  }
});
/* 실링왁스 변화 */
$(document).ready(function () {
  const $images = $('.slider.sealingwax img');
  let current = 0;
  const count = $images.length;

  setInterval(function () {
    $images.eq(current).fadeOut(1200).removeClass('active');
    current = (current + 1) % count;
    $images.eq(current).fadeIn(1200).addClass('active');
  }, 2600);
});





});









