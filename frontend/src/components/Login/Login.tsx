/**
 * @author Dias
 * @date 2024/6/20
 * @description Login Component
 */

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row } from 'antd';

import styles from './Login.module.css';

// Define additional props for login functions
interface LoginProps {
  changeAuthType: (type: number) => void;
  login: (email: string, password: string) => void;
  loading: boolean;
}

const Login: React.FC<LoginProps> = ({ changeAuthType, login, loading }) => {
  const onFinish = (values: any) => {
    login(values.email, values.password)
  };

  return (
    <Form
      name="normal_login"
      className={styles['login-form']}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      disabled={loading}
    >
      <Row style={{justifyContent: 'center'}}>
        <h1>Sign In</h1>
      </Row>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your Email!' },
          { type: 'email', message: 'The input is not valid Email!'}
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        style={{marginBottom: '50px'}}
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
          {
            loading ? 
              'Please wait...' 
            : 
              'Sign in' 
          }
        </Button>
        <Row style={{justifyContent: 'center', marginTop: '20px'}}>
          <a href="#" onClick={() => changeAuthType(1)}>register now!</a>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Login;