import { Chart } from '@antv/g2';
import { useEffect, useRef, useState } from 'react';

type DataItem = {
  [key: string]: string | number;
};

type LineChartProps = {
  data: DataItem[];
  height?: number;
  xField?: string;
  yField?: string;
  showLabel?: boolean;
  xLabel?: string;
  yLabel?: string;
  labelText?: string;
  labelOffset?: {
    dx?: number;
    dy?: number;
  };
  xAxisConfig?: {
    range?: [number, number];
  };
  yAxisConfig?: {
    min?: number;
    nice?: boolean;
  };
};

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 400,
  xField = 'hour',
  yField = 'value',
  showLabel = true,
  xLabel = '',
  yLabel = '',
  labelOffset = { dx: -10, dy: -12 },
  labelText = '',
  xAxisConfig = { range: [0, 1] },
  yAxisConfig = { min: 0, nice: true },
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<Chart | null>(null);

  // 初始化图表
  const init = () => {
    if (chartRef.current) {
      chart?.destroy();

      const newChart = new Chart({
        container: chartRef.current!,
        autoFit: true,
        height,
      });
      setChart(newChart);
      return newChart;
    }
    return null;
  };

  // 绘制图表
  const drawChart = (chartInstance: Chart | null) => {
    if (!chartInstance) return;
    // 设置数据
    chartInstance.data(data);
    // 设置坐标轴
    chartInstance
      .encode('x', xField)
      .encode('y', yField)
      .scale('x', {
        range: xAxisConfig.range,
      })
      .scale('y', {
        domainMin: yAxisConfig.min,
        nice: yAxisConfig.nice,
      })
      .axis('x', {
        title: xLabel, // 添加 x 轴标题
      })
      .axis('y', {
        title: yLabel, // 添加 y 轴标题
      });

    // 配置折线
    const line = chartInstance.line();
    // 配置标签
    if (showLabel) {
      line?.label({
        text: labelText,
        style: {
          dx: labelOffset.dx,
          dy: labelOffset.dy,
        },
      });
    }
    // 渲染
    chartInstance.render();
  };

  useEffect(() => {
    const newChart = init();
    drawChart(newChart);

    return () => {
      newChart?.destroy();
    };
  }, [data]); // 当数据变化时重新渲染图表

  return <div ref={chartRef}></div>;
};

export default LineChart;
