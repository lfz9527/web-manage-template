import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, message } from 'antd';
import { useRef } from 'react';

import { getLogGetTextLogList, postLogDeleteTextLog } from '@/services/api/log';

interface TableItem {
  fileName: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const handleDeleteLog = async (record: TableItem) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该日志文件吗？',
      centered: true,
      onOk: async () => {
        await postLogDeleteTextLog({ filename: record.fileName });
        messageApi.success('删除成功');
        actionRef.current?.reload();
      },
    });
  };

  const handleDownloadLog = async (record: TableItem) => {
    const a = document.createElement('a');
    a.href = `/api/Log/GetTextLogDetails?filename=${record.fileName}`;
    a.download = record.fileName;
    a.click();
  };

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '日志文件',
      dataIndex: 'fileName',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) =>
        [
          <a key="detail" onClick={() => handleDownloadLog(record)}>
            下载
          </a>,
          <a
            key="delete"
            style={{ color: 'red' }}
            onClick={() => handleDeleteLog(record)}
          >
            删除
          </a>,
        ].filter(Boolean),
    },
  ];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { data } = await getLogGetTextLogList({
            page: params.current,
            count: params.pageSize,
          });
          return {
            data: data.map((file: any) => {
              return {
                fileName: file,
                createTime: file,
              };
            }),
            success: true,
            total: data.length,
          };
        }}
        rowKey="fileName"
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
      />
      {messageContextHolder}
    </>
  );
};
