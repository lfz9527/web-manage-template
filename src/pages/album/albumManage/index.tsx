import { Image, ImageWall } from '@/components';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Radio, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

interface TableItem {
  goodAlbumId: number;
  user: {
    nickName: number;
    userName: string;
  };
  faceImages: {
    face: string;
  }[];
  albumName: string;
  isPrivate: boolean;
  goodCount: string;
  lastCollectTime: string;
  updateTime: string;
  createTime: string;
}

type FileType = {
  albumName: string;
  albumDescribe: string;
  faceImageIds: number[];
  isPrivate: boolean;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [selectedRows, setSelectedRows] = useState<TableItem[]>([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [goodAlbumId, setGoodAlbumId] = useState<number>(0);

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'goodAlbumId',
      search: false,
    },
    {
      title: '用户',
      dataIndex: 'user',
      search: false,
      render: (_, record) => {
        return record.user.nickName;
      },
    },
    {
      title: '封面',
      dataIndex: 'faceImages',
      search: false,
      render: (_, record) => {
        return record.faceImages.map((item) => {
          return <Image src={item.face} key={item.face} />;
        });
      },
    },
    {
      title: '专辑名称',
      dataIndex: 'albumName',
    },
    {
      title: '是否私密',
      dataIndex: 'isPrivate',
      search: false,
      render: (_, record) => {
        return record.isPrivate ? (
          <Tag color="red">是</Tag>
        ) : (
          <Tag color="blue">否</Tag>
        );
      },
    },
    {
      title: '商品数量',
      dataIndex: 'goodCount',
      search: false,
    },
    {
      title: '最后收集时间',
      dataIndex: 'lastCollectTime',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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
      render: (_, record) =>
        [
          <a key="edit">编辑</a>,
          record.isPrivate && <a key="public">公开</a>,
          !record.isPrivate && <a key="private">私密</a>,
          <a key="delete">删除</a>,
        ].filter(Boolean),
    },
  ];

  const resetForm = () => {
    form.resetFields();
    setGoodAlbumId(0);
  };

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
        rowKey="goodAlbumId"
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
        title={goodAlbumId ? '编辑专辑' : '新增专辑'}
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
            isPrivate: true,
          }}
        >
          <Form.Item<FileType>
            label="专辑名称"
            name="albumName"
            rules={[{ required: true, message: '请输入专辑名称' }]}
          >
            <Input placeholder="请输入专辑名称" />
          </Form.Item>
          <Form.Item<FileType>
            label="专辑描述"
            name="albumDescribe"
            rules={[{ required: true, message: '请输入专辑名称' }]}
          >
            <Input.TextArea placeholder="请输入专辑描述" rows={4} />
          </Form.Item>
          <Form.Item<FileType>
            label="是否私密"
            name="isPrivate"
            rules={[{ required: true, message: '请选择是否私密' }]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FileType> label="封面图片" name="faceImageIds">
            <ImageWall />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
