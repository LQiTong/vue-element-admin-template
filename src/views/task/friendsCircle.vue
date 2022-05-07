<template>
  <div class="main-page-content">
    <ApeTable
      ref="apeTable"
      :data="list"
      :columns="columns"
      :loading="loadingStatus"
      :paging-data="pagingData"
      highlight-current-row
    >
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button @click="editUser(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
          <el-popconfirm
            placement="top"
            width="160"
            title="确定删除记录吗？"
            confirm-button-text="删除"
            cancel-button-text="取消"
            confirm-button-type="danger"
            cancel-button-type="text"
            hide-icon
            @confirm="delUser(scope.row)"
          >
            <template slot="reference">
              <div class="inlineBlock">
                <el-tooltip placement="top">
                  <el-button type="danger">
                    <i class="el-icon-delete"></i>
                  </el-button>
                  <template slot="content">删除</template>
                </el-tooltip>
              </div>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </ApeTable>
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
      loadingStatus: false,
      list: [],
      columns: [
        { title: '任务ID', name: 'name' },
        { title: '任务名', name: 'name' },
        { title: '执行账号组', name: 'name' },
        { title: '执行账号总数', name: 'name' },
        { title: '执行设备数', name: 'name' },
        { title: '话术', name: 'name' },
        { title: '朋友圈内容', name: 'name' },
        { title: '开始时间', name: 'name' },
        { title: '结束时间', name: 'name' },
        { title: '任务状态', name: 'name' },
        { title: '使能', name: 'name' }
      ],
      pagingData: {
        current_page: 0,
        total: 0,
        page_size: 10,
        offset: 0
      }
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
