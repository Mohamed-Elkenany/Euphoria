import React from 'react'
import Path from '../_components/path/Path'
export const metadata = {
    title: "My Account",
    description: "Personal Account",
  };
function MyAccountLayout({ children }) {
    return (
        <div className='py-[105px] max-w-screen-xl mx-auto'>
            <Path />
            <div className='mt-12'>{children}</div>
        </div>
    )
}

export default MyAccountLayout