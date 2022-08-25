import { useEffect, useState } from "react";

export default function useClassResult(classParams) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (Object.keys(classParams).length > 0) {
            let url = new URL(window.location.origin + '/api/result/class/');
            for (let x of Object.keys(classParams)) {
                url.searchParams.append(x, classParams[x]);
            }
            fetch(url)
            .then(function (response) { 
                if (!response.ok){
                    throw Error('This Class Does Not Exist In Our Database');
                }
                return response.json() 
            })
            .then((res) => {
                setData(res);
            })
            .catch(function (err) {
                setError(err.message);
                
            });


        }
        


    }, [classParams]);
    return {data, error};
}