<template>
  <div class="curriculum-detail">
    <!-- <video
      id="vd"
      width="352"
      height="264"
      controls
      autobuffer
    >
      <source
        src="../../../static/girl.mp4"
        type="video/mp4"
      >
    </video> -->
    <div
      style="height: 264px"
      :id="playerId"
    >

    </div>
    <div class="curriculum-top clearfix">
      <div class="teacher left">
        <!-- <img
          src=""
          alt=""
        > -->
        <span>{{this.videoDetail && this.videoDetail.nickname || ''}}</span>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="teacher-intruduce">
      <!-- <span>刘老师简介刘老师简介刘老师简介刘老师简介刘老师简介刘老师简介刘老师简介</span> -->
    </div>
    <div class="curriculum-intruduce">
      <span>
        {{this.videoDetail && this.videoDetail.intro}}
      </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { videoDetail } from 'api/study'
import { setToken, setTag, setVideo } from '@/utils/auth'
export default {
  name: 'curriculum-detail',
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
      id: null,
      playerId: 'player-id',
      inplayer: null,
      videoDetail: {},
      code: '',
      tag: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.code = this.$route.query.code || ''
    this.tag = this.$route.query.tag || ''
    let circulation = this.$route.params.circulation
    setVideo(this.id)
    // debugger
    setTag(this.tag)
    setToken(this.code)
    window.localStorage.setItem('videoId', this.id)
    if (circulation) {
      var local = 'http://wap.kaoya.vip'
      var appid = 'wxb7d09a052984168c'
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      return
    }
    if (this.code) {
      this.getVideoDetail()
    }
    this.$eventBus.$on('video-detail', (params) => {
      playerId: `player-${params.id}`
      this.code = params.code
      // debugger
      this.getVideoDetail()
    })
  },
  methods: {
    getVideoDetail () {
      videoDetail(this.id, this.code).then((res) => {
        console.log('res============视频', res)
        if (res.data.code === 411) {
          this.$router.push('/404')
          return
        }
        this.videoDetail = res.data.data
        this.lazyinit()
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
            this.initPlayer()
          } else {
            //未加载完成等待加载完成后初始化我们的播放器
            inPlayerScriptTag.addEventListener("load", () => {
              this.initPlayer();
            });
          }
        }
      } else {
        console.log("全局实例存在直接初始化播放器");
        this.initPlayer();
      }
    },
    //播放器初始化
    initPlayer () {
      // const player_height = 100 / this.reaio;
      this.$nextTick(() => {
        //判断播放器实例是否存在
        if (!this.inplayer) {
          let obj = {
            id: this.playerId,
            // userH5Prism: this.userH5Prism,
            // vid: this.vid,
            // playauth: this.playauth,
            source: this.videoDetail && this.videoDetail.playUrl,
            vid: this.videoDetail && this.videoDetail.videoId,
            cover: this.videoDetail && this.videoDetail.coverUrl,
            // rePlay: this.rePlay,
            // autoplay: this.autoplay,
            // width: this.width,
            // heigth: `${player_height}vw`,
          }
          this.inPlayer = new Aliplayer(obj);
        } else {
          this.inPlayer.dispose();
          // 将播放器实例重置
          this.inPlayer = null;
          // 清空播放器 DOM 内容
          document.getElementById(this.playerId).innerHTML = "";
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
.curriculum-detail {
  padding: px2rem(20px);
  .curriculum-top {
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
  .teacher-intruduce {
    font-size: px2rem(36px);
  }
  .curriculum-intruduce {
    margin-top: px2rem(20px);
    font-size: px2rem(36px);
  }
}
</style>
