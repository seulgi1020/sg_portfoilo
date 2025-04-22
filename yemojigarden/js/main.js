$(function () {
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



    /* 메뉴 내리고 나서 하단 메뉴 목록 누르면  */
    $("li").click(function () {
        let text = $(this).text().trim(); // 클릭한 li의 텍스트 가져오기

        let links = {
            "인사말": "https://example.com/greeting",
            "미션/CI": "https://example.com/mission",
            "여미지 시설": "https://example.com/facilities",
            "연혁": "https://example.com/history"
        };

        let link = links[text]; // 해당 텍스트에 맞는 링크 찾기

        if (link) {
            window.location.href = link;
        }
    });



    /* 메인 비주얼 스와이퍼 */
    var swiper = new Swiper(".yeomiji-main", {
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

    /* 메인비주얼 아래 3개 버튼  */
    $(document).ready(function () {
        // 각 링크 클릭 시 이동할 URL 설정
        $(".main_b1 a").click(function () {
            window.location.href = "http://example.com/plant-garden"; // 식물원 관람안내 링크
        });

        $(".main_b2 a").click(function () {
            window.location.href = "http://example.com/garden-guide"; // 정원 안내 링크
        });

        $(".main_b3 a").click(function () {
            window.location.href = "http://example.com/flowers-blooming"; // 지금 피는 꽃 링크
        });
    });

    /* 메인 비주얼 오른쪽 아래 2개 버튼 */
    $(document).ready(function () {
        // btn1 클릭 시
        $('.btn1').click(function () {
            window.location.href = 'https://www.example1.com'; // 원하는 링크로 변경
        });

        // btn2 클릭 시
        $('.btn2').click(function () {
            window.location.href = 'https://www.example2.com'; // 다른 링크로 변경
        });
    });


    /* news  바로가기 버튼  */

    $(document).ready(function () {
        // no1_btn 클릭 시 이동할 URL 설정
        $(".no1_btn a").click(function () {
            window.location.href = "http://example.com/detail1"; // 첫 번째 View Detail 링크
        });

        // no2_btn 클릭 시 이동할 URL 설정
        $(".no2_btn a").click(function () {
            window.location.href = "http://example.com/detail2"; // 두 번째 View Detail 링크
        });

        $(".no3_btn a").click(function () {
            window.location.href = "http://example.com/detail2"; // 두 번째 View Detail 링크
        });
    });

    /* 하이라이터 부분 스와이퍼 */
    var swiperHighlight = new Swiper('.swiper-container.highlight', {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 7,
        navigation: {
            nextEl: '.highlight-swiper-next',
            prevEl: '.highlight-swiper-prev',
        },
        allowTouchMove: true,
    });


    /* 플라워 페스티벌 부분 스와이퍼 */
    var swiperHighlight = new Swiper('.swiper-container.festival', {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 7,
        navigation: {
            nextEl: '.festival-swiper-next',
            prevEl: '.festival-swiper-prev',
        },
        allowTouchMove: true,
    });

    /* 아이콘 떠올리기 */

    var $targetElement = $('.highlight .container .box');  // 대상 요소
    var $bIcon = $('.highlight .container .box .b_icon');  // 아이콘 요소



    $(window).on('scroll', function () {
        // 현재 윈도우의 위치
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + $(window).height();

        // 대상 요소의 위치
        var elementTop = $targetElement.offset().top;
        var elementBottom = elementTop + $targetElement.outerHeight();

        // 20% 이상 보일 때
        if (elementBottom >= windowTop + $(window).height() * 0.3 && elementTop <= windowBottom - $(window).height() * 0.3) {
            if (!$bIcon.hasClass('show')) {
                $bIcon.addClass('show'); // 아이콘을 보이도록 설정
            }
        } else {
            if ($bIcon.hasClass('show')) {
                $bIcon.removeClass('show'); // 아이콘을 숨기도록 설정
            }
        }
    });




    /* 아이콘 떠올리기 */

    var $targetElement = $('.festival .container .box');  // 대상 요소
    var $bIcon = $('.festival .container .box .b_icon');  // 아이콘 요소



    $(window).on('scroll', function () {
        // 현재 윈도우의 위치
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + $(window).height();

        // 대상 요소의 위치
        var elementTop = $targetElement.offset().top;
        var elementBottom = elementTop + $targetElement.outerHeight();

        // 20% 이상 보일 때
        if (elementBottom >= windowTop + $(window).height() * 0.3 && elementTop <= windowBottom - $(window).height() * 0.3) {
            if (!$bIcon.hasClass('show')) {
                $bIcon.addClass('show'); // 아이콘을 보이도록 설정
            }
        } else {
            if ($bIcon.hasClass('show')) {
                $bIcon.removeClass('show'); // 아이콘을 숨기도록 설정
            }
        }
    });





    var $targetElement = $('section.gallery');  // 대상 요소
    var $bIcon = $('section.gallery .b_icon');  // 아이콘 요소

    $(window).on('scroll', function () {
        // 현재 윈도우의 위치
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + $(window).height();

        // 대상 요소의 위치
        var elementTop = $targetElement.offset().top;
        var elementBottom = elementTop + $targetElement.outerHeight();

        // 20% 이상 보일 때
        if (elementBottom >= windowTop + $(window).height() * 0.4 && elementTop <= windowBottom - $(window).height() * 0.4) {
            if (!$bIcon.hasClass('show')) {
                $bIcon.addClass('show'); // 아이콘을 보이도록 설정
            }
        } else {
            if ($bIcon.hasClass('show')) {
                $bIcon.removeClass('show'); // 아이콘을 숨기도록 설정
            }
        }
    });



    /* // 푸터 안으로 들어오는  */

    var isAnimating = false; // 애니메이션 상태 추적 변수
    var fAni = $(".f_all .f_ani");

    function checkPosition() {
        var fAniOffset = fAni.offset().top;
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var isVisible = scrollTop + windowHeight > fAniOffset + 50;

        if (isVisible && !isAnimating) {
            isAnimating = true; // 애니메이션 시작

            fAni.css({
                transform: "translateX(0)", // 원래 위치로 이동
                opacity: 1
            });

            // 애니메이션이 끝난 후 초기 상태로
            setTimeout(function () {
                if ($(window).scrollTop() + $(window).height() < fAniOffset) {
                    // 사용자가 스크롤을 위로 올린 경우
                    fAni.css({
                        transform: "translateX(100px)", // 다시 오른쪽으로 이동
                        opacity: 0
                    });
                    isAnimating = false; // 애니메이션 끝
                }
            }, 2000); // 2초 후 다시 숨김
        } else if (!isVisible && isAnimating) {
            // 요소가 화면 밖으로 나가면 애니메이션 상태 초기화
            fAni.css({
                transform: "translateX(100px)", // 오른쪽으로 이동
                opacity: 0
            });
            isAnimating = false; // 애니메이션 끝
        }
    }

    // 스크롤 이벤트 감지 (부드럽게 실행)
    $(window).on("scroll", function () {
        requestAnimationFrame(checkPosition);
    });

    checkPosition(); // 페이지 로드 시 체크


});



