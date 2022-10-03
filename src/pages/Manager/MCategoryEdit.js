import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import { AiFillFileImage } from 'react-icons/ai'
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import { addItem, updateItem } from '../../utils/function';
import $ from 'jquery';
import { backUrl } from '../../data/Data';
const Card = styled.div`
background:#fff;
display:flex;
flex-direction:column;
width:95%;
margin:12px auto;
box-shadow:0px 0px 16px #dddddd;
border-radius:24px;
padding: 24px 0;
min-height:640px;
`
const Title = styled.div`
margin:12px auto 6px 24px;
width:90%;
color:#009432;
font-weight:bold;
`
const Input = styled.input`
margin:12px auto 6px 24px;
width:200px;
padding:8px;
outline:none;
`
const Textarea = styled.textarea`
margin:12px auto 6px 24px;
width:90%;
height:54px;
outline:none;
`
const ImageContainer = styled.label`
border: 2px dashed #009432;
width:90%;
margin:12px auto 6px 24px;
height:12rem;
border-radius:2rem;
text-align:center;
`
const MCategoryEdit = () => {
    const params = useParams();
    const history = useHistory();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/auth',{headers: {
                'Content-type': 'application/json',
              }
        },
        { withCredentials: true });
            if (response.level < 40) {
                window.location.href = '/';

            } else {
                setMyNick(response.nickname)
            }
        }
        isAdmin();
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/category/${params.pk}`)
                $('.name').val(response.data.name);
                $('.en_name').val(response.data.en_name)
            }
        }
        fetchPost();
    }, [])
    const editCategory = () => {
        if (!$(`.name`).val() || !$(`.en_name`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                params.pk == 0 ?
                    addItem('category', { name: $(`.name`).val(), en_name: $(`.en_name`).val() }) :
                    updateItem('category', {
                        name: $(`.name`).val(), en_name: $(`.en_name`).val(), pk: params.pk
                    })
            }
        }


    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '카테고리 추가' : '카테고리 수정'} nickname={myNick} />
                    <Card>
                        <Title style={{ margintop: '32px' }}>카테고리명</Title>
                        <Input className='name' />
                        <Title style={{ margintop: '32px' }}>영어이름</Title>
                        <Input className='en_name' />

                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={()=>history.goBack()}>x 취소</CancelButton>
                        <AddButton onClick={editCategory}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MCategoryEdit;