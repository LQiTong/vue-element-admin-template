<template>
  <div class="main-page-content">
    头像管理
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  // 定义属性
  data() {
    return {

    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType'])
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {

  }
}
</script>

<style lang='scss' scoped>

</style>
