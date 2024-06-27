/**
 * @author Dias
 * @date 2024/6/20
 * @description Realtor New Apartment Creation Page
 */

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { Layout } from 'antd';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import RealtorApartmentDetail from '../../components/Realtor/Detail';
import LayoutHeader from '../../components/Layout/Header';
import LayoutFooter from '../../components/Layout/Footer';

import RealtorAPI from "../../apis/realtor";
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


const RealtorNewApartment = () => {

    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
    
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<any>({})

    useEffect(() => {
        if (id) {
            RealtorAPI.getOne(id)
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
    

    return (
        <Layout style={{minHeight: '100vh'}}>

            <LayoutHeader />

            <Content 
                style={{ 
                  backgroundColor: '#DDDDDD'
                }}>
                
                <RealtorApartmentDetail defaultData={data}/>
            </Content>

            <LayoutFooter/>

        </Layout>
    )
}

export default RealtorNewApartment
