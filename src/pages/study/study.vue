<template>
  <div class="study-wraper">
    <!-- <div class="search-wraper">
      <i-input
        v-model="searchKey"
        class="search-input"
        placeholder="搜索课程/试题"
      >
        <i
          slot="prepend"
          class="search"
        ></i>
      </i-input>
    </div> -->
    <!-- <div class="nav">
      <span>首页</span>
    </div> -->
    <div class="banner">
      <div class="search-wraper">
        <i-input
          v-model="searchKey"
          class="search-input"
          placeholder="搜索课程"
        >
          <i
            slot="prepend"
            class="search"
          ></i>
        </i-input>
      </div>
      <ic-slider
        :autoplay="3000"
        class="ic-slider"
      >
        <ic-slider-item
          v-for="items in (formData.data && formData.data.bannerList)"
          :key="items.id"
        >
          <img
            :src="items.url"
            style="width:100%;height:inherit;"
          />
        </ic-slider-item>
      </ic-slider>
    </div>
    <div class="classify-wraper">
      <ul class="classify">
        <li>
          <img
            src="~images/study/chinese.png"
            alt=""
          >
          <span>语文</span>
        </li>
        <li>
          <img
            src="~images/study/mathematics.png"
            alt=""
          >
          <span>数学</span>
        </li>
        <li>
          <img
            src="~images/study/english.png"
            alt=""
          >
          <span>英语</span>
        </li>
        <li>
          <img
            src="~images/study/physics.png"
            alt=""
          >
          <span>物理</span>
        </li>
        <li>
          <img
            src="~images/study/all.png"
            alt=""
          >
          <span>全部</span>
        </li>
      </ul>
    </div>
    <div class="video-content">
      <h2 class="title-wraper clearfix">
        <span class="title left">课程讲解</span>
        <span
          class="more more-title right"
          @click="moreCourse"
        >更多</span>
      </h2>
      <div class="video-list clearfix">
        <!-- <div class="video-item">
          <div class="video-item-content">

          </div>
          <div class="video-item-bottom">
            <span>摩擦力的放向</span>
          </div>
        </div> -->
        <div
          class="video-item left"
          v-for="(item, index) in videoList"
          :key="index"
          @click="goDetail(item)"
        >
          <div class="video-item-content prism-player">
            <img
              style="width:100%;"
              :src="item.coverUrl"
              alt=""
            >
            <!-- <ali-player source="//player.alicdn.com/video/editor.mp4"></ali-player> -->
            <!-- <ali-player
              aliplayerSdkPath="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"
              :source="item.playUrl"
              :vid="item.videoId"
              ref="player"
            ></ali-player> -->
          </div>
          <div class="video-item-bottom">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="video-list">
        <div class="video-item">
          <div class="video-item-content">

          </div>
          <div class="video-item-bottom">
            <span>摩擦力的放向</span>
          </div>
        </div>
        <div class="video-item">
          <div class="video-item-content">

          </div>
          <div class="video-item-bottom">
            <span>摩擦力的放向</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="practice">
      <h2
        class="title-wraper clearfix"
        style="border-bottom: 1px solid #eeeeee;"
      >
        <span class="title left">专项练习</span>
        <span
          class="more more-title right"
          @click="moreTest"
        >更多</span>
      </h2>
      <div class="practice-content">
        <cube-scroll>
          <cube-swipe
            @item-click="onItemClick"
            :data="testData"
          >
          </cube-swipe>
        </cube-scroll>
      </div>
      <!-- <ul class="practice-content">
        <li></li>
      </ul> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import { Aliplayer } from './aliplayer'
