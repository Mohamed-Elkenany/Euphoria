import MyAccountSidebar from '@/app/_components/myAccountSidebar/MyAccountSidebar'
import React from 'react'

function layout({children}) {
    return (
        <div className='flex'>
            <MyAccountSidebar/>
            <div className='w-full'>{children}</div>
        </div>
    )
}

export default layout