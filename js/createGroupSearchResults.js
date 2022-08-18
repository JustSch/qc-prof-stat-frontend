import Link from 'next/link';
import createInstrURL from "./createInstrURL";
import createResURL from './createResURL';
const createSearchResult = (results) => {
    if (results) {

        return (
            <div className="resultList">
                {
                    

                    Object.keys(results).map((result, index) => (
                        <div className='mt-2' key={index}>
                            <p>{result}</p>

                            {
                                results[result].classes.map((classItem, index1) => (
                                    <div key={index1}>

                                        <Link href={createResURL(classItem)}>
                                            <a>
                                                {classItem.subject} {classItem.course_number} | Section {classItem.class_section} | Term {classItem.term}
                                            </a>
                                        </Link>

                                    </div>

                                ))

                            }

                        </div>

                    ))
                }

            </div>
        );
    }

}

export default createSearchResult;