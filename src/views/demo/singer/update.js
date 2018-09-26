import updateMixin from '@/mixin/update'
import modelScheme from './model'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'

import {fetchList} from '@/service/api'

var model = {
  "moreInfo": {},
  "name": null,
  "age": null,
  "isMember": null,
  "avatar": null,
  "imgs": "",
  "des": null
}

var rules = {
  "name": [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  "age": [
    { type: 'number', required: true, message: '请输入年龄', trigger: 'blur' }
  ],
  "isMember": [
    { type: 'number', required: true, message: '请选择是会员', trigger: 'blur' }
  ],
  "avatar": [
    { required: true, message: '请上传图片', trigger: 'blur' }
  ],
  "imgs": [
    { required: true, message: '请上传图片', trigger: 'blur' }
  ]
}

export default {
  mixins: [updateMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'singer',
      model,
      modelScheme,
      rules,
      singerList: [],
      isShowDialog: false,

      allSingerList: [],
      selectedSinger: [],
      tempSelectedSinger: [],
      singerPager: {
        current: 1,
        total: 1
      },
      
    }
  },
  computed: {
    tempSelectedSingerName() {
      this.tempSelectedSinger.map(item => item.name).join(',')
    }
  },
  methods: {
    formatFetchData(model) {
      model = deepClone(model)
      // 下拉框赋值
      if(!this.isView) {

      } else {

      }

      return model
    },
    formatSaveData() {
      var model = deepClone(this.model)

      return model
    },
    avatarLoaded(data) {
      this.handleUploadImageSuccess('avatar', data.data)
    },
    imgsLoaded(data) {
      var imgs = this.model.imgs.split(',').filter(img => img)
      imgs.push(data.data)
      this.model.imgs = imgs.join(',')
    },
    removeSinger(id) {
      this.selectedSinger = this.selectedSinger.filter(item => item.id !== id)
    },
    chooseSinger() {
      this.selectedSinger.unshift(...this.tempSelectedSinger)
      this.tempSelectedSinger = []
      this.isShowDialog = false
    },
    handleCurrentChange(currentPage) {
      this.singerPager.current = currentPage
      this.fetch()
    },
    fetch() {
      fetchList(this.KEY, undefined, this.singerPager)
      .then(({ data }) => {
        if(!data.errorCode) {
          this.singerPager.total = data.pager.total
          this.allSingerList = data.data
        }
      })
    },
    handleSelectChange(val) {
      this.tempSelectedSinger = [...val]
    }
  },
  mounted() {
    this.fetch()
  }
}