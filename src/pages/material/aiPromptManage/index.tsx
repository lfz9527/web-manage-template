import { getAiGetAiPromptWordList } from '@/services/api/ai';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal, Space } from 'antd';
import { useRef } from 'react';

interface TableItem {
  id: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const columns: ProColumns<TableItem>[] = [];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a onClick={() => {}}>批量公开</a>
              <a onClick={() => {}}>批量私密</a>
            </Space>
          );
        }}
        request={async (params) => {
          const searchData = {
            ...params,
            page: params.current,
            count: params.pageSize,
          };

          delete searchData.current;
          delete searchData.pageSize;

          const { data } = await getAiGetAiPromptWordList(searchData);
          const { list, total } = data;
          return {
            data: list,
            success: true,
            total: total,
          };
        }}
        rowKey="goodAlbumId"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        dateFormatter="string"
      />
      {messageContextHolder}
      {contextHolder}
    </>
  );
};
