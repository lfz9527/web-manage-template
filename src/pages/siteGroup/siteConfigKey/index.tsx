import { postImageUploadImage } from '@/services/api/image';
import {
  getWebSiteGetWebSiteSetting,
  getWebSiteGetWebSiteSettingList, // 假设存在保存网站信息的服务
  postWebSiteDeleteWebSiteSetting, // 假设存在删除网站信息的服务
  postWebSiteSaveWebSiteSetting,
} from '@/services/api/webSite';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  UploadProps,
} from 'antd';
import { useRef, useState } from 'react';

// 列表项数据类型
type GithubIssueItem = {
  webSiteSettingId: number;
  settingName: string;
  settingDescribe: string;
  createTime: string;
};

// 文件信息类型
type fileInfoType = {
  imgSrc: string;
  imageId: string;
  height: number;
  size: number;
  width: number;
};

// 表单字段类型
type FieldType = {
  webSiteSettingId: string;
  settingName: string;
  settingDescribe: string;
  createTime: string;
};

// 文件类型
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default () => {
  // 消息提示
  const [messageApi, messageContextHolder] = message.useMessage();
  // 模态框
  const [modal, contextHolder] = Modal.useModal();
  // 表格操作引用
  const actionRef = useRef<ActionType>();
  // 模态框显示状态
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  // 模态框加载状态
  const [createLoading, setCreateLoading] = useState(false);
  // 表单实例
  const [form] = Form.useForm();
  // 图片上传加载状态
  const [uploadLoading, setUploadLoading] = useState(false);
  // 当前操作的网站设置 ID
  const [webSiteSettingId, setWebSiteSettingId] = useState<number>(0);
  // 网站 Logo 信息
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
    setWebSiteSettingId(0);
    setWebsiteLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  // 编辑网站设置信息
  const handleEditWebsite = async (id: number) => {
    setWebSiteSettingId(id);
    try {
      // 根据 key 获取单条数据
      const { data } = await getWebSiteGetWebSiteSetting({ id: id });
      form.setFieldsValue({
        settingName: data.data.settingName,
        settingDescribe: data.data.settingDescribe,
        createTime: data.data.createTime,
      });
      setOpenCreateDialog(true);
    } catch (error) {
      messageApi.error('获取网站设置信息失败');
    }
  };

  // 表格列定义
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'webSiteSettingId',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '属性名称',
      dataIndex: 'settingName',
      search: false,
    },
    {
      title: '属性说明',
      dataIndex: 'settingDescribe',
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
            handleEditWebsite(record.webSiteSettingId);
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
              title: '确定删除该网站设置吗？',
              centered: true,
              onOk: async () => {
                try {
                  await postWebSiteDeleteWebSiteSetting({
                    ids: [Number(record.webSiteSettingId)],
                  });
                  messageApi.success('删除成功');
                  actionRef.current?.reload();
                } catch (error) {
                  messageApi.error('删除失败');
                }
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

  // 创建或更新网站设置
  const handleCreateOrUpdateWebsite = async (values: FieldType) => {
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      webSiteSettingId: webSiteSettingId,
    };
    try {
      await postWebSiteSaveWebSiteSetting(params);
      messageApi.success(webSiteSettingId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(webSiteSettingId ? '更新失败' : '新增失败');
      setCreateLoading(false);
    }
  };

  // 处理图片上传
  const handleUpload = async (file: FileType) => {
    try {
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

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setWebSiteSettingId(0);
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
          try {
            const { data } = await getWebSiteGetWebSiteSettingList(
              searchParams,
            );
            const { list = [], total = 0 } = data;

            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取网站设置列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="webSiteSettingId"
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
        title={webSiteSettingId ? '编辑网站设置信息' : '新增网站设置信息'}
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
            label="属性名称"
            name="settingName"
            rules={[{ required: true, message: '请输入属性名称' }]}
          >
            <Input placeholder="请输入属性名称" />
          </Form.Item>
          <Form.Item<FieldType>
            label="属性说明"
            name="settingDescribe"
            rules={[{ required: true, message: '请输入属性说明' }]}
          >
            <Input placeholder="请输入属性说明" />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
