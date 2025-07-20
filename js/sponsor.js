/*HTML 상에서 Vue의 @click="setPrice(10000)"는 Vue 인스턴스가 마운트된 후에 작동해야 합니다.

이건 바닐라 JS로 버튼 클릭 이벤트를 등록하는 코드예요. Vue에서 버튼을 제어하고 있는데, 이 바닐라 JS가 동일한 요소를 조작하면서 충돌이 일어납니다.

즉, 같은 버튼에 대해 Vue도, 일반 JS도 조작하려고 하니까 Vue가 @click="setPrice()" 동작을 감지하지 못하는 겁니다.

Vue 방식으로 버튼에 .on 클래스를 적용하려면,
선택된 금액을 상태로 저장하고,
:class 바인딩을 사용해야 합니다.*/

const app = Vue.createApp({
  data() {
    return {
      price: "",
      amount: "",
      selectedAmount: null, // 선택된 금액
    };
  },
  methods: {
    setPrice(amount) {
      this.amount = amount.toLocaleString(); // 10000 → "10,000" // 버튼 클릭 시 amount에 값 저장
      this.selectedAmount = amount; // 선택된 금액 저장 */
    },
    selectInput() {
      this.selectedAmount = null;
    },
    formatPrice(e) {
      // 숫자만 남기고 콤마 제거
      let value = e.target.value.replace(/[^0-9]/g, "");
      // 3자리마다 콤마 추가
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.price = value; // 직접입력 시 price에 값 저장
      this.amount = ""; // 버튼 금액 초기화
      this.selectedAmount = null;
    },
  },
});
app.mount("#app");

const agree = document.querySelector("#allagree");
const moneybtn = document.querySelectorAll(".money button");
const paybtn = document.querySelectorAll(".pay button");
const buttons = document.querySelectorAll(".tab-buttons button");
const contents = document.querySelectorAll(".tab-content");
const contentsContainer = document.querySelector(".tab-contents");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // 버튼 스타일 초기화
    document.querySelector(".tab-buttons button.on")?.classList.remove("on");
    button.classList.add("on");

    // 콘텐츠 숨김/보이기 전환
    document.querySelector(".tab-content.on")?.classList.remove("on");
    contents[index].classList.add("on");
  });
});

paybtn.forEach((button) => {
  button.addEventListener("click", () => {
    // 버튼 스타일 초기화
    document.querySelector(".pay button.on")?.classList.remove("on");
    button.classList.add("on");
  });
});

//전체동의하기

// 'allagree'라는 아이디를 가진 체크박스(전체 동의)를 가져와서 변수에 저장해요.
const allAgree = document.getElementById("allagree");

// 'individual'이라는 클래스를 가진 모든 체크박스(개별 동의들)를 가져와서 변수에 저장해요.
// 여러 개가 있을 수 있어서, 모두 모아놓은 리스트(배열 비슷한 것) 형태로 저장돼요.
const individualCheckboxes = document.querySelectorAll(".individual");

// 전체 동의 체크박스를 클릭(변경)했을 때, 실행되는 코드예요.
allAgree.addEventListener("change", () => {
  // 개별 동의 체크박스 각각에 대해서 아래 작업을 해요.
  individualCheckboxes.forEach((checkbox) => {
    // 전체 동의 체크박스가 체크되어 있으면 개별 체크박스들도 모두 체크하고,
    // 전체 동의 체크박스가 체크 해제되어 있으면 개별 체크박스들도 모두 체크 해제해요.
    checkbox.checked = allAgree.checked;
  });
});

// 개별 동의 체크박스 각각에 대해 아래 작업을 해요.
individualCheckboxes.forEach((checkbox) => {
  // 개별 체크박스가 변경되었을 때 실행돼요.
  checkbox.addEventListener("change", () => {
    // 모든 개별 체크박스들이 다 체크되어 있는지 확인해요.
    // 하나라도 체크 안 되어 있으면 false가 돼요.
    const allChecked = [...individualCheckboxes].every((chk) => chk.checked);

    // 만약 모든 개별 체크박스가 체크되어 있으면 전체 동의도 체크하고,
    // 아니면 전체 동의 체크박스는 체크 해제해요.
    allAgree.checked = allChecked;
  });
});
