import useClassResult from "../js/useClassResult";
import { useRouter } from 'next/router';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Link from "next/link";
import createInstrURL from "../js/createInstrURL";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
export default function ClassResult() {
    let router = useRouter();
    const [barData, setBarData] = useState(dataItem([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    const [instrURL,setinstrURL] = useState('');
    const [classDescr,setClassDescr] = useState('');

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
            setBarData(dataItem(specArray));
            setinstrURL(createInstrURL(instr));
            setClassDescr(result[indexValue].course_desc);

        }

    }, [result,instr])


    return (
        <>
            <Container>
                <h4 className="text-center">{`${classParams["term"]} `},              
                <Link href={instrURL}>
                    <a>{instr}. ,</a>
                </Link>                
                    {` ${classParams["subject"]} ${classParams["course_number"]}-${classParams["class_section"]} ${classDescr}`}
                </h4>
                <Row className="align-items-center">
                    <Col>
                        <Bar data={barData} options={options} />
                    </Col>
                    <Col>
                        <Doughnut data={barData} options={DoughnutOptions}/>
                    </Col>
                </Row>
                
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

export const DoughnutOptions = {
    plugins: {
      legend: {
         onClick: null,
         labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]} ${data} Students`,
              fillStyle: datasets[0].backgroundColor[i],
            }))
          }
        },
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Total Enrollment'},
  }
  
  }


