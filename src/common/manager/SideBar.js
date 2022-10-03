import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ObjColor } from '../../data/Data';
const Wrappers = styled.div`
display:flex;
flex-direction:column;
width:280px;
min-height:100vh;
box-shadow:0px 0px 2px #cccccc;
z-index:5;
position:fixed;
background:#fff;
`
const LogoWrappers = styled.div`
text-align:center;
font-size:32px;
font-weight:bold;
padding-top:24px;
padding-bottom:24px;
color:${ObjColor.background1}
`
const SelectMenuContent = styled.div`
width:220px;
padding:16px 12px;
background:#009432;
margin:0.3rem auto;
border-radius:12px;
font-size:16px;
font-weight:bold;
color:#fff;
cursor:pointer;
`
const MenuContent = styled.div`
width:220px;
padding:16px 12px;
background:#fff;
margin:0.3rem auto;
border-radius:12px;
font-size:16px;
font-weight:bold;
color:#009432;
cursor:pointer;
transition: 0.4s;
&:hover{  
    background-color: #C4E538;
}
`
const SideBar = () => {
    const location = useLocation();
    const history = useHistory();
    const zSidebar = [{ name: '회원관리', link: '/manager/userlist' },{ name: '카테고리관리', link: '/manager/categorylist' }, { name: '상품관리', link: '/manager/productlist' }, { name: '판매내역관리', link: '/manager/salelist' }];

    return (
        <>
            <Wrappers>
                <LogoWrappers>Logo</LogoWrappers>
                {zSidebar.map((item, index) => (
                    <>
                        {item.link == location.pathname ?
                            <>
                                <SelectMenuContent onClick={() => { history.push(`${item.link}`) }}>
                                    {item.name}
                                </SelectMenuContent>
                            </>
                            :
                            <>
                                <MenuContent onClick={() => { history.push(`${item.link}`) }}>
                                    {item.name}
                                </MenuContent>
                            </>}

                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default SideBar