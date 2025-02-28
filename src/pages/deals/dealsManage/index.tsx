import {
  getDealsGetDealsById,
  getDealsGetDealsList,
  postDealsDeleteDeals,
  postDealsEditDeals,
  postDealsHotDeals,
  postDealsShelvesDeals,
} from '@/services/api/deals';
import { postImageUploadImage } from '@/services/api/image';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Space,
  Upload,
  UploadProps,
} from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';

// 优惠券列表项数据类型
type DealsItem = {
  createTime: string;
  dealsId: number;
  shopSiteId: number;
  shopSite: {
    shopSiteId: number;
    shopSiteName: string;
    clearShopSiteName: string | null;
    shopSiteTitle: string | null;
    describe: string;
    link: string;
    siteType: string | null;
    logoImageId: number;
    logoImage: any | null;
    emails: string | null;
    tels: string | null;
    yearOpened: number;
    starLevel: number;
    isOnline: boolean;
    isHot: boolean;
    hotTime: string;
    goodCount: number;
    state: number;
    updateTime: string;
    createTime: string;
  };
  brandId: number;
  brand: {
    brandId: number;
    goodCategoryId: number;
    brandName: string;
    brandDescribe: string;
    logoImageId: number;
    logoImage: any | null;
    logoImageBackground: string;
    isOnline: boolean;
    isHot: boolean;
    hotTime: string;
    goodCount: number;
    createTime: string;
  };
  dealsName: string;
  dealsCode: string;
  imageId: number;
  image: {
    imageId: number;
    imgSrc: string;
    width: number;
    height: number;
    size: number;
    hash: string;
    createTime: string;
  };
  minAmount: number;
  minCount: number;
  dealsAmount: number;
  dealsDiscount: number;
  dealsType: number;
  startTime: string;
  endTime: string;
  expireDay: number;
  dealsNote: string;
  browserCount: number;
  clickCount: number;
  isShelves: boolean;
  isHot: boolean;
  hotTime: string;
};

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
};

