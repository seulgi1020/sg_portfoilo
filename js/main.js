$(function () {


/* 인트로 쇼 구간  */
  $(window).on('load', function() {
    // 5초(5000ms) 후 실행
    setTimeout(function() {
      $('.intro_show').fadeOut(1000, function() {
        // 인트로가 사라진 뒤 실행 (선택)
        $('.main_visual').fadeIn(1000);
      });
    }, 5000);
  });

/* 인트로 쇼 구간 - 빛  */
$(window).on("load", function() {
  gsap.registerPlugin(MotionPathPlugin);

  // 처음에 .f_light가 작게 시작해서 커지는 애니메이션
  gsap.from(".f_light", {
    scale: 0,          // 처음 크기를 0으로 시작
    duration: 2,       // 1초 동안 커짐
    ease: "power1.out", // 부드럽게 커지는 효과
    opacity: 1         // 완전히 보이도록 설정
  });

  // 경로에 맞게 움직이고 회전하는 애니메이션
  gsap.to(".f_light", {
    duration: 3.0,
    repeat: 0,
    ease: "none",
    motionPath: {
      path: "#orbitPath",
      align: "#orbitPath",
      alignOrigin: [0.5, 0.5],
      autoRotate: false
    },
    rotation: "+=360",  // 경로를 따라 움직이면서 360도 회전
    onComplete: function() {
      // 첫 번째 애니메이션이 끝난 후 실행되는 두 번째 애니메이션
      gsap.to(".f_light", {
        duration: 2.0, 
        rotation: "+=360",  // 1초 동안 추가로 360도 회전
        y: "+=300",         // 300px 아래로 이동
        ease: "power1.inOut"
      });
    }
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


/* .b_story 화면 보이기 */









/* 전등 내려오기 */

  $(window).on('scroll.revealUp', function () {
    const $target = $('.b_story .illust');
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const offsetTop = $target.offset().top;
    const elementHeight = $target.outerHeight();

    if (scrollTop + windowHeight * 0.7 >= offsetTop + elementHeight * 0.3) {
      $target.css('animation', 'revealUp 4s ease-out forwards');
      // 이벤트 이름 지정해주면 다른 이벤트와 안 겹침 (scroll.revealUp)
      $(window).off('scroll.revealUp');
    }
  });


/* what to do  */
$(window).on('scroll', function () {
  var selectors = ['.br', '.ma', '.ap', '.we', '.sp', '.mark', '.text_con'];

  $.each(selectors, function (index, selector) {
    var $el = $(selector);
    if ($el.length === 0) return;

    var elTop = $el.offset().top;
    var elHeight = $el.outerHeight();
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var elVisibleHeight = (scrollTop + windowHeight) - elTop;
    var visibleRatio = elVisibleHeight / elHeight;

    if (visibleRatio >= 0.7 && !$el.hasClass('appear')) {
      $el.addClass('appear');

      if (selector === '.text_con') {
        setTimeout(function () {
          $(".decotxt1").addClass("typing");
        }, 2500);

        setTimeout(function () {
          $(".decotxt2").addClass("typing");
        }, 4500);
      }
    }
  });
});


/* show mid 한바뀌돌기 */
$(window).on("load", function() {
  // 부모 요소에 overflow: hidden;을 적용하여 스크롤 방지
  $('.mid_short_show').css('overflow', 'hidden');

  gsap.to(".ligt", {
    scrollTrigger: {
      trigger: ".bangbb",
      start: "top center", 
      toggleActions: "play none none none",
      once: true
    },
    duration: 3,
    ease: "power1.inOut",
    motionPath: {
      path: "#thePath",
      align: "#thePath",
      alignOrigin: [0.5, 0.5],
      start: 0.5, 
      end: 1.5,  
      autoRotate: true
    },
    onComplete: function() {
      // 2단계: 내려가면서 커지고
      gsap.to(".ligt", {
        y: "+=312",
        scale: 30,
        rotation: 360,  // 회전 추가
        duration: 2.0,
        ease: "power2.out",
        onComplete: function() {
          // 3단계: 자연스럽게 사라지기 (페이드아웃)
          gsap.to(".mid_short_show", {
            opacity: 0,
            duration: 0.1,
            ease: "power2.inOut"
          });
        }
      });
    }
  });
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









