<template>
  <div>
    <Card>
      <Select v-model="currentUser" style="width:200px">
        <Option v-for="item in userList" :value="item.openid" :key="item.openid">{{ item.nickname }}</Option>
      </Select>
      <template style="width:500px; margin: 20px 0">
          <Input v-model="text" type="textarea" :rows="4" placeholder="Enter something..." />
      </template>
      <Button :size="buttonSize" type="primary" @click="sendMsg" :loading="loading">
          Send
          <Icon type="ios-arrow-forward" />
      </Button>
    </Card>
  </div>
</template>

<script>

import axios from '@/libs/api.request'

export default {
  name: 'wechat_page',
  components: {},
  data () {
    return {
      buttonSize: 'large',
      text: '',
      userList: [],
      currentUser: '',
      loading: false
    }
  },
  methods: {
    sendMsg () {
      this.loading = true
      axios.request({
        url: '/api/wechat/sendText',
        method: 'post',
        data: {
          openid: this.currentUser,
          text: this.text
        }
      }).then(res => {
        this.loading = false
        if (res.code === 200 && res.result.errcode === 0) {
          this.$Modal.success({
            title: 'Send sucessfully'
          })
        } else {
          this.$Modal.error({
            title: 'Send error'
          })
        }
      })
    }
  },
  mounted () {
    axios.request({url: '/api/wechat/sync', method: 'get'}).then(res => {
      this.userList = res.data[0].user_info_list
    })
  }
}
</script>
