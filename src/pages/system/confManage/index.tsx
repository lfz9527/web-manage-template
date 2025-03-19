import {
  getSystemGetSystemToolById,
  getSystemGetSystemToolList,
  postSystemDeleteSystemTool,
  postSystemSaveSystemTool,
} from '@/services/api/system';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface TableItem extends API.FBSystemTool {
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const [systemToolId, setSystemToolId] = useState(0);

  const getInfo = async () => {
    const { data } = await getSystemGetSystemToolById({ id: systemToolId });
    form.setFieldsValue(data);
  };

  useEffect(() => {
    if (systemToolId > 0) {
      getInfo();
    }
  }, [systemToolId]);

  const handleEdit = (item: TableItem) => {
    setSystemToolId(Number(item.systemToolId));
    setOpenCreateDialog(true);
  };

  const handleDel = (item: TableItem[]) => {
    const ids = item.map((v) => Number(v.systemToolId));
    modal.confirm({
      title: '删除',
      content: '确定删除该配置吗',
      centered: true,
      onOk: async () => {
        try {
          await postSystemDeleteSystemTool({ ids });
          actionRef.current?.reload();
          messageApi.success('删除成功');
        } finally {
        }
      },
    });
  };

  const handleAdd = () => {
    setOpenCreateDialog(true);
  };

  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '系统配置ID',
      dataIndex: 'systemToolId',
      search: false,
    },
    {
      title: '系统配置项标识',
      dataIndex: 'systemToolCode',
    },
    {
      title: '系统配置项名称',
      dataIndex: 'systemToolName',
      search: false,
    },
    {
      title: '系统配置项值',
      dataIndex: 'systemToolValue',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 180,
      render: (_, record) =>
        [
          <a key="download" onClick={() => handleEdit(record)}>
            编辑
          </a>,
          <a
            key="delete"
            style={{ color: 'red' }}
            onClick={() => handleDel([record])}
          >
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  const handleSubmit = async (values: TableItem) => {
    setCreateLoading(true);
    const data = {
      ...values,
      systemToolId,
    };
    console.log(data);

    try {
      await postSystemSaveSystemTool(data);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setSystemToolId(0);
    setCreateLoading(false);
    setOpenCreateDialog(false);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a onClick={() => handleDel(selectedRows)}>批量删除</a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchData = {
            ...params,
            page: params.current,
            count: params.pageSize,
          };

          delete params.current;
          delete params.pageSize;

          const { data } = await getSystemGetSystemToolList(searchData);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="systemToolId"
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={handleAdd}
            icon={<PlusOutlined />}
          >
            新增
          </Button>,
        ]}
      />
      <Modal
        title={systemToolId ? '编辑' : '新增'}
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        width={600}
        afterClose={resetForm}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
        >
          <Form.Item<TableItem>
            rules={[{ required: true, message: '请输系统配置项标识' }]}
            label="系统配置项标识"
            name="systemToolCode"
          >
            <Input />
          </Form.Item>
          <Form.Item<TableItem>
            rules={[{ required: true, message: '请输系统配置项名称' }]}
            label="系统配置项名称"
            name="systemToolName"
          >
            <Input />
          </Form.Item>
          <Form.Item<TableItem>
            rules={[{ required: true, message: '请输系统配置项值' }]}
            label="系统配置项值"
            name="systemToolValue"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {messageContextHolder}
      {contextHolder}
    </>
  );
};
