<template>
  <div class="box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>账户列表</span>
        <el-button @click="dialogVisible = true" type="primary" size="mini"
          >添加分类</el-button
        >
      </div>
      <el-table :data="tableData">
        <el-table-column label="序号" type="index" key="序号">
        </el-table-column>
        <el-table-column label="分类名称" key="分类名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.flag">
              {{ scope.row.cateName }}
            </span>
            <el-input
              v-else
              size="mini"
              v-model="scope.row.cateName"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" key="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ccc"
              :disabled="!scope.row.flag"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" key="操作">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.flag"
              size="mini"
              @click="handlechange(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              v-else
              type="success"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >完成</el-button
            >
            <div class="checkdel">
              <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button slot="reference" size="mini" type="danger"
                  >删除</el-button
                >
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 7, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totle"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close="handleClose"
    >
      <div class="add">
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="分类名称"
            prop="classfy"
            :rules="[
              { required: true, message: '不能为空', trigger: 'blur' },
              {
                min: 1,
                max: 10,
                message: '长度在 5 到 10 个字符',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="numberValidateForm.classfy"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <p>
            <span>是否启用</span>
            <el-switch
              v-model="enable"
              active-color="#13ce66"
              inactive-color="#ccc"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </p>
          <el-form-item>
            <div class="rightbtn">
              <el-button @click="resetForm('numberValidateForm')"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="submitForm('numberValidateForm')"
                >确 定</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getgoodscatelist,
  postaddgoodsreq,
  posteditgoodsclareq,
  getdelclassfyreq,
  postgoodseditreq,
} from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    return {
      numberValidateForm: {
        classfy: "",
      },
      enable: true,
      currentPage: 1,
      pagesize: 5,
      currentPage4: 4,
      dialogVisible: false,
      tableData: [],
      changeswitch: [],
      totle: 0,
      flag: {},
    };
  },
  methods: {
    getgoodsclasslist() {
      // this.pagesize = 100;
      getgoodscatelist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
      }).then((res) => {
        if ((res.status == 200) & (res.statusText == "OK")) {
          if (res.data.data.length < 1 && this.currentPage != 1) {
            this.currentPage--;
            this.getgoodsclasslist();
          }
          res.data.data.forEach((item) => (item.flag = false));
          this.tableData = res.data.data;
          // this.tableData.forEach((v, i) => {
          //   this.tableData[i].flag = false;
          // });
          this.totle = res.data.total;
          // console.log(this.tableData);
          // console.log(res.data.data);
        }
      });
    },
    handlechange(index, row) {
      row.flag = !row.flag;
    },
    handleEdit(index, row) {
      posteditgoodsclareq({
        id: row.id,
        cateName: row.cateName,
        state: Number(row.state),
      }).then((res) => {
        if (res.data.code == 0) {
          alert(res.data.msg);
          this.getgoodsclasslist();
        }
      });
    },
    handleDelete(index, row) {
      getdelclassfyreq({
        id: row.id,
      }).then((res) => {
        if (res.data.code == 0) {
          alert(res.data.msg);
          this.getgoodsclasslist();
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getgoodsclasslist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodsclasslist();
    },
    handleClose(done) {
      this.resetForm();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await postaddgoodsreq({
            cateName: this.numberValidateForm.classfy,
            state: Number(this.enable),
          });
          if (res.data.code == 0) {
            alert(res.data.msg);
            this.dialogVisible = false;
            this.getgoodsclasslist();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
  },
  created() {
    this.getgoodsclasslist();
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  .el-pagination {
    margin-top: 20px;
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
  }
  .add {
    position: relative;
    span {
      margin-right: 15px;
      width: 80px;
    }
    p {
      display: flex;
      align-items: center;
      padding: 10px 0;
    }
    .demo-ruleForm {
      padding-top: 15px;
    }
    .el-button {
      margin-bottom: 20px;
      text-align: end;
    }
    .rightbtn {
      width: 50%;
      position: relative;
      right: -53%;
    }
    .el-form-item__error {
      position: relative;
    }
  }
  p {
    margin: 0;
  }
  // .el-button {
  //   margin-left: 0;
  // }
  .checkdel {
    margin-left: 10px;
    display: inline;
  }
}
::v-deep .el-dialog__body {
  padding: 0 20px;
}
::v-deep .el-form-item__label {
  text-align: start;
}
</style>