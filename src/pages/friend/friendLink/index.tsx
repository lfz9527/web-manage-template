import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { Image, ImageWall } from '@/components';
import {
  getFriendLinkGetFriendLinkById,
  getFriendLinkGetFriendLinkList,
  postFriendLinkDeleteFriendLink,
  postFriendLinkSaveFriendLink,
} from '@/services/api/friendLink';
import { useCallback } from 'react';

interface TableItem {
  friendLinkId: string;
  logoImage: {
    imgSrc: string;
  };
  friendName: string;
  friendLink: string;
  createTime: string;
}

type FileType = {
  friendName: string;
  friendLink: string;
  logoImageId: any[];
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [friendLinkId, setFriendLinkId] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [logoImage, setLogoImage] = useState<any[]>([
    {
      url: '',
      logoImageId: '',
    },
  ]);

  const getFiles = useCallback(() => {
    return logoImage
      .filter((item) => item.url)
      .map((item) => ({ url: item.url }));
  }, [logoImage]);

  const handleDeleteLog = async (record: TableItem) => {
    const ids = [record.friendLinkId].map(Number);
    Modal.confirm({
      title: '提示',
      content: '确定删除该日志文件吗？',
      centered: true,
      onOk: async () => {
        await postFriendLinkDeleteFriendLink({
          ids,
        });
        messageApi.success('删除成功');
        actionRef.current?.reload();
      },
    });
  };

  const handleGetFriendLinkById = async () => {
    const { data } = await getFriendLinkGetFriendLinkById({
      id: Number(friendLinkId),
    });
    console.log(data);
    setLogoImage([
      {
        url: data.logoImage.imgSrc,
        logoImageId: data.logoImageId,
      },
    ]);
    form.setFieldsValue({
      ...data,
    });
  };

  useEffect(() => {
    if (friendLinkId) {
      handleGetFriendLinkById();
    }
  }, [friendLinkId]);

  const handleEditLog = async (id: string) => {
    setFriendLinkId(id);
    setOpenDialog(true);
  };

  const handleSubmit = async (values: any) => {
    console.log(logoImage);
    const params = {
      friendLinkId: Number(friendLinkId),
      ...values,
      logoImageId: logoImage[0]?.imageId || 0,
    };
    try {
      await postFriendLinkSaveFriendLink(params);
      messageApi.success('操作成功');
      actionRef.current?.reload();
      setOpenDialog(false);
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
      title: 'Logo',
      dataIndex: ['logoImage', 'imgSrc'],
      search: false,
      renderText: (text: string) => {
        return text ? <Image src={text} /> : null;
      },
    },
    {
      title: '名称',
      dataIndex: 'friendName',
      search: false,
    },
    {
      title: '链接',
      dataIndex: 'friendLink',
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
          <a key="edit" onClick={() => handleEditLog(record.friendLinkId)}>
            修改
          </a>,
          <a
            key="delete"
            style={{ color: 'red' }}
            onClick={() => handleDeleteLog(record)}
          >
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  const resetForm = () => {
    form.resetFields();
    setLogoImage([
      {
        url: '',
        logoImageId: '',
      },
    ]);
    setFriendLinkId('');
    setLoading(false);
    setOpenDialog(false);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { data } = await getFriendLinkGetFriendLinkList({
            page: params.current,
            count: params.pageSize,
          });
          const { list = [], total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="friendLinkId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setOpenDialog(true)}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
      <Modal
        title={friendLinkId ? '编辑专辑' : '新增专辑'}
        centered
        open={openDialog}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenDialog(false)}
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
        >
          <Form.Item<FileType>
            label="链接名称"
            name="friendName"
            rules={[{ required: true, message: '请输入链接名称' }]}
          >
            <Input placeholder="请输入链接名称" />
          </Form.Item>
          <Form.Item<FileType>
            label="友情链接"
            name="friendLink"
            rules={[{ required: true, message: '请输入友情链接' }]}
          >
            <Input placeholder="请输入友情链接" />
          </Form.Item>
          <Form.Item<FileType> label="Logo" name="logoImageId">
            <ImageWall
              fileList={getFiles()}
              onChange={(fileList) => {
                setLogoImage(
                  fileList.map((file) => file?.response?.data || {}),
                );
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {messageContextHolder}
    </>
  );
};
