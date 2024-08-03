"use client"
import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection'
import CateCard from '../CateCard'
import useFetchCategory from '@/Hooks/useFetchCategory'
import { useGetMenCategoryMutation } from '@/app/_utitly/RTKQAPI/appApi'

function MenCategory() {
    const { data, getCateOperation } = useFetchCategory();
    const [mencates, setMenCates] = useState([]);
    useEffect(() => {
        function getMenCates() {
            if (data) {
                const allMenCates = data.filter(data => {
                    return data.attributes.forMen
                })
                setMenCates(allMenCates)
            }
        }
        getMenCates()
    }, [data]);
    return (
        <div className='max-w-screen-xl mx-auto mb-[70px]'>
            <div className='mb-[70px]'>
                <TitleSection title={`Categories For Men`} />
            </div>
            <div className='grid grid-cols-4 gap-12'>
                {getCateOperation.isSuccess && mencates.length &&
                    mencates.map((cate, i) => {
                        return <CateCard cate={cate} key={i} />
                    })
                }
            </div>
        </div>
    );
}

export default MenCategory