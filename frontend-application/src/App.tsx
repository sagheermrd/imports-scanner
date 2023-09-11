import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Input, Col, Row, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

function App() {
  const [form] = Form.useForm();
  const [lib, setLib] = useState<ScanImportsResponseDto>();

  const onFinish = async (form: any) => {
    const data = {
      sourceDirectory: form.sourceDirectoryPath,
    };
    const response = await fetch('/api/scan-imports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    if (jsonResponse.ok) {
      setLib(jsonResponse);
    } else {
      toast.error(jsonResponse.message ?? 'An error occured, contact support service')
    }
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Form form={form} name="form_transfer" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="sourceDirectoryPath"
              rules={[{ required: true, message: 'Please input a valid source path to transfer!' }]}
            >
              <Input placeholder="Source directory path to be transfer & process" />
            </Form.Item>
            <Form.Item shouldUpdate >
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Transfer & process files
                </Button>
              )}
            </Form.Item>
          </Form>
          <ToastContainer />
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row>
        <Col span={6}></Col>
        <Col>
          <div style={{ marginTop: '12px', width: 'fit-content' }}>
            {
              lib?.data &&
              <Tree
                showLine
                showIcon
                defaultExpandedKeys={['0-0-0']}
                treeData={[{ title: lib.rootfile, children: lib.data }] as DataNode[]}
              />
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
