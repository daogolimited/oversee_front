import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import Wrappers from '../../components/elements/Wrappers';
import {ObjColor} from '../../data/Data'
import MLoginCard from '../../components/MLoginCard';
const MLogin = () =>{

    return (
        <>
        <Wrappers style={{background:`${ObjColor.background1}`, margin:'0',maxWidth:'100%',minHeight:'100vh'}}>
            <MLoginCard/>
        </Wrappers>
        </>
    )
}
export default MLogin;