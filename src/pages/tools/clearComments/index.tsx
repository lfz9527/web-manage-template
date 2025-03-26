import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
const { Paragraph } = Typography;

const codeTypeOption = [
  {
    label: 'JS',
    value: 'javascript',
  },
  {
    label: 'HTML',
    value: 'html',
  },
];

// 辅助函数：判断是否可能是正则表达式的开始
const isRegexStart = (code: string) => {
  const lastChar = code.trim().slice(-1);
  return !lastChar || /[(,=:[!&|?{};]/.test(lastChar);
};

// 清除JS释
const clearJsComments = (code: string) => {
  const STATE = {
    NORMAL: 0,
    STRING_SINGLE: 1,
    STRING_DOUBLE: 2,
    STRING_TEMPLATE: 3,
    COMMENT_SINGLE: 4,
    COMMENT_MULTI: 5,
    REGEX: 6,
  };

  let result = '';
  let state = STATE.NORMAL;
  let commentStart = 0;
  let i = 0;

  while (i < code.length) {
    switch (state) {
      case STATE.NORMAL:
        if (code[i] === '/' && code[i + 1] === '/') {
          state = STATE.COMMENT_SINGLE;
          commentStart = i;
          i += 2;
        } else if (code[i] === '/' && code[i + 1] === '*') {
          state = STATE.COMMENT_MULTI;
          commentStart = i;
          i += 2;
        } else if (code[i] === '"') {
          state = STATE.STRING_DOUBLE;
          result += code[i];
          i++;
        } else if (code[i] === "'") {
          state = STATE.STRING_SINGLE;
          result += code[i];
          i++;
        } else if (code[i] === '`') {
          state = STATE.STRING_TEMPLATE;
          result += code[i];
          i++;
        } else if (code[i] === '/' && isRegexStart(result)) {
          state = STATE.REGEX;
          result += code[i];
          i++;
        } else {
          result += code[i];
          i++;
        }
        break;

      case STATE.COMMENT_SINGLE:
        if (code[i] === '\n') {
          state = STATE.NORMAL;
          result += '\n';
        }
        i++;
        break;

      case STATE.COMMENT_MULTI:
        if (code[i] === '*' && code[i + 1] === '/') {
          state = STATE.NORMAL;
          i += 2;
        } else {
          i++;
        }
        break;

      case STATE.STRING_SINGLE:
      case STATE.STRING_DOUBLE:
      case STATE.STRING_TEMPLATE:
        if (code[i] === '\\') {
          result += code[i] + code[i + 1];
          i += 2;
        } else if (
          (state === STATE.STRING_SINGLE && code[i] === "'") ||
          (state === STATE.STRING_DOUBLE && code[i] === '"') ||
          (state === STATE.STRING_TEMPLATE && code[i] === '`')
        ) {
          state = STATE.NORMAL;
          result += code[i];
          i++;
        } else {
          result += code[i];
          i++;
        }
        break;

      case STATE.REGEX:
        if (code[i] === '\\') {
          result += code[i] + code[i + 1];
          i += 2;
        } else if (code[i] === '/') {
          state = STATE.NORMAL;
          result += code[i];
          // 处理正则表达式的标志
          while (i + 1 < code.length && /[gimsuy]/.test(code[i + 1])) {
            result += code[i + 1];
            i++;
          }
          i++;
        } else {
          result += code[i];
          i++;
        }
        break;
    }
  }

  return result;
};

// 清除Css 注释
const stripHTMLComments = (html: string) =>
  html.replace(/<!--[\s\S]*?-->/g, '');

type conditionsType = {
  codeType: string;
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [resultCode, setResultCode] = useState('');
  const [code, setCode] = useState('');
  const rows = 40;

  const handleSubmit = (values: conditionsType) => {
    const { codeType } = values;
    setLoading(true);
    let result = code;
    if (codeType === 'javascript') {
      result = clearJsComments(code);
    } else if (codeType === 'html') {
      result = stripHTMLComments(code);
    }

    setResultCode(result);
    setLoading(false);
  };

  // 拷贝成功回调
  const onCopySuc = () => {
    messageApi.success('复制成功');
  };

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Form
              layout="inline"
              form={form}
              onFinish={handleSubmit}
              initialValues={{
                codeType: 'javascript',
              }}
            >
              <Form.Item<conditionsType> label="代码类型" name="codeType">
                <Select
                  style={{
                    width: 200,
                  }}
                  onChange={() => {
                    setResultCode('');
                    setCode('');
                  }}
                  options={codeTypeOption}
                />
              </Form.Item>
            </Form>

            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              清除注释
            </Button>
          </Space>
        </Card>

        <div style={{ display: 'flex', gap: 10 }}>
          <Card style={{ flex: 1 }} title="请输入要清除注释的代码">
            <Input.TextArea
              rows={rows}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></Input.TextArea>
          </Card>
          <Card
            style={{ flex: 1 }}
            title="清除结果"
            extra={
              <Paragraph
                copyable={{
                  text: resultCode,
                  icon: [<a key="copy-text">复制结果</a>],
                  onCopy: onCopySuc,
                }}
              />
            }
          >
            <Input.TextArea
              rows={rows}
              readOnly
              value={resultCode}
            ></Input.TextArea>
          </Card>
        </div>
      </Space>
      {messageContextHolder}
    </>
  );
};
