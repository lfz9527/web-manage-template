import { getUserGetUserProviderList } from '@/services/api/user';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
  userProviderId: string;
  userId: string;
  providerId: string;
  providerUserId: string;
  providerEmail: string;
  providerPictureSrc: string;
  providerNickName: string;
  createTime: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'ID',
    dataIndex: 'userProviderId',
    search: false,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    search: false,
  },
  {
    title: '第三方平台ID',
    dataIndex: 'providerId',
    search: false,
  },
  {
    title: '第三方账号用户ID',
    dataIndex: 'providerUserId',
    search: false,
  },
  {
    title: '第三方账号邮箱',
    dataIndex: 'providerEmail',
    search: false,
  },
  {
    title: '第三方账号头像',
    dataIndex: 'providerPictureSrc',
    search: false,
    render: (_, record) => {
      return <Avatar src={record.providerPictureSrc} />;
    },
  },
  {
    title: '第三方账号昵称',
    dataIndex: 'providerNickName',
    search: false,
  },

  {
    title: '创建时间',
    valueType: 'dateTime',
    dataIndex: 'createTime',
    search: false,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter, params);

          const searchParams = {
            page: params.current,
            count: params.pageSize,
          };

          const { data } = await getUserGetUserProviderList(searchParams);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        search={false}
        rowKey="userId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
      />
    </>
  );
};
