/**
 * @author Dias
 * @date 2024/6/20
 * @description Realtor Dashboard Page
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { Col, Layout, Row, Input, Modal, Table, Button } from 'antd';


import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';

import LayoutHeader from '../../components/Layout/Header';
import LayoutFooter from '../../components/Layout/Footer';

import defaultImg from '../../assets/images/default.png';

import RealtorAPI from "../../apis/realtor";
import constants from '../../utils/constants';
import { logout } from '../../actions/auth';

const { Content } = Layout;
const { Search } = Input;

// Define the shape of the auth state
interface AuthState {
  isLoggedIn: boolean;
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}

const RealtorDashboard = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();

    const [open, setOpen] = useState(false);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: '15%',
            render: (item: string) => {
                return (
                    <img 
                        width={100}
                        height={70}
                        src={item == undefined || item == '' ? defaultImg : `${constants.SERVER_BASE_URL}/${item}` }
                    />
                )
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '30%',
        },
        {
            title: 'Size',
            dataIndex: 'areaSize',
            width: '15%',
        },
        {
            title: 'Room No',
            dataIndex: 'roomNo',
            width: '15%',
        },
        {
            title: 'Price/Month',
            dataIndex: 'price',
            render: (item: any) => {
                return `$${item}`
            },
            width: '15%',
        },
        {
            title: 'Actions',
            dataIndex: '',
            width: '10%',
            render: (item: any) => {
                return (
                    <Row>
                        <Col span={12} style={{textAlign: 'center'}}>
                            {/* <Button type="primary" icon={<EditOutlined />} size={'middle'} onClick={() => {editModal(item)}}/> */}
                            <Button type="primary" icon={<EditOutlined />} size={'middle'} onClick={() => {navigate(`/edit/${item.id}`)}}/>
                        </Col>
                        <Col span={12} style={{textAlign: 'center'}}>
                            {/* <Button type="primary" danger icon={<DeleteOutlined />} size={'middle'} onClick={() => {modal.confirm(modalConfig).then(deleteData(item.key, item.img))}}/> */}
                            <Button type="primary" danger icon={<DeleteOutlined />} size={'middle'} onClick={() => {deleteModal(item.id)}}/>
                        </Col>
                    </Row>
                )
            },
        },
    ];
    
    const [search, setSearch] = useState('');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: constants.REALTOR_PAGE_SIZE,
        },
      });
    

    const fetchData = () => {
      setLoading(true);

      RealtorAPI.getApartments({search: search})
      .then(
        (response: any) => {
          if(response.status == constants.SUCCESS_REQUEST_STATUS) {
            setData(response.data.data);
          } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
            dispatch(logout());
          } else {
            setData([]);
          }
          
          setLoading(false);
        }
      )
    };

    useEffect(() => {
      fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination: any) => {
      setTableParams({
        pagination
      });
    };

    const onSearch = (value: any, _e: any, info: any) => {
      fetchData();
    }


    const deleteModal = (id: string) => {
      setOpen(true);
      setDeleteId(id);
    }

    const deleteData = async () => {
      setLoading(true);
      
      RealtorAPI.removeApartment(deleteId)
      .then(
        (response: any) => {
          if(response.status == constants.SUCCESS_REQUEST_STATUS) {
              const newData = data.filter((item: any) => item.id != response.data.data.id);

              setData(newData);
              setDeleteId('');
              setOpen(false);
          } else if(response.status == constants.UNAUTH_REQUEST_STATUS) {
              dispatch(logout());
          } else {
              setDeleteId('');
              setOpen(false);
          }

          setLoading(false);
        }
      )
    }

    
    return (
        <Layout style={{minHeight: '100vh'}}>

            <LayoutHeader />

            <Content 
                style={{ 
                backgroundColor: '#DDDDDD'
                }}>
                
                <Row style={{justifyContent: 'center'}}>
                  <Col xl={20} lg={20} md={24} sm={24} style={{paddingLeft: 20, paddingRight: 20}}>
                      <Row>
                        <h2>Apartment List</h2>
                      </Row>
                      <Row style={{justifyContent: 'space-between', marginBottom: '30px'}}>
                        <Search style={{width: 300}} placeholder="input search text" onChange={(e) => {setSearch(e.target.value)}} onSearch={onSearch} enterButton />
                        <Button type="primary" shape="round" icon={<PlusCircleFilled />} size='middle' onClick={() => {navigate("/add")}}>
                          Add
                        </Button>
                      </Row>

                      <Table
                          columns={columns}
                          // rowKey={(record) => record.login.uuid}
                          dataSource={data}
                          pagination={tableParams.pagination}
                          loading={loading}
                          onChange={handleTableChange}
                      />

                      <Modal
                          title="Meal Data Delete!"
                          open={open}
                          onOk={() => deleteData()}
                          onCancel={() => setOpen(false)}
                          okText="Delete"
                          cancelText="Cancel"
                      >
                          <h3>Are you sure you want to delete this meal data?</h3>
                      </Modal>
                  </Col>
              </Row>
            </Content>

            <LayoutFooter />

        </Layout>
    )
}

export default RealtorDashboard
