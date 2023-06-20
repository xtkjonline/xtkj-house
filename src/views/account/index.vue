<template>
  <div class="box">
    <el-card>
      <div slot="header" class="clearfix">
        <span>账户列表</span>
      </div>
      <el-table
        size="mini"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="账号">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{
            scope.row.ctime | getnyrsfm
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
        :total="total"
      >
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="open" type="danger" size=" small" v-btn="['super']"
          >批量删除</el-button
        >
        <el-button @click="toggleSelection()" type="primary" size=" small"
          >取消选择</el-button
        >
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" :close="handleClose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="账   号" prop="account" class="title">
          <el-input
            type="text"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup" class="title">
          <el-select v-model="ruleForm.userGroup" placeholder="请选择用户组">
            <el-option label="" value=""></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getuserlist,
  getdelyserReq,
  postbatchdeluserReq,
  postusereditReq,
} from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    var validateaccount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入账号"));
      }
      if (/^.{1,9}/.test(value)) {
        callback();
      } else {
        callback(new Error("1-10位账号"));
      }
    };
    var checkusergroup = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("用户组不能为空"));
      }
    };
    return {
      currentPage: 1,
      pagesize: 5,
      total: 0,
      tableData: [],
      multipleSelection: [],
      checkdelarr: [],
      dialogVisible: false,
      ruleForm: {
        account: "",
        userGroup: "",
      },
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        userGroup: [{ validator: checkusergroup, trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.ruleForm);
      this.dialogVisible = false;
      postusereditReq({
        id: this.ruleForm.id,
        account: this.ruleForm.account,
        userGroup: this.ruleForm.userGroup,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    getuslist() {
      // this.pagesize = 100;
      getuserlist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
      }).then((res) => {
        if ((res.status == 200) & (res.statusText == "OK")) {
          if (res.data.data.length < 1 && this.currentPage != 1) {
            this.currentPage--;
            this.getuslist();
          }
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(row));
    },
    handleDelete(index, row) {
      getdelyserReq({
        id: row.id,
      }).then((res) => {
        if (res.data.code == 0) {
          this.getuslist();
        }
      });
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.checkdelarr = [];
          this.multipleSelection.forEach((v, i) => {
            this.checkdelarr.push(v.id);
          });
          postbatchdeluserReq({
            ids: this.checkdelarr,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getuslist();
            } else {
              this.$message({
                message: picres.data.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    checkselect() {},
    handleSizeChange(val) {
      this.pagesize = val;
      this.getuslist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuslist();
    },
  },
  created() {
    this.getuslist();
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  .el-pagination {
    margin-top: 20px;
  }
  .el-table-column {
    .el-button {
      margin-right: 15px;
    }
  }
  .checkdel {
    margin-left: 10px;
    display: inline;
  }
  ::v-deep .el-dialog {
    width: 420px;
  }
  .demo-ruleForm {
    margin: 20px 0;
    width: 360px;
    .el-form-item__label {
      text-align: start;
    }
    .el-form-item {
      display: flex;
      justify-content: space-between;
      ::v-deep .el-input__inner {
        width: 300px;
      }
    }
  }
}
</style>