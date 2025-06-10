$(function () {
  let swiper1 = new Swiper(".main_visual", {
    autoplay: {
      delay: 1500,
    },
   effect: 'fade',
    loop: true,
    pagination: {
      el: ".main_visual .swiper-pagination",
      clickable: true,
    },
  });


  let swiper2 = new Swiper(".doctor_inner", {
    slidesPerView: 3,
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: ".doctor_inner .swiper-button-next",
      prevEl: ".doctor_inner .swiper-button-prev",
    },
  });

  let swiper3 = new Swiper(".insta_2", {
    slidesPerView: 5, 
    centeredSlides: true, 
    spaceBetween: 10, 
    loop: true,

    navigation: {
        nextEl: ".insta_2 .swiper-button-next",
        prevEl: ".insta_2 .swiper-button-prev",
    },

    
});


  
    


/* 원형뉴스스와이퍼 */
  const swiperElement = document.getElementById('swiperTrack');
  const infoBox = document.getElementById('infoBox');
  const contents = [...swiperElement.querySelectorAll('.circle-content')].map(el => ({
    title: el.querySelector('.custom-title')?.innerHTML || '',
    desc: el.querySelector('.custom-desc')?.innerHTML || '',
    image: el.dataset.image
  }));

  const centerX = 920;
  const centerY = 460;
  const radiusX = 650;
  const radiusY = 180;
  let currentIndex = 0;

  function createCircles() {
    contents.forEach((item, i) => {
      const el = document.createElement('div');
      el.classList.add('circle');
      el.dataset.index = i;
      el.innerHTML = `<img src="${item.image}" alt="">`;
      el.addEventListener('click', () => activateCircle(i));
      swiperElement.appendChild(el);
    });
    updatePositions();
  }

  function updatePositions() {
    const circles = document.querySelectorAll('.circle');
    const total = contents.length;
    const visibleRange = 2; // 비활성화 2개 + 활성화 1개 + 비활성화 2개 = 총 5개만 보이기

    circles.forEach((circle, i) => {
      const offset = (i - currentIndex + total) % total;
      const displayIndex = offset > total / 2 ? offset - total : offset;

      if (Math.abs(displayIndex) <= visibleRange) {
        const angle = displayIndex * (Math.PI / 12); // 1/4 원형 정도로 조절
        const x = centerX + radiusX * Math.cos(angle - Math.PI / 2);
        const y = centerY + radiusY * Math.sin(angle - Math.PI / 2);
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.opacity = 1;
        circle.style.pointerEvents = 'auto';
      } else {
        circle.style.left = `-9999px`;
        circle.style.top = `-9999px`;
        circle.style.opacity = 0;
        circle.style.pointerEvents = 'none';
      }

      circle.classList.remove('active');
      if (i === currentIndex) circle.classList.add('active');
    });

    infoBox.innerHTML = `
      <div class="info-item">
        <h3>${contents[currentIndex].title}</h3>
        <p>${contents[currentIndex].desc}</p>
      </div>
    `;
    infoBox.classList.add('active');
  }

  function activateCircle(index) {
    currentIndex = index;
    updatePositions();
  }

  function move(dir) {
    currentIndex = (currentIndex + dir + contents.length) % contents.length;
    updatePositions();
  }

  createCircles();


































/* 푸터 로고 올라갔다 내려오기  */

  gsap.timeline({ repeat: -1, repeatDelay: 3 }) // 무한 반복 + 3초 대기
    .to(".heart", { y: -50, duration: 0.3 })
    .to(".heart", { y: 0, duration: 0.3 })
    .to(".pH", { y: -50, duration: 0.3 })
    .to(".pH", { y: 0, duration: 0.3 })
    .to(".pE", { y: -50, duration: 0.3 })
    .to(".pE", { y: 0, duration: 0.3 })
    .to(".pA", { y: -50, duration: 0.3 })
    .to(".pA", { y: 0, duration: 0.3 })
    .to(".pL", { y: -50, duration: 0.3 })
    .to(".pL", { y: 0, duration: 0.3 });




const track = document.querySelector(".image-track");

if (track) {
  const images = track.querySelectorAll("img");
  const imageWidth = 277 + 30; // 이미지 + 간격
  const totalImages = images.length;

  // ✅ 이미지들을 클론해서 track 뒤에 복사
  images.forEach((img) => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  const totalSlides = totalImages * 2; // 원본 + 복제된 이미지 수
  let currentIndex = 0;

  function slideImages() {
    const distance = -imageWidth * currentIndex;

    gsap.to(track, {
      x: distance,
      duration: 0.8,
      ease: "power1.inOut",
      onComplete: () => {
        currentIndex++;

        if (currentIndex >= totalImages) {
          // 복제 이미지 마지막 직전에 도달했을 경우 → 순간 리셋
          currentIndex = 0;
          gsap.set(track, { x: 0 }); // 순식간에 원위치
        }

        setTimeout(slideImages, 700); // 다음 슬라이드 타이밍
      }
    });
  }

  slideImages();
}

  });






