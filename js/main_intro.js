$(function () {

 $(window).on('load', function () {
    console.log("🔥 window load 완료, 인트로 애니메이션 시작");

    gsap.registerPlugin(MotionPathPlugin);
    gsap.ticker.fps(60);
    gsap.ticker.lagSmoothing(0); // 렉 방지

    // 초기화: 요소 세팅
    $('.intro_show').show();
    document.querySelector('.intro_show').offsetHeight;

    gsap.set(".f_light", {
      scale: 0.5,
      rotation: 0,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      y: 0,
      transformOrigin: "50% 50%" // 중심 기준
    });
    gsap.set(".outline", { opacity: 0 });
    gsap.set(".mid", { opacity: 0 });

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
              document.querySelector('.f_light').classList.add('shine');

              // ✨ outline 등장
              gsap.to(".outline", {
                duration: 3,
                opacity: 1,
                ease: "power2.inOut"
              });

              // ✨ 위치 고정 & scale 반복
              gsap.to(".f_light", {
                scale: 1.1,
                repeat: -1,
                yoyo: true,
                duration: 1.2,
                ease: "sine.inOut"
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
                  $('.intro_show').fadeOut(2000, function () {
                    console.log("✅ 애니메이션 완료, 페이지 이동!");
                    window.location.href = "index.html"; // 원하는 파일명으로 변경
                  });
                }, 600);
              }
            });
          }
        });
      }
    });
  });

  $(window).on('resize', function () {
    console.log("🔄 윈도우 리사이즈 감지됨, 레이아웃 안정화 필요 시 여기에 코드 추가");
  });

  $(window).on('load pageshow', runIntroAnimation); // 혹시 runIntroAnimation 따로 있으면 여기도 체크!
});



});