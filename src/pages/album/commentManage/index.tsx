import {
  getGoodPostCommentGetGoodPostCommentList,
  postGoodPostCommentDeleteGoodPostComment,
} from '@/services/api/goodPostComment'; // 请确保添加相关 API 服务
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { useRef } from 'react';
interface TableItem {
  goodPostCommentId: string;
  goodPostId: string;
  user: {
    userId: number;
    nickName: string;
  };
  commentContent: string;
  replyUser: {
    userId: number;
    nickName: string;
  };
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const deleteComment = async (record: TableItem[]) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条评论吗？',
      centered: true,
      onOk: async () => {
        const ids = record.map((item) => Number(item.goodPostCommentId));

        const params = {
          ids,
        };
        try {
          await postGoodPostCommentDeleteGoodPostComment(params);
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '评论ID',
      dataIndex: 'goodPostCommentId',
      search: false,
      width: 80,
    },
    {
      title: '帖子ID',
      dataIndex: 'goodPostId',
      search: false,
      width: 80,
    },
    {
      title: '评论用户',
      dataIndex: ['user', 'nickName'],
      search: false,
      width: 120,
    },
    {
      title: '评论内容',
      dataIndex: 'commentContent',
      search: true,
      ellipsis: true,
    },
    {
      title: '回复用户',
      dataIndex: ['replyUser', 'nickName'],
      search: false,
      width: 120,
      render: (_, record) => record.replyUser?.nickName || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      key: 'option',
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => deleteComment([record])}
          style={{ color: '#f00' }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const searchData = {
            page: params.current,
            count: params.pageSize,
            commentContent: params?.commentContent?.trim(),
            ...params,
          };

          const { data } = await getGoodPostCommentGetGoodPostCommentList(
            searchData,
          );
          return {
            data: data.list,
            success: true,
            total: data.total,
          };
        }}
        rowKey="goodPostCommentId"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        dateFormatter="string"
        headerTitle="评论管理"
        search={{
          labelWidth: 'auto',
        }}
      />

      {messageContextHolder}
    </>
  );
};
