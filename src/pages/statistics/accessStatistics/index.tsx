import { Chart } from '@/components';
import {
  getDataStatisticsGetDomainV2,
  getDataStatisticsGetStatsHourlyV2,
  getDataStatisticsGetTrackV2,
} from '@/services/api/dataStatistics';
import { useModel } from '@umijs/max';
import { Button, Card, Form, Radio, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.less';

type SelectOption = {
  label: string;
  value: string;
};

type RangeTypeValue = 'today' | 'yesterday' | 'last7days';

type LineDataEnum = 'pv' | 'uv' | 'avg';

type TotalLineData = {
  [key in LineDataEnum]: {
    hour: string;
    value: number;
  }[];
};

type ToolBar = {
  label: string;
  value: LineDataEnum;
};

type RangeType = {
  rangeType: RangeTypeValue;
  trackerId: string;
  domain: string;
};

const rangeType = [
  { label: '今天', value: 'today' },
  { label: '昨天', value: 'yesterday' },
  { label: '最近七天', value: 'last7days' },
];

const toolBar: ToolBar[] = [
  { label: 'PV', value: 'pv' },
  { label: 'UV', value: 'uv' },
  { label: '平均时长', value: 'avg' },
];

const AccessStatistics = () => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');

  const [searchData, setSearchData] = useState<RangeType>({
    rangeType: 'today',
    trackerId: '',
    domain: '',
  });

  const [trackList, setTrackList] = useState<SelectOption[]>([]);
  const [domainList, setDomainList] = useState<SelectOption[]>([]);
  // 数据列表
  const [dataList, setDataList] = useState<any[]>([]);

  const [activeToolBar, setActiveToolBar] = useState<string>(toolBar[0].value);

  const [totalLineData, setTotalLineData] = useState<TotalLineData>({
    pv: [],
    uv: [],
    avg: [],
  });

  const handleFormatLineData = (data: any[]) => {
    const hoursInDay = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return {
        hour,
        value: 0,
      };
    });

    const pvData = JSON.parse(JSON.stringify(hoursInDay));
    const uvData = JSON.parse(JSON.stringify(hoursInDay));
    const avgData = JSON.parse(JSON.stringify(hoursInDay));

    console.log(1222, data);

    data.forEach((d) => {
      // 取 hour 中的具体小时数
      let h = new Date(d.hour).getHours();

      // 填充到对应数组
      pvData[h].value = d.pv;
      uvData[h].value = d.uv;
      avgData[h].value = d.avgDuration;
    });

    setTotalLineData({
      pv: pvData,
      uv: uvData,
      avg: avgData,
    });
  };
  console.log(totalLineData);

  // 获取数据块
  const handleGetLineChartData = async () => {
    if (!searchData.trackerId) {
      return;
    }
    const { data } = await getDataStatisticsGetStatsHourlyV2({
      ...searchData,
    });
    const resData = data ? JSON.parse(data) : {};
    setDataList([
      { label: '总PV', value: resData.pv },
      { label: '总UV', value: resData.uv },
      { label: '平均时长', value: resData.avgDuration },
    ]);

    handleFormatLineData(resData.hourlyDetails);
  };

  useEffect(() => {
    handleGetLineChartData();
  }, [searchData]);

  // 获取域名列表
  const handleGetDomainList = async (trackerId: string) => {
    const { data } = await getDataStatisticsGetDomainV2({
      trackerId: trackerId,
    });
    const list = data ? JSON.parse(data) : [];
    setDomainList((state) => [
      ...state,
      {
        label: '全部',
        value: '',
      },
      ...list
        .filter(Boolean)
        .map((item: any) => ({ label: item, value: item })),
    ]);
  };

  // 获取追踪器列表
  const handleGetTrackList = async () => {
    const { data } = await getDataStatisticsGetTrackV2({
      account: initialState?.name,
    });
    const list = data ? JSON.parse(data) : [];
    setTrackList(
      list.map((item: any) => ({
        label: item.trackerName,
        value: item.trackerId,
      })),
    );
    setSearchData({
      ...searchData,
      trackerId: list[0].trackerId,
    });

    form.setFieldsValue({
      trackerId: list[0].trackerId,
    });

    handleGetDomainList(list[0].trackerId);
  };

  useEffect(() => {
    handleGetTrackList();
  }, []);

  const handleClickToolBar = (value: string) => {
    setActiveToolBar(value);
  };

  const getLineData = useCallback(() => {
    // console.log(totalLineData[activeToolBar as LineDataEnum]);

    return totalLineData[activeToolBar as LineDataEnum];
  }, [activeToolBar, totalLineData]);

  const onValuesChange = (changedValues: any) => {
    setSearchData({
      ...searchData,
      ...changedValues,
    });
  };

  return (
    <div className={styles.container}>
      <Card>
        <Form
          layout="inline"
          form={form}
          onValuesChange={onValuesChange}
          initialValues={{
            ...searchData,
          }}
        >
          <Form.Item label="追踪器" name="trackerId">
            <Select
              placeholder="请选择追踪器"
              style={{ width: 200 }}
              options={trackList}
            />
          </Form.Item>
          <Form.Item label="域名" name="domain">
            <Select
              placeholder="请选择域名"
              allowClear
              style={{ width: 200 }}
              options={domainList}
            />
          </Form.Item>
          <Form.Item label="时间范围" name="rangeType">
            <Radio.Group>
              {rangeType.map((item) => (
                <Radio.Button key={item.value} value={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>

      <div className={styles['data-list']}>
        {dataList.map((item) => (
          <div key={item.label} className={styles['data-list-item']}>
            <div className={styles['data-list-item-title']}>{item.label}</div>
            <div className={styles['data-list-item-value']}>{item.value}</div>
          </div>
        ))}
      </div>

      <Card>
        <div className={styles['tool-bar']}>
          {toolBar.map((item) => (
            <Button
              key={item.value}
              type={activeToolBar === item.value ? 'primary' : 'default'}
              style={{ width: 100 }}
              onClick={() => handleClickToolBar(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <Chart.LineChart
          data={getLineData()}
          height={500}
          showLabel={false}
          yLabel=""
          xLabel="小时"
        />
      </Card>
    </div>
  );
};

export default AccessStatistics;
