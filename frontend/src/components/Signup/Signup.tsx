/**
 * @author Dias
 * @date 2024/6/20
 * @description Signup Component
 */

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Select } from 'antd';

import styles from './Signup.module.css';
import constants from '../../utils/constants';

const { Option } = Select;

// Define additional props for signup functions
interface SignProps {
    changeAuthType: (type: number) => void;
    signup: (email: string, password: string, role: string) => void;
    loading: boolean;
}

const Signup: React.FC<SignProps> = ({ changeAuthType, signup, loading }) => {
    const onFinish = (values: any) => {
        signup(values.email, values.password, values.role)
    };

    return (
        <Form
            name="normal_signup"
            className={styles['signup-form']}
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
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}
            >
                <Input.Password placeholder='Password'/>
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') == value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Please input same as Password!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder='Confirm Password'/>
            </Form.Item>

            <Form.Item
                name="role"
                rules={[{ required: true, message: 'Please select role!' }]}
            >
                <Select placeholder="select your role">
                    <Option value={constants.ROLE_USER}>Regular User</Option>
                    <Option value={constants.ROLE_REALTOR}>Realtor</Option>
                </Select>
            </Form.Item>

            <Form.Item style={{marginTop: '50px'}}>
                <Button type="primary" htmlType="submit" className={styles['signup-form-button']}>
                {
                    loading ? 
                    'Please wait...' 
                    : 
                    'Sign Up' 
                }
                </Button>
            </Form.Item>

            <Row style={{justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <a href="#" onClick={() => changeAuthType(0)}>login now!</a>
            </Row>
        </Form>
    );
};


export default Signup;