import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Wrappers from '../../components/elements/Wrappers';
import { ObjColor, backUrl } from '../../data/Data';
import $ from 'jquery';
import axios from 'axios';
import { addItem } from '../../utils/function';
const Title = styled.div`
width:100%;
text-align:center;
padding:24px 0;
color:${ObjColor.background1};
font-size:36px;
font-weight:bold;
`
const Content = styled.div`
width:200px;
margin:16px auto 6px 16px;
font-size:14px;
font-weight:bold;
color:${ObjColor.background1};
`
const Input = styled.input`
width:176px;
padding:12px;
outline:none;
`
const RowContent = styled.div`
display:flex;
margin:0px auto 6px 16px;
`
const Button = styled.button`
margin-left:4px;
width:64px;
background:#fff;
color:#5a5a5a;
font-weight:bold;
font-size:14px;
border:1px solid #cccccc;
cursor:pointer;
`
const SignUpButton = styled.button`
margin: 16px 16px 16px auto;
width:128px;
background:#fff;
color:#5a5a5a;
font-weight:bold;
font-size:14px;
border:1px solid #cccccc;
cursor:pointer;
height:43px;
`
const SignUp = () => {
    const history = useHistory();
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckPw, setIsCheckPw] = useState(false);
    const [ableId, setAbleId] = useState(false)
    const checkId =async () =>{
        const {data:response} = await axios.post('/api/checkid',{id:$('.id').val()});
        alert(response.message)
        if(response.result>0){
            setAbleId(true)
        }else{
            setAbleId(false)
        }
    }
    const onSignUp = async () =>{
        if(!$('.id').val()||!$('.pw').val()||!$('.pw-check').val()||!$('.name').val()||!$('.email').val()||!$('.nickname').val()||!$('.phone').val()||!$('.address').val()){
            alert('Required value is empty')
        }else{
            if(!ableId){
                alert('Please check ID');
                return;
            }
            if($('.pw').val()!=$('.pw-check').val()){
                alert('Passwords do not match');
                return;
            }
            if (window.confirm(`Would you like to Sign Up?`)) {
                await addItem('user', { id: $(`.id`).val(), pw: $(`.pw`).val(), email: $(`.email`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), address: $(`.address`).val(), phone: $(`.phone`).val(),level: 0 }) 
            }
        }
    }
    return (
        <>
            <div style={{ background: '#00000011', width: '100%', padding: '24px 0' }}>
                <Wrappers style={{ flexDirection: 'column', paddingBottom: '24px',maxWidth:'800px' }}>
                    <Title>Sign Up</Title>
                    <Content>ID</Content>
                    <RowContent>
                        <Input className='id' disabled={ableId} />
                        <Button onClick={checkId} style={{background:`${ableId?ObjColor.background1:'#fff'}`,color:`${ableId?'#fff':'#5a5a5a'}`}}>Check</Button>
                    </RowContent>
                    <Content>Password</Content>
                    <RowContent>
                        <Input className='pw' type={'password'} />
                    </RowContent>
                    <Content>Password Check</Content>
                    <RowContent>
                        <Input className='pw-check' type={'password'} />
                    </RowContent>
                    <Content>Name</Content>
                    <RowContent>
                        <Input className='name' />
                    </RowContent>
                    <Content>Email</Content>
                    <RowContent>
                        <Input className='email' />
                    </RowContent>
                    <Content>Nickname</Content>
                    <RowContent>
                        <Input className='nickname' />
                    </RowContent>
                    <Content>Phone</Content>
                    <RowContent>
                        <Input className='phone' />
                    </RowContent>
                    <Content>Address</Content>
                    <RowContent>
                        <Input className='address' />
                    </RowContent>
                   
                    <SignUpButton onClick={onSignUp}>Sign Up</SignUpButton>
                </Wrappers>
            </div>
        </>
    );
};
export default SignUp;