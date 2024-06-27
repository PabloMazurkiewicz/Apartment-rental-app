/**
 * @author Dias
 * @date 2024/6/20
 * @description Layout Footer Component
 */

import { Layout } from 'antd';

const { Footer } = Layout;


const LayoutFooter = () => {
  
    return (
        <Footer style={{ textAlign: 'center' }}>
            Toptal ©{new Date().getFullYear()} Created by Dias Ishbulatov
        </Footer>
    )
}

export default LayoutFooter
