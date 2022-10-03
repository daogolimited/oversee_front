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
import $ from 'jquery'
import { addItem, updateItem } from '../../utils/function';
import { backUrl, cloudinary } from '../../data/Data';
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
margin:12px 24px 6px 24px;
width:220px;
color:#009432;
font-weight:bold;
`
const Input = styled.input`
margin:12px 24px 6px 24px;
width:200px;
padding:8px;
outline:none;
`
const Textarea = styled.textarea`
margin:12px 24px 6px 24px;
height:126px;
outline:none;
`
const ImageContainer = styled.label`
border: 2px dashed #009432;
margin:6px auto;
width:22%;
height:12rem;
border-radius:2rem;
text-align:center;
`
const RowContent = styled.div`
display:flex;

`
const Select = styled.select`
margin:12px auto 6px 24px;
width:218px;
padding:8px;
outline:none;
`
const MProductEdit = () => {
    const params = useParams();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)

    const [subImg1Url, setSubImg1Url] = useState('')
    const [sub1Content, setSub1Content] = useState(undefined)
    const [subImg2Url, setSubImg2Url] = useState('')
    const [sub2Content, setSub2Content] = useState(undefined)
    const [subImg3Url, setSubImg3Url] = useState('')
    const [sub3Content, setSub3Content] = useState(undefined)
    const [formData] = useState(new FormData())

    const [zCategory, setZCategory] = useState([])
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
            const { data: response } = await axios.get('/api/categories')
            setZCategory(response.data.data)
            if (params.pk > 0) {
                const { data: response2 } = await axios.get(`/api/product/${params.pk}`)
                $('.name').val(response2.data.data.name);
                $('.price').val(response2.data.data.price);
                $('.note').val(response2.data.data.note)
                $('.category').val(response2.data.data.category_pk)
                if (response2.data.data.main_img) setUrl(response2.data.data.main_img)
                if (response2.data.data.sub_img1) setSubImg1Url(response2.data.data.sub_img1)
                if (response2.data.data.sub_img2) setSubImg2Url(response2.data.data.sub_img2)
                if (response2.data.data.sub_img3) setSubImg3Url(response2.data.data.sub_img3)

            }
        }
        fetchPost();
    }, [])
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    const addSubFile1 = (e) => {
        if (e.target.files[0]) {
            setSub1Content(e.target.files[0]);
            setSubImg1Url(URL.createObjectURL(e.target.files[0]))
        }
    };
    const addSubFile2 = (e) => {
        if (e.target.files[0]) {
            setSub2Content(e.target.files[0]);
            setSubImg2Url(URL.createObjectURL(e.target.files[0]))
        }
    };
    const addSubFile3 = (e) => {
        if (e.target.files[0]) {
            setSub3Content(e.target.files[0]);
            setSubImg3Url(URL.createObjectURL(e.target.files[0]))
        }
    };
    const editProduct = async () => {
        if ((!$(`.name`).val() || !$(`.price`).val() || !$(`.note`).val() || !$(`.category`).val() || !content || !sub1Content) && params.pk <= 0) {
            alert('필요값이 비어있습니다.');
        } else {
            if (isNaN(parseInt($(`.price`).val()))) {
                alert('가격 란에는 숫자만 입력해 주세요.')
                return;
            }

            let obj = {
                name: $(`.name`).val(),
                price: $(`.price`).val(),
                category_pk: $(`.category`).val(),
                note: $(`.note`).val()
            }

            let imgFormData = new FormData();
            imgFormData.append("upload_preset", cloudinary.preset_name);


            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                if (content) {
                    let file = new File([content], Date.now() + '-main.' + content.type.split('/')[1], { type: content.type })
                    imgFormData.append("file", file);
                    let result = await axios.post(cloudinary.url, imgFormData)
                    if (result.status == 200) {
                        obj.main_img = result.data.secure_url;
                    }
                }
                if (sub1Content) {
                    let file = new File([sub1Content], Date.now() + '-sub1.' + sub1Content.type.split('/')[1], { type: sub1Content.type })
                    imgFormData.append("file", file);
                    let result = await axios.post(cloudinary.url, imgFormData)
                    if (result.status == 200) {
                        obj.sub_img1 = result.data.secure_url;
                    }
                }
                if (sub2Content) {
                    let file = new File([sub2Content], Date.now() + '-sub2.' + sub2Content.type.split('/')[1], { type: sub2Content.type })
                    imgFormData.append("file", file);
                    let result = await axios.post(cloudinary.url, imgFormData)
                    if (result.status == 200) {
                        obj.sub_img2 = result.data.secure_url;
                    }
                }
                if (sub3Content) {
                    let file = new File([sub3Content], Date.now() + '-sub3.' + sub3Content.type.split('/')[1], { type: sub3Content.type })
                    imgFormData.append("file", file);
                    let result = await axios.post(cloudinary.url, imgFormData)
                    if (result.status == 200) {
                        obj.sub_img3 = result.data.secure_url;
                    }
                }
                params.pk == 0 ?
                    addItem('product', obj) :
                    updateItem('product', obj)
            }
        }


    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '상품 추가' : '상품 수정'} nickname={myNick} />
                    <Card>
                        <RowContent>
                            <Title style={{margin:'12px 24px 6px 24px'}}>상품명</Title>
                            <Title style={{margin:'12px 24px 6px 24px'}}>가격</Title>
                            <Title>카테고리</Title>
                        </RowContent>
                        <RowContent>
                            <Input className='name' />
                            <Input className='price' />
                            <Select className='category'>
                                {zCategory.map((item, index) => (
                                    <>
                                        <option value={item.pk}>{item.name}</option>
                                    </>
                                ))}
                            </Select>
                        </RowContent>

                        <Title>상품설명</Title>
                        <Textarea className='note' />
                        <RowContent style={{margin:'6px'}}>
                            <Title style={{margin:'6px auto',width:'22%'}}>메인이미지(필수)</Title>
                            <Title style={{margin:'6px auto',width:'22%'}}>서브이미지1(필수)</Title>
                            <Title style={{margin:'6px auto',width:'22%'}}>서브이미지2(선택)</Title>
                            <Title style={{margin:'6px auto',width:'22%'}}>서브이미지3(선택)</Title>
                        </RowContent>
                        <RowContent style={{margin:'0 6px'}}>
                            <ImageContainer for="file1">

                                {url ?
                                    <>
                                        <img src={url} alt="#"
                                            style={{
                                                width: '200px', height: '150px',
                                                margin: '24px'
                                            }} />
                                    </>
                                    :
                                    <>
                                        <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: '#009432' }} />
                                    </>}
                            </ImageContainer>
                            <div>
                                <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                            </div>
                            <ImageContainer for="file2">

                                {subImg1Url ?
                                    <>
                                        <img src={subImg1Url} alt="#"
                                            style={{
                                                width: '200px', height: '150px',
                                                margin: '24px'
                                            }} />
                                    </>
                                    :
                                    <>
                                        <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: '#009432' }} />
                                    </>}
                            </ImageContainer>
                            <div>
                                <input type="file" id="file2" onChange={addSubFile1} style={{ display: 'none' }} />
                            </div>
                            <ImageContainer for="file3">

                                {subImg2Url ?
                                    <>
                                        <img src={subImg2Url} alt="#"
                                            style={{
                                                width: '200px', height: '150px',
                                                margin: '24px'
                                            }} />
                                    </>
                                    :
                                    <>
                                        <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: '#009432' }} />
                                    </>}
                            </ImageContainer>
                            <div>
                                <input type="file" id="file3" onChange={addSubFile2} style={{ display: 'none' }} />
                            </div>
                            <ImageContainer for="file4">

                                {subImg3Url ?
                                    <>
                                        <img src={subImg3Url} alt="#"
                                            style={{
                                                width: '200px', height: '150px',
                                                margin: '24px'
                                            }} />
                                    </>
                                    :
                                    <>
                                        <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: '#009432' }} />
                                    </>}
                            </ImageContainer>
                            <div>
                                <input type="file" id="file4" onChange={addSubFile3} style={{ display: 'none' }} />
                            </div>
                        </RowContent>





                    </Card>
                    <ButtonContainer>
                        <CancelButton>x 취소</CancelButton>
                        <AddButton onClick={editProduct}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MProductEdit;