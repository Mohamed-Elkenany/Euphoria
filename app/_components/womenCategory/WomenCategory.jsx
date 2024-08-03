"use client"
import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection'
import CateCard from '../CateCard';
import useFetchCategory from '@/Hooks/useFetchCategory';

function WomenCategory() {
    const { data, getCateOperation } = useFetchCategory();
    const [womencates, setWomenCates] = useState([]);
    useEffect(() => {
        function getWomenCates() {
            if (data) {
                const allMenCates = data.filter(data => {
                    return !data.attributes.forMen
                })
                setWomenCates(allMenCates)
            }
        }
        getWomenCates()
    }, [data]);
    return (
        <div className='max-w-screen-xl mx-auto mb-[70px]'>
            <div className='mb-[70px]'>
            <TitleSection title={`Categories For Women`} />
            </div>
            <div className='grid grid-cols-4 gap-12'>
                {   getCateOperation.isSuccess && womencates.length &&
                    womencates.slice(0,4).map((cate, i) => {
                        return <CateCard cate={cate} key={i}/>
                    })
                }
            </div>
        </div>
    );
}

export default WomenCategory