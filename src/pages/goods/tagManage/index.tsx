import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Radio, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

interface TableItem {
  goodTagId: number;
  tagName: string;
  isHot: boolean;
  goodCount: number;
  hotTime: string;
  createTime: string;
}

type FileType = {
  tagName: string;
  isHot: boolean;
};

export default () => {
  const actionRef = useRef<ActionType>();

  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [selectedRows, setSelectedRows] = useState<TableItem[]>([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [goodTag, setGoodTag] = useState<TableItem[]>([]);
  const [goodTagId, setGoodTagId] = useState<number>(0);

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'goodTagId',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'tagName',
      search: true,
    },
    {
      title: '是否热门',
      dataIndex: 'isHot',
      search: false,
      render: (_, record) => {
        return record.isHot ? <Tag color="red">是</Tag> : '';
      },
    },
    {
      title: '热门时间',
      dataIndex: 'hotTime',
      search: false,
    },
    {
      title: '商品数量',
      dataIndex: 'goodCount',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 220,
      ellipsis: true,
      render: (_, record) =>
        [
          <a key="edit" onClick={() => {}}>
            编辑
          </a>,
          record.isHot && (
            <a key="upHot" onClick={() => {}}>
              上热门
            </a>
          ),
          !record.isHot && (
            <a key="downHot" onClick={() => {}}>
              下热门
            </a>
          ),
          <a key="delete" style={{ color: 'red' }} onClick={() => {}}>
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  // 重置表单
  const resetForm = () => {
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => {}}>批量上热门</a>
              <a onClick={() => {}}>批量下热门</a>
            </Space>
          );
        }}
        request={async (params) => {
          return {
            data: [],
            success: true,
            total: 0,
          };
        }}
        rowKey="goodId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setDialog(true)}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />

      <Modal
        title={goodTagId ? '编辑标签' : '新增标签'}
        centered
        open={dialog}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setDialog(false)}
        afterClose={resetForm}
        okButtonProps={{
          loading: loading,
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          onFinish={handleSubmit}
          labelAlign="left"
          initialValues={{
            isHot: false,
          }}
        >
          <Form.Item<FileType>
            label="标签名称"
            name="tagName"
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Form.Item<FileType>
            label="是否热门"
            name="isHot"
            rules={[{ required: true, message: '请选择是否热门' }]}
          >
            <Radio.Group>
              <Radio value={true}>热门</Radio>
              <Radio value={false}>非热门</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
