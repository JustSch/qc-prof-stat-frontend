import { useEffect,useState } from "react";
import sortStat from "./sortStat";
export default function useSearchResult(search) {
    const [data,setData] = useState(null);
    useEffect(() => {
        const url = "/instructor/" + search;
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then((stat) => { return sortStat(stat) })
            .then((rData) => {setData(rData)})

            .catch(function (err) {
                console.log(err);
            });
    },[search]);

    return data;
}