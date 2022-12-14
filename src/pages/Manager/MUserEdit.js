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
import $ from 'jquery';
import { addItem, updateItem } from '../../utils/function';
import { ObjColor, backUrl } from '../../data/Data';
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

const Select = styled.select`
margin:12px auto 6px 24px;
width:218px;
padding:8px;
outline:none;
`
const MUserEdit = () => {
    const params = useParams();
    const history = useHistory();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/auth', {
                headers: {
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
                const { data: response } = await axios.get(`/api/user/${params.pk}`)
                $('.id').val(response.data.id)
                $('.name').val(response.data.name)
                $('.email').val(response.data.email)
                $('.nickname').val(response.data.nickname)
                $('.address').val(response.data.address)
                $('.phone').val(response.data.phone)
                $('.level').val(response.data.level)
            }
        }
        fetchPost();
    }, [])
    const editUser = () => {
        if (!$(`.id`).val() || !$(`.email`).val() || !$(`.nickname`).val() || !$(`.address`).val() || !$(`.phone`).val() || (!$(`.pw`).val() && params.pk == 0)) {
            alert('???????????? ??????????????????.');
        } else {
            let obj = {
                id: $(`.id`).val(),

            }
            if (window.confirm(`${params.pk == 0 ? '?????????????????????????' : '?????????????????????????'}`)) {
                params.pk == 0 ?
                    addItem('user', { id: $(`.id`).val(), pw: $(`.pw`).val(), email: $(`.email`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), address: $(`.address`).val(), phone: $(`.phone`).val(), level: $(`.level`).val() }) :
                    updateItem('user', {
                        id: $(`.id`).val(), pw: $(`.pw`).val(), email: $(`.email`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), address: $(`.address`).val(), phone: $(`.phone`).val(), level: $(`.level`).val(), pk: params.pk
                    })
            }
        }


    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '?????? ??????' : '?????? ??????'} nickname={myNick} />
                    <Card>
                        <Title style={{ margintop: '32px' }}>?????????</Title>
                        <Input className='id' />
                        <Title style={{ margintop: '32px' }}>???????????? {params.pk == 0 ? '' : '(??? ????????? ?????? ?????? ?????? ??????)'}</Title>
                        <Input className='pw' type={'password'} />
                        <Title style={{ margintop: '32px' }}>??????</Title>
                        <Input className='name' />
                        <Title style={{ margintop: '32px' }}>?????????</Title>
                        <Input className='email' />
                        <Title style={{ margintop: '32px' }}>?????????</Title>
                        <Input className='nickname' />
                        <Title style={{ margintop: '32px' }}>??????</Title>
                        <Input className='address' />
                        <Title style={{ margintop: '32px' }}>?????????</Title>
                        <Input className='phone' />
                      
                        <Title style={{ margintop: '32px' }}>????????????</Title>
                        <Select className='level'>
                            <option value={0}>????????????</option>
                            <option value={40}>?????????</option>
                        </Select>
                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => history.goBack()}>x ??????</CancelButton>
                        <AddButton onClick={editUser}>{params.pk == 0 ? '+ ??????' : '??????'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MUserEdit;