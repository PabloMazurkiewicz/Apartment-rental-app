/**
 * @author Dias
 * @date 2024/6/20
 * @description Regular User Filter Section Component
 */

import { Button, Col, Input, Row, Slider } from 'antd';
import { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';


interface UserFilterSectionProps {
    filter: (search: string, size: number[], price: number[], current: number) => void;
    loading: boolean
}


const UserFilterSection: React.FC<UserFilterSectionProps> = ({ filter, loading }) => {
    const [search, setSearch] = useState<string>('');
    const [size, setSize] = useState<any>([0, 0]);
    const [price, setPrice] = useState<any>([0, 0]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value);
    };

    const onSizeChange = (value: number | number[]) => {
        setSize(value)
    };
      
    const onChangeSizeComplete = (value: number | number[]) => {
        setSize(value)
    };

    const onPriceChange = (value: number | number[]) => {
        setPrice(value)
    };
      
    const onChangePriceComplete = (value: number | number[]) => {
        setPrice(value)
    };

    const handleFilter = () => {
        filter(search, size, price, 1);
    }

    return (
        <Row style={{backgroundColor: 'white', padding: 20, paddingLeft: 50, paddingRight: 50, borderRadius: 15, marginTop: 80, justifyContent: 'center'}}>
            <h2>Filter</h2>
            <Col span={24}>
                <Row style={{alignItems: 'center'}}>
                    <Col span={6}>
                        <h4>Search</h4>
                    </Col>
                    <Col span={18}>
                        <Input value={search} onChange={onChange} placeholder='Search'/>
                    </Col>
                </Row>
                <Row style={{alignItems: 'center'}}>
                    <Col span={6}>
                        <h4>Size</h4>
                    </Col>
                    <Col span={18}>
                        <Slider
                            range
                            step={50}
                            max={500}
                            defaultValue={[0, 0]}
                            onChange={onSizeChange}
                            onChangeComplete={onChangeSizeComplete}
                        />
                    </Col>
                </Row>
                <Row style={{alignItems: 'center'}}>
                    <Col span={6}>
                        <h4>Price (month)</h4>
                    </Col>
                    <Col span={18}>
                        <Slider
                            range
                            step={500}
                            max={5000}
                            defaultValue={[0, 0]}
                            onChange={onPriceChange}
                            onChangeComplete={onChangePriceComplete}
                        />
                    </Col>
                </Row>

                <Row style={{justifyContent: 'center', marginTop: 20}}>
                    <Button type="primary" icon={<FilterOutlined />} style={{width: '80%'}} disabled={loading} onClick={() => {handleFilter()}}>
                    {
                        loading ? 
                        'Please wait...' 
                        : 
                        'Filter' 
                    }
                    </Button>
                </Row>
            </Col>
        </Row>
    );
}

export default UserFilterSection;
