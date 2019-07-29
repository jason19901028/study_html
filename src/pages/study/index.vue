<template>
  <div class="study-wraper">
    <!-- <study v-if="activeIndex === 0"></study> -->
    <!-- <curriculum v-if="activeIndex === 1"></curriculum>
    <test v-if="activeIndex === 2"></test>
    <user v-if="activeIndex === 3"></user> -->
    <router-view class="content">
    </router-view>
    <div class="study-footer">
      <ul>
        <li
          v-for="(item, index) in myContent"
          :key="index"
          @click="changeContent(item.title, index)"
        >
          <!-- <div :class="{'active': activeIndex === index}"></div> -->
          <div
            v-if="index === 0"
            :class="['img-prc', activeIndex === 0 ? 'home-active' : 'home']"
          ></div>
          <div
            v-if="index === 1"
            :class="['img-prc',  activeIndex === 1 ? 'course-active' : 'course']"
          ></div>
          <div
            v-if="index === 2"
            :class="['img-prc',  activeIndex === 2 ? 'test-active' : 'test']"
          ></div>
          <div
            v-if="index === 3"
            :class="['img-prc',  activeIndex === 3 ? 'user-active' : 'user']"
          ></div>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { setToken } from '@/utils/auth'
import study from '@/pages/study/study'
import curriculum from '@/pages/curriculum'
import test from '@/pages/test'
import user from '@/pages/user'
export default {
  name: 'index',
  components: {
    study,
    curriculum,
    test,
    user
  },
  data () {
    return {
      searchKey: '',
      activeIndex: 0,
      myContent: [
        { title: '首页', src: '~images/study/home.png' },
        { title: '课程', src: '~images/study/course.png' },
        { title: '试题', src: '~images/study/test.png' },
        { title: '我的', src: '~images/study/user.png' }
      ]
    }
  },
  mounted () {
    // setToken('123')
  },
  methods: {
    changeContent (name, index) {
      console.log('index=', index)
      this.activeIndex = index
      this.$router.push({ name: name, query: { id: 1 } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.study-wraper {
  padding-bottom: px2rem(120px);
  .content {
    // height: calc(100% + 60);
    // padding-bottom: px2rem(60px);
  }
  .study-footer {
    border-top: px2rem(1px) solid #363636;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 1);
    padding: px2rem(10px) 0;
    ul {
      display: flex;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 px2rem(10px);
        .img-prc {
          display: block;
          width: px2rem(75px);
          height: px2rem(75px);
          border-radius: 50%;
          background-color: #ccc;
        }
        .home {
          background: url("~images/study/home.png");
          background-size: 100%;
        }
        .home-active {
          background: url("~images/study/home-active.png");
          background-size: 100%;
        }
        .course {
          background: url("~images/study/course.png");
          background-size: 100%;
        }
        .course-active {
          background: url("~images/study/course-active.png");
          background-size: 100%;
        }
        .test {
          background: url("~images/study/test.png");
          background-size: 100%;
        }
        .test-active {
          background: url("~images/study/test-active.png");
          background-size: 100%;
        }
        .user {
          background: url("~images/study/user.png");
          background-size: 100%;
        }
        .user-active {
          background: url("~images/study/user-active.png");
          background-size: 100%;
        }
        .active {
          background-color: #7b68ee;
        }
        span {
          margin-top: px2rem(10px);
          font-size: px2rem(36px);
        }
      }
    }
  }
}
</style>
