import React from 'react'

function ValidationError({errorMessage}) {
    return (
        <div>
            <h3 className='text-[12px] font-light text-red-600'>{errorMessage}</h3>
        </div>
    );
}

export default ValidationError