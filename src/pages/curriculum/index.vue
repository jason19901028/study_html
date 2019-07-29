<template>
  <div class="curriculum-wraper">
    <nav-bar
      :navList="iconList"
      @on-nav="onNav"
    ></nav-bar>
    <ul>
      <li
        v-for="(content, index) in curriculumData"
        :key="index"
      >
        <div>
          <div
            class="video-item"
            @click="goCurriculumDetail(content)"
          >
            <div class="video-item-content">
              <img
                :src="content.coverUrl"
                alt=""
              >
              <div class="video-item-bottom">
                <span class="curriculum-title">{{content.title}}</span>
              </div>
            </div>
          </div>
          <div class="curriculum-bottom clearfix">
            <div class="teacher left">
              <img
                src=""
                alt=""
              >
              <span>{{content.teacher}}</span>
            </div>
            <div class="right">

            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import navBar from '@/components/nav-bar'
import { videoList } from 'api/study'
export default {
  name: 'curriculum',
  components: {
    navBar
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
      activeIndex: 0,
      iconList: [],
      inPlayer: null,
      curriculumId: 1,
      code: '',
      playerIdArray: [], //保证播放器的唯一性,
      curriculums: [
        {
          title: '语文'
        },
        {
          title: '数学'
        },
        {
          title: '英语'
        },
        {
          title: '物理'
        }
      ],
      curriculumData: [
        {
          title: '摩擦力的方向讲解摩擦力的方向讲解摩擦力',
          teacher: '刘老师',
          enshrine: 0
        },
        {
          title: '摩擦力的方向讲解摩擦力的方向讲解摩擦力',
          teacher: '张老师',
          enshrine: 1
        },
        {
          title: '摩擦力的方向讲解摩擦力的方向讲解摩擦力',
          teacher: '孙老师',
          enshrine: 1
        },
        {
          title: '摩擦力的方向讲解摩擦力的方向讲解摩擦力',
          teacher: '王老师',
          enshrine: 0
        }
      ]
    }
  },
  mounted () {
    this.code = window.localStorage.getItem('code')
    this.iconList = JSON.parse(window.localStorage.getItem('iconList'))
    console.log('this.iconList=', this.iconList)
    this.getvVideoList()
    // const xhr = new XMLHttpRequest()
    // xhr.onreadystatechange = function () {
    //   if (this.readyState === 4) {
    //     if (this.status === 200) {
    //       const res = this.response || this.responseText
    //       // type 里的类型瞎猜的。。
    //       const blob = new Blob([res], { type: 'video/mp4' })
    //       const blobUrl = URL.createObjectURL(blob)
    //       document.querySelector('#vd').src = blobUrl
    //     }
    //   }
    // }
  },
  methods: {
    onNav (params) {
      this.activeIndex = params.index
      console.log('params=', params)
      this.curriculumId = params.item.id
      this.getvVideoList()
    },
    goCurriculumDetail (item) {
      this.$router.push({ name: '课程详情', query: { id: item.id, code: this.code, tag: 'video' }, params: { circulation: true } })
    },
    getvVideoList () {
      let params = {
        curriculumId: this.curriculumId
      }
      videoList(params.curriculumId).then((res) => {
        console.log('resList=', res)
        this.curriculumData = res.data.data
        // this.lazyinit()
      })
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
            this.curriculumData.forEach((element, index) => {
              this.playerIdArray[index] = `playerid-${index}`
              this.initPlayer(element, index)
            })
          } else {
            //未加载完成等待加载完成后初始化我们的播放器
            inPlayerScriptTag.addEventListener("load", () => {
              // this.initPlayer();
              this.curriculumData.forEach((element, index) => {
                this.playerIdArray[index] = `playerid-${index}`
                this.initPlayer(element, index)
              })
            });
          }
        }
      } else {
        console.log("全局实例存在直接初始化播放器");
        // this.initPlayer();
        this.curriculumData.forEach((element, index) => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.curriculum-wraper {
  padding: px2rem(20px);
  .curriculum-title {
    font-size: px2rem(36px);
  }
  .curriculum-bottom {
    .teacher {
      img {
        display: inline-block;
        width: px2rem(50px);
        height: px2rem(50px);
        background: #7b68ee;
        border-radius: 50%;
      }
      span {
        vertical-align: middle;
        font-size: px2rem(35px);
      }
    }
  }
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
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
