import {
  getUserGetUserList,
  postUserBatchAddUserOfVirtual,
} from '@/services/api/user';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar, Button, Form, InputNumber, message, Modal, Tag } from 'antd';
import { useRef, useState } from 'react';

type GithubIssueItem = {
  userId: string;
  headImage: {
    imgSrc: string;
  };
  email: string;
  isEmailCheck: boolean;
  userName: string;
  nickName: string;
  userRoleName: string;
  visotor: string;
  isVirtual: boolean;
  followingCount: number;
  followerCount: number;
  createTime: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    search: false,
  },
  {
    title: '头像',
    dataIndex: 'headImage',
    search: false,
    render: (_, record) => {
      return <Avatar src={record.headImage.imgSrc} />;
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: false,
  },
  {
    title: '邮箱认证',
    search: false,
    dataIndex: 'isEmailCheck',
    render: (_, record) => {
      return record.isEmailCheck ? (
        <Tag color="#108ee9">已认证</Tag>
      ) : (
        <Tag color="#f50">未认证</Tag>
      );
    },
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    search: false,
    tooltip: '用户名过长会自动收缩',
    ellipsis: true,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    tooltip: '昵称过长会自动收缩',
    ellipsis: true,
  },
  {
    title: '角色',
    dataIndex: 'userRoleName',
    search: false,
  },
  {
    title: '游客标识',
    dataIndex: 'visotor',
    search: false,
  },
  {
    title: '是否虚拟',
    dataIndex: 'isVirtual',
    search: false,
    render: (_, record) => {
      return record.isVirtual ? (
        <Tag color="green">是</Tag>
      ) : (
        <Tag color="cyan">否</Tag>
      );
    },
  },
  {
    title: '关注数',
    dataIndex: 'followingCount',
    search: false,
  },
  {
    title: '粉丝数',
    dataIndex: 'followerCount',
    search: false,
  },
  {
    title: '注册时间',
    valueType: 'dateTime',
    dataIndex: 'createTime',
    search: false,
  },
];

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();

  // 创建用户
  const handleCreateUser = async () => {
    setCreateLoading(true);
    if (createLoading) return;
    if (form.getFieldValue('count') <= 0) {
      form.setFields([
        {
          name: 'count',
          errors: ['请输入生成数量'],
        },
      ]);
      setCreateLoading(false);
      return;
    }
    await postUserBatchAddUserOfVirtual({
      count: form.getFieldValue('count'),
    });

    setOpenCreateDialog(false);
    setCreateLoading(false);
    messageApi.success('生成成功');
    actionRef.current?.reload();
  };

  // 打开创建用户对话框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    form.setFieldValue('count', 1);
    setOpenCreateDialog(true);
  };

  return (
    <>
      {messageContextHolder}
      <ProTable<GithubIssueItem>
        columns={columns}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter, params);

          const searchParams = {
            page: params.current,
            count: params.pageSize,
            nickName: params.nickName,
          };

          const { data } = await getUserGetUserList(searchParams);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="userId"
        pagination={{
          defaultPageSize: 20,
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
        title="批量生成随机用户"
        centered
        open={openCreateDialog}
        onOk={handleCreateUser}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
      >
        <Form form={form}>
          <Form.Item<{
            count: number;
          }>
            label="生成用户数量"
            name="count"
            rules={[{ required: true, message: '请输入生成数量' }]}
          >
            <InputNumber
              placeholder="请输入生成数量"
              min={1}
              max={100000}
              step={1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
