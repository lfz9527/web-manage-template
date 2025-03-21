import { Image } from '@/components';
import {
  getUserGetUserList,
  postUserBatchAddUserOfVirtual,
} from '@/services/api/user';
import { getWebSiteGetWebSiteList } from '@/services/api/webSite';
import { allowAllSiteId } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, message, Modal, Select, Tag } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

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

type FileType = API.FBBatchAddUser;

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  // 站点列表
  const [webSiteList, setWebSiteList] = useState<OptionType[]>([]);

  // 创建用户
  const handleCreateUser = async (values: FileType) => {
    setCreateLoading(true);
    if (createLoading) return;

    try {
      await postUserBatchAddUserOfVirtual(values);
      setOpenCreateDialog(false);
      messageApi.success('生成成功');
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  // 打开创建用户对话框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    form.setFieldValue('count', 1);
    setOpenCreateDialog(true);
  };

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

  useEffect(() => {
    getWebSiteList();
  }, []);

  const webSiteListValueEnum = useCallback(() => {
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
  }, [webSiteList]);

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
        return record.headImage?.imgSrc ? (
          <Image src={record.headImage.imgSrc} />
        ) : (
          _
        );
      },
    },
    {
      title: '所属站点',
      dataIndex: 'webSiteId',
      search: allowAllSiteId(),
      valueEnum: webSiteListValueEnum(),
      width: 150,
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

  return (
    <>
      {messageContextHolder}
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            nickName: params.nickName,
            webSiteId: params.webSiteId ? Number(params.webSiteId) : 0,
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
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
      >
        <Form
          onFinish={handleCreateUser}
          form={form}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
        >
          <Form.Item<FileType>
            label="站点"
            name="webSiteId"
            rules={[{ required: true, message: '请选择站点' }]}
          >
            <Select
              placeholder="请选择站点"
              options={webSiteList}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item<FileType>
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
