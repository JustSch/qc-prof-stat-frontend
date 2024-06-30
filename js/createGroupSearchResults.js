import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import createResURL from './createResURL';
const createGroupSearchResult = (results) => {
    if (results) {
        return (
            <div className="resultList">
                {
                    Object.keys(results).map((result, index) => (
                        <Card className='mt-2 mb-2' key={index}>
                            <Card.Header> {result}</Card.Header>
                            <ListGroup variant="flush">
                                {
                                    results[result].classes.map((classItem, index1) => (
                                        <ListGroup.Item key={index1}>
                                            <Link href={createResURL(classItem, result)}>
                                                {classItem.subject} {classItem.course_number} | Section {classItem.class_section} | Term {classItem.term}
                                            </Link>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Card>
                    ))
                }
            </div>
        );
    }

}

export default createGroupSearchResult;