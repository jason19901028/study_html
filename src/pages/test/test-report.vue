<template>
  <div class="test-report-wraper">
    <div class="test-report-header">
      <div class="nav-tav">
        <div
          @click="changeTab(0)"
          :class="activeIndex === 0? 'active' : ''"
        >排名</div>
        <div
          @click="changeTab(1)"
          :class="activeIndex === 1? 'active' : ''"
        >答案</div>
      </div>
    </div>
    <div
      class="test-report-ranking"
      v-if="activeIndex === 0"
    >
      <div class="test-report-score">
        <!-- <div class="score">
          <span>85分</span>
        </div> -->
        <!-- <CircleProgress
          :id="id"
          :width="300"
          :radius="20"
          :progress="30"
          :isAnimation="true"
          backgroundColor="#fff"
        ></CircleProgress> -->
        <i-circle
          :percent="80"
          stroke-color="#60ecbd"
        >
          <div
            class="ranking-circle"
            style="color:#60ecbd;"
          >
            <span>
              80分
            </span>
            <span>平均分数</span>
          </div>
        </i-circle>
      </div>
      <div class="test-main">
        <ul>
          <li>
            <img
              src=""
              alt=""
              class="icon"
            >
            <img
              src=""
              alt=""
              class="avatar"
            >
            <div class="user-info">
              <span>小王</span>
              <span>上海浦东8年级</span>
            </div>
            <span class="score">90</span>
          </li>
          <li>
            <img
              src=""
              alt=""
              class="icon"
            >
            <img
              src=""
              alt=""
              class="avatar"
            >
            <div class="user-info">
              <span>小王</span>
              <span>上海浦东8年级</span>
            </div>
            <span class="score">90</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="test-report-answer"
      v-if="activeIndex === 1"
    >
      <div class="test-report-score">
        <i-circle
          :percent="80"
          stroke-color="#77e3e2"
          :size="80"
        >
          <div
            class="answer-circle"
            style="color:#77e3e2;"
          >
            <span>
              80分
            </span>
            <span>我的分数</span>
          </div>
        </i-circle>
        <i-circle
          :percent="66"
          stroke-color="#16c572"
          :size="80"
        >
          <div
            class="answer-circle"
            style="color:#16c572;"
          >
            <span>
              66分
            </span>
            <span>平均分数</span>
          </div>
        </i-circle>
        <i-circle
          :percent="89"
          stroke-color="#fdb954"
          :size="80"
        >
          <div
            class="answer-circle"
            style="color:#fdb954;"
          >
            <span>
              89分
            </span>
            <span>最高分数</span>
          </div>
        </i-circle>
      </div>
      <div class="answer-wraper">
        <ul>
          <li>
            <div
              class="answer-header"
              @click="answerSpread(0)"
            >
              <div>
                <span>1.</span>
                <span class="correct-color">B</span>
              </div>
              <div>
                <span class="iconfont icon-unie635 correct-color"></span>
                <span
                  class="iconfont icon-ico_arrows_unfold"
                  v-if="!answerIndex[0]"
                ></span>
                <span
                  class=" iconfont icon-quanxianfuzhi"
                  v-else
                ></span>
              </div>
            </div>
            <div
              class="answer-options"
              v-if="answerIndex[0]"
            >
              <div class="answer-item">
                <div :class="['answer-title', answerClass(0)]">
                  <span>A</span>
                </div>
                <div class="answer-progress-wraper">
                  <div
                    :class="['answer-progress', answerClass(0)]"
                    :style="{width: `20%`}"
                  >
                    <div :style="{width: `20%`, backgroundColor: '#00f'}"></div><span class="answer-progress-after">20%</span>
                  </div>
                </div>
              </div>
              <div class="answer-item">
                <div :class="['answer-title', answerClass(1)]">
                  <span>B</span>
                </div>
                <div class="answer-progress-wraper">
                  <div
                    :class="['answer-progress', answerClass(1)]"
                    :style="{width: `20%`}"
                  >
                    <div :style="{width: `20%`}"></div><span class="answer-progress-after">20%</span>
                  </div>
                </div>
              </div>
              <div class="answer-item">
                <div :class="['answer-title', answerClass(0)]">
                  <span>C</span>
                </div>
                <div class="answer-progress-wraper">
                  <div
                    :class="['answer-progress', answerClass(0)]"
                    :style="{width: `50%`}"
                  >
                    <div :style="{width: `50%`}"></div><span class="answer-progress-after">50%</span>
                  </div>
                </div>
              </div>
              <div class="answer-item">
                <div :class="['answer-title', answerClass(0)]">
                  <span>C</span>
                </div>
                <div class="answer-progress-wraper">
                  <div
                    :class="['answer-progress', answerClass(0)]"
                    :style="{width: `10%`}"
                  >
                    <div :style="{width: `10%`, backgroundColor: '#00f'}"></div><span class="answer-progress-after">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-report',
  data () {
    return {
      activeIndex: 0,
      answerIndex: [false]
    }
  },
  methods: {
    changeTab (index) {
      this.activeIndex = index
    },
    answerSpread (index) {
      this.$set(this.answerIndex, `${index}`, !this.answerIndex[`${index}`])
    },
    answerClass (flag) {
      let classAnswer = ''
      switch (flag) {
        case -1:
          classAnswer = 'error'
          break
        case 1:
          classAnswer = 'success'
          break
        default:
          classAnswer = 'other'
      }
      return classAnswer
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.test-report-wraper {
  padding: 0 px2rem(30px);
  .test-report-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    .nav-tav {
      width: px2rem(440px);
      height: px2rem(68px);
      display: flex;
      .active {
        background-color: #ff9722;
        color: #fff;
      }
      div {
        flex: 1;
        border: 1px solid #ff9722;
        font-size: px2rem(32px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        color: #ff9722;
      }
      // div:first-child {
      //   background-color: #ff9722;
      //   color: #fff;
      // }
      // div:last-child {
      //   background-color: #fff;
      //   color: #ff9722;
      // }
    }
  }
  .test-report-ranking {
    .test-report-score {
      display: flex;
      // justify-content: center;
      justify-content: space-around;
      align-items: center;
      .score {
        flex: 0 0 px2rem(150px);
        // width: px2rem(150px);
        height: px2rem(150px);
        border-radius: 50%;
        border: 5px solid #7dfaa5;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: px2rem(56px);
      }
    }
    .ranking-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      span:first-child {
        font-size: px2rem(36px);
      }
      span:last-child {
        font-size: px2rem(24px);
      }
    }
    .test-main {
      // display: flex;
      ul {
        li {
          display: flex;
          align-items: center;
          background-color: #f6f9fa;
          margin-top: px2rem(20px);
          .icon {
            width: px2rem(60px);
            height: px2rem(60px);
            margin-right: px2rem(30px);
            background-color: #f00;
          }
          .avatar {
            width: px2rem(90px);
            height: px2rem(90px);
            background-color: #00f;
            border-radius: 50%;
          }
          .user-info {
            flex: 0 0 60%;
            display: flex;
            flex-direction: column;
          }
        }
        li:last-child {
          // margin: 0;
        }
      }
    }
  }
  .test-report-answer {
    .test-report-score {
      display: flex;
      // justify-content: center;
      justify-content: space-around;
      align-items: center;
      .answer-circle {
        display: flex;
        flex-direction: column;
        align-items: center;
        span:first-child {
          font-size: px2rem(36px);
        }
        span:last-child {
          font-size: px2rem(24px);
        }
      }
    }
    .answer-wraper {
      padding: px2rem(30px);
      .answer-header {
        height: px2rem(54px);
        border: px2rem(1px) solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .correct-color {
          color: #77e66e;
        }
        .error-color {
          color: #f00;
        }
        &:first-child {
          padding-left: px2rem(30px);
          font-size: px2rem(32px);
        }
      }
      .answer-options {
        .answer-item {
          display: flex;
          // height: px2rem(64jpx);
          flex-direction: row;
          align-items: center;
          padding: px2rem(20px) 0;
          .answer-title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: px2rem(50px);
            height: px2rem(50px);
            border-radius: 50%;
          }
          .answer-progress-wraper {
            display: flex;
            align-items: center;
            width: px2rem(370px);
            height: px2rem(50px);
            // line-height: 50px;
            .answer-progress {
              position: relative;
              height: px2rem(20px);
              padding: px2rem(15px) 0;
              // margin: px2rem(20px) 0;
              .answer-progress-after {
                position: absolute;
                vertical-align: top;
                right: 0;
                top: -(px2rem(6px));
                transform: translateX(100%);
                font-size: px2rem(24px);
              }
            }
          }
        }
      }
    }
  }
  .success {
    background-color: #75e979;
  }
  .error {
    background-color: #f00;
  }
  .other {
    background-color: #6eaafd;
  }
}
</style>

