import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ObjColor, backUrl } from '../../data/Data'
import axios from 'axios';

const Wrappers = styled.div`
padding:24px;
margin:0 auto;
font-size:16px;
font-weight:500;
z-index:4;
display:flex;
justify-content:space-between;
align-items:center;
width:95%;
`
const Logout = styled.div`
border-radius:4px;
cursor:pointer;
padding:6px;
transition: 0.2s;
margin-right:24px;
&:hover{  
    background-color: #009432;
    color:#fff;
    font-weight:bold;
}
`
const Breadcrumb = (props) =>{
    const history = useHistory();
    const onLogout = async () =>{
        const {data:response} = await axios.post('/api/logout')
        alert(response.message);
        if(response.result>0){
            localStorage.removeItem('auth')
            history.push('/manager')
        }
    }
    return(
        <>
        <div style={{width:'100%',boxShadow:'4px 0px 2px #cccccc',background:'#fff'}}>
        <Wrappers>
            <div style={{marginLeft:'24px'}}>{props.title}</div>
            <div style={{display:'flex', alignItems:'center'}}>
                <div style={{marginRight:'12px',fontSize:'14px',fontWeight:'400'}}>{props.nickname}</div>
                <Logout onClick={()=>{
                    if (window.confirm("Do you want to log out?")) {
                        onLogout();
                      }
                }}>logout</Logout>
            </div>
            
        </Wrappers>
        </div>
        </>
    )
}
export default Breadcrumb;