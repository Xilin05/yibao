​
<template>
  <div id="goTop">
    <div class="goTop" v-show="goTopShow" @click="goTop">
      <van-icon color="white" size="1.3rem" name="arrow-up" />
    </div>
  </div>
</template>
<script>
export default {
  name: "goTop",
  data() {
    return {
      scrollTop: "",
      goTopShow: false,
    };
  },
  watch: {
    scrollTop(val) {
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.goTop {
  position: fixed;
  right: 10px;
  bottom: 60px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background: #fff; */
  background-image: linear-gradient(135deg, #aadcff 10%, #0396ff 100%);
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 8px 0px #a5a5a5;
  transition: 0.3s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .goTop:hover .goTopIcon {
  color: rgba(51, 153, 255, 1);
} */
/* .goTopIcon {
  font-size: 20px;
  color: rgba(51, 153, 255, 0.8);
} */
</style>

​
