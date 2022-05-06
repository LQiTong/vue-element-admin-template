/* eslint-disable */
import { mapGetters } from 'vuex'
import { Message, MessageBox } from 'element-ui'

const Mixin = {}

Mixin.install = (Vue, options) => {
  Vue.prototype._alert = (text, cb) => {
    MessageBox.alert(text, '提示', {
      confirmButtonText: '确定',
      callback: (action) => {
        cb && cb(action)
      }
    })
  }

  Vue.prototype._confirm = (text, cb) => {
    MessageBox.confirm(text, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(() => {
        cb && cb(true)
      })
      .catch(() => {
        cb && cb(false)
      })
  }

  Vue.prototype._warnConfirm = (text, cb, conTxt = '确定', canTxt = '取消') => {
    MessageBox.confirm(text, '提示', {
      confirmButtonText: conTxt,
      cancelButtonText: canTxt,
      dangerouslyUseHTMLString: true,
      type: 'warning'
    })
      .then(() => {
        cb && cb(true)
      })
      .catch(() => {
        cb && cb(false)
      })
  }

  Vue.mixin({
    computed: {
      ...mapGetters(['buttonType'])
    },
    methods: {
      /**
       * 初始化data内某属性数据
       * @param {String} key 属性 key
       */
      $resetData(key) {
        this[key] = this.$options.data()[key]
      },
      /**
       * 初始化表单数据
       * @param {String} formRef 表单ref名字
       * @param {Object} options 表单内数据
       */
      $initFormData(formRef, options = {}) {
        this.$nextTick(() => {
          this[formRef] = options
          this.$refs[formRef].resetFields()
        })
      },
      /**
       * 滚动到顶部 or 底部
       * @param {*} ref 要滚动的元素 ref 名称
       * @param {Boolean} isTop true 顶部 / false 底部
       */
      $scrollTopOrBottom(ref, isTop) {
        const refDom = this.$refs[ref]
        refDom.scrollTop = isTop ? 0 : refDom.scrollHeight
      }
    }
  })
}

export default Mixin
