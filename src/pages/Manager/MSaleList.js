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

const MSaleList = () => {
    const history = useHistory();
    const zColumn = [{ name: 'product', width: 16, type: 'text' }, { name: 'user', width: 16, type: 'text' }];
    const [myNick, setMyNick] = useState("")
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
    const [loading, setLoading] = useState(false)
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
    }, [])
    const changePage = async (num) => {
        setPage(num)
        const { data: response } = await axios.get(`/api/sales?page=${num}`)
        setPosts(response.data.data)
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'판매내역 관리'} nickname={myNick} />
                    <DataTable data={posts} column={zColumn} schema={'sale'} />
                    <MBottomContent>
                        <div />
                        <PageContainer>
                            <PageButton onClick={()=>changePage(1)}>
                                처음
                            </PageButton>
                            {pageList.map((item, index) => (
                                <>
                                    <PageButton onClick={()=>changePage(item)} style={{color:`${page==item?'#fff':''}`,background:`${page==item?'#009432':''}`}}>
                                        {item}
                                    </PageButton>
                                </>
                            ))}
                            <PageButton onClick={()=>changePage(pageList.length)}>
                                마지막
                            </PageButton>
                        </PageContainer>
                        <AddButton>+ 추가</AddButton>
                    </MBottomContent>

                </ManagerContentWrappers>

            </ManagerWrappers>
        </>
    )
}
export default MSaleList;