import {
  getGoodGetGoodTagList,
  postGoodDeleteGoodTag,
  postGoodSaveGoodTag,
} from '@/services/api/good';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Radio, Tag } from 'antd';
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

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [goodTagItem, setGoodTagItem] = useState<TableItem>({} as TableItem);

  const handleEdit = (record: TableItem) => {
    setGoodTagItem(record);
    form.setFieldsValue({
      tagName: record.tagName,
      isHot: record.isHot,
    });
    setDialog(true);
  };

  const handleDelete = async (record: TableItem) => {
    modal.confirm({
      title: '提示',
      centered: true,
      content: '确定删除该标签吗？',
      onOk: async () => {
        try {
          await postGoodDeleteGoodTag({
            ids: [record.goodTagId],
          });

          messageApi.success('操作成功');
          actionRef.current?.reload();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
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
      valueType: 'dateTime',
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
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 220,
      render: (_, record) =>
        [
          <a
            key="edit"
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            style={{ color: 'red' }}
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  // 重置表单
  const resetForm = () => {
    form.resetFields();
    setDialog(false);
    setLoading(false);
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);

    try {
      await postGoodSaveGoodTag({
        goodTagId: goodTagItem.goodTagId || 0,
        ...values,
      });

      messageApi.success('操作成功');
      setDialog(false);
      actionRef.current?.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {messageContextHolder}
      {contextHolder}
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            tagName: params.tagName?.trim(),
          };
          const { data } = await getGoodGetGoodTagList(searchParams);
          const { list, total } = data;

          return {
            data: list,
            success: true,
            total: total,
          };
        }}
        rowKey="goodTagId"
        pagination={{
          defaultPageSize: 10,
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
        title={goodTagItem.goodTagId ? '编辑标签' : '新增标签'}
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
