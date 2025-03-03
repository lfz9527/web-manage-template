import {
  getBrandGetBrandById,
  getBrandGetBrandList,
  postBrandDeleteBrand,
  postBrandSaveBrand,
} from '@/services/api/brand';
import { postImageUploadImage } from '@/services/api/image';
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Upload,
  UploadProps,
} from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';

// 品牌列表项数据类型
type BrandItem = {
  brandId: number;
  goodCategoryId: number;
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
  goodCategoryId: number;
  brandName: string;
  brandDescribe: string;
  logoImageId: number;
  logoImageBackground: string;
  isOnline: boolean;
  isHot: boolean;
  goodCount: number;
  createTime: moment.Moment;
};

// 文件类型
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [brandLogo, setBrandLogo] = useState<fileInfoType>({
    imgSrc: '',
    imageId: '',
    height: 0,
    size: 0,
    width: 0,
  });

  // 打开创建/编辑模态框
  const handleOpenCreateDialog = () => {
    form.resetFields();
    setBrandId(0);
    setBrandLogo({
      imgSrc: '',
      imageId: '',
      height: 0,
      size: 0,
      width: 0,
    });
    setOpenCreateDialog(true);
  };

  // 编辑品牌信息
  const handleEditBrand = async (id: number) => {
    setBrandId(id);
    try {
      const { data } = await getBrandGetBrandById({ id });
      form.setFieldsValue({
        brandId: data.brandId,
        goodCategoryId: data.goodCategoryId,
        brandName: data.brandName,
        brandDescribe: data.brandDescribe,
        logoImageId: data.logoImageId,
        logoImageBackground: data.logoImageBackground,
        isOnline: data.isOnline,
        isHot: data.isHot,
        goodCount: data.goodCount,
        createTime: moment(data.createTime),
      });
      setBrandLogo({
        imgSrc: data.logoImage.imgSrc,
        imageId: String(data.logoImageId),
        height: data.logoImage.height,
        size: data.logoImage.size,
        width: data.logoImage.width,
      });
      setOpenCreateDialog(true);
    } catch (error) {
      messageApi.error('获取品牌信息失败');
    }
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

  const handleUpload = async (file: FileType) => {
    try {
      setUploadLoading(true);
      const data = (await postImageUploadImage({
        file: file,
      })) as fileInfoType;

      const { imgSrc, imageId, height, size, width } = data;
      setUploadLoading(false);
      setBrandLogo({
        imgSrc,
        imageId,
        height,
        size,
        width,
      });
    } catch (error) {
      messageApi.error('图片上传失败');
      setUploadLoading(false);
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      messageApi.error('只能上传 JPG/PNG 文件!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      messageApi.error('图片大小不能超过5MB!');
      return false;
    }
    handleUpload(file);
    return false;
  };

  // 表格列定义
  const columns: ProColumns<BrandItem>[] = [
    {
      title: 'ID',
      dataIndex: 'brandId',
      width: 60,
    },
    {
      title: 'Logo',
      dataIndex: ['logoImage', 'imgSrc'],
      search: false,
      render: (text) => <Avatar src={text} />,
    },
    {
      title: 'Logo背景',
      dataIndex: 'logoImageBackground',
      search: false,
    },
    {
      title: '关联类目',
      dataIndex: 'goodCategoryId',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'brandName',
      search: false,
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
      render: (text) => (text ? '上线' : '下线'),
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      search: false,
      render: (text) => (text ? '热门' : ''),
    },
    {
      title: '商品数',
      dataIndex: 'goodCount',
      search: false,
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
          onClick={() => handleEditBrand(record.brandId)}
        >
          编辑
        </a>,
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
    if (uploadLoading) {
      messageApi.error('图片上传中，请稍后再试');
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
    } catch (error) {
      messageApi.error(brandId ? '更新失败' : '新增失败');
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
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{uploadLoading ? '上传中...' : '上传'}</div>
    </button>
  );

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
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleOpenCreateDialog}
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
        width={800}
        afterClose={resetForm}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          onFinish={handleCreateOrUpdateBrand}
          labelAlign="left"
        >
          <Form.Item<FieldType> label="ID" name="brandId" hidden>
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="关联类目"
            name="goodCategoryId"
            rules={[{ required: true, message: '请输入关联类目' }]}
          >
            <Input placeholder="请输入关联类目" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Logo"
            name="logoImageId"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : [e])}
          >
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action="/api/Image/UploadImage"
              accept="image/*"
              beforeUpload={beforeUpload}
            >
              {brandLogo.imgSrc ? (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src={brandLogo.imgSrc}
                      alt="logo"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined color="#000" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBrandLogo({
                        imgSrc: '',
                        imageId: '',
                        height: 0,
                        size: 0,
                        width: 0,
                      });
                    }}
                    style={{
                      position: 'absolute',
                      left: 70,
                      top: -5,
                    }}
                  />
                </>
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="Logo背景"
            name="logoImageBackground"
            rules={[{ required: true, message: '请输入Logo背景' }]}
          >
            <Input placeholder="请输入Logo背景" />
          </Form.Item>
          <Form.Item<FieldType>
            label="名称"
            name="brandName"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item<FieldType>
            label="简介"
            name="brandDescribe"
            rules={[{ required: false, message: '请输入简介' }]}
          >
            <Input.TextArea placeholder="请输入简介" />
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
            label="商品数"
            name="goodCount"
            rules={[{ required: true, message: '请输入商品数' }]}
          >
            <Input placeholder="请输入商品数" />
          </Form.Item>
          <Form.Item<FieldType>
            label="创建时间"
            name="createTime"
            rules={[{ required: true, message: '请选择创建时间' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择创建时间"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandManagementPage;
