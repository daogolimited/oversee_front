import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { zHeaderMenu } from '../data/TestData';
import $ from 'jquery';
import axios from 'axios';
import { ObjColor, backUrl } from '../data/Data';
const Wrappers = styled.header`
width:100%;
background:#fff;

align-items:center;
display:flex;
flex-direction:column;

`
const TopHeader = styled.div`
display:flex;
justify-content:space-between;
max-width:1000px;
align-items:center;
height:5rem;
width:100%;
@media (max-width: 1000px) {
  width:90%;
}
`
const MenuContainer = styled.ul`
display: -webkit-box;
margin:0 auto;
list-style:none;
padding-left:0px;
position:relative;
overflow-x:auto;
`
const MenuContent = styled.li`
padding: 12px 9px 9px 9px;
color:#74767e;
font-weight: 400;
font-size:16px;
cursor:pointer;
`
const LogoWrappers = styled.div`
text-align:center;
font-size:32px;
font-weight:bold;
padding-top:24px;
padding-bottom:24px;
color:${ObjColor.background1}
`
const SignUp = styled.div`
color:#74767e;
text-size:14px;
font-weight:bold;
padding:6px;
cursor:pointer;
transition: 0.4s;
&:hover{  
    color:#5a5a5a;
}
`
const SignIn = styled.div`
color:#74767e;
text-size:14px;
font-weight:bold;
margin-right:6px;
padding:6px;
cursor:pointer;
transition: 0.4s;
&:hover{  
    color:#5a5a5a;
}
`
const Logout = styled.div`
border-radius:4px;
cursor:pointer;
padding:6px;
transition: 0.2s;
&:hover{  
    background-color: #009432;
    color:#fff;
    font-weight:bold;
}
`
const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const [display, setDisplay] = useState('flex');
  const [menuList, setMenuList] = useState([])
  const [reloadMenuTime, setReloadMenuTime] = useState([])
  const [isLogin, setIsLogin] = useState(false);
  const [auth, setAuth] = useState({})
  useEffect(() => {
    async function fecthPost() {
      const { data: response } = await axios.get(backUrl + '/api/categories')
      setMenuList(response.data.data)
    }
    if (menuList.length == 0 && !location.pathname.includes('/manager')) {
      fecthPost();
    }

    if (location.pathname.substring(0, 9) != '/product/') {
      for (var i = 0; i < menuList.length; i++) {
        $(`.menu${i}`).css({ "color": "#74767e", "font-weight": "400", "border-bottom": "3px solid #fff" });
        if (`/products/${menuList[i].pk}` == location.pathname) {
          $(`.menu${i}`).css({ "color": "#000", "font-weight": "bold", "border-bottom": `3px solid ${ObjColor.background1}` });
        }
      }
      if (location.pathname == '/products/0') {
        $(`.menuall`).css({ "color": "#000", "font-weight": "bold", "border-bottom": `3px solid ${ObjColor.background1}` });
      } else {
        $(`.menuall`).css({ "color": "#74767e", "font-weight": "400", "border-bottom": "3px solid #fff" });
      }
    }


    if (location.pathname.includes('/manager')) {
      setDisplay('none')
    }
  }, [location])
  useEffect(() => {
    async function isAuth() {
      const { data: resauth } = await axios.get('/api/auth');
      if (resauth.pk > 0) {
        setIsLogin(true);
        setAuth(resauth);
        localStorage.setItem('auth', JSON.stringify(resauth))
      } else {
        localStorage.removeItem('auth')
      }
    }
    isAuth();
  }, [])
  const onLogout = async () => {
    const { data: response } = await axios.post('/api/logout', {
      headers: {
        'Content-type': 'application/json',
      }
    },
      { withCredentials: true })
    alert(response.message);
    if (response.result > 0) {
      localStorage.removeItem('auth');
      window.location.reload();
    }
  }
  return (
    <>
      <Wrappers style={{ display: `${display}` }}>
        <TopHeader>
          <div >
            <LogoWrappers onClick={() => history.push(`/products/0`)}>Logo</LogoWrappers>
          </div>
          {isLogin ?
            <>
              <div style={{ display: 'flex' }}>
                <div style={{ padding: '6px', marginRight: '6px' }}>{auth.nickname}</div>
                <Logout onClick={() => {
                  if (window.confirm("Do you want to log out?")) {
                    onLogout();
                  }
                }}>Logout</Logout>
              </div>
            </>
            :
            <>
              <div style={{ display: 'flex' }}>
                <SignIn onClick={() => history.push('/signin')}>Sign In</SignIn>
                <SignUp onClick={() => history.push('/signup')}>Sign Up</SignUp>
              </div>
            </>}

        </TopHeader>
        <div style={{ borderTop: '1px solid #e4e5e7', borderBottom: '1px solid #e4e5e7', width: '100%', display: 'flex' }}>
          <MenuContainer id='header-scroll'>
            <MenuContent onClick={() => history.push(`/products/0`)} className={`menuall`}>
              All
            </MenuContent>
            {menuList.map((item, index) => (
              <>
                <MenuContent onClick={() => history.push(`/products/${item.pk}`)} className={`menu${index}`} key={index}>
                  {item.en_name}
                </MenuContent>
              </>
            ))}
          </MenuContainer>
        </div>

      </Wrappers>
    </>
  );
};
export default Header;