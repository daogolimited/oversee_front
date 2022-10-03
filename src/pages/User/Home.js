import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  useEffect(()=>{
    history.push('/products/0')
  },[])
  return (
    <>

    </>
  );
};
export default Home;