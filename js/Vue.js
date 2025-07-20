const app = Vue.createApp({
  data() {
    return {
      price: "",
    };
  },
  methods: {
    formatPrice(e) {
      // 숫자만 남기고 콤마 제거
      let value = e.target.value.replace(/[^0-9]/g, "");
      // 3자리마다 콤마 추가
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.price = value;
    },
  },
});
app.mount("#app");
