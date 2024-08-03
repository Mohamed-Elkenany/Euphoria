
import React from 'react'
import Hero from './_components/hero/Hero'
import NewArrival from './_components/newArrival/NewArrival'
import BigSavingZone from './_components/BigSavingZone/BigSavingZone'
import MenCategory from './_components/menCategory/MenCategory'
import WomenCategory from './_components/womenCategory/WomenCategory'
import TopBrandsDeal from './_components/TopBrandsDeal/TopBrandsDeal'
import InTheLimelight from './_components/InTheLimelight/InTheLimelight'
import Feedback from './_components/Feedback/Feedback'
import AboutProduct from './_components/aboutProduct/AboutProduct'
import getUserMeLoader from './_data/actions/getUserMeLoader'
import getUserToken from './_data/services/getUserToken'

async function Home() {
  const user = await getUserMeLoader() 
  const userToken = getUserToken()
  return (
    <div className='relative pt-[120px]'>
      <Hero />
      <NewArrival />
      <BigSavingZone />
      <MenCategory />
      <WomenCategory />
      <TopBrandsDeal />
      <InTheLimelight user={user?.data} userToken={userToken} />
      <Feedback />
      <AboutProduct/>
    </div>
  )
}

export default Home