import { Image } from '@/components';
import {
  getCrawlerGetDistributionGoodList,
  postCrawlerAddDistributionTaskForKeyword,
} from '@/services/api/crawler';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal, Tag } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';

interface TableItem {
  id: string;
  // 第三方商品id
  goodId: string;
  // 商品链接
  baseLink: string;
  // 商品关键字
  goodKeyword: string;
  // 商品标题
  goodTitle: string;
  // 商品图片
  faceSrc: string;
  // 原价
  basePrice: string;
  // 现价
  price: string;
  // 是否成人用品
  isAdult: string;
  // 是否入库
  isLoad: string;

  createTime: string;
}

type FileType = {
  keyword: string;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [openDialog, setOpenDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '第三方商品id',
      dataIndex: 'goodId',
      search: false,
    },
    {
      title: '商品链接',
      dataIndex: 'baseLink',
      ellipsis: true,
      search: false,
      width: 300,
      render: (_, record) => (
        <a
          className={styles['dif-a']}
          href={record.baseLink}
          target="_blank"
          rel="noreferrer"
        >
          {_}
        </a>
      ),
    },
    {
      title: '商品关键字',
      dataIndex: 'goodKeyword',
      width: 200,
      ellipsis: true,
    },
    {
      title: '商品标题',
      dataIndex: 'goodTitle',
    },
    {
      title: '商品图片',
      dataIndex: 'faceSrc',
      search: false,
      render: (_, record) => {
        return record.faceSrc ? <Image src={record.faceSrc} /> : '-';
      },
    },
    {
      title: '商品原价',
      dataIndex: 'basePrice',
      search: false,
    },
    {
      title: '商品现价',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '是否成人用品',
      dataIndex: 'isAdult',
      valueEnum: {
        '-1': { text: '全部' },
        1: { text: '是' },
        0: { text: '否' },
      },
      render: (_, record) => {
        return record.isAdult === '0' ? (
          <Tag>否</Tag>
        ) : (
          <Tag color="red">是</Tag>
        );
      },
    },
    {
      title: '是否入库',
      dataIndex: 'isLoad',
      valueEnum: {
        '-1': { text: '全部' },
        1: { text: '是' },
        0: { text: '否' },
      },
      render: (_, record) => {
        return record.isLoad === '0' ? (
          <Tag color="#f50">否</Tag>
        ) : (
          <Tag color="#108ee9">是</Tag>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
  ];

  const handleCreate = async (values: FileType) => {
    if (createLoading) return;
    setCreateLoading(true);

    const params = {
      ...values,
    } as API.QUKeyWord;

    try {
      await postCrawlerAddDistributionTaskForKeyword(params);
      setOpenDialog(false);
      messageApi.success('生成成功');
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setCreateLoading(false);
    setOpenDialog(false);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const searchData = {
            ...params,
            page: params.current,
            count: params.pageSize,
            loadState: Number(params.isLoad || -1) as API.FilterStateEnum,
          } as Record<string, any>;

          delete searchData.current;
          delete searchData.pageSize;
          if ('isLoad' in searchData) {
            delete searchData.isLoad;
          }
          const { data } = await getCrawlerGetDistributionGoodList(searchData);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total: total,
          };
        }}
        search={{
          labelWidth: 'auto',
        }}
        rowKey="id"
        pagination={{
          defaultPageSize: 20,
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
            onClick={() => setOpenDialog(true)}
            variant="solid"
            color="danger"
          >
            添加指定关键词商品入库
          </Button>,
        ]}
      />

      <Modal
        title="添加指定关键词商品入库"
        centered
        open={openDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        afterClose={resetForm}
        onCancel={() => setOpenDialog(false)}
      >
        <Form
          onFinish={handleCreate}
          form={form}
          layout="vertical" // 设置表单布局为垂直
          labelAlign="left"
        >
          <Form.Item<FileType>
            label="关键字"
            name="keyword"
            rules={[{ required: true, message: '请输入关键字' }]}
          >
            <Input.TextArea rows={6}></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>

      {messageContextHolder}
      {contextHolder}
    </>
  );
};
