<template>
  <div class="error-wraper">
    <!-- <img
      src="../../../static/WechatIMG8.png"
      alt=""
    > -->
    <div class="header"><span>请关注后查看</span></div>
    <div class="wx-code">
      <img
        src="../../assets/images/study/WechatIMG8.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-fount'
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.error-wraper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: px2rem(500px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    font-size: px2rem(36px);
    font-weight: 600;
    color: #f00;
  }
  .wx-code {
    width: 100%;
    height: px2rem(562px);
    img {
      display: block;
      width: 100%;
      height: inherit;
    }
  }
}
</style>
