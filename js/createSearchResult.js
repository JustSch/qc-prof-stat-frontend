import createSearchUrls from "./createSearchUrls";
import Link from 'next/link';
const createSearchResult = (results) => {
    
    return (
        <div className="resultList">
            {
                results.map((result) => (
                    <p key={() => {return `${result.instructor}-${result.subject}-${result.course_number}-${result.class_section}-${result.term}`}}>                  
                        <Link href={createSearchUrls(result).instrURL}> {/* SEPERATE OUT ATTRIBUTES TO DIFFERENT FUNCTIONS*/}
                            <a>{result.instructor}</a>
                        </Link>
                        {' '}
                        |
                        {' '}
                        <Link href={createSearchUrls(result).resURL}>
                            <a>
                                {result.subject} | {result.course_number} | {result.class_section} | {result.term}
                            </a>
                        </Link>
                    </p>
                ))}
        </div>
    );

}

export default createSearchResult;