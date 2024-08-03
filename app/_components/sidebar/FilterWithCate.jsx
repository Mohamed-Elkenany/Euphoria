"use client"
import useFetchCategory from '@/Hooks/useFetchCategory';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdClear } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { filterByCate } from '@/app/_utitly/slices/filterSlice';
import { useDispatch } from 'react-redux';

function FilterWithCate() {
    const dispatch = useDispatch();
    const router = useRouter()
    const searchParams = useSearchParams();
    const cateColor = searchParams.get("cate");
    const pahtname = usePathname();
    const { data, getCateOperation } = useFetchCategory();
    const [filter, setFilter] = useState("");
    const [cates, setCates] = useState([]);
    useEffect(() => {
            if (data && getCateOperation.isSuccess) {
                if (pahtname.split('/').includes('men')) {
                    const filterData = data.filter(cate => {
                        return cate.attributes.forMen 
                    })
                    setCates(filterData);
                } else if (pahtname.split('/').includes("women")) {
                    const filterData = data.filter(cate => {
                        return cate.attributes.forMen === false;
                    })
                    setCates(filterData);
                } else {
                    let filcateRepeat = [];
                    for (let i = 0; i < data.length; i++){
                        if (!filcateRepeat.find(cate=>cate.attributes.cateName===data[i].attributes.cateName)) {
                            filcateRepeat.push(data[i])
                        }
                    }
                    setCates(filcateRepeat);
                }
            }
    }, [data, pahtname, getCateOperation.isSuccess]);
    useEffect(() => {
        cateColor ? setFilter(cateColor) : setFilter("")
    }, [cateColor]);
    useEffect(() => {
        dispatch(filterByCate(filter));
    }, [filter, dispatch]);
    return (
        <div className='border-b border-colorGrayFour'>
            <div className='py-2 px-4 border-b border-colorGrayFour'>
                {
                    filter ?
                        <div className='flex items-center justify-between'>
                            <h3 className='text-colorGrayThree text-[18px]'>{filter}</h3>
                            <button onClick={() => { setFilter(""),router.replace(`${pahtname}`) }} className='text-colorGrayThree flex items-center justify-center p-3 rounded-full hover:bg-colorGrayOne duration-100'><MdClear /></button>
                        </div>
                        :
                        <div className='flex items-center justify-between'>
                            <h3 className='text-colorGrayThree text-[24px]'>Filter</h3>
                            <div className='w-[25px]'><Image src={'/filter.png'} width={17} height={20} className='w-full' alt='filter' /></div>
                        </div>
                }
            </div>
            <div>
                <div>
                    {
                        cates.map((cate, i) => (
                            <label key={i} htmlFor={cate.attributes.cateName}>
                                <div className={`flex items-center justify-between p-4 ${cate.attributes.cateName === filter || cate.attributes.cateName === cateColor ? 'bg-colorPink text-colorGrayFive' : 'text-colorGrayThree'} duration-75 cursor-pointer`}>
                                    <h1>{cate.attributes.cateName}</h1>
                                    <FaAngleRight />
                                </div>
                                <input onChange={() => setFilter(cate.attributes.cateName)} className='hidden' type="radio" name="cateName" id={cate.attributes.cateName} />
                            </label>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default FilterWithCate