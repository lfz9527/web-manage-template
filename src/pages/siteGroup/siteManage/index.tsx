import { Image, ImageWall } from '@/components';
import { getGoodGetGoodCategoryListParent } from '@/services/api/good';
import {
  getWebSiteGetWebSiteById,
  getWebSiteGetWebSiteList, // 假设存在保存网站信息的服务
  postWebSiteDeleteWebSite, // 假设存在删除网站信息的服务
  postWebSiteSaveWebSite,
} from '@/services/api/webSite';
import { isProduction } from '@/utils';
import { isNull } from '@/utils/is';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

type TableItem = {
  webSiteId: number;
  logoImage: {
    imgSrc: string;
  };
  goodCategory: {
    categoryName: string;
    goodCategoryId: number;
  };
  name: string;
  slogan: string;
  domain: string;
  describe: string;
  seoTitle: string;
  seoKeyword: string;
  seoDescription: string;
  state: number;
  createTime: string;
};

type fileInfoType = {
  imgSrc: string;
  imageId: string;
  height: number;
  size: number;
  width: number;
};

type FieldType = {
  webSiteId: string;
  name: string;
  slogan: string;
  domain: string;
  describe: string;
  seoTitle: string;
  seoKeyword: string;
  seoDescription: string;
  goodCategoryId: number;
  logoImageId?: string;
  logoImage: fileInfoType;
};

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [websiteId, setWebsiteId] = useState<number>(0);
  const [websiteLogo, setWebsiteLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  const [firstCategory, setFirstCategory] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const getFirstCategory = async () => {
    const { data } = await getGoodGetGoodCategoryListParent({});
    setFirstCategory(
      data.map((item: TableItem['goodCategory']) => ({
        label: item.categoryName,
        value: item.goodCategoryId,
      })),
    );
  };

  useEffect(() => {
    getFirstCategory();
  }, []);

  // 获取log 文件，格式化传入 文件上传组件用于回显
  const getFile = useCallback(() => {
    return [websiteLogo]
      .map((f) => ({
        url: f.imgSrc,
      }))
      .filter((f) => f.url);
  }, [websiteLogo]);

  // 打开创建用户对话框
  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  // 获取网站详情
  const getSiteDetail = async () => {
    const { data } = await getWebSiteGetWebSiteById({ id: websiteId });

    const params = {
      ...data,
    };

    if (isNull(params.goodCategoryId, true)) {
      delete params.goodCategoryId;
    }

    form.setFieldsValue(params);
    const logoImage = data?.logoImage || {};
    setWebsiteLogo((state) => ({
      ...state,
      ...logoImage,
    }));
  };
  useEffect(() => {
    if (websiteId > 0 && websiteId) {
      getSiteDetail();
    }
  }, [websiteId]);

  // 编辑网站信息
  const handleEditWebsite = async (id: number) => {
    setWebsiteId(id);
    setOpenCreateDialog(true);
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'webSiteId',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Logo',
      dataIndex: 'logoImage',
      search: false,
      render: (_, record) => {
        return record?.logoImage?.imgSrc ? (
          <Image src={record?.logoImage?.imgSrc} />
        ) : (
          '-'
        );
      },
    },
    {
      title: '站点名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: '站点slogan',
      dataIndex: 'slogan',
      search: false,
      ellipsis: true,
    },
    {
      title: '站点域名',
      dataIndex: 'domain',
      search: false,
      render: (_, record) => {
        const link = isProduction
          ? `http://${record.domain}`
          : `https://localhost:${record.domain}`;

        return (
          <a href={link} target="_blank" rel="noreferrer">
            {record.domain}
          </a>
        );
      },
    },
    {
      title: '站点描述',
      dataIndex: 'describe',
      search: false,
    },
    {
      title: '站点seo标题',
      dataIndex: 'seoTitle',
      search: false,
    },
    {
      title: '站点seo关键词',
      dataIndex: 'seoKeyword',
      search: false,
      ellipsis: true,
    },
    {
      title: '站点seo描述',
      dataIndex: 'seoDescription',
      search: false,
      ellipsis: true,
    },
    {
      title: '站点绑定分类名称',
      dataIndex: ['goodCategory', 'categoryName'],
      search: false,
    },
    {
      title: '创建时间',
      valueType: 'date',
      dataIndex: 'createTime',
      search: false,
      width: 100,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, _action) => [
        <a
          key="edit"
          type="link"
          onClick={() => {
            handleEditWebsite(record.webSiteId);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          type="link"
          onClick={async () => {
            await modal.confirm({
              title: '确定删除该网站吗？',
              centered: true,
              onOk: async () => {
                await postWebSiteDeleteWebSite({
                  id: Number(record.webSiteId),
                });
                messageApi.success('删除成功');
                actionRef.current?.reload();
              },
            });
          }}
        >
          删除
        </a>,
      ],
      width: 120,
    },
  ];

  // 创建或更新网站
  const handleCreateOrUpdateWebsite = async (values: FieldType) => {
    setCreateLoading(true);
    const params = {
      ...values,
      logoImageId: websiteLogo?.imageId || 0,
      webSiteId: websiteId,
    } as Record<string, any>;

    if (params.webSiteId === 0 || !params.webSiteId) {
      delete params.webSiteId;
    }

    try {
      await postWebSiteSaveWebSite(params);
      messageApi.success(websiteId ? '更新成功' : '新增成功');
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  //  关闭表单时 重置表单
  const resetForm = () => {
    form.resetFields();
    setWebsiteId(0);
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
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter, params);

          const searchParams = {
            page: params.current,
            count: params.pageSize,
            name: params.name,
          };

          const { data } = await getWebSiteGetWebSiteList(
            searchParams as API.getWebSiteGetWebSiteListParams,
          );
          const { list = [], total = 0 } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        search={false}
        rowKey="webSiteId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page) => console.log(page),
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
        title={websiteId ? '编辑网站信息' : '新增网站信息'}
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        width={900}
        afterClose={resetForm}
      >
        <Form
          form={form}
          onFinish={handleCreateOrUpdateWebsite}
          labelAlign="left"
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点名称"
                name="name"
                rules={[{ required: true, message: '请输入名称' }]}
              >
                <Input placeholder="请输入名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点slogan"
                name="slogan"
                rules={[{ required: true, message: '请输入slogan' }]}
              >
                <Input placeholder="请输入slogan" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType>
                label="站点域名"
                name="domain"
                rules={[{ required: true, message: '请输入域名' }]}
              >
                <Input placeholder="请输入域名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="站点绑定分类" name="goodCategoryId">
                <Select
                  placeholder="请选择站点绑定分类"
                  allowClear
                  options={firstCategory}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点描述"
                name="describe"
                rules={[{ required: true, message: '请输入描述' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入描述" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点seo标题"
                name="seoTitle"
                rules={[{ required: true, message: '请输入seo标题' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入seo标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点seo关键词"
                name="seoKeyword"
                rules={[{ required: true, message: '请输入seo关键词' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入seo关键词" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="站点seo描述"
                name="seoDescription"
                rules={[{ required: true, message: '请输入seo描述' }]}
              >
                <Input.TextArea rows={4} placeholder="请输入seo描述" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType> label="Logo" name="logoImageId">
                <ImageWall
                  fileList={getFile()}
                  onChange={(file) => {
                    const [first] = file;
                    const platformLogo = first?.response?.data;
                    setWebsiteLogo(platformLogo);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {contextHolder}
    </>
  );
};
