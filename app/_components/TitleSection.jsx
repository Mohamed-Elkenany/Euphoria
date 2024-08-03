
import React from 'react'

function TitleSection({title,textSize}) {
    return (
        <div>
            <div className='relative pl-8'>
                <div className='absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-2 rounded-full bg-colorPink' />
                <h1 className={`${textSize ? `text-[${textSize}px]` :'text-[34px]'} font-bold text-colorGrayOne tracking-wide text-nowrap first-letter:uppercase`}>{title}</h1>
            </div>
        </div>
    );
}

export default TitleSection