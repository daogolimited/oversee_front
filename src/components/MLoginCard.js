import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ObjColor, backUrl } from '../data/Data';
import $ from 'jquery';
import axios from 'axios';
const WrapperForm = styled.div`
width:90%;
background:#fff;
max-width:500px;
height:500px;
margin:120px auto 0 auto;
border-radius:24px;
box-shadow:0px 0px 8px #cccccc;
display:flex;
flex-direction:column;
`
const Title = styled.div`
color:${ObjColor.background1};
font-size:36px;
width:100%;
text-align:center;
margin:2.5rem 0;
font-weight:bold;

`
const CategoryName = styled.div`
width:360px;
margin:1rem auto 0 auto;
font-size:20px;
color:${ObjColor.background1};
@media (max-width: 600px) {
    width:80%;
}
`
const Input = styled.input`
width:336px;
padding:12px;
border-top:0;
border-left:0;
border-right:0;
border-bottom:1px soild #cccccc;
margin:1rem auto 0 auto;
outline:none;
font-size:18px;
::placeholder {
    color:#dddddd;
}
@media (max-width: 600px) {
    width:75%;
}
`
const Button = styled.button`
width:360px;
margin:2.5rem auto;
height:54px;
border:none;
background:${ObjColor.background1};
color:#fff;
font-size:24px;
cursor:pointer;
@media (max-width: 600px) {
width:80%;
}
`
const MLoginCard = () =>{
    const history = useHistory();

    useEffect(()=>{
        async function isAdmin(){
            const {data:response} = await axios.get('/api/auth',{headers: {
                'Content-type': 'application/json',
              }
        },
        { withCredentials: true });
            if(response.level>=50){
                history.push('/manager/productlist');
            }
        }
        isAdmin();
        
        $("#login_form").keypress(function (e) {
            if (e.keyCode === 13) {
                onLogin();
            }
        });
    },[])
    const onLogin = async () =>{
        const {data: response} = await axios.post('/api/login',{
            id:$('.id').val(),
            pw:$('.pw').val()
        })
        alert(response.message);
        if(response.result>0){
            history.push('/manager/productlist');
        }
    }
    return (
        <>
        <WrapperForm onSubmit={onLogin} id='login_form'>
            <Title>MERN</Title>
            <CategoryName>ID</CategoryName>
            <Input placeholder='input id' type={'text'} className='id' />
            <CategoryName>PW</CategoryName>
            <Input placeholder='input password' type={'password'} className='pw'/>
            <Button onClick={onLogin}>Login</Button>
        </WrapperForm>
        </>
    );
};
export default MLoginCard