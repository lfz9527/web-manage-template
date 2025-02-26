import { Image, ImageWall } from '@/components';
import {
  getPosterGetPosterById,
  getPosterGetPosterList,
  postPosterDeletePoster,
  postPosterOnlinePoster,
  postPosterSavePoster,
} from '@/services/api/poster';
import { getWebSiteGetWebSiteList } from '@/services/api/webSite';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Space,
  Tag,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

type GithubIssueItem = {
  posterId: string;
  posterImage: {
    imgSrc: string;
  };
  posterTitle: string;
  posterLink: string;
  webSiteId: string;
  clickCount: string;
  isOnline: boolean;
  createTime: string;
};

type FieldType = {
  webSiteId: string;
  posterTitle: string;
  posterLink: string;
  isOnline: boolean;
  posterImageId: string;
};

type WebSiteItem = {
  webSiteId: string;
  name: string;
};

export default () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  // 广告id
  const [posterId, setPosterId] = useState<string>('0');

  // 封面图片id
  const [posterImageId, setPosterImageId] = useState<string>('');
  const [posterImage, setPosterImage] = useState<
    {
      url: string;
    }[]
  >([]);

  // 站点列表
  const [webSiteList, setWebSiteList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [selectedRows, setSelectedRows] = useState<GithubIssueItem[]>([]);

  // 状态变化
  // 上架，下架
  const handleStatusChange = async (
    poster: GithubIssueItem[],
    isOnline: boolean,
  ) => {
    const message = isOnline ? '上架' : '下架';
    const names = poster.map((item) => item.posterTitle).join(',');
    const ids = poster.map((item) => Number(item.posterId));

    const params: API.FBState = {
      ids,
      state: isOnline,
    };
    console.log(params);

    modal.confirm({
      title: `确定${message}广告：${names}吗？`,
      centered: true,
      onOk: async () => {
        await postPosterOnlinePoster(params);
        messageApi.success(`${message}成功`);
        actionRef.current?.reload();
      },
    });
  };

  // 删除广告
  const handleDelete = async (poster: GithubIssueItem[]) => {
    const names = poster.map((item) => item.posterTitle).join(',');
    const ids = poster.map((item) => Number(item.posterId));

    modal.confirm({
      title: `确定删除名字：${names}的广告吗？`,
      centered: true,
      onOk: async () => {
        await postPosterDeletePoster({ ids: ids });
        messageApi.success(`删除成功`);
        actionRef.current?.reload();
      },
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'posterId',
      search: false,
    },
    {
      title: '封面',
      dataIndex: 'posterImage',
      search: false,
      render: (_, record) => {
        return <Image src={record.posterImage?.imgSrc} />;
      },
    },
    {
      title: '广告标题',
      dataIndex: 'posterTitle',
    },
    {
      title: '链接',
      dataIndex: 'posterLink',
      search: false,
    },
    {
      title: '站点Id',
      dataIndex: 'webSiteId',
      search: false,
    },
    {
      title: '浏览次数',
      dataIndex: 'clickCount',
      search: false,
    },
    {
      title: '上架',
      dataIndex: 'isOnline',
      search: false,
      render: (_, record) => {
        return record.isOnline ? (
          <Tag color="#87d068">已上架</Tag>
        ) : (
          <Tag color="#f50">已下架</Tag>
        );
      },
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
      width: 180,
      render: (_, record) => {
        const actions = [
          <a key="edit" onClick={() => setPosterId(record.posterId)}>
            编辑
          </a>,
        ];
        if (record.isOnline) {
          actions.push(
            <a
              key="removed"
              onClick={() => handleStatusChange([record], false)}
            >
              下架
            </a>,
          );
        } else {
          actions.push(
            <a key="listed" onClick={() => handleStatusChange([record], true)}>
              上架
            </a>,
          );
        }
        actions.push(
          <a
            key="delete"
            onClick={() => handleDelete([record])}
            style={{ color: '#f00' }}
          >
            删除
          </a>,
        );
        return actions;
      },
    },
  ];

  // 获取站点列表
  const getWebSiteList = async () => {
    const data = (await getWebSiteGetWebSiteList({
      page: 1,
      count: 500,
    })) as {
      list: WebSiteItem[];
    };
    const listData: WebSiteItem[] = data.list;
    setWebSiteList(
      listData.map((item: WebSiteItem) => {
        return {
          value: item.webSiteId,
          label: item.name,
        };
      }),
    );
  };

  const handleGetPosterById = async () => {
    const data = (await getPosterGetPosterById({
      id: Number(posterId),
    })) as
      | FieldType
      | {
          posterImage: {
            imgSrc: string;
          };
        };

    form.setFieldsValue({
      ...data,
    });
    console.log(data);

    if ('posterImage' in data) {
      setPosterImage([{ url: data.posterImage.imgSrc }]);
    } else {
      setPosterImage([]);
    }

    if ('posterImageId' in data) {
      setPosterImageId(data.posterImageId);
    }

    setOpenCreateDialog(true);
  };

  useEffect(() => {
    if (Number(posterId) > 0) {
      getWebSiteList();
      handleGetPosterById();
    }
  }, [posterId]);

  // 重置表单
  const resetForm = () => {
    setPosterId('0');
    setPosterImageId('');
    setPosterImage([]);
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = async (values: FieldType) => {
    setCreateLoading(true);
    const params: API.FBPoster = {
      ...values,
      posterImageId: Number(posterImageId),
      webSiteId: Number(values.webSiteId),
      posterId: Number(posterId),
    };
    try {
      await postPosterSavePoster(params);
      messageApi.success('添加成功');

      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  // 新增广告
  const handleCreate = async () => {
    await getWebSiteList();
    setOpenCreateDialog(true);
  };

  return (
    <>
      {messageContextHolder}
      <ProTable<GithubIssueItem>
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
              <a onClick={() => handleStatusChange(selectedRows, true)}>
                批量上架
              </a>
              <a onClick={() => handleStatusChange(selectedRows, false)}>
                批量下架
              </a>
              <a
                onClick={() => handleDelete(selectedRows)}
                style={{ color: '#f00' }}
              >
                批量删除
              </a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            posterTitle: params.posterTitle?.trim(),
          };
          const { list = [], total = 0 } = (await getPosterGetPosterList(
            searchParams,
          )) as {
            list: GithubIssueItem[];
            total: number;
          };
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="posterId"
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
        title="新增广告"
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        afterClose={resetForm}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          onFinish={handleSubmit}
          labelAlign="left"
        >
          <Form.Item<FieldType>
            label="站点"
            name="webSiteId"
            rules={[{ required: true, message: '请选择站点' }]}
          >
            <Select placeholder="请选择站点" options={webSiteList} />
          </Form.Item>
          <Form.Item<FieldType>
            label="广告标题"
            name="posterTitle"
            rules={[{ required: true, message: '请输入广告标题' }]}
          >
            <Input placeholder="请输入广告标题" />
          </Form.Item>
          <Form.Item<FieldType>
            label="广告链接"
            name="posterLink"
            rules={[{ required: true, message: '请输入广告链接' }]}
          >
            <Input placeholder="请输入广告链接" />
          </Form.Item>
          <Form.Item<FieldType>
            label="是否上线"
            name="isOnline"
            rules={[{ required: true, message: '请选择是否上线' }]}
          >
            <Radio.Group>
              <Radio value={true}> 上架 </Radio>
              <Radio value={false}> 下架 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="封面图片"
            name="posterImageId"
            rules={[{ required: true, message: '请上传封面图片' }]}
          >
            <ImageWall
              fileList={posterImage}
              onChange={(fileList) => {
                const [first] = fileList;
                const id = first?.response?.data?.imageId || '';
                setPosterImageId(id);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {contextHolder}
    </>
  );
};
