import { useEffect,useState } from "react";
import groupResult from "./groupResult";
import sortStat from "./sortStat";
export default function useSearchResult(search) {
    const [data,setData] = useState(null);
    useEffect(() => {
        if (search) {
            const url = "/api/instructor/" + search;
            fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then((stat) => { return sortStat(stat) })
            .then((r)=> {return groupResult(r)})
            .then((rData) => {setData(rData)})
            .catch(function (err) {
                console.log(err);
            });
        }
        
    },[search]);

    return data;
}