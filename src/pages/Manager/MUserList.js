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

const MUserList = () => {
    const history = useHistory();
    const zColumn = [{ name: '아이디', width: 12, type: 'text', column: 'id' }, { name: '닉네임', width: 12, type: 'text', column: 'nickname' }, { name: '이메일', width: 28, type: 'text', column: 'email' }, { name: '폰번호', width: 24, type: 'text', column: 'phone' }, { name: '레벨', width: 12, type: 'level', column: 'level' }, { name: '수정', width: 6, type: 'edit', column: 'edit' }, { name: '삭제', width: 6, type: 'delete', column: 'delete' }];
    const [posts, setPosts] = useState([])
    const [myNick, setMyNick] = useState("")
    const [page, setPage] = useState(1)
    const [pageList, setPageList] = useState([])
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
            const { data: response } = await axios.get(`/api/users?page=1`)
            setPosts(response.data.data)
            setPageList(range(1, response.data.maxPage))
            setLoading(false)
        }
        fetchPost();
    }, [])
    const changePage = async (num) => {
        setLoading(true)
        setPage(num)
        const { data: response } = await axios.get(`/api/users?page=${num}`)
        setPosts(response.data.data)
        setLoading(false)
    }

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={'회원 관리'} nickname={myNick} />
                    {loading?
                    <>
                    <Loading/>
                    </>
                    :
                    <>
                    <DataTable data={posts} column={zColumn} schema={'user'} />
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
                        <AddButton onClick={() => history.push(`/manager/user/0`)}>+ 추가</AddButton>
                    </MBottomContent>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MUserList;