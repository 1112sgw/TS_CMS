<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-save-edit="handleEdit" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '@/views/components/tables'
// import { axioApi } from '@/api/axioApi'
import axios from '@/libs/api.request'

export default {
  name: 'User_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: 'User Name', key: 'userName', sortable: true},
        {title: 'First Name', key: 'firstName', sortable: true},
        {title: 'Last Name', key: 'lastName', sortable: true},
        {title: 'Email', key: 'email', editable: true},
        {title: 'Create-Time', key: 'createdAt'},
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              })
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
    },
    handleEdit (params) {
      let updateObject = {}
      updateObject[params.column.key] = params.value
      axios.request({
        url: '/api/users/' + params.row.id,
        method: 'patch',
        data: updateObject
      }).then(res => {
        console.log(res)
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    axios.request({url: '/api/users', method: 'get'}).then(res => {
      this.tableData = res.data
      console.log(res)
    })
  }
}
</script>

<style>

</style>
