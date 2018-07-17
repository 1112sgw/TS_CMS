import CommonIcon from '@/views/components/common-icon'
import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item)
    },
    showChildren (item) {
      return item.children && item.children.length > 1
    }
  }
}
