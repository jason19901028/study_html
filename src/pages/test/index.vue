<template>
  <div class="test-wraper">
    <nav-bar
      :navList="curriculums"
      @on-nav="onNav"
    ></nav-bar>
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
              <span>时限：{{item.testTime}}分钟</span>
            </p>
          </div>
          <i class="write"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/nav-bar'
import { exam } from 'api/study.js'
export default {
  name: 'test',
  components: {
    navBar
  },
  data () {
    return {
      activeIndex: 0,
      iconList: [],
      iconId: null,
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
    this.iconList = JSON.parse(window.localStorage.getItem('iconList'))
    console.log('local=', JSON.parse(window.localStorage.getItem('iconList')))
    console.log('iconList=', this.iconList)
    this.iconId = this.iconList[0].id
    this.getExam()
  },
  methods: {
    onNav (index) {
      this.activeIndex = index
    },
    getExam () {
      exam(this.iconId).then((res) => {
        console.log('res======', res)
        if (res.status === 200) {
          this.testData = res.data.data
        }
      })
    },
    goTestDetail (item) {
      console.log('item=', item)
      this.$router.push({ name: '测试', query: { id: item.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.test-wraper {
  padding: px2rem(20px);
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
        width: px2rem(100px);
        height: px2rem(100px);
        background: url("~images/study/write.png") no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
