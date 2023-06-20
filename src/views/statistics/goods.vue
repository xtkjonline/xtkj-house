<template>
  <div class="box">
    <div class="time">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        size="small"
        v-model="time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" size="small" @click="getallorderdata"
        >查询</el-button
      >
    </div>
    <div class="mainbox">
      <div ref="main" class="maincharts"></div>
    </div>
  </div>
</template>

<script>
import { getordertotalreq } from "@/api/axios";
import { getymdhms, getymd, getmonth } from "@/utils/getymdhms";
export default {
  name: "xtkj",
  data() {
    return {
      amountdata: [],
      timedata: [],
      time: [new Date(2022, 12, 1, 10, 10), new Date(2023, 1, 1, 10, 10)],
    };
  },
  methods: {
    goodsstatistics() {
      var myChart = this.$echarts.init(this.$refs["main"]);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "订单金额",
          textStyle: {
            fontSize: "16",
          },
          left: "20",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["订单金额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.timedata,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "订单金额",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: this.amountdata,
          },
        ],
      });
    },
    getallorderdata() {
      let newtime = [];
      this.time.forEach((v) => {
        newtime.push(getymdhms(v));
      });
      getordertotalreq({
        date: JSON.stringify(newtime),
      }).then((res) => {
        if (res.status == 200) {
          this.amountdata = [];
          this.timedata = [];
          res.data.data.forEach((v) => {
            this.amountdata.push(v.orderAmount);
            this.timedata.push(getymd(v.orderTime));
          });
        }
      });
    },
  },
  mounted() {
    this.goodsstatistics();
  },
  watch: {
    timedata() {
      this.goodsstatistics();
    },
  },
  async created() {
    let newtime = [];
    this.time.forEach((v) => {
      newtime.push(getymdhms(v));
    });
    let res = await getordertotalreq({
      date: JSON.stringify(newtime),
    });
    if (res.status == 200) {
      this.amountdata = [];
      this.timedata = [];
      res.data.data.forEach((v) => {
        this.amountdata.push(v.orderAmount);
        this.timedata.push(getmonth(v.orderTime));
      });
    }
    this.goodsstatistics();
  },
};
</script>

<style scoped lang='scss'>
.box {
  margin: 20px;
  .time {
    span {
      margin-right: 10px;
      color: rgb(120, 122, 126);
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .mainbox {
    height: 440px;
    padding-top: 20px;
    background: white;
    margin: 20px 0;
  }
  .maincharts {
    width: 90%;
    height: 440px;
    background: white;
  }
}
</style>