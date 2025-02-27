import { Image } from '@/components';
import {
  getGoodGetGoodList,
  postGoodCopyGoodToWebSite,
  postGoodDeleteGood,
  postGoodHotGood,
  postGoodShelvesGood,
  postGoodUpdateGoodForAi,
} from '@/services/api/good';
import { isFalse, isTrue } from '@/utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Form, Input, message, Modal, Select, Space, Tag } from 'antd';
import { useRef, useState } from 'react';

type TableItem = {
  goodId: string;
  shopSite: {
    shopSiteName: string;
  };
  webSiteId: string;
  faceSrc: string;
  title: string;
  price: string;
  goodCategoryId: boolean;
  brandId: string;
  isAIOver: boolean;
  isShelves: boolean;
  isHot: boolean;
  topCount: number;
  downCount: number;
  browseCount: number;
  clickCount: number;
  commentCount: number;
  createTime: string;
};

type FieldType = {
  webSiteId: string;
  posterTitle: string;
  posterLink: string;
  isOnline: boolean;
  posterImageId: string;
};

type CopyFieldType = {
  webSiteId: string;
  belongWebSiteId: string;
  title: string;
};

type WebSiteItem = {
  webSiteId: string;
  name: string;
};

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<TableItem[]>([]);

  const [copyForm] = Form.useForm();
  const [copyLoading, setCopyLoading] = useState(false);
  const [copyDialog, setCopyDialog] = useState(false);
  const [copyGood, setCopyGood] = useState<TableItem[]>([]);

  // AI处理loading
  const [aiLoading, setAiLoading] = useState<string[]>([]);

  // 站点列表
  const [webSiteList, setWebSiteList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  // 站点列表valueEnum
  const webSiteListValueEnum = () => {
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
  };

  // 状态变化
  // 上架，下架
  const handleStatusChange = async (
    poster: TableItem[],
    isShelves: boolean,
  ) => {
    const message = isShelves ? '上架' : '下架';
    const names = poster.map((item) => item.title).join(',');
    const ids = poster.map((item) => Number(item.goodId));

    const params: API.FBShelves = {
      ids,
      isShelves,
    };
    console.log(params);

    modal.confirm({
      title: `确定${message}商品：${names}吗？`,
      centered: true,
      onOk: async () => {
        await postGoodShelvesGood(params);
        messageApi.success(`${message}成功`);
        actionRef.current?.reload();
      },
    });
  };

  // 上热门，下热门
  const handleHotChange = async (poster: TableItem[], isHot: boolean) => {
    const message = isHot ? '上热门' : '下热门';
    const names = poster.map((item) => item.title).join(',');
    const ids = poster.map((item) => Number(item.goodId));

    const params: API.FBHot = {
      ids,
      isHot,
    };
    console.log(params);

    modal.confirm({
      title: `确定${message}商品：${names}吗？`,
      centered: true,
      onOk: async () => {
        await postGoodHotGood(params);
        messageApi.success(`${message}成功`);
        actionRef.current?.reload();
      },
    });
  };

  // 删除
  const handleDelete = async (poster: TableItem) => {
    const names = poster.title;
    const id = Number(poster.goodId);

    modal.confirm({
      title: `确定删除名字：${names} 的商品吗？`,
      centered: true,
      onOk: async () => {
        await postGoodDeleteGood({ id });
        messageApi.success(`删除成功`);
        actionRef.current?.reload();
      },
    });
  };

  // AI处理
  const handleAIUpdate = async (record: TableItem) => {
    setAiLoading([...aiLoading, record.goodId]);
    messageApi.loading('AI处理中...');
    try {
      await postGoodUpdateGoodForAi({ id: Number(record.goodId) });
      messageApi.success('AI处理成功');
      actionRef.current?.reload();
    } finally {
      setAiLoading(aiLoading.filter((item) => item !== record.goodId));
    }
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'goodId',
      search: false,
    },
    {
      title: '站点',
      dataIndex: ['shopSite', 'shopSiteName'],
      search: false,
      ellipsis: true,
    },
    {
      title: '站群',
      dataIndex: 'webSiteId',
      search: true,
      valueEnum: webSiteListValueEnum(),
    },
    {
      title: '商品封面',
      dataIndex: 'faceSrc',
      search: false,
      width: 100,
      render: (_, record) => {
        return <Image src={record.faceSrc} />;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      copyable: true,
      search: true,
      ellipsis: true,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '商品分类Id',
      dataIndex: 'goodCategoryId',
      search: false,
    },
    {
      title: '商品品牌Id',
      dataIndex: 'brandId',
      search: false,
    },
    {
      title: '是否Ai处理',
      dataIndex: 'isAIOver',
      search: false,
      render: (_, record) => {
        return record.isAIOver ? (
          <Tag color="success">是</Tag>
        ) : (
          <Tag color="error">否</Tag>
        );
      },
    },
    {
      title: '上下架状态',
      dataIndex: 'isShelves',
      valueEnum: {
        0: { text: '全部' },
        true: { text: '已上架' },
        false: { text: '已下架' },
      },
      render: (_, record) => {
        return record.isShelves ? (
          <Tag color="#108ee9">已上架</Tag>
        ) : (
          <Tag color="#f50">已下架</Tag>
        );
      },
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      search: false,
      render: (_, record) => {
        return record.isHot ? <Tag color="red">热门</Tag> : '';
      },
    },
    {
      title: '支持数',
      dataIndex: 'topCount',
      search: false,
    },
    {
      title: '反对数',
      dataIndex: 'downCount',
      search: false,
    },
    {
      title: '浏览量',
      dataIndex: 'browseCount',
      search: false,
    },
    {
      title: '点击量',
      dataIndex: 'clickCount',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      search: false,
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 220,
      ellipsis: true,
      render: (_, record) => [
        <a
          key="copy"
          onClick={() => {
            setCopyGood([record]);
            copyForm.setFieldsValue({
              belongWebSiteId: [record.webSiteId],
              title: record.title,
            });
            setCopyDialog(true);
          }}
        >
          复制
        </a>,
        <a key="ai-over" onClick={() => handleAIUpdate(record)}>
          {aiLoading.includes(record.goodId) ? (
            <LoadingOutlined rotate={180} />
          ) : (
            'AI处理'
          )}
        </a>,
        <a
          key="removedHot"
          onClick={() => handleHotChange([record], !record.isHot)}
        >
          {record.isHot ? '下热门' : '上热门'}
        </a>,
        <a
          key="removed"
          onClick={() => handleStatusChange([record], !record.isShelves)}
        >
          {record.isShelves ? '下架' : '上架'}
        </a>,
        <TableDropdown
          key="actionGroup"
          menus={[
            {
              key: 'edit',
              name: '编辑',
              onClick: () => {
                history.push(`/goods/goodsManage/${record.goodId}`);
              },
            },
            {
              key: 'delete',
              name: '删除',
              onClick: () => handleDelete(record),
            },
          ]}
        />,
      ],
    },
  ];

  // 重置复制表单
  const resetCopyForm = () => {
    copyForm.resetFields();
  };

  // 复制表单提交
  const handleCopySubmit = async (values: CopyFieldType) => {
    setCopyLoading(true);
    try {
      const ids = copyGood?.map((item) => Number(item.goodId));
      const params: API.FBCopyGood = {
        ids,
        webSiteId: Number(values.webSiteId),
      };
      await postGoodCopyGoodToWebSite(params);
      messageApi.success('复制商品成功');
      setCopyDialog(false);
      actionRef.current?.reload();
    } finally {
      setCopyLoading(false);
    }
  };

  // 新增广告
  const handleCreate = async () => {
    history.push('/goods/goodsManage/create');
  };

  return (
    <>
      {messageContextHolder}
      <ProTable<TableItem>
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
              <a
                onClick={() => {
                  setCopyGood(selectedRows);
                  copyForm.setFieldsValue({
                    belongWebSiteId: selectedRows.map((item) => item.webSiteId),
                    title: selectedRows.map((item) => item.title).join(','),
                  });
                  setCopyDialog(true);
                }}
              >
                批量复制
              </a>
              <a
                onClick={() => {
                  console.log(selectedRows);
                  const isShelvesGoods = selectedRows.filter(
                    (item) => item.isShelves,
                  );
                  if (isShelvesGoods.length > 0) {
                    const names = isShelvesGoods
                      .map((item) => item.title)
                      .join(',');
                    messageApi.error(`商品：${names} 已经上架，请勿重复上架`);
                    return;
                  }
                  handleStatusChange(selectedRows, true);
                }}
              >
                批量上架
              </a>
              <a
                onClick={() => {
                  const isShelvesGoods = selectedRows.filter(
                    (item) => !item.isShelves,
                  );
                  if (isShelvesGoods.length > 0) {
                    const names = isShelvesGoods
                      .map((item) => item.title)
                      .join(',');
                    messageApi.error(`商品：${names} 已经下架，请勿重复下架`);
                    return;
                  }
                  handleStatusChange(selectedRows, false);
                }}
              >
                批量下架
              </a>
              <a
                onClick={() => {
                  const isShelvesGoods = selectedRows.filter(
                    (item) => item.isHot,
                  );
                  if (isShelvesGoods.length > 0) {
                    const names = isShelvesGoods
                      .map((item) => item.title)
                      .join(',');
                    messageApi.error(`商品：${names} 已经上架，请勿重复上架`);
                    return;
                  }
                  handleHotChange(selectedRows, true);
                }}
              >
                批量上热门
              </a>
              <a
                onClick={() => {
                  const isShelvesGoods = selectedRows.filter(
                    (item) => !item.isHot,
                  );
                  if (isShelvesGoods.length > 0) {
                    const names = isShelvesGoods
                      .map((item) => item.title)
                      .join(',');
                    messageApi.error(
                      `商品：${names} 已经下热门，请勿重复下热门`,
                    );
                    return;
                  }
                  handleHotChange(selectedRows, false);
                }}
              >
                批量下热门
              </a>
            </Space>
          );
        }}
        request={async (params) => {
          const { webSiteId, current, pageSize, isShelves, title } = params;
          const getIsShelvesBool = (
            value: string | boolean,
          ): API.FilterStateEnum => {
            if (isTrue(value)) return 1;
            if (isFalse(value)) return 0;
            return -1;
          };
          const searchParams = {
            page: current,
            count: pageSize,
            webSiteId: Number(webSiteId) > 0 ? Number(webSiteId) : '',
            isShelves: getIsShelvesBool(isShelves),
            title: title,
          };
          const { list = [], total = 0 } = (await getGoodGetGoodList(
            searchParams as API.getGoodGetGoodListParams,
          )) as {
            list: TableItem[];
            total: number;
          };
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="goodId"
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
            onClick={handleCreate}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />

      <Modal
        title="复制商品"
        centered
        open={copyDialog}
        onOk={() => {
          copyForm.submit();
        }}
        onCancel={() => setCopyDialog(false)}
        afterClose={resetCopyForm}
        okButtonProps={{
          loading: copyLoading,
        }}
      >
        <Form
          form={copyForm}
          labelCol={{ span: 6 }}
          onFinish={handleCopySubmit}
          labelAlign="left"
        >
          <Form.Item<CopyFieldType>
            label="商品名称"
            name="title"
            rules={[{ required: true, message: '请选择商品' }]}
          >
            <Input placeholder="请输入商品名称" disabled />
          </Form.Item>
          <Form.Item<CopyFieldType>
            label="所属站点"
            name="belongWebSiteId"
            rules={[{ required: true, message: '请选择站点' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择站点"
              options={webSiteList}
              disabled
            />
          </Form.Item>
          <Form.Item<CopyFieldType>
            label="站点"
            name="webSiteId"
            rules={[{ required: true, message: '请选择站点' }]}
          >
            <Select
              placeholder="请选择站点"
              options={webSiteList.filter((item) => {
                if (copyGood.length === 1) {
                  return item.value !== copyGood?.[0].webSiteId;
                }
                return true;
              })}
            />
          </Form.Item>
        </Form>
      </Modal>

      {contextHolder}
    </>
  );
};
