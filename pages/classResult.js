import useClassResult from "../js/useClassResult";
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import createInstrURL from "../js/createInstrURL";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function ClassResult() {
    let router = useRouter();
    const [results, setResults] = useState(dataItem([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    const [instrURL,setinstrURL] = useState('');

    let classParams = router.query;
    let instr = classParams["instructor"];

    const result = useClassResult(classParams);

    useEffect(() => {
        let indexValue = 0;
        if (result && result["message"] !== 'Error retrieving [object Object].' && result["message"] !== ' not found: [object Object].') {       
            let specArray = [
                result[indexValue].A_plus,
                result[indexValue].A,
                result[indexValue].A_minus,
                result[indexValue].B_plus,
                result[indexValue].B,
                result[indexValue].B_minus,
                result[indexValue].C_plus,
                result[indexValue].C,
                result[indexValue].P,
                result[indexValue].C_minus,
                result[indexValue].D,
                result[indexValue].F
            ];
            setResults(dataItem(specArray));
            setinstrURL(createInstrURL(instr));

        }

    }, [result,instr])


    return (
        <>
            <Container>               
                <Link href={instrURL}>
                    <a> <h2>{instr} </h2></a>
                </Link>
                <Bar data={results} options={options} />
                {/*Donut chart for data that was in table */}
            </Container>
        </>
    );
}


const dataItem = function (resultItem) {
    return {
        labels: [
            "A+",
            "A",
            "A-",
            "B+",
            "B",
            "B-",
            "C+",
            "C",
            "Pass",
            "C-",
            "D",
            "F"
        ],
        datasets: [
            {
                label: "# of Individual Grades",
                data: resultItem,
                backgroundColor: [
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)",
                    "rgba(22, 216, 237, 0.2)"
                ],
                borderColor: [
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)",
                    "rgba(22, 216, 237, 1)"
                ],
                borderWidth: 2

            }
        ]
    }
}

const options = {
    elements: {
        line: {
            tension: 0.2
        }
    },
    plugins: {
        legend: {
            onClick: null
        }
    },
}




