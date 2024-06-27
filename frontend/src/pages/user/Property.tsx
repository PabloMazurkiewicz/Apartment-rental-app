/**
 * @author Dias
 * @date 2024/6/20
 * @description Property Detail Page
 */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, } from "react-redux";

import { Button, Col, Image, Layout, message, Row } from 'antd';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LayoutHeader from '../../components/Layout/Header';
import LayoutFooter from '../../components/Layout/Footer';

import UserAPI from "../../apis/user";

import './User.global.css';

import defaultImg from '../../assets/images/default.png';
import constants from '../../utils/constants';
import { logout } from '../../actions/auth';

const { Content } = Layout;

// Define the shape of the auth state
interface AuthState {
  isLoggedIn: boolean;
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}


const UserProperty = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<any>({})

    useEffect(() => {
        if (id) {
            UserAPI.getOne(id)
            .then((response: any) => {
                if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                    setData(response.data.data);
                } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                    dispatch(logout());
                } else {
                    setData({});
                }
            })
        }
    }, [id]);


    const saveToFavorites = (id: string) => {
        UserAPI.addFavo(id)
        .then((response: any) => {
            if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                message.success('This property was saved to Favorites successfully!');
            } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                dispatch(logout());
            } else {
                message.error(response.data && response.data.errorRaw);
            }
        })
    }

    
    return (
        <Layout style={{minHeight: '100vh'}}>

            <LayoutHeader />

            <Content 
                style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    backgroundColor: '#EEEEEE'
                }}>

                <Row style={{width: '75%', backgroundColor: 'white', padding: 20, paddingLeft: 30, paddingRight: 30, borderRadius: 15, justifyContent: 'center'}}>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{padding: 50}}>
                        <Image src={data.image == '' ? defaultImg : constants.SERVER_BASE_URL + data.image } style={{width: '100%', height: 350}} preview={false}/>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                        <h1 style={{color: 'grey'}}>Property Informations</h1>
                        <div>
                            <Row style={{alignItems: 'center'}}>
                                <h1>{data.title}</h1>
                            </Row>
                            <Row style={{alignItems: 'center', marginBottom: 20}}>
                                <h3>{data.description}</h3>
                            </Row>
                            <Row style={{alignItems: 'center'}}>
                                <h2>Room No: {data.roomNo}</h2>
                            </Row>
                            <Row style={{alignItems: 'center'}}>
                                <h2>Size: {data.areaSize}</h2>
                            </Row>
                            <Row style={{alignItems: 'center', marginBottom: 20}}>
                                <h2>Price (month): ${data.price}</h2>
                            </Row>
                        </div>
                        <h1 style={{color: 'grey', marginTop: 60}}>Realtor Informations</h1>
                        <div>
                            <Row style={{alignItems: 'center'}}>
                                <h3>{data.user && data.user.email}</h3>
                            </Row>
                        </div>

                        <Row style={{gap: 20, marginTop: 50, justifyContent: 'flex-end', display: 'flex'}}>
                            <Button type='primary' onClick={() => {saveToFavorites(data.id)}}>
                                Save to Favorites
                            </Button>
                            <Button onClick={() => {navigate('/')}}>
                                Back
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Content>

            <LayoutFooter />

        </Layout>
    )
}

export default UserProperty
