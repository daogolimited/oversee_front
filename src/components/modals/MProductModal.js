import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
const ModalContainer = styled.div`

    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    
`
const ModalOverlay = styled.div`
    background-color: black;
    width:100%;
    height: 100%;
    position: absolute;
    opacity: 0.6;
`
const ModalContent = styled.div`
box-shadow: 0px 10px 40px #00000029;
background-color:white;

position: relative;
border-radius: 12px;
width:50%;

top: 0;
align-items: center;
display:flex;
flex-direction:column;
@media screen and (max-width:950px) {
  width:80%;
  
}
`

const XButton = styled.button`
width: 36px;
height: 36px;
color: #fff;
border: none;
border-radius: 16px;
font-size: 24px;
right: -8px;
top: -28px;
background-color: rgba( 255, 255, 255, 0 );
position: absolute;
font-family: ${({ theme }) => theme.font.thin};
cursor: ${({ background }) => background === 'disabled' ? 'arrow' : 'pointer'};
&:focus {
  outline: none;
}
@media screen and (max-width:950px) {
  width: 36px;
  height: 36px;
}
`
const Title = styled.div`

`
const Input = styled.input`

`
const Textarea = styled.textarea`

`
const MProductModal = (props) => {

    const [display, setDisplay] = useState(false)
    const handleModal = () => {
        setDisplay(false)
    };
    useEffect(() => {
        setDisplay(props.display)
    }, [props])
    return (
        <>
            <ModalContainer style={{ display: `${display ? 'flex' : 'none'}` }}>
                <ModalOverlay onClick={handleModal} />
                <ModalContent>
                <Title>상품명</Title>
                <Input/>
                <Title>가격</Title>
                <Input/>
                <Title>상품설명</Title>
                <Textarea/>
                <Title>메인이미지</Title>
                <Title>서브이미지1</Title>
                <Title>서브이미지2</Title>
                <Title>서브이미지3</Title>
                <Title>서브이미지4</Title>
                <Title>서브이미지5</Title>
                    <XButton onClick={handleModal}>
                        <AiOutlineClose />
                    </XButton>

                </ModalContent>
            </ModalContainer>
        </>
    )
}
export default MProductModal;