$(function () {
 

  /* 인트로 쇼 구간 - 띠  */


  /* 메인 화면 슬라이드 */
  let isDragging = false;
  let startY = 0;
  let startTop = 0;

  const $scrollbar = $('.custom-scrollbar');
  const $thumb = $('.scroll-thumb');
  const padding = 5;

  const swiper = new Swiper('.profileSwiper', {
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
        $thumb.css('top', `${padding}px`);
      },
      slideChange: function () {
        const trackHeight = $scrollbar.height();
        const thumbHeight = $thumb.outerHeight();
        const movableHeight = trackHeight - thumbHeight - padding * 2;
        const totalSlides = this.slides.length - 1;
        const percent = this.realIndex / totalSlides;
        const newTop = padding + percent * movableHeight;
        $thumb.css('top', `${newTop}px`);
      }
    }
  });

  // 드래그 시작
  $thumb.on('mousedown touchstart', function (e) {
    isDragging = true;
    startY = e.pageY || e.originalEvent.touches[0].pageY;
    startTop = parseFloat($thumb.css('top'));
    e.preventDefault();
  });

  // 드래그 중
  $(document).on('mousemove touchmove', function (e) {
    if (!isDragging) return;

    const moveY = e.pageY || e.originalEvent.touches[0].pageY;
    const delta = moveY - startY;

    const trackHeight = $scrollbar.height();
    const thumbHeight = $thumb.outerHeight();
    const movableHeight = trackHeight - thumbHeight - padding * 2;

    let newTop = startTop + delta;

    // 범위 제한
    newTop = Math.max(padding, Math.min(newTop, padding + movableHeight));
    $thumb.css('top', `${newTop}px`);

    // 슬라이드 이동 계산
    const percent = (newTop - padding) / movableHeight;
    const totalSlides = swiper.slides.length - 1;
    const newIndex = Math.round(percent * totalSlides);
    swiper.slideToLoop(newIndex);
  });

  // 드래그 종료
  $(document).on('mouseup touchend', function () {
    isDragging = false;
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

          }, 500);

        }, 400); // scroll 후 delay

      }, 500); // 퍼짐 시간
    }



    // 1분마다 trigger를 다시 활성화하여 애니메이션이 반복되도록 설정
    setTimeout(() => {
      triggered = false;  // 1분 후 triggered 플래그 초기화
    }, 600000); // 1분(60000ms) 후 애니메이션 재실행 가능
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
      $target.css('animation', 'revealUp 2s ease-out 0.1s forwards');
    } else if (triggerLeave) {
      $target.css('animation', 'none');
      void $target[0].offsetWidth;
    }
  });
  /* 텍스트 전환 버튼  */
  document.getElementById("langToggle").addEventListener("click", function () {
    const container = document.querySelector(".container");
    container.classList.toggle("korean");

    // 버튼 스타일 토글
    this.classList.toggle("active");

    // 텍스트 바꾸기
    this.textContent = container.classList.contains("korean") ? "영어" : "한국어";
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
          setTimeout(() => $(".decotxt1").addClass("typing"), 1800);
          setTimeout(() => $(".decotxt2").addClass("typing"), 3000);
        }
      }
    });
  });

  /* 카드 안에 이메일 주소 타이핑 */


  $(window).on('load', function () {
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









