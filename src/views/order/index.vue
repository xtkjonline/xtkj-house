<template>
  <div class="box">
    <div class="inputbox">
      <el-form
        inline
        :model="senddata"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="订单号" prop="orderNo">
          <el-input
            v-model="senddata.orderNo"
            placeholder="6位订单号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consignee">
          <el-input
            v-model="senddata.consignee"
            placeholder="收货人"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="senddata.phone"
            placeholder="手机号"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择" prop="orderState">
          <el-select
            v-model="senddata.orderState"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            size="small"
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="getallgoodsdata('ruleForm')"
            >查询</el-button
          >
          <el-button @click="resetForm('ruleForm')" size="small"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border height="400" style="width: 80vw">
      <el-table-column fixed prop="orderNo" label="订单号" width="120">
      </el-table-column>
      <el-table-column label="下单时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.orderTime | getnyrsfm }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120">
      </el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300">
      </el-table-column>
      <el-table-column label="送达时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.deliveryTime | getnyrsfm }}
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120">
      </el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-popover placement="right" width="800" trigger="click">
            <el-table :data="[scope.row]">
              <el-table-column fixed prop="orderNo" label="订单号" width="120">
              </el-table-column>
              <el-table-column prop="id" label="订单id" width="150">
              </el-table-column>
              <el-table-column label="下单时间" width="120">
                <template slot-scope="scope">
                  {{ scope.row.orderTime | getnyrsfm }}
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="手机号" width="120">
              </el-table-column>
              <el-table-column prop="consignee" label="收货人" width="120">
              </el-table-column>
              <el-table-column
                prop="deliverAddress"
                label="配送地址"
                width="300"
              >
              </el-table-column>
              <el-table-column label="送达时间" width="120">
                <template slot-scope="scope">
                  {{ scope.row.deliveryTime | getnyrsfm }}
                </template>
              </el-table-column>
              <el-table-column prop="remarks" label="用户备注" width="120">
              </el-table-column>
              <el-table-column prop="orderAmount" label="订单金额" width="120">
              </el-table-column>
              <el-table-column prop="orderState" label="订单状态" width="120">
              </el-table-column>
            </el-table>
            <el-button type="text" size="small" slot="reference"
              >查看</el-button
            ></el-popover
          >
          <el-popover
            width="800"
            trigger="manual"
            v-model="tableData[scope.$index].visible"
            :ref="`popover-${scope.row.id}`"
          >
            <el-table :data="[changedata]">
              <el-table-column label="订单号" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.orderNo"
                    :placeholder="scope.row.orderNo"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="订单id" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.id"
                    :placeholder="scope.row.id"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="下单时间" width="150">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="changedata.orderTime"
                    type="datetime"
                    :placeholder="scope.row.orderTime | getnyrsfm"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="手机号" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.phone"
                    :placeholder="scope.row.phone"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="收货人" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.consignee"
                    :placeholder="scope.row.consignee"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="配送地址" width="300">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.deliverAddress"
                    :placeholder="scope.row.deliverAddress"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="送达时间" width="150">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="changedata.deliveryTime"
                    type="datetime"
                    :placeholder="scope.row.deliveryTime | getnyrsfm"
                  >
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="用户备注" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.remarks"
                    :placeholder="scope.row.remarks"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="订单金额" width="120">
                <template slot-scope="scope">
                  <el-input
                    v-model="changedata.orderAmount"
                    :placeholder="scope.row.orderAmount"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="120">
                <template slot-scope="scope">
                  <el-select
                    v-model="changedata.orderState"
                    :placeholder="scope.row.orderState"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <el-button size="small" @click="handleChange(scope.row)"
                  >提交</el-button
                >
              </el-table-column>
            </el-table>
            <el-button
              type="text"
              size="small"
              slot="reference"
              @click="asd(scope.$index, scope.row)"
              >编辑</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="senddata.currentPage"
      :page-sizes="[1, 5, 7, 10]"
      :page-size="senddata.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totle"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getorderlistreq,
  getorderdetailreq,
  postchangeorderreq,
} from "@/api/axios";
import { getymdhmsnew } from "@/utils/getymdhms";
export default {
  name: "xtkj",
  data() {
    var valorderNo = (rule, value, callback) => {
      if (value === "") {
        callback();
      }
      if (/^\w{1,23}/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入1-23位字符"));
      }
    };
    var valconsignee = (rule, value, callback) => {
      if (value === "") {
        callback();
      }
      if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入2-4位字符"));
      }
    };
    var valphone = (rule, value, callback) => {
      if (value === "") {
        callback();
      }
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入11位字符"));
      }
    };
    var valorderState = (rule, value, callback) => {
      if (value === "") {
        callback();
      }
      if (value != "") {
        callback();
      } else {
        callback(new Error("请输入订单状态"));
      }
    };
    return {
      senddata: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        currentPage: 1,
        pageSize: 5,
        date: [],
      },
      tableData: [],
      time: [],
      visible: false,
      changedata: {
        orderTime: "",
        deliveryTime: "",
        id: 0,
        orderNo: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        remarks: "",
        orderAmount: "",
        orderState: "",
      },
      orderTime: "",
      deliveryTime: "",
      totle: 0,
      options: [
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      rules: {
        orderNo: [{ validator: valorderNo, trigger: "blur" }],
        consignee: [{ validator: valconsignee, trigger: "blur" }],
        phone: [{ validator: valphone, trigger: "blur" }],
        orderState: [{ validator: valorderState, trigger: "blur" }],
      },
      rule: [
        function time(time) {
          return time != "";
        },
      ],
    };
  },
  methods: {
    async getorderlist() {
      this.senddata.date = getymdhmsnew(this.time);
      let res = await getorderlistreq(this.senddata);
      if (res.status == 200) {
        if (res.data.data.length < 1 && this.senddata.currentPage != 1) {
          this.senddata.currentPage--;
          this.getorderlist();
        }
        this.tableData = res.data.data;
        this.tableData.forEach((v, i) => {
          this.tableData.visible = false;
        });
        this.totle = res.data.total;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    getallgoodsdata(formName) {
      this.$refs[formName].validate((valid) => {
        let time = this.rule[0](this.time);
        if (valid && time) {
          this.getorderlist();
        }
      });
    },
    async handleChange(row) {
      let newdata = {};
      Object.keys(this.changedata).forEach((v, i) => {
        if (v != "visible") {
          newdata[v] = Object.values(this.changedata)[i];
        }
      });
      newdata.deliveryTime = this.$dayjs(newdata.deliveryTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      newdata.orderTime = this.$dayjs(newdata.orderTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let res = await postchangeorderreq(newdata);
      if (res.status == 200) {
        this.getorderlist();
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
    },
    handleSizeChange(val) {
      this.senddata.pageSize = val;
      this.getorderlist();
    },
    handleCurrentChange(val) {
      this.senddata.currentPage = val;
      this.getorderlist();
    },
    asd(index, row) {
      this.tableData[index].visible = !this.tableData[index].visible;
      //表格搭配popover时，如果表格有一格时固定的，就会出现三个弹出框，用下面这个方法解决
      const key = "popover-" + row.id;
      this.$nextTick(() => {
        // 详见console.log(this.$refs[key])
        this.$refs[key].$refs.popper.previousSibling.style.display = "none";
        this.$refs[
          key
        ].$refs.popper.previousSibling.previousSibling.style.display = "none";
      });
      this.changedata = JSON.parse(JSON.stringify(row));
      // 在changedata里面处理掉visible
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.senddata.currentPage = 1;
      this.time = [];
    },
  },
};
</script>

<style scoped lang='scss'>
.inputbox {
  width: 80%;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-right: 10px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    display: flex;
    align-items: center;
    span {
      margin-right: 15px;
      font-size: 12px;
      width: 66px;
      // text-align: end;
      color: #787a7e;
    }
    // ::v-deep .el-input__inner {
    //   width: 80%;
    // }
    // ::v-deep .el-input {
    //   width: 70%;
    // }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
.box {
  display: block;
  margin: 20px;
  padding: 15px 10px;
  background: white;
  .time {
    margin-bottom: 20px;
    span {
      margin-right: 10px;
      color: rgb(120, 122, 126);
      font-size: 12px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  // .tablebox {
  //   // flex: 1;
  // }
}
</style>