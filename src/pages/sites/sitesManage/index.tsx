import { postImageUploadImage } from '@/services/api/image';
import {
  getShopSiteGetShopSiteById,
  getShopSiteGetShopSiteList,
  postShopSiteDeleteShopSite,
  postShopSiteEditShopSite,
} from '@/services/api/shopSite';
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';

// 站点列表项数据类型
type ShopSiteItem = {
  shopSiteId: number;
  shopSiteName: string;
  clearShopSiteName: string;
  shopSiteTitle: string | null;
  describe: string | null;
  link: string;
  siteType: string | null;
  logoImageId: number;
  logoImage: {
    imageId: number;
    imgSrc: string;
    width: number;
    height: number;
    size: number;
    hash: string | null;
    createTime: string;
  };
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

// 表单字段类型
type FieldType = {
  shopSiteId: number;
  shopSiteName: string;
  shopSiteTitle: string | null;
  describe: string | null;
  link: string;
  siteType: string | null;
  logoImageId: number;
  emails: string[];
  tels: string[];
  yearOpened: number;
  starLevel: number;
  isOnline: boolean;
  isHot: boolean;
  state: number;
  goodCount: number;
  createTime: moment.Moment;
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

const SiteManagementPage = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [shopSiteId, setShopSiteId] = useState<number>(0);
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
    setShopSiteId(0);
    setWebsiteLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  // 编辑站点信息
  const handleEditShopSite = async (id: number) => {
    setShopSiteId(id);
    try {
      const data = (await getShopSiteGetShopSiteById({ id })) as any;
      const emails = data.emails ? data.emails.split(',') : [];
      const tels = data.tels ? data.tels.split(',') : [];
      form.setFieldsValue({
        shopSiteId: data.shopSiteId,
        shopSiteName: data.shopSiteName,
        shopSiteTitle: data.shopSiteTitle,
        describe: data.describe,
        link: data.link,
        siteType: data.siteType,
        logoImageId: data.logoImageId,
        emails,
        tels,
        yearOpened: data.yearOpened,
        starLevel: data.starLevel,
        isOnline: data.isOnline,
        isHot: data.isHot,
        state: data.state,
        goodCount: data.goodCount,
        createTime: moment(data.createTime),
      });
      setWebsiteLogo({
        imgSrc: data.logoImage.imgSrc,
        imageId: String(data.logoImageId),
        height: data.logoImage.height,
        size: data.logoImage.size,
        width: data.logoImage.width,
      });
      setOpenCreateDialog(true);
    } catch (error) {
      messageApi.error('获取站点信息失败');
    }
  };

  // 删除站点信息
  const handleDeleteShopSite = async (id: number) => {
    await modal.confirm({
      title: '确定删除该站点吗？',
      centered: true,
      onOk: async () => {
        try {
          await postShopSiteDeleteShopSite({ id });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  const handleUpload = async (file: FileType) => {
    // 假设存在上传图片的服务
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
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      messageApi.error('只能上传 JPG/PNG 文件!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      messageApi.error('图片大小不能超过5MB!');
      return false;
    }
    setUploadLoading(true);
    handleUpload(file);
    return false;
  };

  // 表格列定义
  const columns: ProColumns<ShopSiteItem>[] = [
    {
      title: 'ID',
      dataIndex: 'shopSiteId',
      width: 60,
    },
    {
      title: '类型',
      dataIndex: 'siteType',
      search: false,
    },
    {
      title: 'Logo',
      dataIndex: ['logoImage', 'imgSrc'],
      search: false,
      render: (text) => <Avatar src={text} />,
    },
    {
      title: '称呼',
      dataIndex: 'shopSiteTitle',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'shopSiteName',
      search: false,
    },
    {
      title: '简介',
      dataIndex: 'describe',
      search: false,
    },
    {
      title: '链接',
      dataIndex: 'link',
      search: false,
    },
    {
      title: 'Email',
      dataIndex: 'emails',
      search: false,
    },
    {
      title: '电话',
      dataIndex: 'tels',
      search: false,
    },
    {
      title: '年限',
      dataIndex: 'yearOpened',
      search: false,
    },
    {
      title: '星级',
      dataIndex: 'starLevel',
      search: false,
    },
    {
      title: '上线',
      dataIndex: 'isOnline',
      search: false,
      render: (text) => (text ? '上线' : '下线'),
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      search: false,
      render: (text) => (text ? '热门' : ''),
    },
    {
      title: '状态',
      dataIndex: 'state',
      search: false,
    },
    {
      title: '商品数',
      dataIndex: 'goodCount',
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
          onClick={() => handleEditShopSite(record.shopSiteId)}
        >
          编辑
        </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          type="link"
          onClick={() => handleDeleteShopSite(record.shopSiteId)}
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  // 创建或更新站点信息
  const handleCreateOrUpdateShopSite = async (values: FieldType) => {
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      shopSiteId: shopSiteId,
      logoImageId: Number(websiteLogo.imageId),
      emails: values.emails.join(','),
      tels: values.tels.join(','),
    } as any;
    try {
      await postShopSiteEditShopSite(params);
      messageApi.success(shopSiteId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(shopSiteId ? '更新失败' : '新增失败');
      setCreateLoading(false);
    }
  };

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setShopSiteId(0);
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
      <ProTable<ShopSiteItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
          };
          try {
            const data = await getShopSiteGetShopSiteList(searchParams);
            const { list = [], total = 0 } = data as any;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取站点列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="shopSiteId"
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
      />

      <Modal
        title={shopSiteId ? '编辑站点信息' : '新增站点信息'}
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
          onFinish={handleCreateOrUpdateShopSite}
          labelAlign="left"
        >
          <Form.Item<FieldType> label="ID" name="shopSiteId" hidden>
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="类型"
            name="siteType"
            rules={[{ required: false, message: '请输入类型' }]}
          >
            <Input placeholder="请输入类型" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Logo"
            name="logoImageId"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : [e])}
          >
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action="/api/Image/UploadImage"
              accept="image/*"
              beforeUpload={beforeUpload}
            >
              {websiteLogo.imgSrc ? (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src={websiteLogo.imgSrc}
                      alt="logo"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined color="#000" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setWebsiteLogo({
                        imgSrc: '',
                        imageId: '',
                        height: 0,
                        size: 0,
                        width: 0,
                      });
                    }}
                    style={{
                      position: 'absolute',
                      left: 70,
                      top: -5,
                    }}
                  />
                </>
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="称呼"
            name="shopSiteTitle"
            rules={[{ required: false, message: '请输入称呼' }]}
          >
            <Input placeholder="请输入称呼" />
          </Form.Item>
          <Form.Item<FieldType>
            label="名称"
            name="shopSiteName"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item<FieldType>
            label="简介"
            name="describe"
            rules={[{ required: false, message: '请输入简介' }]}
          >
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
          <Form.Item<FieldType>
            label="链接"
            name="link"
            rules={[{ required: true, message: '请输入链接' }]}
          >
            <Input placeholder="请输入链接" />
          </Form.Item>
          <Form.List name="emails">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item
                    {...field}
                    label={fields.length === 1 ? 'Email' : ''}
                    rules={[{ required: false, message: '请输入 Email' }]}
                    key={field.key}
                  >
                    <Input
                      placeholder="请输入 Email"
                      style={{ width: '90%', marginRight: 8 }}
                    />
                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    新增一行
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="tels">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item
                    {...field}
                    label={fields.length === 1 ? '电话' : ''}
                    rules={[{ required: false, message: '请输入电话' }]}
                    key={field.key}
                  >
                    <Input
                      placeholder="请输入电话"
                      style={{ width: '90%', marginRight: 8 }}
                    />
                    <Button
                      type="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    新增一行
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item<FieldType>
            label="年限"
            name="yearOpened"
            rules={[{ required: true, message: '请输入年限' }]}
          >
            <Input placeholder="请输入年限" />
          </Form.Item>
          <Form.Item<FieldType>
            label="星级"
            name="starLevel"
            rules={[{ required: true, message: '请输入星级' }]}
          >
            <Input placeholder="请输入星级" />
          </Form.Item>
          <Form.Item<FieldType>
            label="上线"
            name="isOnline"
            rules={[{ required: true, message: '请选择上线状态' }]}
          >
            <Radio.Group>
              <Radio value={true}>上线</Radio>
              <Radio value={false}>下线</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="热门"
            name="isHot"
            rules={[{ required: true, message: '请选择是否热门' }]}
          >
            <Radio.Group>
              <Radio value={true}>热门</Radio>
              <Radio value={false}>非热门</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="状态"
            name="state"
            rules={[{ required: true, message: '请输入状态' }]}
          >
            <Input placeholder="请输入状态" />
          </Form.Item>
          <Form.Item<FieldType>
            label="商品数"
            name="goodCount"
            rules={[{ required: true, message: '请输入商品数' }]}
          >
            <Input placeholder="请输入商品数" />
          </Form.Item>
          <Form.Item<FieldType>
            label="创建时间"
            name="createTime"
            rules={[{ required: true, message: '请选择创建时间' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择创建时间"
            />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};

export default SiteManagementPage;
