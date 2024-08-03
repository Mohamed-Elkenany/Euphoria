"use client"
import { useGetAllCategoriesMutation } from '@/app/_utitly/RTKQAPI/appApi';
import { useEffect, useState } from 'react'




function useFetchCategory() {
    const [getCate, getCateOperation] = useGetAllCategoriesMutation();
    const [cates, setCates] = useState([]);
    useEffect(() => {
        async function getMenCates() {
            const allData = await getCate().then(data => data.data.data)
                .catch(error => { throw new Error(error.message) });
            if (allData) {
                setCates(allData)
            }
        }
        getMenCates()
    }, [getCate]);
    return { data: cates, getCateOperation }
}
export default useFetchCategory