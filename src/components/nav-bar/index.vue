<template>
  <div class="nav-bar">
    <ul class="clearfix">
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="['left', activeIndex === index ? 'active' : '']"
        @click="changeNav(item,index)"
      >
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    navList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeNav (item, index) {
      this.activeIndex = index
      this.$emit('on-nav', { index: index, item: item })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/index.scss";
.nav-bar {
  ul {
    li {
      margin-right: px2rem(75px);
      span {
        font-size: px2rem(36px);
      }
    }
    .active {
      color: #00f;
    }
  }
}
</style>
