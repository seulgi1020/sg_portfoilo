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


/* 이벤트 티켓 구간  */
const groupList = [
    $('.con_1')[0],
    $('.con_2')[0],
    $('.con_3')[0]
  ];

  let index = 0;
  let isAnimating = false;
  let scrollUnlocked = false;
  let atLastGroup = false;
  let started = false;

  let prevScrollY = window.scrollY;
  let exitedEventZone = false;

  function show(i) {
    gsap.to(groupList[i], {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  function hide(i) {
    gsap.to(groupList[i], {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
  }

  // 🔁 정확한 .event 제어 로직
  $(window).on('scroll', function () {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > prevScrollY;
    prevScrollY = currentScrollY;

    const eventRect = document.querySelector('.event').getBoundingClientRect();

    // .event 완전히 벗어나면 비활성화
    if (eventRect.bottom < 0 || eventRect.top > window.innerHeight) {
      exitedEventZone = true;
      started = false;
    }

    // 아래로 다시 들어올 때만 활성화
    if (
      exitedEventZone &&
      isScrollingDown &&
      eventRect.top <= 200 &&
      eventRect.bottom >= 0 &&
      !scrollUnlocked
    ) {
      started = true;
      exitedEventZone = false;
      $('body').css('overflow', 'hidden');
      index = 0;
      atLastGroup = false;

      // 상태 리셋
      groupList.forEach((el, i) => {
        gsap.set(el, {
          y: i === 0 ? "0%" : "100%",
          opacity: i === 0 ? 1 : 0
        });
      });
    }
  });

  // ✅ 휠 이벤트에 따라 con 전환
  $(window).on('wheel', function (e) {
    if (!started || scrollUnlocked || isAnimating) return;
    if (e.originalEvent.deltaY <= 0) return;

    isAnimating = true;

    if (atLastGroup) {
      $('body').css('overflow', 'auto');
      scrollUnlocked = true;
      isAnimating = false;
      return;
    }

    hide(index);
    index++;

    if (index < groupList.length) {
      show(index);
      if (index === groupList.length - 1) {
        atLastGroup = true;
      }
    }

    setTimeout(() => isAnimating = false, 700);
  });




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



