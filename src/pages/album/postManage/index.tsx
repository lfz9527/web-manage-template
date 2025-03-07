import { Image } from '@/components';
import {
  getGoodAlbumGetGoodPostList,
  postGoodAlbumHotGoodPost,
} from '@/services/api/goodAlbum';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Space, Tag } from 'antd';
import { useRef } from 'react';

interface TableItem {
  goodPostId: string;
  user: {
    nickName: string;
  };
  goodTitle: string;
  goodPrice: string;
  goodPostImages: {
    image: {
      imgSrc: string;
    };
  }[];
  content: string;
  isHot: boolean;
  hotTime: string;
  likeCount: string;
  commentCount: string;
  shareCount: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();
  const handleHot = async (record: TableItem[], isHot: boolean) => {
    const params = {
      ids: record.map((item) => Number(item.goodPostId)),
      state: isHot,
    };
    try {
      await postGoodAlbumHotGoodPost(params);
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
      title: '用户名',
      dataIndex: ['user', 'nickName'],
      search: false,
    },
    {
      title: '商品标题',
      dataIndex: 'goodTitle',
      search: false,
      width: 300,
      ellipsis: true,
    },
    {
      title: '商品价格',
      dataIndex: 'goodPrice',
    },
    {
      title: '帖子图片',
      dataIndex: 'goodPostImages',
      search: false,
      render: (_, record) => {
        return record.goodPostImages.map((item) => {
          return <Image src={item.image.imgSrc} key={item.image.imgSrc} />;
        });
      },
    },
    {
      title: '帖子描述',
      dataIndex: 'content',
      search: false,
      width: 600,
    },
    {
      title: '是否热门',
      dataIndex: 'isHot',
      search: false,
      render: (_, record) => {
        return record.isHot ? <Tag color="red">是</Tag> : <Tag>否</Tag>;
      },
    },
    {
      title: '上热门时间',
      dataIndex: 'hotTime',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: '点赞数',
      dataIndex: 'likeCount',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      search: false,
    },
    {
      title: '分享数',
      dataIndex: 'shareCount',
      search: false,
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
      key: 'option',
      render: (_, record) =>
        [
          <a key="public" onClick={() => handleHot([record], !record.isHot)}>
            {record.isHot ? '下热门' : '上热门'}
          </a>,
          <a key="delete" style={{ color: '#f00' }}>
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

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
                  handleHot(selectedRows, true);
                }}
              >
                批量上热门
              </a>
              <a
                onClick={() => {
                  handleHot(selectedRows, false);
                }}
              >
                批量下热门
              </a>
            </Space>
          );
        }}
        request={async (params) => {
          const { data } = await getGoodAlbumGetGoodPostList({
            page: params.current,
            count: params.pageSize,
            ...params,
          });
          const { list, total } = data;

          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="goodPostId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        search={false}
        dateFormatter="string"
      />
    </>
  );
};
