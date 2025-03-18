import {
  getAiGetAiPromptWordById,
  getAiGetAiPromptWordList,
  postAiDeleteAiPromptWord,
  postAiSaveAiPromptWord,
} from '@/services/api/ai';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface TableItem {
  aiPromptWordId: string;
  promptWordContent: string;
  promptWordCode: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [aiPromptWordId, setAiPromptWordId] = useState<number>(0);
  const [form] = Form.useForm();

  const deletePromptWord = async (item: TableItem[]) => {
    const ids = item.map((v) => Number(v.aiPromptWordId));
    modal.confirm({
      title: '删除提示词',
      content: `确定删除ID为：${ids.join('，')} 的提示词吗？`,
      centered: true,
      onOk: async () => {
        await postAiDeleteAiPromptWord({ ids });
        messageApi.success(`删除成功`);
        actionRef.current?.reload();
      },
    });
  };

  const getDetail = async () => {
    const { data } = await getAiGetAiPromptWordById({ id: aiPromptWordId });
    const params = {
      ...data,
    };
    form.setFieldsValue(params);
  };

  useEffect(() => {
    if (aiPromptWordId > 0) {
      getDetail();
    }
  }, [aiPromptWordId]);

  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '提示词ID',
      dataIndex: 'aiPromptWordId',
      search: false,
    },
    {
      title: '提示词标识',
      dataIndex: 'promptWordCode',
    },
    {
      title: '提示词内容',
      dataIndex: 'promptWordContent',
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
          onClick={() => {
            setAiPromptWordId(
              Number(record.aiPromptWordId) as unknown as number,
            );
            setOpenCreateDialog(true);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          onClick={() => deletePromptWord([record])}
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setCreateLoading(false);
    setOpenCreateDialog(false);
    setAiPromptWordId(0);
  };

  const handleFinish = async (values: TableItem) => {
    setCreateLoading(true);
    const params = {
      ...values,
      aiPromptWordId: Number(aiPromptWordId),
    };
    try {
      await postAiSaveAiPromptWord(params);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
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
              <a
                onClick={() => {
                  deletePromptWord(selectedRows);
                }}
              >
                批量删除
              </a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchData = {
            ...params,
            page: params.current,
            count: params.pageSize,
            promptContent: params.promptWordContent?.trim(),
          };

          delete searchData.current;
          delete searchData.pageSize;

          const { data } = await getAiGetAiPromptWordList(searchData);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total: total,
          };
        }}
        rowKey="aiPromptWordId"
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
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
        dateFormatter="string"
      />
      <Modal
        title={aiPromptWordId ? '编辑' : '新增'}
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
          onFinish={handleFinish}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
        >
          <Form.Item<TableItem>
            label="提示词标识"
            name="promptWordCode"
            rules={[
              {
                required: true,
                message: '请输入提示词标识',
              },
            ]}
          >
            <Input placeholder="请输入提示词标识" />
          </Form.Item>
          <Form.Item<TableItem>
            label="提示词内容"
            name="promptWordContent"
            rules={[
              {
                required: true,
                message: '请输入提示词内容',
              },
            ]}
          >
            <Input.TextArea placeholder="请输入提示词内容" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      {messageContextHolder}
      {contextHolder}
    </>
  );
};
