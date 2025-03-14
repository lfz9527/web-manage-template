import { Image, ImageWall } from '@/components';
import {
  getShopSiteGetShopSiteById,
  getShopSiteGetShopSiteList,
  postShopSiteDeleteShopSite,
  postShopSiteSaveShopSite,
} from '@/services/api/shopSite';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Space,
  Tag,
} from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

// 店铺列表项数据类型
type ShopSiteItem = {
  shopSiteId: number;
  shopSiteName: string;
  clearShopSiteName: string;
  shopSiteTitle: string;
  describe: string;
  link: string;
  logoImageId: number;
  logoImage: {
    imgSrc: string;
  };
  emails: string[];
  tels: string[];
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
  shopSiteTitle: string;
  describe: string;
  link: string;
  logoImageId: number;
  emails: string[];
  tels: string[];
  yearOpened: number;
  starLevel: number;
  isOnline: boolean;
  isHot: boolean;
  state: number;
  goodCount: number;
};

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

  const [websiteLogo, setWebsiteLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  // 获取log 文件，格式化传入 文件上传组件用于回显
  const getFile = useCallback(() => {
    return [websiteLogo]
      .map((f) => ({
        url: f.imgSrc,
      }))
      .filter((f) => f.url);
  }, [websiteLogo]);

  const getShopSiteInfo = async () => {
    const { data } = await getShopSiteGetShopSiteById({ id: shopSiteId });
    const params = {
      ...data,
    };
    setWebsiteLogo({ ...data.logoImage });
    form.setFieldsValue(params);
  };

  useEffect(() => {
    if (Number(shopSiteId) > 0) {
      getShopSiteInfo();
    }
  }, [shopSiteId]);

  // 编辑店铺信息
  const handleEditShopSite = async (id: number) => {
    setShopSiteId(id);
    setOpenCreateDialog(true);
  };

  // 删除店铺信息
  const handleDeleteShopSite = async (id: number, shopSiteName: string) => {
    await modal.confirm({
      title: '删除店铺',
      content: `确定删除名称：${shopSiteName} 的店铺吗？`,
      centered: true,
      onOk: async () => {
        try {
          await postShopSiteDeleteShopSite({ ids: [id] });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // 表格列定义
  const columns: ProColumns<ShopSiteItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'shopSiteId',
      width: 60,
      search: false,
    },
    {
      title: 'Logo',
      dataIndex: ['logoImage', 'imgSrc'],
      search: false,
      render: (_, record) =>
        record?.logoImage?.imgSrc ? (
          <Image src={record?.logoImage?.imgSrc} />
        ) : (
          _
        ),
    },
    {
      title: '称呼',
      dataIndex: 'shopSiteTitle',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'shopSiteName',
      copyable: true,
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
      copyable: true,
    },
    {
      title: 'Email',
      dataIndex: 'emails',
      search: false,
      render: (_, record) => record?.emails?.join(',') || '-',
    },
    {
      title: '电话',
      dataIndex: 'tels',
      search: false,
      render: (_, record) => record?.tels?.join(','),
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
      render: (_, record) =>
        record?.isOnline ? (
          <Tag color="success">上线</Tag>
        ) : (
          <Tag color="red">下线</Tag>
        ),
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      search: false,
      render: (_, record) => (record?.isHot ? <Tag color="red">热门</Tag> : _),
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
      render: (_, record) => [
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
          onClick={() =>
            handleDeleteShopSite(record.shopSiteId, record.shopSiteName)
          }
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  // 创建或更新店铺信息
  const handleCreateOrUpdateShopSite = async (values: FieldType) => {
    setCreateLoading(true);
    const params = {
      ...values,
      shopSiteId: shopSiteId,
      logoImageId: websiteLogo.imageId,
      emails: values?.emails || [],
      tels: values?.tels || [],
    } as Record<string, any>;
    try {
      await postShopSiteSaveShopSite(params);
      messageApi.success(shopSiteId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
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

  return (
    <>
      {messageContextHolder}
      <ProTable<ShopSiteItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            shopSiteName: params.shopSiteName,
          };
          try {
            const { data } = await getShopSiteGetShopSiteList(searchParams);
            const { list = [], total = 0 } = data;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取店铺列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="shopSiteId"
        pagination={{
          defaultPageSize: 20,
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
            onClick={() => setOpenCreateDialog(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />

      <Modal
        title={shopSiteId ? '编辑店铺信息' : '新增店铺信息'}
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        width={1000}
        afterClose={resetForm}
      >
        <Form
          form={form}
          onFinish={handleCreateOrUpdateShopSite}
          initialValues={{
            emails: [''],
            tels: [''],
            isHot: false,
            isOnline: false,
          }}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType>
                label="店铺名称"
                name="shopSiteName"
                rules={[
                  {
                    required: true,
                    message: '请输入店铺名称',
                  },
                ]}
              >
                <Input placeholder="请输入店铺名称" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType>
                label="店铺链接"
                name="link"
                rules={[
                  {
                    required: true,
                    message: '请输入店铺链接',
                  },
                ]}
              >
                <Input placeholder="请输入店铺链接" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="店铺称呼" name="shopSiteTitle">
                <Input placeholder="请输入店铺称呼" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="店铺年限" name="yearOpened">
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入店铺年限"
                  min={0}
                  step={1}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="店铺星级" name="starLevel">
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入店铺星级"
                  min={0}
                  step={1}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="上下线" name="isOnline">
                <Radio.Group>
                  <Radio value={true}>上线</Radio>
                  <Radio value={false}>下线</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="是否热门" name="isHot">
                <Radio.Group>
                  <Radio value={true}>热门</Radio>
                  <Radio value={false}>非热门</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item<FieldType> label="店铺简介" name="describe">
                <Input.TextArea
                  placeholder="请输入店铺简介"
                  rows={4}
                ></Input.TextArea>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item<FieldType> label="店铺Logo" name="logoImageId">
                <ImageWall
                  fileList={getFile()}
                  onChange={(fileList) => {
                    const [first] = fileList;
                    const file = first?.response?.data || {};
                    setWebsiteLogo({ ...file });
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.List name="emails">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        label={index === 0 ? '店铺邮箱' : ''}
                        required={false}
                        key={field.key}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                          }}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            noStyle
                          >
                            <Input
                              placeholder="请输入店铺邮箱"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                          <Space
                            style={{
                              marginLeft: 8,
                              flexShrink: 0,
                              userSelect: 'none',
                            }}
                          >
                            {fields.length > 1 && (
                              <a
                                style={{
                                  color: 'red',
                                }}
                                onClick={() => remove(field.name)}
                              >
                                删除
                              </a>
                            )}
                            <a onClick={() => add()}>添加</a>
                          </Space>
                        </div>
                      </Form.Item>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.List name="tels">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        label={index === 0 ? '店铺联系电话' : ''}
                        required={false}
                        key={field.key}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 8,
                          }}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            noStyle
                          >
                            <Input
                              placeholder="请输入店铺联系电话"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                          <Space
                            style={{
                              marginLeft: 8,
                              flexShrink: 0,
                              userSelect: 'none',
                            }}
                          >
                            {fields.length > 1 && (
                              <a
                                style={{
                                  color: 'red',
                                }}
                                onClick={() => remove(field.name)}
                              >
                                删除
                              </a>
                            )}
                            <a onClick={() => add()}>添加</a>
                          </Space>
                        </div>
                      </Form.Item>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};

export default SiteManagementPage;
