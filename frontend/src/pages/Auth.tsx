/**
 * @author Dias
 * @date 2024/6/20
 * @description Auth Page (Login & SignUp)
 */

import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { Layout, message as msg } from 'antd';

import backgroundImage from '../assets/images/auth.png';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import { login, signup } from '../actions/auth';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import LayoutFooter from '../components/Layout/Footer';

const { Header, Content, Footer } = Layout;

// Define the shape of the auth state
interface AuthState {
  isLoggedIn: boolean;
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}


const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<AppState, void, AnyAction> = useDispatch();
  
  const [messageApi, contextHolder] = msg.useMessage();

  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state: AppState) => state.auth);

  if(isLoggedIn) {
    return <Navigate to="/" />;
  }

  const changeAuthType = (type: number) => {
      setType(type);
  };

  const loginfunc = (email: string, password: string) => {
      setLoading(true);

      dispatch(login(email, password))
      .then((res: any) => {
        if(res.success == false) {
          messageApi.error(res.errors[0]);
        } else {
          navigate("/");
        }

        setLoading(false);
      })
      .catch(() => {
          setLoading(false);
      });
  }

  const signupfunc = (email: string, password: string, role: string) => {
      setLoading(true);

      dispatch(signup(email, password, role))
      .then(() => {
          setType(0);
          setLoading(false);
      })
      .catch(() => {
          setLoading(false);
      });
  }

  
  return (
    <Layout style={{minHeight: '100vh'}}>

      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{color: 'white'}}>Apartment Rental App</h1>
      </Header>

      <Content 
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'  
        }}>
        {contextHolder}
        {
          type == 0 ? (
            <Login 
              changeAuthType={changeAuthType} 
              login={loginfunc} 
              loading={loading} 
            />
          ) : (
            <Signup
              changeAuthType={changeAuthType} 
              signup={signupfunc} 
              loading={loading} 
            />
          )
        }

      </Content>

      <LayoutFooter />

    </Layout>
  )
}

export default AuthPage
