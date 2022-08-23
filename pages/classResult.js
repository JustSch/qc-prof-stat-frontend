import useClassResult from "../js/useClassResult";
import {useRouter} from 'next/router'

export default function ClassResult() {
    let router = useRouter();
    let data = useClassResult(router.query);
    //console.log(data);
    
    return(
    <>
        
    </>
        
    );

}