"use client"
import { filterByColor } from '@/app/_utitly/slices/filterSlice';
import React, { useEffect, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import stc  from "string-to-color";
function Colors() {
    const dispatch = useDispatch();
    const Colors = useSelector(state => state.rootReducer.filterProductSlice.colors);
    const [color, SetColor] = useState('');
    const [open, setOpen] = useState(true);
    const handleOpen = () => {
        setOpen(open=>!open);
        SetColor();
    }
    useEffect(() => {
        dispatch(filterByColor(color));
    }, [color, dispatch]);
    return (
        <div>
            <button className='py-2 px-4 border-y border-colorGrayFour w-full' onClick={handleOpen}>
                <div className='flex items-center justify-between text-colorGrayThree'>
                    <h3 className='text-[24px]'>Colors</h3>
                    <div className='text-xl'>{open ? <SlArrowUp /> : <SlArrowDown />}</div>
                </div>
            </button>
            <div className={`${open ? 'block' : 'hidden'} grid grid-cols-4 gap-4 p-4 relative`}>
                {
                    color &&
                    <div className='absolute -right-6 top-1/2 w-[500px]-translate-y-1/2 bg-white shadow-md rounded-md z-20'>
                        <div className='w-full relative px-2 py-1'>
                            <button onClick={() => SetColor("")} className='absolute -right-4 -top-2 size-5 bg-colorGrayOne text-colorGrayFive rounded-full flex items-center justify-center'><p>x</p></button>
                            <h1>{color}</h1>
                        </div>
                    </div>
                }
                {
                    Colors.map((color, i) => (
                        <label key={i} htmlFor={color} className='flex flex-col items-center gap-y-2 cursor-pointer'>
                            <div style={{ background: `${color === 'white' ? 'white' : stc(color)}` }} className={`w-full h-12 bg-[${color}] shadow-md rounded-md`}>
                                <input onChange={(e) => SetColor(e.target.value)} value={color} type="radio" name="color" id={color} className='hidden' />
                            </div>
                            <p className='text-sm text-colorGrayTwo'>{color.split('/')[0]}</p>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default Colors