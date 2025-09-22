import Link from "next/link";

import createInstrURL from "../utils/createInstrURL";
import createResURL from "./createResURLOld";

export default function SearchResults(results) {
  if (results) {
    return (
      <div className="resultList">
        {results.map((result, index) => (
          <p key={index}>
            <Link href={createInstrURL(result.instructor)}>{result.instructor}</Link> |{" "}
            <Link href={createResURL(result)}>
              {result.subject} {result.course_number} | Section {result.class_section} | Term{" "}
              {result.term}
            </Link>
          </p>
        ))}
      </div>
    );
  }
}
