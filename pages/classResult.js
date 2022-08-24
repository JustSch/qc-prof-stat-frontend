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
    
    const [results,setResults] = useState(dataItem([0,0,0,0,0,0,0,0,0,0,0,0]));

    let classParams = router.query;
   
    
    const result = useClassResult(classParams);
    let indexValue = 0;
    if (result && result["message"]!=='Error retrieving [object Object].' && result["message"]!==' not found: [object Object].') {
        //console.log(url.href)
        console.log(result);
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

    }


    return (
        <>
            <Container>
                <Bar data={results} options={options} />
            </Container>

        </>

    );

}

export const dummyData = {
    dummyData: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
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


let data = {
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


