<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-button v-if="buttonType == 'text'" type="primary" icon="iconfont " @click="newUser">添加用户</el-button>
        <el-tooltip placement="top">
          <el-button type="primary" @click="newUser">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">添加用户</template>
        </el-tooltip>
      </el-col>
    </el-row>

    <ApeTable
      ref="apeTable"
      :data="userList"
      :columns="columns"
      :loading="loadingStatus"
      :paging-data="pagingData"
      highlight-current-row
    >
      <el-table-column label="操作" width="150">
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
          ref="userForm"
          class="user-form"
          :rules="rules"
          :model="userForm"
          label-width="120px"
          :inline="false"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userForm.nickname" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userForm.mobile" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" />
          </el-form-item>
          <el-form-item label="工号" prop>
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" />
          </el-form-item>
          <el-form-item label="角色绑定">
            <el-select
              v-model="userForm.user_roles"
              multiple
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.display_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="drawerClose">取消</el-button>
            <el-button v-if="userType === 1" type="primary" @click="drawerConfirm">立即修改</el-button>
            <el-button v-if="userType === 0" type="primary" @click="drawerConfirm">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </ApeDrawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loadingStatus: true,
      userList: [],
      pagingData: {},
      currentRow: null,
      userType: 0, // 0 新增 1 编辑
      isOpenDrawer: false,
      userForm: {
        user_roles: []
      },
      visible: false,
      columns: [
        { title: '账号ID', value: 'username' },
        { title: '昵称', value: 'username' },
        { title: '是否健康', value: 'username' },
        { title: '所属分组', value: 'username' },
        { title: '好友数', value: 'username' },
        { title: '自动应答数', value: 'username' },
        { title: '群发数', value: 'username' },
        { title: '朋友圈文字', value: 'username' },
        { title: '朋友圈图片', value: 'username' },
        { title: '性别', value: 'username' },
        { title: '昵称', value: 'username' },
        { title: '头像', value: 'username' },
        { title: '签名', value: 'username' },
        { title: '账号渠道', value: 'username' },
        { title: '导入时间', value: 'username' },
        { title: '备注', value: 'username' }
      ],
      drawerData: {
        visible: false,
        loading: true,
        loading_text: '玩命加载中……',
        title: '编辑用户',
        mask: true,
        show_footer: false,
        width_height: '30%'
      },
      rolesList: [],
      // 表单验证
      rules: {
        mobile: [
          { required: true, message: '输入手机号', trigger: 'blur' },
          { pattern: this.$utils.regular.mobile, message: '手机号格式错误', trigger: 'blur' }
        ]
        // username: [
        //   { pattern: this.$utils.regular.enNum0to20, message: '用户名格式0-20位英文数字', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    ...mapGetters(['buttonType'])
  },
  watch: {

  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await this.$api.getUserList()
      if (res.code === 200) {
        this.userList = res.data.list || []
        this.pagingData = res.data.pages || {}
        this.loadingStatus = false
      }
    },
    drawerClose() {
      this.$initFormData('userForm', { user_roles: [] })
      this.rolesList = []
      this.drawerData.visible = false
    },
    drawerConfirm() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // console.log('userForm ---> ', this.userForm)
          this.formSubmit()
        } else {
          this.$message.error('数据验证失败，请检查必填项数据！')
        }
      })
    },
    // 新建 or 编辑用户信息
    async formSubmit() {
      this.drawerData.loading_text = '玩命提交中……'
      this.drawerData.loading = true
      await this.$api.userStore(this.userForm)
      this.$nextTick(() => {
        this.drawerData.visible = false
        this.getUserList()
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    async newUser() {
      this.userType = 0
      this.drawerData.loading_text = '玩命加载中……'
      this.drawerData.visible = true
      this.drawerData.title = '新增用户'
      // const { data: list } = await this.$api.getRoles()
      // this.rolesList = list
      this.drawerData.loading = false
      // this.$resetData('userForm')
    },
    async editUser(row) {
      this.userType = 1
      this.drawerData.loading_text = '玩命加载中……'
      this.userForm = this.$utils.deepClone(row)
      this.drawerData.visible = true
      this.drawerData.title = `编辑用户(UID:${row.id})`
      // const { data: list } = await this.$api.getRoles()
      this.drawerData.loading = false
      // this.rolesList = list
    },
    delUser(row) {

    }
  }
}
</script>

<style lang="scss" scoped>
.user-form {
  .el-form-item {
    width: 100%;
    .el-form-item__content {
      // .el-form-item__label 120px
      width: calc(100% - 120px);
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
