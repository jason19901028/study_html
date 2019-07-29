<template>
  <div class="error-reponse">
    <div class="header">
      <span>错题库</span>
      <img
        src="../../assets/back.png"
        alt=""
        class="back"
        @click="goBack"
      >
    </div>
  </div>
</template>

<script>
import { errorList } from 'api/study'
export default {
  name: 'error-reponse',
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getErrorList () {
      errorList(5).then((res) => {
        console.log('error======', res)
      })
    }
  },
  mounted () {
    this.getErrorList()
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.error-reponse {
  .header {
    padding: px2rem(30px) (20px);
    position: relative;
    font-size: px2rem(32px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .back {
      position: absolute;
      left: px2rem(20px);
      width: px2rem(18px);
      height: px2rem(33px);
    }
  }
}
</style>
