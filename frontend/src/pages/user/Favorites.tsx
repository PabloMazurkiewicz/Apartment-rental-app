/**
 * @author Dias
 * @date 2024/6/20
 * @description Regular User Favorites Page
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { Button, Carousel, Col, Layout, Modal, Row } from 'antd';

import image1 from '../../assets/images/hero1.png';
import image2 from '../../assets/images/hero2.png';
import image3 from '../../assets/images/hero3.png';

import './User.global.css';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LayoutHeader from '../../components/Layout/Header';
import UserHeroSection from '../../components/User/HeroSection/HeroSection';
import UserPropertyCard from '../../components/User/PropertyCard/PropertyCard';
import LayoutFooter from '../../components/Layout/Footer';

import UserAPI from "../../apis/user";
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


const UserFavorites = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const [open, setOpen] = useState(false);
    const [removeId, setRemoveId] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        UserAPI.getFavorites()
        .then(
            (response: any) => {
                if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                    setData(response.data.data);
                } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                    dispatch(logout());
                } else {
                    setData([]);
                }
            }
        )
    }, [])


    const removeFavoriteFunc = (id: string) => {
        setOpen(true);
        setRemoveId(id);
    }

    const removeFavorite = () => {
        UserAPI.removeFavo(removeId)
        .then(
            (response: any) => {
                if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                    const newData = data.filter((item: any) => item.id != response.data.data.id);

                    setData(newData);
                    setRemoveId('');
                    setOpen(false);
                } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                    dispatch(logout());
                } else {
                    setRemoveId('');
                    setOpen(false);
                }
            }
        )
    }
    
    
    return (
        <Layout style={{minHeight: '100vh'}}>

            <LayoutHeader />

            <Content 
              style={{
                height: '100%',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE'
              }}>

              <Carousel autoplay>
                <UserHeroSection imageURL={image1}/>
                <UserHeroSection imageURL={image2}/>
                <UserHeroSection imageURL={image3}/>
              </Carousel>

              <Row style={{justifyContent: 'center'}}>
                  <Col xl={18} lg={18} md={24} sm={24} style={{padding: 30}}>
                    <Row style={{alignItems: 'center'}}>
                      <Col xl={10} lg={10} md={10} sm={24}>
                        <h1>Your favorite properties</h1>
                      </Col>
                      <Col  xl={14} lg={14} md={14} sm={24} style={{justifyContent: 'flex-end', display: 'flex'}}>
                        <Button onClick={() => {navigate('/')}}>Back</Button>
                      </Col>
                    </Row>

                    {
                      data.map((item: any) => {
                        return (
                          <UserPropertyCard data={item} key={item.id} from={constants.FROM_FAVORITES} removeFavo={removeFavoriteFunc}/>
                        )
                      })
                    }
                  </Col>
              </Row>
            </Content>

            <Modal
                title="Remove Favorite!"
                open={open}
                onOk={() => removeFavorite()}
                onCancel={() => setOpen(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <h3>Do you want to remove this Property from your Favorites?</h3>
            </Modal>

            <LayoutFooter />

        </Layout>
    )
}

export default UserFavorites
