/*header scroll*/
const bt = document.querySelector("#bt");
const language = document.querySelector("#language");

bt.addEventListener("click", function () {
  language.classList.toggle("on");
});

/*login*/
const loginBtn = document.getElementById("loginBtn");
const modalOverlay = document.getElementById("modalOverlay");
const closeBtn = document.querySelector(".closeBtn");

// 로그인 버튼 클릭 시 모달 열기
loginBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// 닫기 버튼 또는 배경 클릭 시 닫기
closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

/*banner slide*/
const track = document.querySelector(".slide-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
const pageNumber = document.querySelector(".page-number");
const playPauseBtn = document.querySelector(".play-pause-btn");

let index = 1;
let slideWidth = slides[0].getBoundingClientRect().width;
let autoSlide;
let isPlaying = true;

// 복제 슬라이드 추가
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const updatedSlides = Array.from(track.children);
track.style.transform = `translateX(-${slideWidth * index}px)`;

// 페이지 및 인디케이터 업데이트
function updateUI() {
  let current = index;
  if (index === 0) current = slides.length;
  else if (index === updatedSlides.length - 1) current = 1;

  pageNumber.textContent = `${current} / ${slides.length}`;
  document.querySelectorAll(".indicator-dot").forEach((dot) => {
    dot.classList.remove("active");
  });
  const activeDot = document.querySelector(
    `.indicator-dot[data-index="${current - 1}"]`
  );
  if (activeDot) activeDot.classList.add("active");
}

// 슬라이드 이동
function moveToSlide(newIndex) {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * newIndex}px)`;
  index = newIndex;
  updateUI();
}

// 버튼 이벤트
nextBtn.addEventListener("click", () => {
  if (index >= updatedSlides.length - 1) return;
  moveToSlide(index + 1);
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  moveToSlide(index - 1);
});

// 무한 루프 처리
track.addEventListener("transitionend", () => {
  if (updatedSlides[index] === firstClone) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (updatedSlides[index] === lastClone) {
    track.style.transition = "none";
    index = updatedSlides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  updateUI();
});

// 자동 슬라이드
function startAutoSlide() {
  autoSlide = setInterval(() => {
    moveToSlide(index + 1);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

startAutoSlide();

// 정지 / 재생 버튼
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopAutoSlide();
    playPauseBtn.textContent = "▶";
    playPauseBtn.style.fontSize = "1.3rem";
    playPauseBtn.style.padding = "0 0 2px 2px";
  } else {
    startAutoSlide();
    playPauseBtn.textContent = "⏸";
    playPauseBtn.style.fontSize = "1.8rem";
    playPauseBtn.style.padding = "0 0 5px 1px";
  }
  isPlaying = !isPlaying;
});

// 호버 시 자동 정지
document.querySelector(".carousel").addEventListener("mouseenter", () => {
  stopAutoSlide();
});
document.querySelector(".carousel").addEventListener("mouseleave", () => {
  if (isPlaying) startAutoSlide();
});
