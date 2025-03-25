import { Image } from '@/components';
import {
  getGoodAlbumGetGoodPostList,
  postGoodAlbumHotGoodPost,
} from '@/services/api/goodAlbum';
import { getWebSiteGetWebSiteById } from '@/services/api/webSite';
import { isProduction } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Space, Tag } from 'antd';
import { useRef } from 'react';

interface TableItem {
  goodPostId: string;
  user: {
    nickName: string;
  };
  goodAlbum: {
    albumName: string;
    webSiteId: number;
    goodAlbumId: number;
  };
  postLink: string;
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

  // 获取帖子链接host
  const getPostUrlHost = async (post: TableItem) => {
    const { goodAlbum } = post;
    const { webSiteId } = goodAlbum;
    if (webSiteId === 0 || !webSiteId) return '';

    const { data } = await getWebSiteGetWebSiteById({ id: webSiteId });
    const { domain } = data;
    const link = isProduction
      ? `http://${domain}`
      : `https://localhost:${domain}`;
    return link;
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '帖子ID',
      dataIndex: 'goodPostId',
      fixed: 'left',
      width: 100,
    },
    {
      title: '商品标题',
      dataIndex: 'goodTitle',
      search: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: ['user', 'nickName'],
      search: false,
    },

    {
      title: '商品价格',
      dataIndex: 'goodPrice',
      search: false,
    },

    {
      title: '帖子链接',
      dataIndex: 'postLink',
      search: false,
      width: 300,
      render: (_, record) => {
        if (!record.postLink) return _;
        return (
          <a href={record.postLink} target="_blank" rel="noreferrer">
            {record.postLink}
          </a>
        );
      },
    },
    {
      title: '所属专辑',
      dataIndex: ['goodAlbum', 'albumName'],
      search: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: '帖子图片',
      dataIndex: 'goodPostImages',
      search: false,
      width: 300,
      render: (_, record) => {
        return record?.goodPostImages
          ? record?.goodPostImages?.map((item) => {
              return (
                <Image src={item?.image?.imgSrc} key={item?.image?.imgSrc} />
              );
            })
          : '-';
      },
    },
    {
      title: '帖子描述',
      dataIndex: 'content',
      search: true,
      width: 650,
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
      fixed: 'right',
      width: 100,
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
        scroll={{ x: 2800 }}
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
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            ...params,
          } as Record<string, any>;

          delete searchParams.current;
          delete searchParams.pageSize;

          const { data } = await getGoodAlbumGetGoodPostList(searchParams);
          const { list, total } = data;

          const listData = await Promise.all(
            list.map(async (item: TableItem) => {
              const host = await getPostUrlHost(item);
              const postLink = `/post/${item.goodPostId}?postId=${item.goodPostId}`;
              return {
                ...item,
                postLink: host ? host + postLink : '',
              };
            }),
          );

          return {
            data: listData,
            success: true,
            total,
          };
        }}
        rowKey="goodPostId"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        // search={false}
        dateFormatter="string"
      />
    </>
  );
};
