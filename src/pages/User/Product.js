import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import Wrappers from '../../components/elements/Wrappers';
import axios from 'axios';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/style.css'
import { commarNumber } from '../../utils/function';
import Loading from '../../components/Loading';
import { ObjColor } from '../../data/Data';

const LeftContainer = styled.div`
margin-right: 9.15%;
width: 57.42%;
display:flex;
flex-direction:column;
color:#404145;
@media (max-width: 1000px) {
    margin-left: 5%;
    width: 53.42%;
    margin-right: 4.15%;
}
@media (max-width: 650px) {
    width:90%;
    margin:1rem auto;
}
`
const RightContainer = styled.div`
width:32.6%;
min-height:300px;
background:#fff;
border:1px solid #dadbdd;
@media (max-width: 1000px) {
    width:31.6%;
    margin-right: 5%;
}
@media (max-width: 650px) {
    width:90%;
    margin:1rem auto;
}
`
const Img = styled.div`
width:100%;
height:382px;
@media (max-width: 1000px) {
    height:35.67vw;
}
@media (max-width: 650px) {
    height:60vw;
}
`
const Category = styled.div`
color:#446ee7;
font-size:14px;
padding-bottom:10px;
align-items:center;
display:flex;
`
const Title = styled.div`
font-size:28px;
font-weight:bold;
padding-bottom:16px;
`
const Note = styled.div`
padding-top:25px;
`
const Price = styled.div`
padding:32px 0 0 24px;
font-weight:bold;
font-size:24px;
`
const ContinueButton = styled.div`
background: ${ObjColor.background1};
border: 1px solid transparent;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
font-weight: bold;
line-height: 100%;
padding:12px 0;
text-align: center;
text-decoration: none;
color:#fff;
margin:36px 24px;
`
const Product = () => {
    const params = useParams();
    const history = useHistory();
    const [item, setItem] = useState({})
    const [zImg, setZImg] = useState([]);
    const [loading, setLoading] = useState(false)
    const settings = {
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/product/${params.pk}`)
            setItem(response.data)

            let img_list = [];
            if (response.data.data.main_img) img_list.push(response.data.data.main_img);
            for (var i = 1; i <= 3; i++) {
                if (response.data.data[`sub_img${i}`]) img_list.push(response.data.data[`sub_img${i}`]);
            }
            setZImg(img_list);
            setLoading(false)
        }
        fetchPost();

    }, [])
    const buyItem = () => {
        if(localStorage.getItem('auth')){
            let data = JSON.parse(localStorage.getItem('auth'));

        }else{
            alert(' Please log in first');
            history.push('/signin')
        }
    }
    return (
        <>
            <Wrappers style={{ maxWidth: '1000px', padding: '36px 0', display: 'flex' }} id="column">
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <LeftContainer>
                            <Category><strong onClick={() => history.push('/products/0')} style={{ cursor: 'pointer' }}>All</strong>
                                <strong style={{ color: '#404145', fontSize: '8px', padding: '0 8px' }}>{'>'}</strong>
                                <strong onClick={() => history.push(`/products/${item?.category?.pk}`)} style={{ cursor: 'pointer' }}>{item?.category?.en_name}</strong></Category>
                            <Title>{item?.data?.name}</Title>
                            <Slider {...settings}>
                                {zImg.map((item, index) => (
                                    <>
                                        <Img style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }} key={index}/>
                                    </>
                                ))}
                            </Slider>
                            <Note>{item?.data?.note}</Note>
                        </LeftContainer>
                        <RightContainer>
                            <Price>US$ {commarNumber(item?.data?.price ?? 0)}</Price>
                            <ContinueButton onClick={() => {
                                if (window.confirm("Do you really want to buy?")) {
                                    buyItem();
                                }
                            }}>Continue</ContinueButton>
                        </RightContainer>
                    </>
                }
            </Wrappers>
        </>
    )
}
export default Product;