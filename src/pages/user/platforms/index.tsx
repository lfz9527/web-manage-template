import { Image, ImageWall } from '@/components';
import {
  getUserGetProviderById,
  postUserDeleteProvider,
  postUserGetProviderList,
  postUserSaveProvider,
} from '@/services/api/user';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

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

  // 第三方平台id，用于详情页
  const [providerId, setProviderId] = useState<number>(0);

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
        return <Image src={record.providerLogoImage?.imgSrc} />;
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

  // 获取log 文件，格式化传入 文件上传组件用于回显
  const getFile = useCallback(() => {
    return [platformLogo]
      .map((f) => ({
        url: f.imgSrc,
      }))
      .filter(Boolean);
  }, [platformLogo]);

  // 创建第三方平台
  const handleCreatePlatform = async (values: FieldType) => {
    setCreateLoading(true);
    const params: API.FBProvider = {
      ...values,
      providerLogoImageId: Number(platformLogo.imageId),
      providerId: providerId,
      webSiteId: Number(values.webSiteId),
      providerAction: Number(values.providerAction), // 将 providerAction 转换为数字类型
    };
    try {
      await postUserSaveProvider(params);
      messageApi.success(providerId > 0 ? '编辑成功' : '新增成功');
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
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
          defaultPageSize: 10,
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
        title={`${providerId > 0 ? '编辑' : '新增'}第三方平台`}
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

          <Form.Item<FieldType> label="Logo" name="providerLogoImageId">
            <ImageWall
              fileList={getFile()}
              onChange={(file) => {
                const [first] = file;
                const platformLogo = first?.response?.data;
                setPlatformLogo(platformLogo);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {contextHolder}
    </>
  );
};
