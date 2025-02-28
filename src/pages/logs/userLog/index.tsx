import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';

interface TableItem {
  adminLogId: string;
  userId: string;
  eventData: string;
  note: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'adminLogId',
      search: false,
    },
    {
      title: '操作员ID',
      dataIndex: 'userId',
    },
    {
      title: '事件',
      dataIndex: 'eventData',
    },
    {
      title: '描述',
      dataIndex: 'note',
      search: false,
      width: 300,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
          return {
            data: [],
            success: true,
            total: 0,
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
          <Button key="button" color="danger" variant="solid">
            清空日志(物理删除)
          </Button>,
        ]}
      />
    </>
  );
};
