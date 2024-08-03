import AboutShop from '../_components/aboutShop/AboutShop';
import Path from '../_components/path/Path';
import AboutProduct from '../_components/aboutProduct/AboutProduct';


export const metadata = {
    title: "Euphoria Shop",
    description: "Shop of clothes",
  };

function layoutShop({ children }) {
  return (
    <div className='relative'>
      <AboutProduct/>
      <div className='max-w-screen-xl mx-auto pt-[105px]'>
        <Path />
        {children}
        <AboutShop />
      </div>
    </div>
  );
}

export default layoutShop