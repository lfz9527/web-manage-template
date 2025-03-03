import { postImageUploadImage } from '@/services/api/image';
import {
  getUserGetProviderById,
  postUserDeleteProvider,
  postUserGetProviderList,
  postUserSaveProvider,
} from '@/services/api/user';
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
  Select,
  Upload,
  UploadProps,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type fileInfoType = {
  imgSrc: string;
  imageId: string;
  height: number;
  size: number;
  width: number;
};

type GithubIssueItem = {
  providerId: string;
  webSiteId: string;
  providerActionName: string;
  providerLogoImage: fileInfoType;
  providerClientId: string;
  providerClientSecret: string;
  providerCallbackPath: string;
};

type FieldType = {
  webSiteId: string;
  providerAction: string;
  providerLogoImageId?: string;
  providerClientId: string;
  providerClientSecret: string;
  providerCallbackPath: string;
  providerLogoImage: fileInfoType;
};

const providerList: Array<{
  value: string;
  label: string;
}> = [{ value: '1', label: 'google' }];

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);

  // 第三方平台id，用于详情页
  const [providerId, setProviderId] = useState<number>(0);

  // 第三方平台logo详情
  const [platformLogo, setPlatformLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'providerId',
    },
    {
      title: '站点ID',
      dataIndex: 'webSiteId',
    },
    {
      title: '第三方平台',
      dataIndex: 'providerActionName',
    },
    {
      title: 'Logo',
      dataIndex: 'providerLogoImage',
      search: false,
      render: (_, record) => {
        return <Avatar src={record.providerLogoImage?.imgSrc} />;
      },
    },
    {
      title: 'Client ID',
      dataIndex: 'providerClientId',
    },
    {
      title: 'Client Secret',
      dataIndex: 'providerClientSecret',
    },
    {
      title: '回调路径',
      dataIndex: 'providerCallbackPath',
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
            setProviderId(Number(record.providerId));
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
              title: '确定删除该第三方平台吗？',
              centered: true,
              onOk: async () => {
                await postUserDeleteProvider({
                  ids: [Number(record.providerId)],
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
    },
  ];

  const handleGetPlatform = async (open: boolean = true) => {
    const { data } = await getUserGetProviderById({
      id: providerId,
    });

    form.setFieldsValue({
      webSiteId: data.webSiteId,
      providerAction: data.providerAction,
      providerClientId: data.providerClientId,
      providerClientSecret: data.providerClientSecret,
      providerCallbackPath: data.providerCallbackPath,
    });
    setPlatformLogo({
      ...data.providerLogoImage,
      imageId: data.providerLogoImageId,
    } as fileInfoType);
    if (open) {
      setOpenCreateDialog(true);
    }
  };

  useEffect(() => {
    if (providerId !== 0) {
      handleGetPlatform();
    }
  }, [providerId]);

  // 打开创建用户对话框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    setOpenCreateDialog(true);
  };

  // 创建第三方平台
  const handleCreatePlatform = async (values: FieldType) => {
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      providerLogoImageId: platformLogo.imageId,
      providerId: providerId,
    } as Record<string, any>;

    await postUserSaveProvider(params);

    messageApi.success('新增成功');

    setCreateLoading(false);
    setOpenCreateDialog(false);
    actionRef.current?.reload();
  };

  const handleUpload = async (file: FileType) => {
    const { data } = await postImageUploadImage({
      file: file,
    });

    const { imgSrc, imageId, height, size, width } = data;
    setUploadLoading(false);
    setPlatformLogo({
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
    setProviderId(0);
    setCreateLoading(false);
    setOpenCreateDialog(false);
    setPlatformLogo({
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
          };
          const { data } = await postUserGetProviderList(searchParams);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        search={false}
        rowKey="providerId"
        pagination={{
          pageSize: 10,
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
            新增
          </Button>,
        ]}
      />

      <Modal
        title="新增第三方平台"
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
          onFinish={handleCreatePlatform}
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label="站点 ID"
            name="webSiteId"
            rules={[{ required: true, message: '请输入站点 ID' }]}
          >
            <Input placeholder="请输入站点 ID" />
          </Form.Item>
          <Form.Item<FieldType>
            label="请选择第三方平台"
            name="providerAction"
            rules={[{ required: true, message: '请选择第三方平台' }]}
          >
            <Select
              placeholder="请选择第三方平台"
              options={providerList}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Client ID"
            name="providerClientId"
            rules={[{ required: true, message: '请输入 Client ID' }]}
          >
            <Input placeholder="请输入 Client ID" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Client Secret"
            name="providerClientSecret"
            rules={[{ required: true, message: '请输入 Client Secret' }]}
          >
            <Input placeholder="请输入 Client Secret" />
          </Form.Item>
          <Form.Item<FieldType>
            label="回调地址"
            name="providerCallbackPath"
            rules={[{ required: true, message: '请输入回调地址' }]}
          >
            <Input placeholder="请输入回调地址" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Logo"
            name="providerLogoImageId"
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
              {platformLogo.imgSrc ? (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src={platformLogo.imgSrc}
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
                      setPlatformLogo({
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
