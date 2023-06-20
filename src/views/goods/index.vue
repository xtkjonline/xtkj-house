<template>
  <div class="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品图片:">
                <span>{{ props.row.imgUrl }}</span>
              </el-form-item>
              <el-form-item label="商品评价:">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述:">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
              <el-form-item label="商品名称:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格:">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品销量:">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="所属分类" prop="category"> </el-table-column>
        <el-table-column label="商品价格" prop="price"> </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="props">
            <img width="40%" :src="props.row.imgUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="goodsDesc"> </el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import { getgoodslistreq, getdelgoodsreq } from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
    };
  },
  methods: {
    getgoodslist() {
      getgoodslistreq({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        name: "",
        category: "",
      }).then((res) => {
        if ((res.status == 200) & (res.statusText == "OK")) {
          if (res.data.data.length < 1 && this.currentPage != 1) {
            this.currentPage--;
            this.getgoodslist();
          }
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/layout/editgoods",
        query: {
          data: row,
        },
      });
    },
    handleDelete(index, row) {
      getdelgoodsreq({ id: row.id }).then((res) => {
        if (res.data.code == 0) {
          alert(res.data.msg);
          this.getgoodslist();
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getgoodslist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
    },
  },
  created() {
    this.getgoodslist();
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  .demo-table-expand {
    padding-left: 50px;
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table {
    margin-bottom: 20px;
  }
  .checkdel {
    margin-left: 10px;
    display: inline;
  }
}
</style>
