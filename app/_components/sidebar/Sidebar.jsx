"use client"
import React from 'react'
import FilterWithCate from './FilterWithCate'
import Price from './Price'
import Colors from './Colors'
import Sizes from './Sizes'
import { useParams } from 'next/navigation'

function Sidebar() {
  const params = useParams();
  return (
    <div className={`${params.productId && 'hidden'} border w-[400px]`}>
      <FilterWithCate />
      <Price />
      <Colors />
      <Sizes />
    </div>
  );
}

export default Sidebar