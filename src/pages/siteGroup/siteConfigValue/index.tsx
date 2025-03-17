import {
  getWebSiteGetWebSiteList,
  getWebSiteGetWebSiteSettingList,
  getWebSiteGetWebSiteSettingValue,
  getWebSiteGetWebSiteSettingValueList,
  postWebSiteDeleteWebSiteSettingValue,
  postWebSiteSaveWebSiteSettingValue,
} from '@/services/api/webSite';
import { allowAllSiteId } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';

// 列表项数据类型
type WebSiteSettingValue = {
  webSiteSettingValueId: number;
  webSite: {
    name: string;
  };
  webSiteSetting: {
    settingName: string;
    settingDescribe: string;
  };
  settingValue: string;
};

// 表单字段类型
type FieldType = {
  webSiteSettingValueId: number;
  webSiteSettingId: number;
  settingValue: string;
  webSiteId: string;
};

// 网站设置选项类型
type WebSiteSettingOption = {
  value: number;
  label: string;
};

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
  // 当前操作的网站设置值 ID
  const [webSiteSettingValueId, setWebSiteSettingValueId] = useState<number>(0);

  const [webSiteSettingOptions, setWebSiteSettingOptions] = useState<
    WebSiteSettingOption[]
  >([]);

  // 站点列表
  const [webSiteList, setWebSiteList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const getWebSiteList = async () => {
    const { data } = await getWebSiteGetWebSiteList({
      page: 1,
      count: 100,
    });
    const { list } = data;
    setWebSiteList(
      list.map((item: any) => ({
        label: item.name,
        value: item.webSiteId,
      })),
    );
  };

  // 打开创建/编辑模态框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    setWebSiteSettingValueId(0);
    setOpenCreateDialog(true);
  };

  // 获取网站设置选项
  const fetchWebSiteSettingOptions = async () => {
    try {
      const { data } = await getWebSiteGetWebSiteSettingList({
        page: 1,
        count: 50,
      });
      const { list = [], total = 0 } = data;
      const options = list.map((item: any) => ({
        value: item.webSiteSettingId,
        label: item.settingName,
      }));
      setWebSiteSettingOptions(options);
    } catch (error) {
      console.log(error);
      messageApi.error('获取网站设置选项失败');
    }
  };

  useEffect(() => {
    getWebSiteList();
    fetchWebSiteSettingOptions();
  }, []);

  // 编辑网站设置值信息
  const handleEditWebsite = async (id: number) => {
    setWebSiteSettingValueId(id);
    try {
      // 根据 id 获取单条数据
      const { data } = await getWebSiteGetWebSiteSettingValue({ id });
      form.setFieldsValue({
        webSiteId: data.webSiteId,
        webSiteSettingId: data.webSiteSettingId,
        settingValue: data.settingValue,
      });
      setOpenCreateDialog(true);
    } catch (error) {
      console.log(error);
      messageApi.error('获取网站设置值信息失败');
    }
  };

  // 站点列表valueEnum
  const webSiteListValueEnum = () => {
    const result = {
      0: { text: '全部' },
      ...webSiteList.reduce(
        (acc, item) => ({
          ...acc,
          [item.value]: { text: item.label },
        }),
        {},
      ),
    };
    return result;
  };

  // 表格列定义
  const columns: ProColumns<WebSiteSettingValue>[] = [
    {
      dataIndex: 'webSiteSettingValueId',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '站点名',
      dataIndex: ['webSite', 'name'],
      search: true,
      valueEnum: webSiteListValueEnum(),
    },
    {
      title: '属性名称',
      dataIndex: ['webSiteSetting', 'settingName'],
      search: true,
      copyable: true,
    },
    {
      title: '属性说明',
      dataIndex: ['webSiteSetting', 'settingDescribe'],
      search: true,
    },
    {
      title: '属性值',
      dataIndex: 'settingValue',
      copyable: true,
      search: false,
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <div
            style={{
              border: '1px solid #000',
              width: 50,
              height: 22,
              backgroundColor: record.settingValue,
            }}
          />
          {_}
        </div>
      ),
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'createTime',
      search: false,
      width: 180,
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
            handleEditWebsite(record.webSiteSettingValueId);
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
              title: '确定删除该网站设置值吗？',
              centered: true,
              onOk: async () => {
                try {
                  await postWebSiteDeleteWebSiteSettingValue({
                    ids: [record.webSiteSettingValueId],
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

  // 创建或更新网站设置值
  const handleCreateOrUpdateWebsite = async (values: FieldType) => {
    setCreateLoading(true);
    const params = {
      ...values,
      webSiteSettingValueId: webSiteSettingValueId,
    } as Record<string, any>;
    try {
      await postWebSiteSaveWebSiteSettingValue(params);
      messageApi.success(webSiteSettingValueId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error(webSiteSettingValueId ? '更新失败' : '新增失败');
      setCreateLoading(false);
    }
  };

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setWebSiteSettingValueId(0);
    setCreateLoading(false);
    setOpenCreateDialog(false);
  };

  return (
    <>
      {messageContextHolder}
      <ProTable<WebSiteSettingValue>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params: Record<string, any>) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            webSiteId: params?.webSite?.name || 0,
            ...params,
          } as Record<string, any>;

          if ('webSite' in searchParams) {
            delete searchParams.webSite;
          }
          if ('webSiteSetting' in searchParams) {
            searchParams['webSiteSettingName'] =
              params['webSiteSetting'].settingName;
          }
          delete searchParams.current;
          delete searchParams.pageSize;

          console.log(searchParams);

          try {
            const { data } = await getWebSiteGetWebSiteSettingValueList(
              searchParams,
            );
            const { list = [], total = 0 } = data;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取网站设置值列表失败');
            console.log(error);
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        search={allowAllSiteId() ? {} : false}
        rowKey="webSiteSettingValueId"
        pagination={{
          defaultPageSize: 20,
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
        title={
          webSiteSettingValueId ? '编辑网站设置值信息' : '新增网站设置值信息'
        }
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
            label="站点"
            name="webSiteId"
            rules={[{ required: true, message: '请输入站点' }]}
          >
            <Select placeholder="请选择站点" options={webSiteList} />
          </Form.Item>
          <Form.Item<FieldType>
            label="属性 ID"
            name="webSiteSettingId"
            rules={[{ required: true, message: '请选择属性 ID' }]}
          >
            <Select
              placeholder="请选择属性 ID"
              options={webSiteSettingOptions}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="属性值"
            name="settingValue"
            rules={[{ required: true, message: '请输入属性值' }]}
          >
            <Input placeholder="请输入属性值" />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
