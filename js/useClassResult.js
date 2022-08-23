import { useEffect, useState } from "react";

export default function useClassResult(classParams) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (Object.keys(classParams).length > 0) {
            let url = new URL(window.location.origin + "/api/result/class/");
            for (let x of Object.keys(classParams)) {
                url.searchParams.append(x, classParams[x]);
            }
            fetch(url)
                .then(function (response) { return response.json() })
                .then((res) => {
                    setData(res);
                });
        }

    }, [classParams]);
    return data;
}