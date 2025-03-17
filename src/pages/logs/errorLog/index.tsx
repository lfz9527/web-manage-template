import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

import {
  getLogGetLogList,
  getLogGetLogTypeList,
  postLogTrueDeleteLog,
} from '@/services/api/log';

interface TableItem {
  logId: string;
  logType: string;
  logData: string;
  logTypeName: string;
  createTime: string;
}

type LogTypeEnumType = {
  [key: string]: {
    text: string;
  };
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [logTypeList, setLogTypeList] = useState<LogTypeEnumType>({});

  const getLogTypeList = async () => {
    const { data } = await getLogGetLogTypeList();
    const valueEnum = {} as LogTypeEnumType;
    data.forEach((item: { key: string; value: string }) => {
      valueEnum[item.value as keyof LogTypeEnumType] = {
        text: item.key,
      };
    });

    setLogTypeList(valueEnum);
  };

  useEffect(() => {
    getLogTypeList();
  }, []);

  const handleDeleteLog = async () => {
    Modal.confirm({
      title: '提示',
      content: '确定物理删除全部日志吗？',
      centered: true,
      onOk: async () => {
        try {
          await postLogTrueDeleteLog();
          messageApi.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          messageApi.error('删除失败');
        }
      },
    });
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'logId',
      search: false,
      width: 100,
    },
    {
      title: '日志类型',
      dataIndex: 'logType',
      valueEnum: logTypeList,
      width: 100,
    },
    {
      title: '日志内容',
      dataIndex: 'logData',
      search: false,
      render: (_) => (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            maxHeight: '70vh',
            overflow: 'auto',
            lineHeight: '1.6',
            maxWidth: 1800,
          }}
        >
          {_}
        </pre>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      fixed: 'right',
      width: 150,
    },
  ];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 1600 }}
        cardBordered
        request={async (params) => {
          const searchData = {
            page: params.current,
            count: params.pageSize,
            ...params,
          };
          delete searchData.current;
          delete searchData.pageSize;

          const { data } = await getLogGetLogList(searchData);

          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="logId"
        pagination={{
          defaultPageSize: 10,
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
            color="danger"
            variant="solid"
            onClick={handleDeleteLog}
          >
            清空日志(物理删除)
          </Button>,
        ]}
      />
      {messageContextHolder}
    </>
  );
};
