/**
 * @author Dias
 * @date 2024/6/20
 * @description Regular User Dashboard Page
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { Carousel, Col, Layout, Pagination, Row } from 'antd';

import image1 from '../../assets/images/hero1.png';
import image2 from '../../assets/images/hero2.png';
import image3 from '../../assets/images/hero3.png';

import './User.global.css';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LayoutHeader from '../../components/Layout/Header';
import UserHeroSection from '../../components/User/HeroSection/HeroSection';
import UserFilterSection from '../../components/User/Filter/Filter';
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

// Define the search data object
interface SearchData {
  search: string;
}


const UserDashboard = () => {
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState<string>('');
    const [size, setSize] = useState<any>([0, 0]);
    const [price, setPrice] = useState<any>([0 ,0]);

    useEffect(() => {
      filterFunc(search, size, price, 1);
    }, [])

    const filterFunc = (search: string, size: any, price: any, current: number) => {
      setLoading(true);

      setSearch(search);
      setSize(size);
      setPrice(price);

      current == 1 && setCurrent(1);

      const data: any = {};
      data.search = search;
      data.size = size;
      data.price = price;
      data.current = current;
      data.pageSize = constants.USER_PAGE_SIZE;


      UserAPI.getProperties(data)
      .then(
        (response: any) => {
            if(response.status == constants.SUCCESS_REQUEST_STATUS) {
              setData(response.data.data.apartments);
              setTotal(response.data.data.total);
            } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
                dispatch(logout());
            } else {
              setData([]);
            }

            setLoading(false);
        }
      )
    }

    useEffect(() => {
      filterFunc(search, size, price, current);
    }, [current])

    
    
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

              <Row>
                  <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{padding: 30}}>
                    <UserFilterSection filter={filterFunc} loading={loading}/>
                  </Col>

                  <Col xl={16} lg={16} md={24} sm={24} style={{padding: 30}}>
                    <Row style={{alignItems: 'center'}}>
                      <Col xl={10} lg={10} md={10} sm={24}>
                        <h1>Properties for you</h1>
                      </Col>
                      <Col  xl={14} lg={14} md={14} sm={24} style={{justifyContent: 'flex-end', display: 'flex'}}>
                        <Pagination 
                          defaultCurrent={1}
                          current={current}
                          total={total}
                          pageSize={constants.USER_PAGE_SIZE}
                          onChange={(pos) => {setCurrent(pos)}}
                        />
                      </Col>
                    </Row>

                    {
                      data.map((item: any) => {
                        return (
                          <UserPropertyCard data={item} key={item.id} from={constants.FROM_DASHBOARD} removeFavo={() => {}}/>
                        )
                      })
                    }

                    <Row style={{alignItems: 'center', marginTop: 30}}>
                      <Pagination 
                        defaultCurrent={1}
                        current={current}
                        total={total}
                        pageSize={5}
                        onChange={(pos) => {setCurrent(pos)}}
                      />
                    </Row>
                  </Col>
              </Row>
            </Content>

            <LayoutFooter />

        </Layout>
    )
}

export default UserDashboard
