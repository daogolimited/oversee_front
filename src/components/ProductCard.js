import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/style.css'
import { AiFillStar } from 'react-icons/ai'
import { backUrl, ObjColor } from '../data/Data';
import { commarNumber } from '../utils/function';
const Wrappers = styled.div`
width:22.8%;
margin: 1%;
height:16.8rem;
border:1px solid #e4e5e7;
display:flex;
flex-direction:column;
@media (max-width: 1050px) {
    width:30%;
    margin: 1.25%;
    height:33vw;
}
@media (max-width: 850px) {
    width:44.5%;
    margin: 2.5%;
    height:51vw;
}
@media (max-width: 600px) {
    width:90%;
    margin: 5%;
    height:93vw;
}
`
const Img = styled.div`
width:100%;
height:8.8rem;
@media (max-width: 1050px) {
    height:17vw;
}
@media (max-width: 850px) {
    height:26vw;
}
@media (max-width: 600px) {
    height:48vw;
}
`
const User = styled.div`
height:2.4rem;
width:100%;
display:flex;
align-items:center;
font-size:14px;
color:#222325;
font-weight:bold;
@media (max-width: 1050px) {
    height:5vw;
}
@media (max-width: 850px) {
    height:8vw;
}
@media (max-width: 600px) {
    height:14vw;
}
`
const Explain = styled.div`
height:3.2rem;
width:100%;
font-size:16px;
font-weight:400;
color:#222325;
@media (max-width: 1050px) {
    height:6vw;
}
@media (max-width: 850px) {
    height:9vw;
}
@media (max-width: 600px) {
    height:17vw;
}
div{
    margin-left:12px;
    cursor:pointer;
    &:hover{ 
        color:${ObjColor.background1};
    }
}
`
const Evaluation = styled.div`
height:2.4rem;
width:100%;
display:flex;
align-items:center;
color:#ffbe5b;
@media (max-width: 1050px) {
    height:5vw;
}
@media (max-width: 850px) {
    height:8vw;
}
@media (max-width: 600px) {
    height:14vw;
}
`
const Seller = styled.div`
margin-left:12px;
cursor:pointer;
&:hover{  
    text-decoration:underline; 
    color:#222325;
}
`
const ProductCard = (props) => {
    const history = useHistory();

    const [posts, setPosts] = useState([])

    const settings = {
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        let img_list = [];
        if (props.data.main_img) {
            img_list.push(props.data.main_img)
        }
        for (var i = 1; i <= 5; i++) {
            if (props.data[`sub_img${i}`]) {
                img_list.push(props.data[`sub_img${i}`])
            }
        }
        setPosts(img_list)
    }, [props])
    return (
        <>
            <Wrappers >
                <Slider {...settings}>
                    {posts.map((item, index) => (
                        <>
                            <Img style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }} />
                        </>
                    ))}
                </Slider>
                <User onClick={() => { history.push(`/product/${props.data.pk}`) }}>
                    {/* <img src={props.data.seller_img} style={{ width: '1.5rem', borderRadius: '50%', marginLeft: '12px' }} /> */}
                    <Seller>{props.data.name}</Seller>
                </User>
                <Explain onClick={() => { history.push(`/product/${props.data.pk}`) }}>
                    <div>{props.data.note.length>15?props.data.note.substring(0,15)+'...':props.data.note}</div>
                </Explain>
                <Evaluation onClick={() => { history.push(`/product/${props.data.pk}`) }}>
                    <div style={{ marginLeft: '12px'}}>$</div>
                    <div style={{ marginLeft: '2px' }}>{commarNumber(props.data.price)}</div>
                </Evaluation>
            </Wrappers>
        </>
    )
}
export default ProductCard;