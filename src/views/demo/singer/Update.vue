
<template>
<div class="main">
  <div class="ly ly-r mb-10">
    <el-button type="primary" @click="autoFill" v-if="isDev && isAdd">补全表单内容</el-button>
  </div>

  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right" >
    <el-row type="flex" justify="start" class="multi-line">
      <j-edit-item  label="姓名" prop="name" :is-view="isView" :view-value="model.name">
        <el-input v-model="model.name"></el-input>
      </j-edit-item>

      <j-edit-item  label="年龄" prop="age" :is-view="isView" :view-value="model.age">
        <el-input-number v-model.number="model.age" :controls="false"></el-input-number>
      </j-edit-item>

      <j-edit-item  label="是会员" prop="isMember" :is-view="isView" :view-value="model.isMember == 1 ? '是' : '否'">
        <el-switch
        v-model="model.isMember"
        on-text="是"
        off-text="否"
        :on-value="1"
        :off-value="0">
      </el-switch>
      </j-edit-item>

      <j-edit-item fill label="头像" prop="avatar" :is-view="false" :view-value="model.avatar">
        <div class="avatar-upload" style="text-align:left" v-if="!isView">
          <el-upload class="image-uploader" name="file"
                   :action="addPicUrl" :show-file-list="false"
                   :on-success="avatarLoaded">
            <img v-if="model.avatar" :src="model.avatar | img" class="image-show">
              <i v-else class="el-icon-plus image-uploader-icon"></i>
          </el-upload>
          <div class="form-tip">建议尺寸 300 * 300</div>
        </div>
        <div class="avatar-upload" v-else>
          <img :src="model.avatar | img" class="image-show">
        </div>
      </j-edit-item>

      <j-edit-item fill label="更多图片" prop="imgs" :is-view="false" :view-value="model.imgs">
        <div class="imgs-upload" style="text-align:left" v-if="!isView">
          <div class="ly ly-multi image-uploader" >
            <div v-if="model.imgs" :key="img" v-for="(img, index) in model.imgs.split(',')" class="mb-10 mr-10 pos-r">
              <img :src="img | img" class="image-show" >
              <i class="el-icon-close" @click="removeImg('imgs', index)"></i>
            </div>
          </div>
          <div>
            <el-upload 
              v-if="model.imgs.split(',').length < 5"
              class="image-uploader" name="file"
               :action="addPicUrl" :show-file-list="false"
               :on-success="imgsLoaded"
               >
                <i class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">建议尺寸 750 * 300</div>
          </div>
        </div>
      
        <div class="img-upload" style="text-align:left" v-else>
          <img v-if="model.imgs" :src="img | img" class="image-show mr-10 mb-10" v-for="(img, index) in model.imgs.split(',')">
        </div>
      </j-edit-item>

      
      <j-edit-item  label="描述" prop="des" fill :is-view="isView" :view-value="model.des">
        <el-input v-model="model.des" type="textarea" :rows="3"></el-input>
      </j-edit-item>
    </el-row>
  </el-form>

  <el-card class="box-card">
    <div class="ly ly-j ly-m mb-20">
      <span class="box-title">歌手朋友</span>
      <el-button type="success" icon="plus" @click="isShowDialog = true">新增</el-button>
    </div>
    <el-table
      :data="selectedSinger"
      border
      stripe>
      <el-table-column
        type="index"
        label="序列"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="op"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="removeSinger(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>


  <el-dialog 
    title="弹出框"
    :visible.sync="isShowDialog"
  >
    <div class="mb-20">
      已选择:  {{tempSelectedSingerName}}
    </div>
    <el-table
      :data="allSingerList"
      @selection-change="handleSelectChange"
      border
      stripe
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
    </el-table>
    <div class="pager mt-20">
      <el-row type="flex" justify="end">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="singerPager.current"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="singerPager.total"
            class="right">
          </el-pagination>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShowDialog = false">取 消</el-button>
      <el-button type="primary" @click="chooseSinger">确 定</el-button>
    </span>
  </el-dialog>

  <el-row type="flex" justify="center" class="mb-20">
    <el-button @click="$router.go(-1)">返回</el-button>
    <el-button type="success" @click="save" v-if="!isView">保存</el-button>
  </el-row>
</div>
</template>

<script src="./update.js"></script>

<style scoped>
.avatar-upload .image-uploader .image-uploader-icon,
.avatar-upload .image-uploader .image-show {
  min-width: 105px;
  height: 105px;
  line-height: 105px;
}

.imgs-upload .image-uploader .image-uploader-icon,
.imgs-upload .image-uploader .image-show {
  min-width: 105px;
  height: 105px;
  line-height: 105px;
}
</style>