// 文件类型
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// 文件信息类型
type fileInfoType = {
  imgSrc: string;
  imageId: string;
  height: number;
  size: number;
  width: number;
};

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [dealsId, setDealsId] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [websiteLogo, setWebsiteLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  // 打开创建/编辑模态框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    setDealsId(0);
    setWebsiteLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  // 编辑优惠券信息
  const handleEditDeals = async (id: number) => {
    setDealsId(id);
    try {
      const data = (await getDealsGetDealsById({ id })) as any;
      const startTimeMoment = data.startTime
        ? moment(data.startTime, 'YYYY-MM-DD HH:mm:ss')
        : null;
      const endTimeMoment = data.endTime
        ? moment(data.endTime, 'YYYY-MM-DD HH:mm:ss')
        : null;
      console.log(startTimeMoment);
      form.setFieldsValue({
        shopSiteId: data.shopSiteId,
        brandId: data.brandId,
        dealsName: data.dealsName,
        dealsCode: data.dealsCode,
        minAmount: data.minAmount,
        minCount: data.minCount,
        dealsAmount: data.dealsAmount,
        dealsDiscount: data.dealsDiscount,
        dealsType: data.dealsType,
        startTime: startTimeMoment,
        endTime: endTimeMoment,
        expireDay: data.expireDay,
        dealsNote: data.dealsNote,
        isShelves: data.isShelves,
        isHot: data.isHot,
      });
      setWebsiteLogo({
        imgSrc: data.image.imgSrc,
        imageId: String(data.imageId),
        height: data.image.height,
        size: data.image.size,
        width: data.image.width,
      });
      setOpenCreateDialog(true);
    } catch (error) {
      console.log(error);
      messageApi.error('获取优惠券信息失败');
    }
  };

  // 上下架操作
  const handleShelvesDeals = async (id: number, isShelves: boolean) => {
    try {
      await postDealsShelvesDeals({ ids: [id], isShelves: !isShelves });
      messageApi.success(isShelves ? '下架成功' : '上架成功');
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(isShelves ? '下架失败' : '上架失败');
    }
  };

  // 上下热门操作
  const handleHotDeals = async (id: number, isHot: boolean) => {
    try {
      await postDealsHotDeals({ ids: [id], isHot: !isHot });
      messageApi.success(isHot ? '取消热门成功' : '设置热门成功');
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(isHot ? '取消热门失败' : '设置热门失败');
    }
  };

  // 删除优惠券
  const handleDeleteDeals = async (id: number) => {
    await modal.confirm({
      title: '确定删除该优惠券吗？',
      centered: true,
      onOk: async () => {
        try {
          await postDealsDeleteDeals({ id });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // 批量上架
  const handleBatchShelveOn = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请选择要上架的优惠券');
      return;
    }
    try {
      await postDealsShelvesDeals({ ids: selectedRowKeys, isShelves: true });
      messageApi.success('批量上架成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量上架失败');
    }
  };

  // 批量下架
  const handleBatchShelveOff = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请选择要下架的优惠券');
      return;
    }
    try {
      await postDealsShelvesDeals({ ids: selectedRowKeys, isShelves: false });
      messageApi.success('批量下架成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量下架失败');
    }
  };

  // 批量上热门
  const handleBatchSetHot = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请选择要设置热门的优惠券');
      return;
    }
    try {
      await postDealsHotDeals({ ids: selectedRowKeys, isHot: true });
      messageApi.success('批量上热门成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量上热门失败');
    }
  };

  // 批量下热门
  const handleBatchRemoveHot = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请选择要取消热门的优惠券');
      return;
    }
    try {
      await postDealsHotDeals({ ids: selectedRowKeys, isHot: false });
      messageApi.success('批量下热门成功');
      actionRef.current?.reload();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量下热门失败');
    }
  };

  // 处理图片上传
  const handleUpload = async (file: FileType) => {
    try {
      setUploadLoading(true);
      // 这里假设你有图片上传接口
      const data = (await postImageUploadImage({
        file: file,
      })) as fileInfoType;
      const { imgSrc, imageId, height, size, width } = data;
      setUploadLoading(false);
      setWebsiteLogo({
        imgSrc,
        imageId,
        height,
        size,
        width,
      });
    } catch (error) {
      messageApi.error('图片上传失败');
      setUploadLoading(false);
    }
  };

  // 表格列定义
  const columns: ProColumns<DealsItem>[] = [
    {
      titleRender: (_, props) => (
        <Checkbox
          checked={props.selectedRowKeys.length === props.dataSource.length}
          indeterminate={
            props.selectedRowKeys.length > 0 &&
            props.selectedRowKeys.length < props.dataSource.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(
                props.dataSource.map((item: DealsItem) => item.dealsId),
              );
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      search: false,
    },
    {
      title: 'ID',
      dataIndex: 'dealsId',
      width: 60,
      search: false,
    },
    {
      title: '封面',
      dataIndex: ['image', 'imgSrc'],
      search: false,
      render: (text) => <Avatar src={text} />,
    },
    {
      title: '名称',
      dataIndex: 'dealsName',
      search: true,
    },
    {
      title: '品牌',
      dataIndex: ['brand', 'brandName'],
      search: false,
    },
    {
      title: '站点 ID',
      dataIndex: 'shopSiteId',
      search: false,
    },
    {
      title: '优惠折扣',
      dataIndex: 'dealsDiscount',
      search: false,
    },
    {
      title: '优惠码',
      dataIndex: 'dealsCode',
      search: false,
    },
    {
      title: '优惠券类型',
      dataIndex: 'dealsType',
      search: false,
    },
    {
      title: '有效期',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '有效天数',
      dataIndex: 'expireDay',
      search: false,
    },
    {
      title: '浏览',
      dataIndex: 'browserCount',
      search: false,
    },
    {
      title: '点击',
      dataIndex: 'clickCount',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          key="edit"
          type="link"
          onClick={() => handleEditDeals(record.dealsId)}
        >
          编辑
        </a>,
        <a
          key="shelves"
          type="link"
          onClick={() => handleShelvesDeals(record.dealsId, record.isShelves)}
        >
          {record.isShelves ? '下架' : '上架'}
        </a>,
        <a
          key="hot"
          type="link"
          onClick={() => handleHotDeals(record.dealsId, record.isHot)}
        >
          {record.isHot ? '下热门' : '上热门'}
        </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          type="link"
          onClick={() => handleDeleteDeals(record.dealsId)}
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  // 创建或更新优惠券
  const handleCreateOrUpdateDeals = async (values: FieldType) => {
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      dealsId: dealsId,
      imageId: Number(websiteLogo.imageId),
    };
    try {
      await postDealsEditDeals(params);
      messageApi.success(dealsId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(dealsId ? '更新失败' : '新增失败');
      setCreateLoading(false);
    }
  };

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setDealsId(0);
    setCreateLoading(false);
    setOpenCreateDialog(false);
    setWebsiteLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
  };

  // 上传按钮组件
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{uploadLoading ? '上传中...' : '上传'}</div>
    </button>
  );

  return (
    <>
      {messageContextHolder}
      <ProTable<DealsItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
          };
          try {
            const { list = [], total = 0 } = (await getDealsGetDealsList(
              searchParams,
            )) as any;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取优惠券列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="dealsId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page) => console.log(page),
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => handleBatchShelveOn()}>批量上架</a>
              <a onClick={() => handleBatchShelveOff()}>批量下架</a>
              <a onClick={() => handleBatchSetHot()}>批量上热门</a>
              <a onClick={() => handleBatchRemoveHot()}>批量下热门</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleOpenCreateDialog}
            type="primary"
          >
            新建
          </Button>,
        ]}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
      <Modal
        title={dealsId ? '编辑优惠券信息' : '新增优惠券信息'}
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        width={800}
        afterClose={resetForm}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          onFinish={handleCreateOrUpdateDeals}
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label="独立站点 ID"
            name="shopSiteId"
            rules={[{ required: true, message: '请输入独立站点 ID' }]}
          >
            <Input placeholder="请输入独立站点 ID" />
          </Form.Item>
          <Form.Item<FieldType>
            label="品牌 ID"
            name="brandId"
            rules={[{ required: true, message: '请输入品牌 ID' }]}
          >
            <Input placeholder="请输入品牌 ID" />
          </Form.Item>
          <Form.Item<FieldType> label="图片">
            <Upload
              name="logo"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false}
              customRequest={({ file }) => handleUpload(file)}
            >
              {websiteLogo.imgSrc ? (
                <Image
                  src={websiteLogo.imgSrc}
                  alt="logo"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="名称"
            name="dealsName"
            rules={[{ required: true, message: '请输入优惠券名称' }]}
          >
            <Input placeholder="请输入优惠券名称" />
          </Form.Item>
          <Form.Item<FieldType>
            label="优惠券码"
            name="dealsCode"
            rules={[{ required: true, message: '请输入优惠券码' }]}
          >
            <Input placeholder="请输入优惠券码" />
          </Form.Item>
          <Form.Item<FieldType>
            label="最小消费金额"
            name="minAmount"
            rules={[{ required: true, message: '请输入最小消费金额' }]}
          >
            <Input placeholder="请输入最小消费金额" />
          </Form.Item>
          <Form.Item<FieldType>
            label="最小消费数量"
            name="minCount"
            rules={[{ required: true, message: '请输入最小消费数量' }]}
          >
            <Input placeholder="请输入最小消费数量" />
          </Form.Item>
          <Form.Item<FieldType>
            label="优惠券金额"
            name="dealsAmount"
            rules={[{ required: true, message: '请输入优惠券金额' }]}
          >
            <Input placeholder="请输入优惠券金额" />
          </Form.Item>
          <Form.Item<FieldType>
            label="优惠券折扣(80表示优惠80%)"
            name="dealsDiscount"
            rules={[{ required: true, message: '请输入优惠券折扣' }]}
          >
            <Input placeholder="请输入优惠券折扣" />
          </Form.Item>
          <Form.Item<FieldType>
            label="优惠券类型"
            name="dealsType"
            rules={[{ required: true, message: '请输入优惠券类型' }]}
          >
            <Input placeholder="请输入优惠券类型" />
          </Form.Item>
          <Form.Item<FieldType>
            label="有效期开始"
            name="startTime"
            rules={[{ required: true, message: '请选择有效期开始时间' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm:ss' }}
              placeholder="请选择有效期开始时间"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="有效期结束"
            name="endTime"
            rules={[{ required: true, message: '请选择有效期结束时间' }]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择有效期结束时间"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="过期天数"
            name="expireDay"
            rules={[{ required: true, message: '请输入过期天数' }]}
          >
            <Input placeholder="请输入过期天数" />
          </Form.Item>
          <Form.Item<FieldType> label="优惠券备注" name="dealsNote">
            <Input.TextArea placeholder="请输入优惠券备注" />
          </Form.Item>
          <Form.Item<FieldType>
            label="上下架"
            name="isShelves"
            rules={[{ required: true, message: '请选择上下架状态' }]}
          >
            <Radio.Group>
              <Radio value={true}>上架</Radio>
              <Radio value={false}>下架</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="是否热门"
            name="isHot"
            rules={[{ required: true, message: '请选择是否热门' }]}
          >
            <Radio.Group>
              <Radio value={true}>热门</Radio>
              <Radio value={false}>非热门</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
