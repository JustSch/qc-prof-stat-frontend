import { useEffect, useState } from "react";
import groupResult from "./groupResult";
import sortStat from "./sortStat";
export default function useSearchResult(search) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (search) {
            const url = "/api/instructor/" + search;
            fetch(url)
                .then(function (response) {
                    if (!response.ok) {
                        throw Error('The Professor You Have Searched For Does Not Exist In Our Database');
                    }
                    return response.json();
                })
                .then((stat) => { return sortStat(stat) })
                .then((r) => { return groupResult(r) })
                .then((rData) => {
                    setData(rData);
                    setError(null);
                })
                .catch(function (err) {
                    setError(err.message);
                    setData(null);
                });
        }
    }, [search]);
    return { data, error };
}