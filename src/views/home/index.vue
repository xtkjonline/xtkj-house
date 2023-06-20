<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span class="iconfont" style="color: #1296db">&#xe603;</span>
          <div>
            <p>总订单</p>
            <span>{{ data.totalOrder }}</span>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span class="iconfont" style="color: #d4237a">&#xe67c;</span>
          <div>
            <p>总销售额</p>
            <span> {{ data.totalAmount }} </span>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span class="iconfont" style="color: #1296db">&#xe645;</span>
          <div>
            <p>今日订单数</p>
            <span> {{ data.todayOrder }} </span>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <span class="iconfont" style="color: #1afa29">&#xe643;</span>
          <div>
            <p>今日销售额</p>
            <span> {{ data.totayAmount }} </span>
          </div>
        </div></el-col
      >
    </el-row>
    <div ref="main" class="maincharts"></div>
  </div>
</template>

<script>
import { gettotaldatareq } from "@/api/axios";
export default {
  name: "xtkj",
  data() {
    return {
      data: {},
    };
  },

  methods: {
    homedataall() {
      var myChart = this.$echarts.init(this.$refs["main"]);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理员人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "Total",
            data: this.data.orderData,
          },
          {
            name: "销售额",
            type: "line",
            stack: "Total",
            data: this.data.amountData,
          },
          {
            name: "注册人数",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "管理员人数",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      });
    },
  },
  created() {
    gettotaldatareq().then((res) => {
      if ((res.status == 200) & (res.statusText == "OK")) {
        this.data = res.data;
      }
    });
  },
  watch: {
    data() {
      this.homedataall();
    },
  },
};
</script>

<style scoped lang='scss'>
.box {
  .el-row {
    width: 100%;
    margin: 20px;
    padding-left: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 80px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    text-align: center;
    .iconfont {
      font-size: 60px;
    }
    p {
      color: #cecece;
      margin: 0;
      line-height: 24px;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .maincharts {
    height: 360px;
    margin: 20px;
    padding: 20px;
    background: white;
  }
}
</style>