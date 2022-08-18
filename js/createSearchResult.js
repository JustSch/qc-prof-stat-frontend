import Link from 'next/link';
import createInstrURL from "./createInstrURL";
import createResURL from './createResURLOld';
const createSearchResult = (results) => {
    if (results) {
        return (
            <div className="resultList">
                {
                    results.map((result,index) => (
                        <p key={index}>
                            <Link href={createInstrURL(result.instructor)}>
                                <a>{result.instructor}</a>
                            </Link>
                            {' '}
                            |
                            {' '}
                            <Link href={createResURL(result)}>
                                <a>
                                    {result.subject} {result.course_number} | Section {result.class_section} | Term {result.term}
                                </a>
                            </Link>
                        </p>
                    ))}
            </div>
        );
    }

}

export default createSearchResult;