import IcSlider from './vue-better-slider/components/slider'
import IcSliderItem from './vue-better-slider/components/slider-item'
import { home } from 'api/study.js'
// import VueAliplayer from 'vue-aliplayer'
export default {
  name: 'study',
  components: {
    IcSlider,
    IcSliderItem
    // 'ali-player': VueAliplayer
  },
  props: {
    jsPath: {
      type: String,
      default: "https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"
    },
    cssPath: {
      type: String,
      default: "https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css"
    }
  },
  data () {
    return {
      searchKey: '',
      formData: {},
      videoList: [],
      inPlayer: null,
      playerIdArray: [], //保证播放器的唯一性,
      testData: [
        {
          item: {
            text: '测试1',
            value: 1
          }
        }
      ],
      images: [
        {
          linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
          /* eslint-disable */
          picUrl: "../../../static/banner.png",
          id: 11351
        },
        {
          linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
          picUrl: '../../../static/course-banner.png',
          id: 11372
        },
        {
          linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
          id: 11378
        },
        {
          linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
          id: 11375
        },
        {
          linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian',
          picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
          id: 11287
        }
      ]
    }
  },
  methods: {
    onItemClick (item) {
      console.log('item=', item)
    },
    getHome () {
      home().then((res) => {
        console.log('res==', res)
        if (res.status === 200) {
          this.formData = res.data
          console.log('res.data=', res.data.data)
          this.videoList = res.data.data.videoList
          // this.lazyinit()
          // var player = new Aliplayer({
          //   id: "player-con",
          //   source: "//player.alicdn.com/video/editor.mp4",
          //   width: "100%",
          //   height: "500px",
          //   cover: 'https://img.alicdn.com/tps/TB1EXIhOFXXXXcIaXXXXXXXXXXX-760-340.jpg',
          //   /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
          //   autoplay: false,
          //   preload: false,
          //   isLive: false,
          //   language: "en-us"
          // }, function (player) {
          //   console.log("The player is created");
          // });
          window.localStorage.setItem('iconList', JSON.stringify(res.data.data.iconList))

        }
      })
    },
    moreCourse () {
      this.$router.push({ name: '课程', query: { itag: 'video' }, params: { circulation: true } })
    },
    moreTest () {
      this.$router.push({ name: '测试' })
    },
    lazyinit () {
      if (!window.Aliplayer) {
        //尝试一下获取我们引入的js的标签
        let inPlayerScriptTag = document.getElementById("inPlayerScriptTag");

        if (!inPlayerScriptTag) {
          // 不存在则创建 JS 标签
          inPlayerScriptTag = document.createElement("script");
          inPlayerScriptTag.type = "text/javascript";
          inPlayerScriptTag.src = this.jsPath;
          inPlayerScriptTag.id = "inPlayerScriptTag";

          // JS 不存在说明 CSS 也不存在，则创建 CSS 标签
          let inPlayerLinkTag = document.createElement("link");
          inPlayerLinkTag.type = "text/css";
          inPlayerLinkTag.rel = "stylesheet";
          inPlayerLinkTag.href = this.cssPath;

          // 获取页面的 <head> 标签,将JS和CSS插入到DOM中
          let head = document.getElementsByTagName("head")[0];
          head.appendChild(inPlayerScriptTag);
          head.appendChild(inPlayerLinkTag);

          if (inPlayerScriptTag.loaded) {
            //js插入并且加载完成了，初始化我们的播放器
            this.videoList.forEach((element, index) => {
              this.playerIdArray[index] = `playerid-${index}`
              this.initPlayer(element, index)
            })
          } else {
            //未加载完成等待加载完成后初始化我们的播放器
            inPlayerScriptTag.addEventListener("load", () => {
              // this.initPlayer();
              this.videoList.forEach((element, index) => {
                this.playerIdArray[index] = `playerid-${index}`
                this.initPlayer(element, index)
              })
            });
          }
        }
      } else {
        console.log("全局实例存在直接初始化播放器");
        // this.initPlayer();
        this.videoList.forEach((element, index) => {
          this.playerIdArray[index] = `playerid-${index}`
          this.initPlayer(element, index)
        })
      }
    },
    initPlayer (element, index) {
      this.$nextTick(() => {
        //判断播放器实例是否存在
        if (!this.inplayer) {
          let obj = {
            id: this.playerIdArray[index],
            // userH5Prism: this.userH5Prism,
            source: element.playUrl,
            vid: element.videoId,
            cover: element.coverUrl,
            width: '100%'
          }
          this.inPlayer = new Aliplayer(obj);
        } else {
          this.inPlayer.dispose();
          // 将播放器实例重置
          this.inPlayer = null;
          // 清空播放器 DOM 内容
          document.getElementById(this.playerIdArray[index]).innerHTML = "";
          // 再次初始化
          this.initPlayer();
        }
      })
    },
    goDetail (item) {
      this.$router.push({ name: '课程详情', query: { id: item.id } })
    }
  },
  mounted () {
    this.getHome()
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.study-wraper {
  // padding-top: px2rem(56px);
}
.nav {
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  height: px2rem(56px);
  line-height: px2rem(56px);
  font-size: px2rem(36px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  background-color: #ffffff;
  // span {
  //   transform: translateX(-50%);
  //   width: 100%;
  // }
}
.search-wraper {
  // background-color: #7b68ee;
  // padding: px2rem(10px) px2rem(40px);
  font-size: px2rem(36px);
  position: absolute;
  left: px2rem(30px);
  right: px2rem(30px);
  top: 10px;
  .search-input {
    height: px2rem(60px);
    position: relative;
    z-index: 99999;
  }
  .search {
    display: block;
    height: px2rem(30px);
    width: px2rem(24px);
    background: url("~images/study/serach.png");
    background-size: 100%;
    margin-right: px2rem(20px);
    margin-left: px2rem(20px);
    margin-top: px2rem(8px);
    position: relative;
    z-index: 99999;
  }
  .ic-slider {
    height: inherit;
    width: 100%;
  }
}
.banner {
  // background-color: #7b68ee;
  height: px2rem(410px);
  position: relative;
  // margin-top: px2rem(56px);
}
.classify-wraper {
  padding: px2rem(10px) px2rem(20px);
  .classify {
    display: flex;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 px2rem(10px);
      img {
        height: px2rem(75px);
        width: px2rem(75px);
        background-color: #ffffff;
        border-radius: 50%;
      }
      span {
        margin-top: px2rem(10px);
        font-size: px2rem(24px);
      }
    }
  }
}
.title-wraper {
  // margin-top: px2rem(10px);
  padding: px2rem(30px) px2rem(20px);
  .more-title {
    font-size: px2rem(36px);
    color: #999;
    margin-right: px2rem(20px);
  }
}
.video-content {
  border-top: px2rem(20px) solid #eeeeee;
  border-bottom: px2rem(20px) solid #eeeeee;
  .video-list {
    // display: flex;
    // justify-content: space-between;
    padding-left: px2rem(20px);
    padding-bottom: px2rem(20px);
    // flex-wrap: wrap;
    .video-item {
      // flex: 0 0 48%;
      height: px2rem(270px);
      margin-right: px2rem(10px);
      width: 48%;
      background-color: #eeeeee;
      position: relative;
      margin-bottom: px2rem(10px);
      img {
        display: block;
        height: px2rem(270px);
        background-size: 100%;
      }
      // .video-item-content {
      //   height: px2rem(150px);
      // }
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
    // .video-item:first-child {
    //   margin-right: px2rem(10px);
    // }
  }
  .video-list:first-child,
  .video-list:last-child {
    padding-top: 0 !important;
    padding-bottom: px2rem(20px);
  }
}
.practice {
  padding: px2rem(10px);
  .practice-content {
    li {
      border-bottom: px2rem(1px) solid #7b68ee;
    }
  }
}
</style>
<style lang="scss">
@import "~styles/index.scss";
// .search-wraper .ivu-input-group .ivu-input {
//   height: px2rem(60px) !important;
// }
.search-wraper .ivu-input {
  height: px2rem(60px);
  border: none;
  border-radius: 20px;
}
.search-wraper .ivu-input-group-append,
.ivu-input-group-prepend {
  background-color: #fff;
  border: none;
  border-radius: 20px;
}
</style>


