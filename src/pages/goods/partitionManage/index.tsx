import { Image, ImageWall } from '@/components';
import {
  getGoodGetGoodPartitionById,
  getGoodGetGoodPartitionList,
  postGoodDeleteGoodPartition,
  postGoodSaveGoodPartition,
} from '@/services/api/good';
import { getWebSiteGetWebSiteList } from '@/services/api/webSite';
import { allowAllSiteId, isNull } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

interface TableItem {
  webSite: {
    name: string;
  };
  goodPartitionId: string;
  partitionName: string;
  horizontalImage: {
    imgSrc: string;
    imageId: number;
  };
  verticalImage: {
    imgSrc: string;
    imageId: number;
  };
  squareImage: {
    imgSrc: string;
    imageId: number;
  };
  createTime: string;
}

type SelectItem = {
  value: string;
  label: string;
};

type FileType = {
  webSiteId: string;
  partitionName: string;
  horizontalImageId: string;
  squareImageId: string;
  verticalImageId: string;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [partitionId, setPartitionId] = useState<number>(0);
  const [webSiteList, setWebSiteList] = useState<SelectItem[]>([]);

  const [horizontalImage, setHorizontalImage] = useState<
    TableItem['horizontalImage'][]
  >([]);
  const [verticalImage, setVerticalImage] = useState<
    TableItem['verticalImage'][]
  >([]);
  const [squareImage, setSquareImage] = useState<TableItem['squareImage'][]>(
    [],
  );

  const getHorImage = useCallback(() => {
    return horizontalImage.map((item) => {
      return {
        url: item.imgSrc,
      };
    });
  }, [horizontalImage]);

  const getVerImage = useCallback(() => {
    return verticalImage.map((item) => {
      return {
        url: item.imgSrc,
      };
    });
  }, [verticalImage]);

  const getSquareImage = useCallback(() => {
    return squareImage.map((item) => {
      return {
        url: item.imgSrc,
        id: item.imageId,
      };
    });
  }, [squareImage]);

  // 获取站群列表
  const getWebSiteList = async () => {
    const { data } = await getWebSiteGetWebSiteList({
      page: 1,
      count: 500,
    });
    const { list } = data;
    setWebSiteList(
      list.map((item: any) => {
        return {
          value: item.webSiteId,
          label: item.name,
        };
      }),
    );
  };

  const getPartitionInfo = async () => {
    const { data } = await getGoodGetGoodPartitionById({
      id: partitionId,
    });
    console.log(data);
    const params = {
      ...data,
    };

    if (isNull(data.webSiteId, true)) {
      delete params.webSiteId;
    }

    if (!isNull(data.horizontalImageId, true)) {
      setHorizontalImage([data.horizontalImage]);
    } else {
      delete params.horizontalImageId;
    }

    if (!isNull(data.verticalImageId, true)) {
      setVerticalImage([data.verticalImage]);
    } else {
      delete params.verticalImageId;
    }

    if (!isNull(data.squareImageId, true)) {
      setSquareImage([data.squareImage]);
    } else {
      delete params.squareImageId;
    }

    form.setFieldsValue(params);
  };

  useEffect(() => {
    if (!isNull(partitionId, true)) {
      getPartitionInfo();
    }
  }, [partitionId]);

  useEffect(() => {
    getWebSiteList();
  }, []);

  // 编辑分区
  const editPartition = (id: number) => {
    setPartitionId(id);
    setDialog(true);
  };

  // 删除分区
  const handleDeletePartition = (partition: TableItem[]) => {
    const ids = partition.map((item) => Number(item.goodPartitionId));

    Modal.confirm({
      title: '提示',
      content: '确定删除该分区吗？',
      centered: true,
      onOk: async () => {
        try {
          await postGoodDeleteGoodPartition({
            ids,
          });
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

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

  const columns: ProColumns<TableItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '站点名称',
      dataIndex: ['webSite', 'name'],
      search: allowAllSiteId(),
      valueEnum: webSiteListValueEnum(),
    },
    {
      title: '分区名称',
      dataIndex: 'partitionName',
    },
    {
      title: '水平图片',
      dataIndex: ['horizontalImage', 'imgSrc'],
      search: false,
      render: (_, record) => {
        return record?.horizontalImage?.imgSrc ? (
          <Image src={record.horizontalImage.imgSrc} />
        ) : (
          '-'
        );
      },
    },
    {
      title: '垂直图片',
      dataIndex: ['verticalImage', 'imgSrc'],
      search: false,
      render: (_, record) => {
        return record?.verticalImage?.imgSrc ? (
          <Image src={record.verticalImage.imgSrc} />
        ) : (
          '-'
        );
      },
    },
    {
      title: '方形图片',
      dataIndex: ['squareImage', 'imgSrc'],
      search: false,
      render: (_, record) => {
        return record?.squareImage?.imgSrc ? (
          <Image src={record.squareImage.imgSrc} />
        ) : (
          '-'
        );
      },
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
      width: 220,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            editPartition(Number(record.goodPartitionId));
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          style={{ color: 'red' }}
          onClick={() => {
            handleDeletePartition([record]);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const params = {
      goodPartitionId: partitionId,
      ...values,
      horizontalImageId: horizontalImage[0]?.imageId || 0,
      verticalImageId: verticalImage[0]?.imageId || 0,
      squareImageId: squareImage[0]?.imageId || 0,
      webSiteId: values.webSiteId || 0,
    };
    try {
      await postGoodSaveGoodPartition(params);
      messageApi.success('保存成功');
      setDialog(false);
      actionRef.current?.reload();
    } catch (error) {
      messageApi.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setHorizontalImage([]);
    setVerticalImage([]);
    setSquareImage([]);
    setPartitionId(0);
  };

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { data } = await getGoodGetGoodPartitionList({
            page: params.current,
            count: params.pageSize,
            partitionName: params.partitionName?.trim(),
            webSiteId: params?.webSite?.name || 0,
          });
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="goodPartitionId"
        pagination={{
          defaultPageSize: 50,
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
        title={isNull(partitionId, true) ? '新增分区' : '编辑分区'}
        centered
        open={dialog}
        onOk={() => {
          form.submit();
        }}
        width={800}
        onCancel={() => setDialog(false)}
        afterClose={handleReset}
        okButtonProps={{
          loading: loading,
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item<FileType>
                label="分区名称"
                name="partitionName"
                rules={[{ required: true, message: '请输入分区名称' }]}
              >
                <Input placeholder="请输入分区名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FileType> label="站点" name="webSiteId">
                <Select
                  allowClear
                  placeholder="请选择站点"
                  options={webSiteList}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FileType> label="水平图片" name="horizontalImageId">
                <ImageWall
                  fileList={getHorImage()}
                  onChange={(fileList) => {
                    setHorizontalImage(
                      fileList.map((item) => {
                        const file = item.response.data || {};
                        return {
                          imgSrc: file.imgSrc,
                          imageId: file.imageId,
                        };
                      }),
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FileType> label="垂直图片" name="verticalImageId">
                <ImageWall
                  fileList={getVerImage()}
                  onChange={(fileList) => {
                    setVerticalImage(
                      fileList.map((item) => {
                        const file = item.response.data || {};
                        return {
                          imgSrc: file.imgSrc,
                          imageId: file.imageId,
                        };
                      }),
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FileType> label="方形图片" name="squareImageId">
                <ImageWall
                  key="horizontalImageId"
                  fileList={getSquareImage()}
                  onChange={(fileList) => {
                    setSquareImage(
                      fileList.map((item) => {
                        const file = item.response.data || {};
                        return {
                          imgSrc: file.imgSrc,
                          imageId: file.imageId,
                        };
                      }),
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {messageContextHolder}
    </>
  );
};
