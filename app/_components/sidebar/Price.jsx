"use client"
import React, { useRef, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

function Price() {
    const [open, setOpen] = useState(true);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const maxRef = useRef()
    const minRef = useRef()
    const handleRest = () => {
        minRef.current.value = null;
        maxRef.current.value = null;
        setMax()
        setMin()
    };
    return (
        <div className='borrder-b border-colorGrayFour'>
            <button className='py-2 px-4 border-b border-colorGrayFour w-full' onClick={() => setOpen(open => !open)}>
                <div className='flex items-center justify-between text-colorGrayThree'>
                    <h3 className='text-[24px]'>Price</h3>
                    <div className='text-xl'>{open ? <SlArrowUp /> : <SlArrowDown />}</div>
                </div>
            </button>
            <div className={`duration-100 overflow-hidden ${open ? 'block' : 'hidden overflow-hidden'}`}>
                <div className={`text-colorGrayThree flex items-center justify-between text-sm px-4 py-2 border-b border-colorGrayFour`}>
                    <p>The highest price is EGP3000</p>
                    <button className='underline hover:text-colorPink duration-100' onClick={handleRest}>Rest</button>
                </div>
                <div className='px-4 py-6 flex items-center justify-between'>
                    <div>
                        <label htmlFor="minPrice">
                            <div className='flex items-center gap-1'>
                            <span className='text-colorGrayOne mr-1'>EGP</span>
                            <input ref={minRef} onChange={(e) => setMin(e.target.value)} id='minPrice' type="number" placeholder='From' className=' focus:outline-colorPink focus:border-none px-1 text-colorGrayOne w-[70px] h-8 border border-t-colorGrayFour rounded-sm' />
                            </div>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="MaxPrice">
                            <div className='flex items-center gap-1'>
                            <span className='text-colorGrayOne mr-1'>EGP</span>
                            <input ref={maxRef} onChange={(e) => setMax(e.target.value)} id='MaxPrice' type="number" placeholder='To' className=' focus:outline-colorPink focus:border-none px-1 text-colorGrayOne w-[70px] h-8 border border-t-colorGrayFour rounded-sm' />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Price