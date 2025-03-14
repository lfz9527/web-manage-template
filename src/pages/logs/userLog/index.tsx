import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { useRef } from 'react';

import { getLogGetUserLogList, postLogTrueDeleteLog } from '@/services/api/log';

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
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '操作员ID',
      dataIndex: 'userId',
      width: 100,
    },
    {
      title: '事件',
      dataIndex: 'eventData',
    },
    {
      title: '描述',
      dataIndex: 'note',
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
          const { data } = await getLogGetUserLogList({
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
        rowKey="userLogId"
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        search={false}
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
