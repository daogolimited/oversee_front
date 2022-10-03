import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import DataTable from '../../common/manager/DataTable';
import MBottomContent from '../../components/elements/MBottomContent';
import PageContainer from '../../components/elements/pagination/PageContainer';
import PageButton from '../../components/elements/pagination/PageButton';
import { range } from '../../utils/function';
import AddButton from '../../components/elements/button/AddButton';
import Loading from '../../components/Loading';

const OptionCard = styled.div`
width:95%;
margin:12px auto;
background:#fff;
box-shadow:0px 0px 4px #cccccc;
padding:12px 0;
`
const Select = styled.select`
margin:12px auto 6px 24px;
width:218px;
padding:8px;
outline:none;
`
const Title = styled.div`
margin:12px auto 6px 24px;
width:90%;
color:#009432;
font-weight:bold;
`
const RowContent = styled.div`
display:flex;

`
const MProductList = () => {
    const history = useHistory();
    const zColumn = [{ name: '상품명', width: 8, type: 'text', column: 'name' }, { name: '가격', width: 8, type: 'text', column: 'price' },
    { name: '메인이미지', width: 13, type: 'img', column: 'main_img' }, { name: '서브이미지 1', width: 13, type: 'img', column: 'sub_img1' }, { name: '서브이미지 2', width: 13, type: 'img', column: 'sub_img2' }, { name: '서브이미지 3', width: 13, type: 'img', column: 'sub_img3' }, { name: '생성날짜', width: 20, type: 'text', column: 'date' },
    { name: '수정', width: 6, type: 'edit' }, { name: '삭제', width: 6, type: 'delete' }];
    const [posts, setPosts] = useState([])
    const [myNick, setMyNick] = useState("")
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [zCategory, setZCategory] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function isAdmin() {
            setLoading(true)
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
            const { data: response } = await axios.get(`/api/products?page=1`)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))

            const { data: response2 } = await axios.get('/api/categories')
            setZCategory(response2.data.data)
            setLoading(false)
        }
        fetchPost();
    }, [])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        const { data: response } = await axios.get(`/api/products?page=${num}`)
        setPosts(response.data.data)
        setLoading(false)
    }
    const onChangeCategory = async (e) => {
        let str = "/api/products?page=1";
        if (e.target.value != 0) {
            str += "&category_pk=" + e.target.value
        }
        const { data: response } = await axios.get(str)
        setPosts(response.data.data)
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'상품 관리'} nickname={myNick} />
                    <OptionCard>
                        <RowContent>
                            <Title>카테고리</Title>
                        </RowContent>
                        <RowContent>
                            <Select className='category' onChange={onChangeCategory}>
                                <option value={0}>전체</option>
                                {zCategory.map((item, index) => (
                                    <>
                                        <option value={item.pk}>{item.name}</option>
                                    </>
                                ))}
                            </Select>
                        </RowContent>

                    </OptionCard>
                    {loading?
                    <>
                    <Loading/>
                    </>
                    :
                    <>
                    <DataTable data={posts} column={zColumn} schema={'product'} />
                    </>}
                   
                    <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={() => changePage(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? '#009432' : ''}` }}>
                                        {item}
                                    </PageButton>
                                </>
                            ))}
                            <PageButton onClick={() => changePage(pageList.length)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <AddButton onClick={() => history.push(`/manager/product/0`)}>+ 추가</AddButton>
                    </MBottomContent>
                </ManagerContentWrappers>
            </ManagerWrappers>

        </>
    )
}
export default MProductList;