<template>
  <div class="test-wraper">
    <div class="header">
      <span>历史测试</span>
      <img
        src="../../assets/back.png"
        alt=""
        class="back"
        @click="goBack"
      >
    </div>
    <div class="test-list">
      <ul>
        <li
          v-for="(item, index) in testData"
          :key="index"
          @click="goTestDetail(item)"
        >
          <div class="test-content">
            <p>{{item.title}}</p>
            <p>
              <i class="date"></i>
              <span>结束时间：{{item.endTime}}</span>
            </p>
            <p>
              <i class="time"></i>
              <span>时限：{{item.totalTime}}分钟</span>
            </p>
          </div>
          <i class="write"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { historyTest } from 'api/study.js'
export default {
  name: 'history-test',
  components: {
  },
  data () {
    return {
      activeIndex: 0,
      testData: [
        {
          title: '《压强与浮力》单元测试卷1',
          endTime: '2019-05-18 15:00',
          totalTime: '60'
        },
        {
          title: '《压强与浮力》单元测试卷2',
          endTime: '2019-05-18 15:00',
          totalTime: '60'
        },
        {
          title: '《压强与浮力》单元测试卷3',
          endTime: '2019-05-18 15:00',
          totalTime: '60'
        },
        {
          title: '《压强与浮力》单元测试卷4',
          endTime: '2019-05-18 15:00',
          totalTime: '60'
        },
        {
          title: '《压强与浮力》单元测试卷5',
          endTime: '2019-05-18 15:00',
          totalTime: '60'
        }
      ]
    }
  },
  mounted () {
    console.log('ceshi')
    this.getExam()
  },
  methods: {
    getExam () {
      historyTest(5).then((res) => {
        console.log('res=', res)
      })
    },
    goTestDetail (item) {
      // this.$router.push({ name: '测试' })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.test-wraper {
  padding: 0 px2rem(20px);
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
  .test-list {
    margin-top: px2rem(30px);
    ul li {
      display: flex;
      justify-content: space-between;
      padding: px2rem(20px);
      align-items: center;
      border-top: px2rem(1px) solid #ccc;
      .test-content {
        font-size: px2rem(36px);
        p {
          margin-bottom: px2rem(10px);
        }
        p:last-child {
          margin-bottom: 0;
        }
      }
      .date {
        display: inline-block;
        width: px2rem(36px);
        height: px2rem(36px);
        background: url("~images/study/date.png");
        background-size: 100%;
        vertical-align: top;
      }
      .time {
        display: inline-block;
        width: px2rem(36px);
        height: px2rem(36px);
        background: url("~images/study/time.png");
        background-size: 100%;
        vertical-align: top;
      }
      // & > :last-child {
      //   font-size: px2rem(100px);
      // }
      // .edit{
      // width: px2rem(100px);
      // height: px2rem(100px);
      // }
      .write {
        display: block;
        width: px2rem(52px);
        height: px2rem(26px);
        background: url("~images/study/history-icon.png") no-repeat;
        background-size: 100%;
      }
    }
    ul li:first-child {
      border-top: none;
    }
  }
}
</style>
