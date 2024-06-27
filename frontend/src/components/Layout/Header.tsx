
/**
 * @author Dias
 * @date 2024/6/20
 * @description Layout Header Component
 */

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { Badge, Layout, Space } from 'antd';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { HeartOutlined, LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../actions/auth';
import constants from '../../utils/constants';

const { Header } = Layout;

// Define the shape of the auth state
interface AuthState {
  isLoggedIn: boolean;
  user: any
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}

const LayoutHeader = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const { user } = useSelector((state: AppState) => state.auth);    

    const logoutFunc = () => {
        dispatch(logout());
    }
  
    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {
                user.role == constants.ROLE_REALTOR ? 
                (
                    <>
                        <a href="#" onClick={() => navigate('/')}><h1 style={{color: 'white'}}>Realtor Dashboard</h1></a>
                        <LogoutOutlined onClick={() => {logoutFunc()}} style={{color: 'white'}} title='Logout'/>
                    </>
                )
                :
                (
                    <>
                        <a href="#" onClick={() => navigate('/')}><h1 style={{color: 'white'}}>User Dashboard</h1></a>
                        <div>
                            <Space size={24}>
                                <Badge dot>
                                    <HeartOutlined onClick={() => {navigate('/favorites')}} style={{color: 'white'}} title='Favorites'/>
                                </Badge>
                                <LogoutOutlined onClick={() => {logoutFunc()}} style={{color: 'white'}} title='Logout'/>
                            </Space>
                        </div>
                    </>
                )
            }
        </Header>
    )
}

export default LayoutHeader
