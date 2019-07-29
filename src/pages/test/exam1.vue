<template>
  <div class="exam">
    <!-- <div class="header"> -->
    <!-- <strong class="title">考试试题</strong> -->
    <!-- <span>{{restTime}}</span> -->
    <!-- <p class="describe">
        <span>考试日期: {{currentDate}}</span>
        <span>时长: {{time}}分钟</span>
      </p> -->
    <!-- </div> -->
    <section
      v-for="(item, index) in examList"
      :key="index"
      v-show="index == currendIndex"
    >
      <div class="test-header">
        <img
          src="../../assets/back.png"
          alt=""
          class="back"
          @click="goBack"
        >
        <span class="header-title">{{title}}</span>
        <label>{{ index + 1 }}/{{examList.length}} <span>{{item.title}} ({{item.score}}分)</span></label>
      </div>
      <div class="content-main">
        <div class="content-nav">
          <span>{{restTime}}</span>
        </div>
        <div class="content-test">
          <img
            :src="item.questionsImg"
            alt=""
          >
        </div>
        <div class="item-options">
          <RadioGroup
            v-model="selectedValue"
            @on-change="changeCurrentAnswer($event,item)"
          >
            <Radio
              v-for="(option, listIndex) in ['A','B','C','D']"
              :label="listIndex+1"
              :key="listIndex"
            ><span v-html="option"></span></Radio>
          </RadioGroup>
        </div>
      </div>
    </section>
    <!-- <div class="time-count-wrap">距离考试结束还有：{{restTime}}</div> -->
    <div
      class="buttons-group"
      v-if="examList.length > 0"
    >
      <Button
        type="error"
        size="large"
        @click.native="prevItem"
        :disabled="currendIndex<1 && currendIndex != examList.length-1"
      >上一题</Button>
      <Button
        type="error"
        size="large"
        @click.native="nextItem"
        v-if="currendIndex != examList.length-1"
      >下一题</Button>
      <Button
        type="error"
        size="large"
        @click.native="handleSubmit"
        v-if="currendIndex == examList.length-1"
      >提交试卷</Button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapMutations } from 'vuex'
