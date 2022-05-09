<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-button v-if="buttonType == 'text'" type="primary" icon="iconfont " @click="importAccount">导入账号</el-button>
        <el-tooltip placement="top">
          <el-button type="primary" @click="importAccount">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">导入账号</template>
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
        <el-form
          ref="form"
          class="form"
          :rules="rules"
          :model="form"
          label-width="120px"
          :inline="false"
        >
          <el-form-item label="组名" prop="groupName">
            <el-input v-model="form.groupName" />
          </el-form-item>
          <el-form-item label="账号渠道" prop="channel">
            <el-input v-model="form.channel" />
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
        { title: '组ID', name: 'name' },
        { title: '组名', name: 'name' },
        { title: '当前任务', name: 'name' },
        { title: '账号总数', name: 'name' },
        { title: '有效账号', name: 'name' },
        { title: '无效账号', name: 'name' },
        { title: '添加好友总数', name: 'name' },
        { title: '是否自动应答', name: 'name' },
        { title: '群发次数', name: 'name' },
        { title: '朋友圈数量', name: 'name' },
        { title: '账号渠道', name: 'name' },
        { title: '导入时间', name: 'name' },
        { title: '备注', name: 'name' },
        { title: '批量修改昵称', name: 'name' },
        { title: '批量修改签名', name: 'name' },
        { title: '批量修改头像', name: 'name' }
      ],
      pagingData: {
        current_page: 0,
        total: 0,
        page_size: 10,
        offset: 0
      },
      editType: 0,
      rules: {},
      drawerData: {
        visible: false,
        loading: true,
        loading_text: '玩命加载中……',
        title: '导入账号',
        mask: true,
        show_footer: true,
        width_height: '30%'
      },
      form: {

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
    importAccount() {
      this.editType = 0
      this.drawerData.visible = true
      this.drawerData.title = '导入账号'
      this.drawerData.loading = false
    },
    drawerClose() {
      this.drawerData.visible = false
    },
    drawerConfirm() {
      this.drawerData.visible = false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
