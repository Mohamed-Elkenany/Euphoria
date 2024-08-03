"use client"
import React, { useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
function Sizes() {
    const sizes = ["xl", "m", "xs", "l", "2xl"];
    const [Size, SetSize] = useState();
    const [open, setOpen] = useState(true);
    const handleOpen = () => {
        setOpen(open=>!open);
        SetSize();
    }
    return (
        <div>
            <button className='py-2 px-4 border-y border-colorGrayFour w-full' onClick={handleOpen}>
                <div className='flex items-center justify-between text-colorGrayThree'>
                    <h3 className='text-[24px]'>Sizes</h3>
                    <div className='text-xl'>{open ? <SlArrowUp /> : <SlArrowDown />}</div>
                </div>
            </button>
            <div className={`${open ? 'block' : 'hidden'} grid grid-cols-5 gap-4 p-4 relative`}>
                {
                    Size &&
                    <div className='absolute -right-6 top-1/2 w-[500px]-translate-y-1/2 bg-white shadow-md rounded-md z-20'>
                        <div className=' size-8 relative px-2 py-1'>
                            <button onClick={() => SetSize()} className='absolute -right-4 -top-2 size-5 bg-colorGrayOne text-colorGrayFive rounded-full flex items-center justify-center'><p>x</p></button>
                            <h1>{Size}</h1>
                        </div>
                    </div>
                }
                {
                    sizes.map((size, i) => (
                        <label key={i} htmlFor={size} className='flex flex-col items-center gap-y-2 cursor-pointer'>
                            <div className={`w-full h-12 ${size === Size ? "bg-colorPink text-white":"bg-colorGrayFive text-colorGrayTwo"} flex items-center justify-center shadow-md rounded-md duration-100`}>
                                <p className='text-md uppercase'>{size}</p>
                                <input onChange={(e) => SetSize(e.target.value)} value={size} type="radio" name="color" id={size} className='hidden' />
                            </div>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default Sizes