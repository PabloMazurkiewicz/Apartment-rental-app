/**
 * @author Dias
 * @date 2024/6/20
 * @description Realtor Apartment Detail Component
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Col, Row, Input, Button, Form, Image, Upload, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import RealtorAPI from "../../apis/realtor";

import constants from '../../utils/constants';
import { logout } from '../../actions/auth';

const { TextArea } = Input;

// Define the shape of the auth state
interface AuthState {
  isLoggedIn: boolean;
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}

// Define the default state
interface RealtorDetailProps {
    defaultData: any,
}


const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }

    return e?.fileList;
};


const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type == 'image/jpeg' || file.type == 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt2M;

};


const RealtorApartmentDetail: React.FC<RealtorDetailProps> = ({ defaultData }) => {

    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const [form] = Form.useForm();
    const [data, setData] = useState<any>({});
    const [previewImg, setPreviewImg] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUpload, setImageUpload] = useState<any>(null);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if(defaultData.id) {
            setData(defaultData);
            form.setFieldsValue({ title: defaultData.title, description: defaultData.description, size: defaultData.areaSize, roomNo: defaultData.roomNo, price: defaultData.price, image: [] })
            defaultData.image && setPreviewImg(defaultData.image);
        }
    }, [defaultData])

    const handleChange = (info: any) => {
        setFileList(info.fileList);
        setImageUpload(info.fileList[0]);

        info.file.status = 'done'
    };

    const onFinish = (values: any) => {
        setIsLoading(true);

        if(data.id) {
            values = {...values, apartmentId: data.id}
        }

        if(values.image && values.image.length > 0) {
            values = {...values, image: values.image[0].originFileObj}
        }

        if(previewImg == '' || !values.image) {
            values = {...values, noImage: true}
        }

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        RealtorAPI.addApartment(formData).then(
            (response: any) => {
                setIsLoading(false);
                
                if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                    navigate('/');
                } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                    dispatch(logout());
                }
    
                return response.data;
            }
        )
    };


    const deleteImage = () => {
        setPreviewImg('');
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                    Upload
            </div>
        </button>
    );
    

    
    return (
        <Row style={{justifyContent: 'center'}}>
            <Col xl={16} lg={16} md={24} sm={24} style={{paddingLeft: 20, paddingRight: 20}}>
                <Row>
                    <h2>New Apartment</h2>
                </Row>
                <Row style={{justifyContent: 'flex-end', marginBottom: '30px'}}>
                    <Button type="primary" shape="round" size='middle' onClick={() => {navigate('/')}}>
                        Back
                    </Button>
                </Row>

                <Row style={{display: 'flex', justifyContent: 'center'}}>
                    <Col xl={12} lg={12} md={24} sm={24} style={{paddingLeft: 20, paddingRight: 20}}>
                        <Form
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{backgroundColor: 'white', justifyContent: 'center', padding: '30px', borderRadius: 10}}
                            layout="horizontal"
                            variant="filled"
                            onFinish={onFinish}
                            disabled={isLoading ? true : false}
                            form={form}
                        >

                            <Form.Item 
                                label="Title" 
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input title!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item label="Desctription" name='description' initialValue={''}>
                                <TextArea rows={6} />
                            </Form.Item>

                            <Form.Item 
                                label="Size" 
                                name='size'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input size!',
                                    },
                                ]}>
                                <Input type='number' min={0}/>
                            </Form.Item>

                            <Form.Item label="Room Number" name='roomNo' initialValue={''}>
                                <Input />
                            </Form.Item>

                            <Form.Item 
                                label="Price/month" 
                                name='price'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input price!',
                                    },
                                ]}>

                                <Input type='number' min={0}/>
                            </Form.Item>
                            
                            <Form.Item label="Image" name='image' valuePropName="fileList" getValueFromEvent={normFile}>
                                {
                                    previewImg != '' ? 
                                        <Row>
                                            <Image
                                                width={100}
                                                src={constants.SERVER_BASE_URL + previewImg}
                                            />
                                            <DeleteOutlined style={{alignSelf: 'flex-end', fontSize: 25, color: 'red', marginLeft: 10}} onClick={() => {deleteImage()}}/>
                                        </Row>
                                    : 
                                        <Upload
                                            customRequest={() => {}}
                                            listType="picture-card"
                                            beforeUpload={beforeUpload}
                                            fileList={fileList}
                                            onChange={handleChange}
                                            showUploadList={{
                                                showPreviewIcon:false
                                            }}
                                        >
                                            {fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                }
                            </Form.Item>

                            

                            <Form.Item
                                style={{display: 'flex', justifyContent: 'center'}}
                            >
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    {data.id ? 'Update' : 'SAVE'}
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RealtorApartmentDetail
