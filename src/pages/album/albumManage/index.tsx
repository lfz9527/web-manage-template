import {
  getGoodAlbumGetGoodAlbumById,
  getGoodAlbumGetGoodAlbumList,
  postGoodAlbumDeleteGoodAlbum,
  postGoodAlbumPrivateGoodAlbum,
  postGoodAlbumSaveGoodAlbum,
} from '@/services/api/goodAlbum';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max'; // 添加这行引入
import { Form, Input, message, Modal, Radio, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface TableItem {
  goodAlbumId: number;
  user: {
    nickName: number;
    userName: string;
  };
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
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [goodAlbumId, setGoodAlbumId] = useState<number>(0);

  const getGoodAlbumById = async () => {
    const { data } = await getGoodAlbumGetGoodAlbumById({ id: goodAlbumId });
    form.setFieldsValue(data);
  };

  useEffect(() => {
    if (goodAlbumId > 0 && goodAlbumId) {
      getGoodAlbumById();
    }
  }, [goodAlbumId]);

  // 编辑专辑
  const handleEditAlbum = (id: number) => {
    setGoodAlbumId(id);
    setDialog(true);
  };

  // 删除专辑
  const handleDeleteAlbum = (goodAlbum: TableItem[]) => {
    const ids = goodAlbum.map((item) => item.goodAlbumId);

    modal.confirm({
      title: '确定删除该专辑吗？',
      centered: true,
      onOk: async () => {
        try {
          await postGoodAlbumDeleteGoodAlbum({ ids });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // 专辑状态管理
  const albumStatusChange = async (
    goodAlbum: TableItem[],
    isPrivate: boolean,
  ) => {
    const ids = goodAlbum.map((item) => item.goodAlbumId);
    try {
      await postGoodAlbumPrivateGoodAlbum({ ids, state: isPrivate });
      messageApi.success('操作成功');
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error('操作失败');
    }
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户',
      dataIndex: ['user', 'nickName'],
      search: true,
    },
    {
      title: '专辑名称',
      dataIndex: 'albumName',
      search: true,
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
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '最后收集时间',
      dataIndex: 'lastCollectTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
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
      render: (_, record) =>
        [
          <a key="edit" onClick={() => handleEditAlbum(record.goodAlbumId)}>
            编辑
          </a>,
          <a
            key="public"
            onClick={() => albumStatusChange([record], !record.isPrivate)}
          >
            {record.isPrivate ? '公开' : '私密'}
          </a>,
          <a
            key="delete"
            style={{ color: '#f00' }}
            onClick={() => handleDeleteAlbum([record])}
          >
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  const resetForm = () => {
    form.resetFields();
    setGoodAlbumId(0);
  };

  const handleSubmit = async (values: FileType) => {
    try {
      setLoading(true);
      const params = {
        ...values,
        userId: initialState?.id,
        goodAlbumId: goodAlbumId,
        albumDescribe: values.albumDescribe?.trim() || '',
      };
      await postGoodAlbumSaveGoodAlbum(params);
      messageApi.success('保存成功');
      actionRef.current?.reload();
      setDialog(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a
                onClick={() => {
                  albumStatusChange(selectedRows, true);
                }}
              >
                批量公开
              </a>
              <a
                onClick={() => {
                  albumStatusChange(selectedRows, false);
                }}
              >
                批量私密
              </a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchData = {
            page: params.current,
            count: params.pageSize,
            nickName: params?.user?.nickName?.trim(),
            albumName: params?.albumName?.trim(),
          };
          const { data } = await getGoodAlbumGetGoodAlbumList(searchData);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total: total,
          };
        }}
        rowKey="goodAlbumId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        dateFormatter="string"
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
          <Form.Item<FileType> label="专辑描述" name="albumDescribe">
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
        </Form>
      </Modal>
      {messageContextHolder}
      {contextHolder}
    </>
  );
};
