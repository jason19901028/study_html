<template>
  <div class="collect">
    <div class="header">
      <span>我的收藏</span>
      <img
        src="../../assets/back.png"
        alt=""
        class="back"
        @click="goBack"
      >
    </div>
    <div class="main">
      <ul>
        <li>
          <div>
            <div class="video-item">
              <div class="video-item-content">
                <img
                  src=""
                  alt=""
                >
                <div class="video-item-bottom">
                  <span class="curriculum-title">title</span>
                </div>
              </div>
            </div>
            <div class="curriculum-bottom clearfix">
              <div class="teacher left">
                <img
                  src=""
                  alt=""
                >
                <span>ticher</span>
              </div>
              <div class="right">
                <span>2019-07-10</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { storeInfo } from 'api/study'
export default {
  name: 'collect',
  data () {
    return {
      studentId: ''
    }
  },
  mounted () {
    this.studentId = window.localStorage.getItem('studentId')
    this.getStoreInfo()
  },
  methods: {
    getStoreInfo () {
      storeInfo(this.studentId).then((res) => {
        console.log('collect=', res)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.collect {
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
  .main {
    .video-item {
      height: px2rem(522.5px);
      background-color: #9370db;
      .video-item-content {
        height: px2rem(522.5px);
        position: relative;
        img {
          display: block;
          height: px2rem(522.5px);
          width: 100%;
        }
      }
      .video-item-bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: px2rem(24px);
        height: px2rem(50px);
        line-height: px2rem(50px);
        background-color: rgba(98, 98, 100, 0.5);
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
</style>
