import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { useRef } from 'react';

import { getLogGetLogList, postLogTrueDeleteLog } from '@/services/api/log';

interface TableItem {
  logId: string;
  logType: string;
  logData: string;
  logTypeName: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();
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
    },
    {
      title: '日志类型',
      dataIndex: 'logTypeName',
      search: false,
      width: 100,
    },
    {
      title: '日志内容',
      dataIndex: 'logData',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      width: 150,
    },
  ];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { data } = await getLogGetLogList({
            page: params.current,
            count: params.pageSize,
          });
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total,
          };
        }}
        rowKey="logId"
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
