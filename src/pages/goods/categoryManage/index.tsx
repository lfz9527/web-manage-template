import { Image, ImageWall } from '@/components';
import {
  getGoodGetGoodCategoryList,
  getGoodGetGoodCategoryListParent,
  postGoodHotGoodCategory,
} from '@/services/api/good';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Cascader,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Space,
  Tag,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

interface TableItem {
  goodCategoryId: number;
  categoryName: string;
  parentId: number;
  image: {
    imgSrc: string;
  };
  isHot: boolean;
  goodCount: number;
  createTime: string;
}

type FileType = {
  goodCategoryId: number;
  categoryName: string;
  parentId: number;
  imageId: string;
  isHot: boolean;
  image: Record<string, string>[];
};

type CategoryOptionItem = {
  value: string;
  label: string;
  isLeaf: boolean;
  children: CategoryOptionItem[];
};

export default () => {
  const actionRef = useRef<ActionType>();

  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [selectedRows, setSelectedRows] = useState<TableItem[]>([]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [category, setCategory] = useState<TableItem[]>([]);

  const [categoryOptionList, setCategoryOptionList] = useState<
    CategoryOptionItem[]
  >([]);
  const [categoryImage, setCategoryImage] = useState<{ url: string }[]>([]);
  const [goodCategoryId, setGoodCategoryId] = useState<number>(0);

  const handleCateOption = async (parentId: number = 0, level: number = 0) => {
    const { data } = await getGoodGetGoodCategoryListParent({
      parentId,
    });
    setCategoryOptionList((state) =>
      [...state, ...data].map((item) => ({
        value: item.goodCategoryId,
        label: item.categoryName,
        children: [],
        level,
        isLeaf: level === 1,
      })),
    );
  };

  useEffect(() => {
    handleCateOption();
  }, []);

  // 上热门
  const handleHotGoodCategory = async (
    category: TableItem[],
    isHot: boolean,
  ) => {
    const ids = category.map((item) => item.goodCategoryId);
    const params = {
      ids,
      isHot,
    };
    try {
      await postGoodHotGoodCategory(params);
      messageApi.success(isHot ? '上热门成功' : '下热门成功');
      actionRef.current?.reload();
    } catch (error) {}
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'goodCategoryId',
      search: false,
      width: 100,
    },
    {
      title: '图片',
      dataIndex: 'imageId',
      search: false,
      render: (_, record) => {
        return record?.image?.imgSrc ? (
          <Image src={record.image.imgSrc} />
        ) : (
          '-'
        );
      },
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      search: true,
    },
    {
      title: '父级Id',
      dataIndex: 'parentId',
      search: true,
    },
    {
      title: '是否热门',
      dataIndex: 'isHot',
      search: false,
      render: (_, record) => {
        return record.isHot ? <Tag color="red">是</Tag> : '';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 220,
      ellipsis: true,
      render: (_, record) =>
        [
          <a key="edit" onClick={() => {}}>
            编辑
          </a>,
          !record.isHot && (
            <a
              key="upHot"
              onClick={() => {
                handleHotGoodCategory([record], true);
              }}
            >
              上热门
            </a>
          ),
          record.isHot && (
            <a
              key="downHot"
              onClick={() => {
                handleHotGoodCategory([record], false);
              }}
            >
              下热门
            </a>
          ),
          <a key="delete" style={{ color: 'red' }} onClick={() => {}}>
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  // 重置表单
  const resetForm = () => {
    form.resetFields();
  };

  // 提交表单
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => {}}>批量上热门</a>
              <a onClick={() => {}}>批量下热门</a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            parentId: params.parentId,
          } as Record<string, any>;
          const { data } = await getGoodGetGoodCategoryList(searchParams);

          const { list = [], total } = data;

          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="goodCategoryId"
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
            onClick={() => setDialog(true)}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />

      <Modal
        title={goodCategoryId ? '编辑分类' : '新增分类'}
        centered
        open={dialog}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setDialog(false)}
        afterClose={resetForm}
        okButtonProps={{
          loading: loading,
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          onFinish={handleSubmit}
          labelAlign="left"
          initialValues={{
            isHot: false,
          }}
        >
          <Form.Item<FileType>
            label="分类名称"
            name="categoryName"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item<FileType>
            label="父级Id"
            name="parentId"
            rules={[{ required: true, message: '请选择父级Id' }]}
          >
            <Cascader placeholder="请选择父级Id" options={categoryOptionList} />
          </Form.Item>
          <Form.Item<FileType>
            label="是否热门"
            name="isHot"
            rules={[{ required: true, message: '请选择是否热门' }]}
          >
            <Radio.Group>
              <Radio value={true}>热门</Radio>
              <Radio value={false}>非热门</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FileType>
            label="图片"
            name="image"
            rules={[{ required: true, message: '请选择图片' }]}
          >
            <ImageWall fileList={categoryImage} maxCount={1} />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
      {messageContextHolder}
    </>
  );
};
