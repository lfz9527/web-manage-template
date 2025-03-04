import { Image } from '@/components';
import {
  getDealsGetDealsList,
  postDealsDeleteDeals,
  postDealsHotDeals,
  postDealsShelvesDeals,
} from '@/services/api/deals';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

// 优惠券列表项数据类型
type DealsItem = {
  createTime: string;
  dealsId: number;
  brandId: number;
  brand: {
    brandName: string;
  };
  shopSite: {
    shopSiteName: string;
  };
  dealsName: string;
  dealsCode: string;
  imageId: number;
  image: {
    imgSrc: string;
  };
  minAmount: number;
  minCount: number;
  dealsAmount: number;
  dealsDiscount: number;
  dealsTypeName: number;
  startTime: string;
  endTime: string;
  expireDay: number;
  dealsNote: string;
  browserCount: number;
  clickCount: number;
  isShelves: boolean;
  isHot: boolean;
  hotTime: string;
};

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<DealsItem[]>([]);

  // 删除优惠券
  const handleDeleteDeals = async (id: number) => {
    await modal.confirm({
      title: '确定删除该优惠券吗？',
      centered: true,
      onOk: async () => {
        try {
          await postDealsDeleteDeals({ ids: [id] });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // 上架/下架
  const handleShelves = async (data: DealsItem[], isShelves: boolean) => {
    const message = isShelves ? '上架' : '下架';
    const names = data.map((item) => item.dealsName).join('，');
    modal.confirm({
      title: `确定${message}优惠券吗？`,
      content: `${message}优惠券：${names}`,
      centered: true,
      onOk: async () => {
        const params = {
          ids: data.map((item) => item.dealsId),
          isShelves,
        };
        await postDealsShelvesDeals(params);
        messageApi.success('操作成功');
        actionRef.current?.reload();
      },
    });
  };

  // 热门/非热门
  const handleHot = async (data: DealsItem[], isHot: boolean) => {
    const message = isHot ? '上热门' : '下热门';
    const names = data.map((item) => item.dealsName).join('，');
    modal.confirm({
      title: `确定${message}优惠券吗？`,
      content: `${message}优惠券：${names}`,
      centered: true,
      onOk: async () => {
        const params = {
          ids: data.map((item) => item.dealsId),
          isHot,
        };
        await postDealsHotDeals(params);
        messageApi.success('操作成功');
        actionRef.current?.reload();
      },
    });
  };

  // 表格列定义
  const columns: ProColumns<DealsItem>[] = [
    {
      title: 'ID',
      dataIndex: 'dealsId',
      width: 60,
      search: false,
    },
    {
      title: '优惠券封面',
      dataIndex: ['image', 'imgSrc'],
      search: false,
      render: (imgSrc) =>
        imgSrc ? <Image objectFit="contain" src={imgSrc as string} /> : '-',
    },
    {
      title: '优惠券名称',
      dataIndex: 'dealsName',
      search: true,
    },
    {
      title: '优惠券品牌',
      dataIndex: ['brand', 'brandName'],
      search: false,
    },
    {
      title: '优惠券店铺',
      dataIndex: ['shopSite', 'shopSiteName'],
      search: false,
    },
    {
      title: '优惠折扣',
      dataIndex: 'dealsDiscount',
      tooltip: '80表示优惠80%',
      search: false,
    },
    {
      title: '优惠码',
      dataIndex: 'dealsCode',
      search: false,
    },
    {
      title: '优惠券类型',
      dataIndex: 'dealsTypeName',
      search: false,
    },
    {
      title: '优惠券有效期',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '优惠券有效天数',
      dataIndex: 'expireDay',
      search: false,
    },
    {
      title: '优惠券浏览数',
      dataIndex: 'browserCount',
      search: false,
    },
    {
      title: '优惠券点击数',
      dataIndex: 'clickCount',
      search: false,
    },
    {
      title: '上架状态',
      dataIndex: 'isShelves',
      search: false,
      render: (isShelves) =>
        isShelves ? (
          <Tag color="success">上架</Tag>
        ) : (
          <Tag color="default">下架</Tag>
        ),
    },
    {
      title: '热门状态',
      dataIndex: 'isHot',
      search: false,
      render: (isHot) => (isHot ? <Tag color="red">热门</Tag> : ''),
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
      render: (text, record) => [
        <a
          key="edit"
          type="link"
          onClick={() => history.push(`/deals/update/${record.dealsId}`)}
        >
          编辑
        </a>,
        <a
          key="shelves"
          type="link"
          onClick={() => handleShelves([record], !record.isShelves)}
        >
          {record.isShelves ? '下架' : '上架'}
        </a>,
        <a
          key="hot"
          type="link"
          onClick={() => handleHot([record], !record.isHot)}
        >
          {record.isHot ? '下热门' : '上热门'}
        </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          type="link"
          onClick={() => handleDeleteDeals(record.dealsId)}
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  return (
    <>
      <ProTable<DealsItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          setSelectedRows(selectedRows);

          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => handleShelves(selectedRows, true)}>批量上架</a>
              <a onClick={() => handleShelves(selectedRows, false)}>批量下架</a>
              <a onClick={() => handleHot(selectedRows, true)}>批量上热门</a>
              <a onClick={() => handleHot(selectedRows, false)}>批量下热门</a>
            </Space>
          );
        }}
        request={async (params, sort, filter) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            dealsName: params.dealsName?.trim(),
          };
          try {
            const { data } = await getDealsGetDealsList(searchParams);
            const { list = [], total = 0 } = data;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取优惠券列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="dealsId"
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
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => history.push('/deals/create')}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      {contextHolder}
      {messageContextHolder}
    </>
  );
};
