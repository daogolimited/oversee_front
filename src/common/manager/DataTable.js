import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from 'axios';
import MProductModal from '../../components/modals/MProductModal';
import MUserModal from '../../components/modals/MUserModal';
import { backUrl } from '../../data/Data';
const Table = styled.table`
width:95%;
margin:0 auto;
border-spacing: 0 10px;
`
const Tr = styled.tr`
box-shadow:0px 0px 2px #cccccc;
border-radius:16px;
font-size:14px;
background:#fff;
color:#5a5a5a;
`
const Td = styled.td`
text-align:center;
padding:14px 0;
margin-bottom:6px;
`
const DataTable = (props) => {
    const history = useHistory();
    useEffect(() => {
    }, [])

    const deleteItem = async (pk, schema) => {
        const { data: response } = await axios.post(`/api/delete${schema}`, { pk: pk })

        if (response.result > 0) {
            alert('has been deleted');
            window.location.reload();
        } else {
            alert('error')
        }
    }

    return (
        <>
            <div style={{ minHeight: '700px', marginBottom: '16px' }}>
                <Table>
                    <Tr style={{ fontWeight: 'bold', background: '#C4E538', fontSize: '16px' }}>
                        {props.column.map((item, index) => (
                            <>
                                <Td style={{ width: `${item.width}%` }}>{item.name}</Td>
                            </>
                        ))}
                    </Tr>
                    {props.data.map((data, index) => (
                        <>
                            <Tr>
                                {props.column.map((column, index) => (
                                    <>
                                        {column.type == 'text' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{data[`${column.column}`]}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                            {column.type == 'level' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>{data[column.column]==0?'일반유저':data[column.column]==40?'관리자':'개발자'}</Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'img' ?
                                            <>
                                                <Td style={{ width: `${column.width}%` }}>
                                                    {data[`${column.column}`] ?
                                                        <>
                                                            <img src={data[`${column.column}`]} style={{width:'80%'}} />
                                                        </>
                                                        :
                                                        <>
                                                            ---
                                                        </>}

                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'edit' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, fontSize: '20px' }}>
                                                    <BiEditAlt style={{ cursor: 'pointer', color: '#546de5' }} onClick={() => history.push(`/manager/${props.schema}/${data.pk}`)} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                        {column.type == 'delete' ?
                                            <>
                                                <Td style={{ width: `${column.width}%`, fontSize: '20px' }}>
                                                    <RiDeleteBinLine style={{ cursor: 'pointer', color: '#e15f41' }} onClick={() => {
                                                        if (window.confirm("Do you want to delete?")) {
                                                            deleteItem(data.pk, props.schema)
                                                        }
                                                    }} />
                                                </Td>
                                            </>
                                            :
                                            <>
                                            </>}
                                    </>
                                ))}

                            </Tr>

                        </>
                    ))}
                </Table>
            </div>

        </>
    )
}
export default DataTable;