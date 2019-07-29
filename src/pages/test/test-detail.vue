<template>
  <div>

    <Exam></Exam>
    <!-- 旧代码 -->
    <div
      class="test-detail"
      v-if="false"
    >
      <div class="test-header">
        <h3>上海市中考一模拟卷：数学</h3>
        <span>{{activeIndex + 1}}/{{slideList.length}}</span>
      </div>
      <count-down
        v-if="countVisible"
        :minutes="'1'"
        :type="'bg'"
      ></count-down>
      <swiper
        ref="mySwiper"
        class="swiper-wrapper"
        :options="swiperOption"
        @someSwiperEvent="callback($event)"
      >
        <!-- slides -->
        <swiper-slide
          v-for="(item) in slideList"
          :key="item.id"
        >{{item.title}}</swiper-slide>
        <!-- Optional controls -->
        <!-- <div
        class="swiper-pagination"
        slot="pagination"
      ></div> -->
        <!-- <div
        class="swiper-button-prev"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next"
        slot="button-next"
      ></div>
      <div
        class="swiper-scrollbar"
        slot="scrollbar"
      ></div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
import {
  /* eslint-disable no-unused-vars */
  Style,
  Dialog,
  createAPI
} from 'cube-ui'
import Exam from '../../components/exam1.vue'
import countDown from './count-down'
export default {
  components: {
    Exam,
    countDown
  },
  data () {
    return {
      countVisible: false,
      customIndex: 1,
      activeIndex: 0,
      imgs: [
        'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
        'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
        'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg',
        'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0m3ufuj21hc0zkqbj.jpg'
      ],
      slideList: [
        {
          id: 1,
          title: '11',
          url: 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg'
        },
        {
          id: 2,
          title: '22',
          url: 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg'
        }, {
          id: 3,
          title: '33',
          url: 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg'
        },
        {
          id: 4,
          title: '44',
          url: 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0m3ufuj21hc0zkqbj.jpg'
        }],
      swiperOption: {
        speed: 500, // 切换速度，即slider自动滑动开始到结束的时间（单位ms）
        loop: true, // 循环切换
        grabCursor: true, // 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, // 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true, // 设置为true时，能使用鼠标滚轮控制slide滑动
        observeParents: true, // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        onSlideChangeStart: swiper => {
          // 这个位置放swiper的回调方法
          console.log('swiper=', swiper)
          alert(11)
        },
        on: {
          slideChangeTransitionEnd: (e) => {
            console.log('e===', this.$refs.mySwiper.swiper)
            this.activeIndex = this.$refs.mySwiper.swiper && this.$refs.mySwiper.swiper.realIndex
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.showAlert()
  },
  methods: {
    showAlert () {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '请输入姓名后测试',
        prompt: {
          value: '',
          placeholder: '请输入姓名'
        },
        onConfirm: (e, promptValue) => {
          // this.$createToast({
          //   type: 'warn',
          //   time: 1000,
          //   txt: `Prompt value: ${promptValue || ''}`
          // }).show()
          this.countVisible = true
          // this.showCustomImagePreview()
        }
      }).show()
    },
    callback (res) {
      console.log('res=', res)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.z-home .cube-scroll-content {
  display: inline-block;
}
.swiper-container {
  height: calc(100vh);
}
.swiper-button-prev {
  position: absolute;
  bottom: 0;
}
.swiper-button-next {
  position: absolute;
  bottom: 0;
}
.test-detail {
  .test-header {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: px2rem(16px);
    }
  }
}
</style>
