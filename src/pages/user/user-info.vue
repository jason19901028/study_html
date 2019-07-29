<template>
  <div class="user-info">
    <div class="header">
      <span>个人信息</span>
      <img
        src="../../assets/back.png"
        alt=""
        class="back"
        @click="goBack"
      >
    </div>
    <ul class="content">
      <li>
        <img
          src="../../assets/images/study/scholl.png"
          alt=""
        >
        <span class="user-title">学校</span>
        <i-input class="user-input"></i-input>
      </li>
      <li>
        <img
          src="../../assets/images/study/grade.png"
          alt=""
        >
        <span class="user-title">班级</span>
        <i-input class="user-input"></i-input>
      </li>
      <li>
        <img
          src="../../assets/images/study/name.png"
          alt=""
        >
        <span class="user-title">姓名</span>
        <i-input class="user-input"></i-input>
      </li>
    </ul>
    <div class="save">
      <img
        src="../../assets/images/study/save.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { saveStudent } from 'api/study'
export default {
  name: 'user-info',
  data () {
    return {
      formData: {
        schoolId: '',
        classId: '',
        name: ''
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    saveStudents () {
      let params = {
        schoolId: this.formData.schoolId,
        classId: this.formData.classId,
        name: this.formData.name
      }
      saveStudent(JSON.stringify(params)).then((res) => {
        console.log('student=', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.user-info {
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
  .content {
    li {
      padding: px2rem(30px) px2rem(40px);
      border-bottom: px2rem(1px) solid #ccc;
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      img {
        width: px2rem(45px);
        height: px2rem(49px);
      }
      .user-title {
        margin-left: px2rem(30px);
        font-size: px2rem(32px);
      }
      .user-input {
        width: px2rem(375px) !important;
        margin-left: px2rem(30px);
      }
    }
  }
  .save {
    margin-top: px2rem(100px);
    display: flex;
    justify-content: center;
    img {
      width: px2rem(680px);
      height: px2rem(80px);
    }
  }
}
</style>
