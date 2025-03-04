import { Image, ImageWall } from '@/components';
import {
  getBrandGetBrandById,
  getBrandGetBrandList,
  postBrandDeleteBrand,
  postBrandSaveBrand,
} from '@/services/api/brand';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Tag,
} from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

// 品牌列表项数据类型
type BrandItem = {
  brandId: number;
  brandName: string;
  brandDescribe: string;
  logoImageId: number;
  logoImage: {
    imageId: number;
    imgSrc: string;
    width: number;
    height: number;
    size: number;
    hash: string;
    createTime: string;
  };
  logoImageBackground: string;
  isOnline: boolean;
  isHot: boolean;
  hotTime: string;
  goodCount: number;
  createTime: string;
};

// 表单字段类型
type FieldType = {
  brandId: number;
  brandName: string;
  brandDescribe: string;
  logoImageId: number;
  isOnline: boolean;
  isHot: boolean;
  goodCount: number;
};

// 文件信息类型
type fileInfoType = {
  imgSrc: string;
  imageId: string;
  height: number;
  size: number;
  width: number;
};

const BrandManagementPage = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const actionRef = useRef<ActionType>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();
  const [brandId, setBrandId] = useState<number>(0);
  const [brandLogo, setBrandLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  // 获取log 文件，格式化传入 文件上传组件用于回显
  const getFile = useCallback(() => {
    return [brandLogo]
      .map((f) => ({
        url: f.imgSrc,
      }))
      .filter((f) => f.url);
  }, [brandLogo]);

  // 获取品牌详情
  const getBrandDetail = useCallback(async (id: number) => {
    const { data } = await getBrandGetBrandById({ id });
    setBrandLogo({ ...data.logoImage });
    form.setFieldsValue({
      ...data,
    });
  }, []);

  useEffect(() => {
    if (brandId > 0) {
      getBrandDetail(brandId);
    }
  }, [brandId]);

  // 编辑品牌信息
  const handleEditBrand = async (id: number) => {
    setBrandId(id);
    setOpenCreateDialog(true);
  };

  // 删除品牌信息
  const handleDeleteBrand = async (id: number) => {
    await modal.confirm({
      title: '确定删除该品牌吗？',
      centered: true,
      onOk: async () => {
        try {
          await postBrandDeleteBrand({ ids: [id] });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  // const hotChange = (id: number, isHot: boolean) => {
  //   console.log(id, isHot);
  //   Modal.confirm({
  //     title: '确定要修改热门状态吗？',
  //     content: '热门状态将影响品牌在首页的展示',
  //     onOk: async () => {
  //       // await postBrandUpdateBrandHot({ id, isHot });
  //     },
  //   });
  // }

  // const onlineChange = (id: number, isOnline: boolean) => {
  //   console.log(id, isOnline);
  //   Modal.confirm({
  //     title: '确定要修改上线状态吗？',
  //     content: '上线状态将影响品牌在首页的展示',
  //     onOk: async () => {
  //       // await postBrandUpdateBrandOnline({ id, isOnline });
  //     },
  //   });
  // }

  // 表格列定义
  const columns: ProColumns<BrandItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'brandId',
      width: 60,
      search: false,
    },
    {
      title: 'Logo',
      dataIndex: ['logoImage', 'imgSrc'],
      search: false,
      render: (_, record) =>
        record?.logoImage?.imgSrc ? (
          <Image objectFit="contain" src={record?.logoImage?.imgSrc} />
        ) : (
          '-'
        ),
    },
    {
      title: 'Logo背景颜色',
      dataIndex: 'logoImageBackground',
      search: false,
      render: (_, record) =>
        record?.logoImageBackground ? (
          <Tag color={record?.logoImageBackground}>
            {record?.logoImageBackground}
          </Tag>
        ) : (
          '-'
        ),
    },
    {
      title: '名称',
      dataIndex: 'brandName',
      copyable: true,
    },
    {
      title: '简介',
      dataIndex: 'brandDescribe',
      search: false,
    },
    {
      title: '上线',
      dataIndex: 'isOnline',
      search: false,
      render: (text) =>
        text ? <Tag color="success">上线</Tag> : <Tag color="red">下线</Tag>,
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      search: false,
      render: (text) => (text ? <Tag color="red">热门</Tag> : ''),
    },
    {
      title: '商品数',
      dataIndex: 'goodCount',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      width: 150,
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
          onClick={() => handleEditBrand(record.brandId)}
        >
          编辑
        </a>,
        // <a key='hot' type='link' onClick={() => { hotChange(record.brandId, record.isHot) }}>
        //   {record.isHot ? '下热门' : '上热门'}
        // </a>,
        // <a key='online' type='link' onClick={() => { onlineChange(record.brandId, record.isOnline) }}>
        //   {record.isOnline ? '下线' : '上线'}
        // </a>,
        <a
          key="delete"
          style={{ color: '#f00' }}
          type="link"
          onClick={() => handleDeleteBrand(record.brandId)}
        >
          删除
        </a>,
      ],
      width: 180,
    },
  ];

  // 创建或更新品牌信息
  const handleCreateOrUpdateBrand = async (values: FieldType) => {
    if (createLoading) {
      messageApi.error('操作中，请稍后再试');
      return;
    }
    setCreateLoading(true);
    const params = {
      ...values,
      brandId: brandId,
      logoImageId: Number(brandLogo.imageId),
    };
    try {
      await postBrandSaveBrand(params);
      messageApi.success(brandId ? '更新成功' : '新增成功');
      setCreateLoading(false);
      setOpenCreateDialog(false);
      actionRef.current?.reload();
    } finally {
      setCreateLoading(false);
    }
  };

  // 关闭模态框时重置表单
  const resetForm = () => {
    form.resetFields();
    setBrandId(0);
    setCreateLoading(false);
    setOpenCreateDialog(false);
    setBrandLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
  };

  // 上传按钮组件
  return (
    <>
      {messageContextHolder}
      {contextHolder}
      <ProTable<BrandItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const searchParams = {
            page: params.current,
            count: params.pageSize,
            brandName: params.brandName,
          };
          try {
            const { data } = await getBrandGetBrandList(searchParams);
            const { list = [], total = 0 } = data;
            return {
              data: list,
              success: true,
              total,
            };
          } catch (error) {
            messageApi.error('获取品牌列表失败');
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="brandId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => setOpenCreateDialog(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Modal
        title={brandId ? '编辑品牌信息' : '新增品牌信息'}
        centered
        open={openCreateDialog}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: createLoading,
        }}
        onCancel={() => setOpenCreateDialog(false)}
        width={600}
        afterClose={resetForm}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          onFinish={handleCreateOrUpdateBrand}
          initialValues={{
            isOnline: false,
            isHot: false,
          }}
          labelAlign="left"
        >
          <Form.Item<FieldType> label="ID" name="brandId" hidden>
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="品牌名称"
            name="brandName"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>

          <Form.Item<FieldType>
            label="上线"
            name="isOnline"
            rules={[{ required: true, message: '请选择上线状态' }]}
          >
            <Radio.Group>
              <Radio value={true}>上线</Radio>
              <Radio value={false}>下线</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="热门"
            name="isHot"
            rules={[{ required: true, message: '请选择是否热门' }]}
          >
            <Radio.Group>
              <Radio value={true}>热门</Radio>
              <Radio value={false}>非热门</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item<FieldType>
            label="品牌商品数"
            name="goodCount"
            rules={[{ required: true, message: '请输入商品数' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={1}
              placeholder="请输入商品数"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="品牌简介"
            name="brandDescribe"
            rules={[{ required: false, message: '请输入简介' }]}
          >
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
          <Form.Item<FieldType> label="品牌Logo" name="logoImageId">
            <ImageWall
              fileList={getFile()}
              onChange={(fileList) => {
                const [first] = fileList;
                const file = first?.response?.data || {};
                setBrandLogo({ ...file });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandManagementPage;
