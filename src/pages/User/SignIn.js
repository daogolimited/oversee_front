import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Wrappers from '../../components/elements/Wrappers';
import { ObjColor,backUrl } from '../../data/Data';
import axios from 'axios';
import $ from 'jquery';
const Title = styled.div`
width:100%;
text-align:center;
padding:24px 0;
color:${ObjColor.background1};
font-size:36px;
font-weight:bold;
`
const Content = styled.div`
width:250px;
margin:16px auto 6px auto;
font-size:14px;
font-weight:bold;
color:${ObjColor.background1};
`
const Input = styled.input`
width:226px;
padding:12px;
outline:none;
`
const RowContent = styled.div`
display:flex;
margin:12px auto;
`
const Button = styled.button`
width:44%;
height:3rem;
font-size:16px;
font-weight:bold;
color:#777777;
background:#fff;
border:1px solid #cccccc;
cursor:pointer;
`

const SignIn = () => {
    const history = useHistory();
    useEffect(()=>{
        async function isAdmin(){
            const {data:response} = await axios.get('/api/auth');
            if(response.pk>0){
                localStorage.setItem('auth',JSON.stringify(response))
                history.push('/');
            }else{
                localStorage.removeItem('auth')
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
        if(!$('.id').val()){
            alert('Please enter your id');
            return;
        }
        if(!$('.pw').val()){
            alert('Please enter your password');
            return;
        }
        const headers = {
            "Content-Type": "application/json",
          }
        const {data: response} = await axios.post('/api/login',{
            id:$('.id').val(),
            pw:$('.pw').val()
        }
       )
        alert(response.message);
        if(response.result>0){
            window.location.href = '/products/0';
        }
    }
    return (
        <>
            <div style={{ background: '#00000011', width: '100%', padding: '24px 0 38vh 0' }}>
                <Wrappers style={{ flexDirection: 'column', paddingBottom: '36px',maxWidth:'500px' }} onSubmit={onLogin} id='login_form'>
                    <Title>Sign In</Title>
                    <Content>ID</Content>
                    <RowContent>
                        <Input className='id'/>
                    </RowContent>
                    <Content>Password</Content>
                    <RowContent>
                        <Input type={'password'} className='pw' />
                    </RowContent>
                    <RowContent style={{width:'250px',justifyContent:'space-between',marginTop:'36px'}}>
                        <Button onClick={()=>history.push('/signup')}>Sign Up</Button>
                        <Button onClick={onLogin}>Sign In</Button>
                    </RowContent>
                   
                </Wrappers>
            </div>
        </>
    );
};
export default SignIn;