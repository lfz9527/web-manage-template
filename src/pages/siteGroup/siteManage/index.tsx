import { postImageUploadImage } from '@/services/api/image';
import {
  getWebSiteGetWebSiteById,
  getWebSiteGetWebSiteList, // 假设存在保存网站信息的服务
  postWebSiteDeleteWebSite, // 假设存在删除网站信息的服务
  postWebSiteSaveWebSite,
} from '@/services/api/webSite';
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
  Form,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from 'antd';
import { useRef, useState } from 'react';

type GithubIssueItem = {
  webSiteId: number;
  logoImage: {
    imgSrc: string;
  };
  name: string;
  slogan: string;
  domain: string;
  describe: string;
  seoTitle: string;
  seoKeyword: string;
  seoDescription: string;
  goodCategoryId: number;
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [websiteId, setWebsiteId] = useState<number>(0);
  const [websiteLogo, setWebsiteLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  // 打开创建用户对话框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    setWebsiteId(0);
    setWebsiteLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  // 编辑网站信息
  const handleEditWebsite = async (id: number) => {
    setWebsiteId(id);
    const data = (await getWebSiteGetWebSiteById({
      id: id,
    })) as FieldType;
    const website = data;
    form.setFieldsValue({
      name: website.name,
      slogan: website.slogan,
      domain: website.domain,
      describe: website.describe,
      seoTitle: website.seoTitle,
      seoKeyword: website.seoKeyword,
      seoDescription: website.seoDescription,
      goodCategoryId: website.goodCategoryId,
    });
    setWebsiteLogo({
      imgSrc: website.logoImage.imgSrc,
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
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
        return <Avatar src={record.logoImage.imgSrc} />;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      search: false,
    },
    {
      title: 'slogan',
      dataIndex: 'slogan',
      search: false,
    },
    {
      title: '域名',
      dataIndex: 'domain',
      search: false,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      search: false,
    },
    {
      title: 'seo标题',
      dataIndex: 'seoTitle',
      search: false,
    },
    {
      title: 'seo关键词',
      dataIndex: 'seoKeyword',
      search: false,
    },
    {
      title: 'seo描述',
      dataIndex: 'seoDescription',
      search: false,
    },
    {
      title: '绑定类目',
      dataIndex: 'goodCategoryId',
      search: false,
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'createTime',
      search: false,
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
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      logoImageId: websiteLogo.imageId,
      webSiteId: websiteId,
    } as Record<string, any>;

    await postWebSiteSaveWebSite(params);

    messageApi.success(websiteId ? '更新成功' : '新增成功');

    setCreateLoading(false);
    setOpenCreateDialog(false);
    actionRef.current?.reload();
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

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{uploadLoading ? '上传中...' : '上传'}</div>
    </button>
  );

  return (
    <>
      {messageContextHolder}
      <ProTable<GithubIssueItem>
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

          const { list = [], total = 0 } = (await getWebSiteGetWebSiteList(
            searchParams as API.getWebSiteGetWebSiteListParams,
          )) as {
            list: GithubIssueItem[];
            total: number;
          };
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="webSiteId"
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
        title={websiteId ? '编辑网站信息' : '新增网站信息'}
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
          onFinish={handleCreateOrUpdateWebsite}
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item<FieldType>
            label="slogan"
            name="slogan"
            rules={[{ required: true, message: '请输入slogan' }]}
          >
            <Input placeholder="请输入slogan" />
          </Form.Item>
          <Form.Item<FieldType>
            label="域名"
            name="domain"
            rules={[{ required: true, message: '请输入域名' }]}
          >
            <Input placeholder="请输入域名" />
          </Form.Item>
          <Form.Item<FieldType>
            label="描述"
            name="describe"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input placeholder="请输入描述" />
          </Form.Item>
          <Form.Item<FieldType>
            label="seo标题"
            name="seoTitle"
            rules={[{ required: true, message: '请输入seo标题' }]}
          >
            <Input placeholder="请输入seo标题" />
          </Form.Item>
          <Form.Item<FieldType>
            label="seo关键词"
            name="seoKeyword"
            rules={[{ required: true, message: '请输入seo关键词' }]}
          >
            <Input placeholder="请输入seo关键词" />
          </Form.Item>
          <Form.Item<FieldType>
            label="seo描述"
            name="seoDescription"
            rules={[{ required: true, message: '请输入seo描述' }]}
          >
            <Input placeholder="请输入seo描述" />
          </Form.Item>
          <Form.Item<FieldType>
            label="绑定类目"
            name="goodCategoryId"
            rules={[{ required: true, message: '请输入绑定类目' }]}
          >
            <Input placeholder="请输入绑定类目" />
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
        </Form>
      </Modal>

      {contextHolder}
    </>
  );
};
