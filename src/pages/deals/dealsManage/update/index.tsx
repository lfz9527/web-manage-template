import { ImageWall, InputNumber, PageFooter } from '@/components';
import { getBrandGetBrandList } from '@/services/api/brand';
import {
  getDealsGetDealsById,
  getDealsGetDealsExpireTypeList,
  getDealsGetDealsTypeList,
  postDealsSaveDeals,
} from '@/services/api/deals';
import { getShopSiteGetShopSiteList } from '@/services/api/shopSite';
import { history, useParams } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// 表单字段类型
type FieldType = {
  dealsId: number;
  shopSiteId: number;
  brandId: number;
  imageId: number;
  dealsName: string;
  dealsCode: string;
  minAmount: number;
  minCount: number;
  dealsAmount: number;
  dealsDiscount: number;
  dealsType: number;
  startTime: string;
  endTime: string;
  expireDay: number;
  dealsNote: string;
  isShelves: boolean;
  isHot: boolean;
  expireType: number;
};

type SelectOption = {
  label: string;
  value: string;
};

const dateTimeFormat = 'YYYY-MM-DD HH:mm:00';

export default () => {
  const params = useParams<{ [key: string]: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  // 店铺列表
  const [shopSiteList, setShopSiteList] = useState<SelectOption[]>([]);
  // 品牌列表
  const [brandList, setBrandList] = useState<SelectOption[]>([]);
  // 优惠券类型
  const [dealsType, setDealsType] = useState<SelectOption[]>([]);
  // 优惠券过期时间类型列表
  const [expireType, setExpireTypeList] = useState<SelectOption[]>([]);

  const [expireTypeValue, setExpireTypeValue] = useState<number>(0);

  // 固定时间
  const isFixedTime = (value: number) => value === 1;
  // 固定天数
  const isFixedDay = (value: number) => value === 2;

  const [file, setFile] = useState({
    imgSrc: '',
    imageId: '',
  });

  // 获取店铺列表
  const getShopSiteList = async (name: string = '') => {
    const searchParams = {
      page: 1,
      count: 20,
      shopSiteName: name,
    };
    const { data } = await getShopSiteGetShopSiteList(searchParams);
    const { list } = data;
    setShopSiteList(
      list.map((item: any) => ({
        label: item.shopSiteName,
        value: item.shopSiteId,
      })),
    );
  };

  // 品牌列表
  const getBrandList = async (name: string = '') => {
    const searchParams = {
      page: 1,
      count: 20,
      brandName: name,
    };
    const { data } = await getBrandGetBrandList(searchParams);
    const { list } = data;
    setBrandList(
      list.map((item: any) => ({
        label: item.brandName,
        value: item.brandId,
      })),
    );
  };

  // 优惠券类型
  const getDealTypeList = async () => {
    const { data } = await getDealsGetDealsTypeList();
    setDealsType(
      data.map((item: any) => ({
        label: item.key,
        value: item.value,
      })),
    );
  };

  // 优惠券过期时间类型列表
  const getExpireTypeList = async () => {
    const { data } = await getDealsGetDealsExpireTypeList();
    setExpireTypeList(
      data.map((item: any) => ({
        label: item.key,
        value: item.value,
      })),
    );
    if (!params.id) {
      setExpireTypeValue(data?.[0]?.value || '');
    }
  };

  const getDealsById = async () => {
    const { data } = await getDealsGetDealsById({ id: Number(params.id) });
    console.log(data);

    const expireType =
      data.expireType === 0 || !data.expireType ? 1 : data.expireType;

    const formData = {
      ...data,
      expireType,
      startTime: [dayjs(data.startTime), dayjs(data.endTime)],
    };
    setExpireTypeValue(expireType);
    setFile({
      imgSrc: data.image.imgSrc,
      imageId: data.image.imageId,
    });
    form.setFieldsValue(formData);
  };

  useEffect(() => {
    getDealTypeList();
    getExpireTypeList();
    if (!params.id) {
      getShopSiteList();
      getBrandList();
    } else {
      getDealsById();
    }
  }, []);

  // 提交表单
  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    const [start, end] = values.startTime;

    const submitData = {
      ...values,
      imageId: Number(file.imageId),
      startTime: start ? dayjs(start).format(dateTimeFormat) : '',
      endTime: end ? dayjs(end).format(dateTimeFormat) : '',
      dealsId: params.id || 0,
    } as Partial<FieldType>;

    // 固定日期，则删除天数
    if (isFixedTime(values.expireType)) {
      submitData.expireDay = 0;
    }
    // 固定天数则删除  日期
    if (isFixedDay(values.expireType)) {
      submitData.startTime = '';
      submitData.endTime = '';
    }

    try {
      await postDealsSaveDeals(submitData);
      messageApi.success('操作成功');
      history.back();
    } finally {
      setLoading(false);
    }
  };

  // 表单值变化调试用
  const onValuesChange = (errorInfo: any) => {
    console.log(errorInfo);
  };

  // 返回
  const footerBack = () => {
    history.back();
  };

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 2,
            height: 20,
            backgroundColor: '#4096ff',
          }}
        ></div>
        <div>添加优惠券</div>
      </div>

      <Card>
        <Form
          form={form}
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
          initialValues={{
            isShelves: false,
            expireType: 1,
            isHot: false,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券店铺"
                name="shopSiteId"
                rules={[{ required: true, message: '请选择优惠券店铺' }]}
              >
                <Select
                  placeholder="请选择优惠券店铺"
                  options={shopSiteList}
                  filterOption={false}
                  defaultActiveFirstOption={false}
                  showSearch
                  onSearch={getShopSiteList}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券品牌"
                name="brandId"
                rules={[{ required: true, message: '请选择优惠券品牌' }]}
              >
                <Select
                  placeholder="请选择优惠券品牌"
                  options={brandList}
                  filterOption={false}
                  defaultActiveFirstOption={false}
                  showSearch
                  onSearch={getBrandList}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券名称"
                name="dealsName"
                rules={[{ required: true, message: '请输入优惠券名称' }]}
              >
                <Input placeholder="请输入优惠券名称" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券码"
                name="dealsCode"
                rules={[{ required: true, message: '请输入优惠券码' }]}
              >
                <Input placeholder="请输入优惠券码" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="最小消费金额"
                name="minAmount"
                rules={[{ required: true, message: '请输入最小消费金额' }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="请输入最小消费金额"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券金额"
                name="dealsAmount"
                rules={[{ required: true, message: '请输入优惠券金额' }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="请输入优惠券金额"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="最小消费数量"
                name="minCount"
                rules={[{ required: true, message: '请输入最小消费数量' }]}
              >
                <InputNumber
                  min={0}
                  step={1}
                  placeholder="请输入最小消费数量"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券类型"
                name="dealsType"
                rules={[{ required: true, message: '请选择优惠券类型' }]}
              >
                <Select placeholder="请选择优惠券类型" options={dealsType} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券折扣"
                tooltip={{ title: '80表示优惠80%', placement: 'top' }}
                name="dealsDiscount"
                rules={[{ required: true, message: '请选择优惠券类型' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  step={1}
                  placeholder="请输入优惠券折扣"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券过期时间类型"
                name="expireType"
                rules={[
                  { required: true, message: '请选择优惠券过期时间类型' },
                ]}
              >
                <Select
                  placeholder="请选择优惠券过期时间类型"
                  options={expireType}
                  onChange={(value) => {
                    setExpireTypeValue(value);
                  }}
                />
              </Form.Item>
            </Col>
            {expireTypeValue === 1 && (
              <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                <Form.Item<FieldType>
                  label="优惠券有效期"
                  name="startTime"
                  rules={[{ required: true, message: '请选择优惠券有效期' }]}
                >
                  <RangePicker
                    showTime={{
                      format: 'HH:mm',
                      showSecond: false,
                    }}
                    format={dateTimeFormat}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            )}
            {expireTypeValue === 2 && (
              <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                <Form.Item<FieldType>
                  label="过期天数"
                  name="expireDay"
                  rules={[{ required: true, message: '请输入过期天数' }]}
                >
                  <InputNumber min={0} placeholder="请输入过期天数" />
                </Form.Item>
              </Col>
            )}

            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="是否上架"
                name="isShelves"
                rules={[{ required: true, message: '请选择是否上架' }]}
              >
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="是否热门"
                name="isHot"
                rules={[{ required: true, message: '请选择是否热销' }]}
              >
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Form.Item<FieldType>
                label="优惠券封面"
                name="imageId"
                rules={[{ required: true, message: '请上传优惠券封面' }]}
              >
                <ImageWall
                  fileList={[file]
                    .map((v) => ({ url: v.imgSrc }))
                    .filter((v) => v.url)}
                  onChange={(fileList) => {
                    const [first] = fileList;
                    const file = first?.response?.data;
                    setFile({
                      imgSrc: file.imgSrc,
                      imageId: file.imageId,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item<FieldType> label="优惠券备注" name="dealsNote">
                <TextArea placeholder="请输入优惠券备注" rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <PageFooter
        buttons={
          <>
            <Button
              loading={loading}
              type="primary"
              onClick={() => form.submit()}
            >
              确定
            </Button>
            <Button onClick={footerBack}>返回</Button>
          </>
        }
      ></PageFooter>

      {messageContextHolder}
    </div>
  );
};
