import React from 'react'
import userImage from '@/public/Feedback/Feedback1.png'
import Image from 'next/image'
function UserComment() {
  const comments = [
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      image: userImage,
      name: 'Floyd Miles',
      commnet:'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
  ]
  return (
    <div className='h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-colorGrayFour scrollbar-thumb-colorGrayOne'>
      {
        comments.map((comment, i) => (
          <div key={i} className='mb-4 shadow p-1 rounded-md'>
            <div>
              <Image src={comment.image} width={49} height={49} alt='user image'/>
            </div>
            <h1 className='text-[18px] text-colorGrayTwo font-medium tracking-wide my-1'>{comment.name}</h1>
            <div>
              <p className='text-[14px] text-colorGrayThree tracking-wide'>{comment.commnet}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default UserComment