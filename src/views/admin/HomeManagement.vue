<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue'
import { lineChartData, pieChartData, columnChartData } from './Data/charData'

const curveShow = ref(null);
const pieShow = ref(null);
const columnShow = ref(null);
const main = ref(null);

let oChart = null;
let oPie = null;
let oColumn = null;

// 初始化折线图
const initLineChart = () => {
  if (curveShow.value) {
    oChart = echarts.init(curveShow.value);
    const { aList_all } = lineChartData;
    const aCount = [];
    const aDate = [];

    for (let i = 0; i < aList_all.length; i++) {
      aCount.push(aList_all[i].count);
      aDate.push(aList_all[i].date);
    }

    const chartopt = {
      title: {
        text: '月新增文章数',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['新增文章'],
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          name: '日',
          type: 'category',
          boundaryGap: false,
          data: aDate
        }
      ],
      yAxis: [
        {
          name: '月新增文章数',
          type: 'value'
        }
      ],
      series: [
        {
          name: '新增文章',
          type: 'line',
          smooth: true,
          // 移除 normal 层级，直接配置样式属性
          itemStyle: { 
            color: '#f80', 
            lineStyle: { color: '#f80' } 
          },
          // 移除 itemStyle.normal，直接使用 areaStyle
          areaStyle: { 
            type: 'default' 
          },
          data: aCount
        }
      ],
      grid: {
        show: true,
        x: 50,
        x2: 50,
        y: 80,
        height: 220
      }
    }

    oChart.setOption(chartopt)
  }
};

// 初始化饼图
const initPieChart = () => {
  if (pieShow.value) {
    oPie = echarts.init(pieShow.value);
    const oPieopt = {
      title: {
        top: 10,
        text: '分类文章数量比',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#ffb44c'],
      legend: {
        x: 'center',
        top: 65,
        data: ['前端', '后端', '移动端', '开发工具', '其它']
      },
      toolbox: {
        show: true,
        x: 'center',
        top: 35,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                x: '25%',
                width: '50%',
                funnelAlign: 'left',
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '65%'],
          data: pieChartData.seriesData
        }
      ]
    };
    oPie.setOption(oPieopt);
  }
};

// 初始化柱状图
const initColumnChart = () => {
  if (columnShow.value) {
    oColumn = echarts.init(columnShow.value);
    const oColumnopt = {
      title: {
        text: '文章访问量',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: columnChartData.seriesData.map(item => item.name),
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: columnChartData.xAxisData
        }
      ],
      yAxis: [
        {
          name: '访问量',
          type: 'value'
        }
      ],
      series: columnChartData.seriesData.map(item => ({
        ...item,
        type: 'bar',
        barWidth: 20,
        // 移除 normal 层级，直接配置样式属性
        itemStyle: { 
          color: getColor(item.name) 
        }
      })),
      grid: {
        show: true,
        x: 50,
        x2: 30,
        y: 80,
        height: 260
      },
      dataZoom: [
        {
          start: 0,
          end: 100 - 1000 / 31,
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0,
          height: 8,
          left: 45,
          right: 50,
          bottom: 26,
          handleColor: '#ddd',
          handleStyle: {
            borderColor: "#cacaca",
            borderWidth: "1",
            shadowBlur: 2,
            background: "#ddd",
            shadowColor: "#ddd",
          }
        }
      ]
    };

    function getColor(name) {
      const colorMap = {
        '前端': '#fd956a',
        '后端': '#2bb6db',
        '移动端': '#13cfd5',
        '开发工具': '#00ce68',
        '其它': '#ffab4c'
      };
      return colorMap[name];
    }

    oColumn.setOption(oColumnopt)
  }
};

onMounted(() => {
  initLineChart()
  initPieChart()
  initColumnChart()
});

onUnmounted(() => {
  if (oChart) {
    oChart.dispose()
  }
  if (oPie) {
    oPie.dispose()
  }
  if (oColumn) {
    oColumn.dispose()
  }
});

// 文章总数
import { adminGetArticleCount, adminGetArticleCustomDateCount } from '@/api/adminService'
const articleCount = ref(0) // 文章总数
const monthlyArticleCount = ref(0) // 月新增文章数
const getArticleState = async () => {
  const res = await adminGetArticleCount()
  articleCount.value = res.data.data.total
  const ress = await adminGetArticleCustomDateCount()
  // monthlyArticleCount.value = ress.data.data.total
  monthlyArticleCount.value = ress.data.data[0].count
}
getArticleState()


</script>

<template>
  <div id="home">
    <div class="article-count container-fluid">
      <div class="row spannel_list">
        <div class="col-sm-3 col-xs-6">
          <div class="spannel">
            <em>{{ articleCount }}</em><span>篇</span>
            <b>总文章数</b>
          </div>
        </div>
        <div class="col-sm-3 col-xs-6">
          <div class="spannel scolor01">
            <em>{{ monthlyArticleCount }}</em><span>篇</span>
            <b>月新增文章数</b>
          </div>
        </div>
        <div class="col-sm-3 col-xs-6">
          <div class="spannel scolor02">
            <em>35</em><span>条</span>
            <b>评论总数</b>
          </div>
        </div>
        <div class="col-sm-3 col-xs-6">
          <div class="spannel scolor03">
            <em>123</em><span>条</span>
            <b>月新增评论数</b>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row curve-pie">
        <div class="col-lg-8 col-md-8">
          <div class="gragh_pannel" ref="curveShow"></div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="gragh_pannel" ref="pieShow"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="column_pannel" ref="columnShow"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spannel_list{
  margin-top:20px;

  .spannel{
    height:100px;
    overflow:hidden;
    text-align:center;
    position:relative;
    background-color: var(--theme-second-bg);
    border:1px solid #e7e7e9;
    margin-bottom:20px;

    em {
      font-style:normal;
      font-size:50px;
      line-height:50px;
      display:inline-block;
      margin:10px 0 0 20px;
      font-family:'Arial';
      color:#83a2ed;
    }

    span {
      font-size:14px;
      display:inline-block;
      color:#83a2ed;
      margin-left:10px;
    }

    b {
      position:absolute;
      left:0;
      bottom:0;
      width:100%;
      line-height:24px;
      background:#e5e5e5;
      color:#333;
      font-size:14px;
      font-weight:normal;
    }
  }
}

.scolor01 em,.scolor01 span{
	color:#6ac6e2;
}

.scolor02 em,.scolor02 span{
	color:#5fd9de;
}

.scolor03 em,.scolor03 span{
	color:#58d88e;
}

.gragh_pannel{
  height:350px;
  border:1px solid #e7e7e9;
  background-color: var(--theme-second-bg)!important; 
  margin-bottom:20px;
}

.column_pannel{
  margin-bottom:20px;
  width: 100%;
  height:400px;
  border:1px solid #e7e7e9;
}
</style>