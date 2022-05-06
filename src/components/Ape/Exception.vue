<template>
  <div class="exception" :style="exceptionStyle">
    <div class="img-block">
      <div class="img-ele" :style="`background-image: url(${img || config[pageType].img})`"></div>
    </div>
    <div class="content">
      <h1>{{ title || config[pageType].title }}</h1>
      <slot name="title"></slot>
      <div class="desc">{{ desc || config[pageType].desc }}</div>
      <slot name="desc"></slot>
      <div class="actions">
        <router-link to="/">
          <el-button type="primary">返回首页</el-button>
        </router-link>
        <el-button type="text" class="ml-20" @click="reLogin">等不了的话，咱重新登录吧...</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const config = {
  403: {
    img: require(`@/assets/401_images/401.gif`),
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: require(`@/assets/404_images/404.png`),
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  },
  500: {
    img: require(`@/assets/500_images/500.jpg`),
    title: '500',
    desc: '抱歉，服务器出错了'
  }
}

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    exceptionStyle: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      config,
      pageType: this.type in config ? this.type : '404'
    }
  },
  methods: {
    async reLogin() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.exception {
  display: flex;
  align-items: center;
  height: 100%;

  .img-block {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    box-sizing: border-box;
    zoom: 1;
  }

  .img-ele {
    height: 360px;
    width: 100%;
    max-width: 430px;
    float: right;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-top: 0px;
      margin-bottom: 24px;
    }

    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>
