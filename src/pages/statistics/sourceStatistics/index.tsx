import {
  getDataStatisticsGetDomainV2,
  getDataStatisticsGetSourceCountV2,
  getDataStatisticsGetTrackV2,
} from '@/services/api/dataStatistics';
import { useModel } from '@umijs/max';
import { Card, Form, Radio, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

type SelectOption = {
  label: string;
  value: string;
};

type RangeTypeValue = 'today' | 'yesterday' | 'last7days';

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

const SourceStatistics = () => {
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');

  const [trackList, setTrackList] = useState<SelectOption[]>([]);
  const [domainList, setDomainList] = useState<SelectOption[]>([]);

  const [referrerStatsList, setReferrerStatsList] = useState<any[]>([]);
  const [keywordStatsList, setKeywordStatsList] = useState<any[]>([]);

  const [searchData, setSearchData] = useState<RangeType>({
    rangeType: 'today',
    trackerId: '',
    domain: '',
  });

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

  const handleGetSourceCount = async () => {
    if (!searchData.trackerId) return;
    const { data } = await getDataStatisticsGetSourceCountV2({
      trackerId: searchData.trackerId,
      domain: searchData.domain,
      rangeType: searchData.rangeType,
    });

    const resData = data ? JSON.parse(data) : {};
    const { keywordStats = [], referrerStats = [] } = resData;

    setKeywordStatsList(keywordStats ?? []);
    setReferrerStatsList(referrerStats ?? []);
  };

  useEffect(() => {
    handleGetSourceCount();
  }, [searchData]);

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

      <div className={styles['table-container']}>
        <Card title="来源网址" style={{ flex: 1 }}>
          <Table
            dataSource={referrerStatsList}
            columns={[
              {
                title: '来源网址',
                dataIndex: 'referrer',
              },
              {
                title: '浏览量',
                dataIndex: 'count',
              },
            ]}
          />
        </Card>
        <Card title="搜索词" style={{ flex: 1 }}>
          <Table
            dataSource={keywordStatsList}
            columns={[
              {
                title: '搜索词',
                dataIndex: 'keyword',
              },
              {
                title: '浏览量',
                dataIndex: 'count',
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default SourceStatistics;
