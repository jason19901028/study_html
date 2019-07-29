<template>
  <div class="user-warper">
    <div class="user-head">
      <img
        src=""
        alt=""
        class="avtar"
      >
      <div class="user-head-content">
        <h3>Label</h3>
        <p>Lorem ipsum dolor sit </p>
        <p>amet, consectetur</p>
      </div>
    </div>
    <div class="user-content ">
      <ul>
        <li
          class="clearfix"
          v-for="(item, index) in userInfo"
          :key="index"
          @click="goInto(item)"
        >
          <span class="left">{{item.title}}</span>
          <span class="more right"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      userInfo: [
        {
          title: '个人信息'
        },
        {
          title: '我的收藏'
        },
        {
          title: '历史测试'
        },
        {
          title: '错题库'
        }
      ]
    }
  },
  methods: {
    goInto (item) {
      this.$router.push({ name: item.title })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.user-warper {
  .user-head {
    height: px2rem(200px);
    background: #7b68ee;
    padding-left: px2rem(50px);
    display: flex;
    align-items: center;
    flex-direction: row;
    .avtar {
      flex: 0 0 px2rem(120px);
      width: px2rem(120px);
      height: px2rem(120px);
      border-radius: 50%;
      background-color: #fff;
    }
    .user-head-content {
      margin-left: px2rem(30px);
      display: flex;
      flex-direction: column;
      h3 {
        font-size: px2rem(36px);
      }
      p {
        font-size: px2rem(24px);
      }
    }
  }
  .user-content {
    padding: 0 px2rem(50px);
    ul li {
      // display: flex;
      // justify-content: space-between;
      padding: px2rem(30px) 0;
      border-bottom: px2rem(1px) solid #f0f0f0;
      span {
        font-size: px2rem(36px) !important;
      }
      span:last-child {
        right: 5%;
      }
    }
  }
}
</style>
