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
    const [barData, setBarData] = useState(dataItem([
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
    ], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    const [classDescr, setClassDescr] = useState('');
    const [doughnutData, setDoughnutData] = useState(dataItem(["Received Grade", "Withdrawals", "Incomplete"], [0, 0, 0]));
    const [dOptions, setDOptions] = useState(DoughnutOptions(''));
    let classParams = router.query;
    let instr = classParams["instructor"];

    const { data: result, error } = useClassResult(classParams);

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
            setBarData(dataItem([
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
            ], specArray));
            setClassDescr(result[indexValue].course_desc);
            let totalGraded = result[indexValue].total_enrollment - result[indexValue].Withdrawal - result[indexValue].inc_ng;
            setDOptions(DoughnutOptions(`Total Enrollment: ${result[indexValue].total_enrollment} Students`));
            setDoughnutData(doughnutDataItem(["Received Grade", "Withdrawals", "Incomplete"], [totalGraded, result[indexValue].Withdrawal, result[indexValue].inc_ng]));

        }

    }, [result])


    return (
        <>
            <Container>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {!error &&
                    <div>
                        <h4 className="text-center">{`${classParams["term"]}, `}
                            {instr}. ,
                            {` ${classParams["subject"]} ${classParams["course_number"]}-${classParams["class_section"]} ${classDescr}`}
                        </h4>
                        <Row className="align-items-center">
                            <Col>
                                <Bar data={barData} options={options} />
                            </Col>
                            <Col>
                                <Doughnut data={doughnutData} options={dOptions} />
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
        </>
    );
}


const dataItem = function (label, resultItem) {
    return {
        labels: label,
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

const doughnutDataItem = function (label, resultItem) {
    return {
        labels: label,
        datasets: [
            {
                label: "# of Individual Grades",
                data: resultItem,
                backgroundColor: [                   
                    "rgba(0,250,41,0.2)",
                    "rgba(250,0,3,0.2)",
                    "rgba(216,178,27,0.2)",
                ],
                borderColor: [
                    "rgba(0,250,41,1)",
                    "rgba(250,0,3,1)",  
                    "rgba(216,178,27,1)",
                ],
                borderWidth: 2

            }
        ]
    }
}
export const DoughnutOptions = function (title) {
    return {
        plugins: {
            legend: {
                onClick: null,
                labels: {
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                            text: `${chart.data.labels[i]}: ${data} Students`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                },
                position: 'bottom'
            },
            title: {
                display: true,
                text: title
            },
        }
    }
}


