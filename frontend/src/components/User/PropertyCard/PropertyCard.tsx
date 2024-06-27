/**
 * @author Dias
 * @date 2024/6/20
 * @description Property Card Component
 */

import { Button, Col, Image, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import defaultImg from '../../../assets/images/default.png';
import { useNavigate } from 'react-router-dom';

import constants from '../../../utils/constants';


interface UserPropertyCardProps {
    data: any,
    from: string,
    removeFavo: (id: string) => void;
}

const UserPropertyCard: React.FC<UserPropertyCardProps> = ({ data, from, removeFavo }) => {
    const navigate = useNavigate();

    let cardData: any = {};

    if(from == constants.FROM_DASHBOARD) {
        cardData = data;
    } else {
        cardData = data.apartment;
    }

    const removeFavorite = (id: string) => {
        removeFavo(id);
    }

    return (
        <Row className='property-card' style={{backgroundColor: 'white', padding: 20, paddingLeft: 30, paddingRight: 30, borderRadius: 15, justifyContent: 'center', marginTop: 20}} onClick={() => {from == constants.FROM_DASHBOARD && navigate(`/property/${data.id}`)}}>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Image src={cardData.image == '' ? defaultImg : constants.SERVER_BASE_URL + cardData.image } style={{width: '100%', height: 200}} />
            </Col>
            <Col xl={16} lg={16} md={12} sm={24} xs={24} style={{paddingLeft: 30, alignSelf: 'center'}}>
                <div>
                    <Row style={{alignItems: 'center'}}>
                        <h2>{cardData.title}</h2>
                    </Row>
                    <Row style={{alignItems: 'center', marginBottom: 20}}>
                        <span>{cardData.description}</span>
                    </Row>
                    <Row style={{alignItems: 'center'}}>
                        <h4>Room No: {cardData.roomNo}</h4>
                    </Row>
                    <Row style={{alignItems: 'center'}}>
                        <h4>Size: {cardData.areaSize}</h4>
                    </Row>
                    <Row style={{alignItems: 'center', marginBottom: 10}}>
                        <h4>Price (month): ${cardData.price}</h4>
                    </Row>
                    {
                        from == constants.FROM_FAVORITES &&
                        (
                            <Row style={{justifyContent: 'end', marginBottom: 10}}>
                                <Button danger icon={<DeleteOutlined />} onClick={() => removeFavorite(data.id)}>
                                    Remove from Favorites
                                </Button>
                            </Row>
                        )
                    }
                </div>
            </Col>
        </Row>
    );
}

export default UserPropertyCard;
