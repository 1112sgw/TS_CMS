<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditting" class="tables-edit-con">
      <span class="value-con">{{ value }}</span>
      <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="edit"></Icon></Button>
    </div>
    <div v-else class="tables-editting-con">
      <Input :value="value" @input="handleInput" class="tables-edit-input"/>
      <Button @click="saveEdit" style="padding: 6px 4px;" type="text"><Icon type="checkmark-round"></Icon></Button>
      <Button @click="canceltEdit" style="padding: 6px 4px;" type="text"><Icon type="close-round"></Icon></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablesEdit',
  props: {
    value: [String, Number],
    edittingCellId: String,
    params: Object,
    editable: Boolean
  },
  computed: {
    isEditting () {
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`
    }
  },
  methods: {
    handleInput (val) {
      this.$emit('input', val)
    },
    startEdit () {
      this.$emit('on-start-edit', this.params)
    },
    saveEdit () {
      this.$emit('on-save-edit', this.params)
    },
    canceltEdit () {
      this.$emit('on-cancel-edit', this.params)
    }
  }
}
</script>
