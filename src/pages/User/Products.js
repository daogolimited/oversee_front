import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams, useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Wrappers from '../../components/elements/Wrappers';
import axios from 'axios';
import Loading from '../../components/Loading';
const Products = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    
    async function fetchPost() {
      setLoading(true);
      let apiStr = '/api/products'
      if (!isNaN(parseInt(params.pk)) && params.pk > 0) {
        apiStr += `?category_pk=${params.pk}`;
      }
      const { data: response } = await axios.get(apiStr);
      setProductList(response.data.data)
      setLoading(false)
    }
    fetchPost()
  }, [params])
  return (

    <>
      <Wrappers>
        {loading ?
          <>
          <Loading/>
          </>
          :
          <>
            {productList.map((item, index) => (
              <>
                <ProductCard data={item} />
              </>
            ))}
          </>
        }
      </Wrappers>
    </>
  );
};
export default Products;