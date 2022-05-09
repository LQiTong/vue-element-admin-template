<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-button v-if="buttonType == 'text'" type="primary" icon="iconfont " @click="newTask">新增任务</el-button>
        <el-tooltip placement="top">
          <el-button type="primary" @click="newTask">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">新增任务</template>
        </el-tooltip>
      </el-col>
    </el-row>
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

    <ApeDrawer
      :drawer-data="drawerData"
      @drawer-close="drawerClose"
      @drawer-confirm="drawerConfirm"
    >
      <div slot="ape-drawer" class="drawer-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="false" size="normal">
          <el-form-item label="任务名">
            <el-input v-model="form.taskName" />
          </el-form-item>
          <el-form-item label="执行账号组">
            <el-input v-model="form.taskName" />
          </el-form-item>
          <el-form-item label="执行设备数">
            <el-input v-model="form.taskName" />
          </el-form-item>
          <el-form-item label="指定性别">
            <el-input v-model="form.taskName" />
          </el-form-item>
          <el-form-item label="话术">
            <el-input v-model="form.taskName" />
          </el-form-item>
          <el-form-item label="任务备注">
            <el-input v-model="form.taskName" type="textarea" />
          </el-form-item>
        </el-form>

      </div>
    </ApeDrawer>
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
        { title: '指定性别', name: 'name' },
        { title: '好友数', name: 'name' },
        { title: '群发数', name: 'name' },
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
      },
      drawerData: {
        visible: false,
        loading: true,
        loading_text: '玩命加载中……',
        title: '新增任务',
        mask: true,
        show_footer: true,
        width_height: '30%'
      },
      form: {},
      rules: {}
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
    newTask() {
      this.drawerData.loading_text = '玩命加载中……'
      this.drawerData.visible = true
      this.drawerData.title = '新增任务'
      this.drawerData.loading = false
    },
    drawerClose() {
      this.drawerData.visible = false
    },
    drawerConfirm() {
      this.drawerData.visible = false
    },
    onSubmit() {}
  }
}
</script>

<style lang='scss' scoped>

</style>