import { getNumberPrefix, getCurrentDate } from '../../utils/common'
import { examTest, submitTest } from 'api/study'
import { getToken, setTag, setExam } from '@/utils/auth'
export default {
  data () {
    return {
      examList: [],
      resultAnswer: [],
      examPaperId: null,
      title: '',
      currentDate: getCurrentDate(),
      // 选中的答案
      selectedValue: '',
      // 初始化时间戳
      currentTime: new Date().getTime(),
      restTime: '',
      testTime: 0,
      timer: '',
      code: ''
    }
  },
  watch: {
    $route (to) {
    }
  },
  mounted () {
    this.code = getToken()
    setTag('exam')
    this.examPaperId = this.$route.query.id
    setExam(this.examPaperId)
    if (!this.code) {
      var local = 'http://wap.kaoya.vip'
      var appid = 'wxb7d09a052984168c'
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    }
    this.$eventBus.$on((params) => {
      this.code = params.code
      this.getExamTest()
      this.countTime()
    })
    this.getExamTest()
    this.countTime()
  },
  computed: {
    // examList () {
    //   const vm = this;
    //   return vm.$store.state.examList[0]
    // },
    time () {
      const vm = this;
      return vm.$store.state.time[0]
    },
    ...mapState([
      'currendIndex',
      'saveAnswer'
    ])
  },
  methods: {
    ...mapMutations([
      'NEXT_ITEM',
      'PREV_ITEM',
      'USE_TIME',
      'EXAM_ID'
    ]),
    // 下一题
    nextItem () {
      if (!this.selectedValue) {
        this.$Message.warning('请先选择答案！')
        return;
      }
      this.selectedValue = ''
      this.NEXT_ITEM();
      this.getCurrentAnswer();
    },
    // 上一题
    prevItem () {
      this.PREV_ITEM();
      this.getCurrentAnswer();
    },
    // 提交答案
    handleSubmit () {
      // this.EXAM_ID(this.$route.query.id)
      // this.USE_TIME(new Date().getTime() - this.currentTime)
      // clearTimeout(this.timer);
      // this.$router.push({ name: 'Result' });

      let params = {
        openId: 'ox5Sj54VkYrAzNFicTYEwvhiCDYI',
        examPaperId: this.examPaperId,
        answerResult: this.resultAnswer
      }
      submitTest(JSON.stringify(params)).then((res) => {
        console.log('submit', res)
        this.$Message.success(res.data.msg);
        this.$router.push({ name: '测试报告' })
      })
    },
    // 更改当前题目的答案
    changeCurrentAnswer (index, item) {
      console.log('item=', item)
      console.log('aa=', item)
      let anserMap = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D'
      }
      let answer = anserMap[index]
      console.log('answer=', answer)
      this.resultAnswer.push({
        id: item.id,
        questionsNo: item.questionsNo,
        selectAnswer: answer,
        answer: item.answer,
        score: item.score
      })
      // this.saveAnswer[this.currendIndex] = this.selectedValue
      // this.resultAnswer
    },
    // 获取当前题目填写的答案
    getCurrentAnswer () {
      const currentAnswer = this.saveAnswer[this.currendIndex]
      if (currentAnswer) {
        this.selectedValue = currentAnswer
      } else {
        this.saveAnswer[this.currendIndex] = this.selectedValue
      }
      console.log(this.saveAnswer)
    },
    // 倒计时
    countTime () {
      const vm = this
      const testTime = this.testTime * 60,
        endTime = vm.time * 3600 * 1000 + vm.currentTime,
        currentTime = new Date().getTime(),
        restTime = endTime - currentTime,
        hours = getNumberPrefix(parseInt(restTime / (1000 * 60 * 60) % 24, 10)),
        minutes = getNumberPrefix(parseInt(restTime / (1000 * 60) % 60, 10)),
        seconds = getNumberPrefix(parseInt(restTime / 1000 % 60, 10))
      vm.restTime = `${hours}:${minutes}:${seconds}`
      vm.timer = setTimeout(function () {
        if (restTime > 0) {
          vm.countTime()
        } else if (restTime <= 0) {
          clearTimeout(vm.timer)
          vm.$Message.warning('交卷时间已到，系统将帮您自动交卷')
          setTimeout(() => {
            vm.handleSubmit()
          }, 2000)
        }
      }, 1000)
    },
    getExamTest () {
      examTest(this.examPaperId, this.code).then((res) => {
        console.log('test===', res)
        this.examList = res.data.data.examQuestions
        this.testTime = parseInt(res.data.data.testTime)
        this.title = res.data.data.title
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
@import "~styles/index.scss";
.exam {
  width: 100%;
  height: 100%;
  font-size: px2rem(32px);
  margin-bottom: px2rem(90px);
}
.exam .header,
.exam section,
.time-count-wrap {
  // padding: px2rem(15px);
  text-align: left;
}
.exam .header {
  display: flex;
  justify-content: space-between;
  border-bottom: px2rem(9px) solid #ccc;
}
.exam {
  .test-header {
    height: px2rem(100px);
    line-height: px2rem(100px);
    border-bottom: px2rem(1px) solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(20px) 0 px2rem(30px);
    .back {
      position: absolute;
      left: px2rem(20px);
      right: px2rem(20px);
      top: px2rem(30px);
      width: px2rem(18px);
      height: px2rem(33px);
      margin-right: px2rem(20px);
    }
    .header-title {
      margin-left: px2rem(20px);
    }
  }
  .content-main {
    padding: 0 px2rem(20px);
    .content-nav {
      height: px2rem(60px);
      line-height: px2rem(60px);
      display: flex;
      justify-content: flex-end;
    }
    .content-test {
      height: px2rem(400px);
      img {
        display: block;
        height: inherit;
        width: 100%;
      }
    }
  }
}
.header .describe,
.time-count-wrap {
  font-size: 0.8rem;
  color: rgba(135, 134, 136, 0.84);
}
.header .describe span:nth-child(2) {
  float: right;
}
.exam section {
  // border-left: 5px solid red;
  // background: url(../../assets/3.jpg) 100% 100%;
}
section .ivu-radio-group label {
  display: block;
  // padding: 7px 0px;
  white-space: normal;
  font-size: px2rem(36px);
}
.buttons-group {
  padding: px2rem(30px) 0;
  display: flex;
  justify-content: center;
}
.buttons-group button {
  padding-left: px2rem(25px);
  padding-right: px2rem(25px);
  margin-left: px2rem(60px);
}
.ivu-radio-wrapper {
  font-size: 0.9rem;
}
span.ivu-radio + * {
  position: relative;
  left: 20px;
}
.item-options .ivu-radio-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.ivu-radio-wrapper {
  flex: 0 0 35%;
  height: px2rem(60px);
}
.item-options .ivu-radio {
  position: absolute !important;
}
.ivu-radio-group label:nth-child(2n) {
  text-align: right;
}
</style>
