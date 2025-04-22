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



let previousIcon = null; // 이전에 클릭한 아이콘을 저장할 변수

document.querySelectorAll(".icon-img").forEach((img) => {
  // 마우스를 올렸을 때 이미지 변경
  img.addEventListener("mouseover", function () {
    this.src = this.getAttribute("data-on"); // data-on 이미지로 변경
  });

  // 마우스를 떼었을 때 이미지 원래대로 복구
  img.addEventListener("mouseout", function () {
    if (this !== previousIcon) {
      this.src = this.getAttribute("data-off"); // data-off 이미지로 원래 복구
    }
  });

  // 클릭했을 때 이미지 원래 상태로 되돌리기
  img.addEventListener("click", function () {
    // 이전에 클릭한 아이콘이 있다면 그 아이콘을 원래 상태로 돌려놓기
    if (previousIcon && previousIcon !== this) {
      previousIcon.src = previousIcon.getAttribute("data-off"); // 이전 아이콘 원래 이미지로 복구
    }

    // 현재 클릭한 아이콘을 기억
    previousIcon = this;

    // 현재 클릭한 아이콘을 "선택된" 상태로 유지
    this.src = this.getAttribute("data-on"); // 현재 클릭한 아이콘을 on 이미지로 변경
  });
});
  
    

document.querySelectorAll(".icon-item").forEach((icon) => {
  icon.addEventListener("click", function () {
    let targetId = this.getAttribute("data-target"); // 클릭한 아이콘의 data-target 가져오기
    let allContents = document.querySelectorAll(".content-text"); // 모든 content-text 요소
    let allBackgrounds = document.querySelectorAll(".background"); // 모든 background 요소
    let allIcons = document.querySelectorAll(".icon-img"); // 모든 아이콘 이미지
    let iconImg = this.querySelector(".icon-img"); // 클릭한 아이콘의 이미지

    // 모든 콘텐츠 숨기기
    allContents.forEach((content) => content.classList.remove("active"));
    allBackgrounds.forEach((bg) => bg.style.backgroundImage = "none");

    // 모든 아이콘 기본 이미지로 변경
    allIcons.forEach((img) => {
      img.src = img.getAttribute("data-off");
    });

    let targetContent = document.getElementById(targetId); // 해당 콘텐츠 찾기

    if (targetContent) {
      targetContent.classList.add("active"); // 클릭한 콘텐츠 활성화
      let bg = targetContent.querySelector(".background"); // 해당 콘텐츠 안의 background 찾기

      let index = targetId.replace("content", ""); // content 숫자 추출 (content1 -> 1)
      bg.style.backgroundImage = `url('../img/healthcarepart/bg/health_conner_bg_${index}.png')`; // 해당하는 배경 이미지 적용

      // 클릭한 아이콘의 이미지 변경
      iconImg.src = iconImg.getAttribute("data-on");
    }
  });
});

  });





