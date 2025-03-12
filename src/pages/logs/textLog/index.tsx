import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, message } from 'antd';
import { useRef, useState } from 'react';

import { getLogGetTextLogList, postLogDeleteTextLog } from '@/services/api/log';

interface TableItem {
  fileName: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const handlePreviewLog = async (record: TableItem) => {
    try {
      const response = await fetch(
        `/api/Log/GetTextLogDetails?filename=${record.fileName}`,
      );
      const text = await response.text();
      setPreviewContent(text);
      setPreviewTitle(record.fileName);
      setPreviewVisible(true);
    } catch (error) {
      messageApi.error('获取日志内容失败');
    }
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
          <a key="preview" onClick={() => handlePreviewLog(record)}>
            预览
          </a>,
          <a key="download" onClick={() => handleDownloadLog(record)}>
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
      <Modal
        title={previewTitle}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
        centered
      >
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          {previewContent}
        </pre>
      </Modal>
      {messageContextHolder}
    </>
  );
};
