import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from 'config';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { chartActions } from '../../_actions';


const chartData = (initData) => {
  let chartData = [];

  if (initData) {
    initData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    //predictionData.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    initData.map((item, key) => {
      let chartItem = {
        x: new Date(item.date).getTime(),
        y: item.quantity
      };
      chartData.push(chartItem);
    });
  }
  return chartData;
}

export const AppChart = () => {
  const initData = useSelector(state => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chartActions.getChartData())
  }, [dispatch])
  const options = {
    title: {
      text: 'Stocks - Performance over time',
      style: {
        color: config.primaryColor,
        fontWeight: 'bold'
      }
    },
    chart: {
      zoomType: 'xy'
    },
    xAxis: {
      title: {
        text: 'Date',
      },
      type: 'datetime',
      tickLength: 0,
      tickInterval: 24 * 3600 * 1000,
      labels: {
        format: '{value:%d/%m/%y}'
      },
      gridLineWidth: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
    },
    yAxis: {
      title: {
        text: 'Quantity',
      },
      opposite: false,
      gridLineWidth: 1,
    },
    series: [{
      name: 'Quantity',
      showInLegend: false,
      data: chartData(initData.data),
      zIndex: 1,
      color: config.primaryColor,
      lineWidth: 0.5,
      marker: {
        fillColor: config.primaryColor,
        lineColor: config.secondaryColor,
        lineWidth: 1,
      },
      turboThreshold: 10000
    }]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}
