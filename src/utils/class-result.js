/**
 * Note: It is important that these letter grades are ordered in highest to lowest
 * The below keys represent the keys present in the API response for class result JSON
 * The values represent the human-readable labels for each grade category
 */
/** @type {TLetterGradeData} */
export const GRADE_VALUES_TO_LABELS_MAP = {
  A_plus: "A+",
  A: "A",
  A_minus: "A-",
  B_plus: "B+",
  B: "B",
  B_minus: "B-",
  C_plus: "C+",
  C: "C",
  P: "Pass",
  C_minus: "C-",
  D_plus: "D+",
  D: "D",
  F: "F",
};

export const SUMMARY_LABELS = ["Received Grade", "Withdrawals", "Incomplete"];

const GRADE_KEYS = Object.keys(GRADE_VALUES_TO_LABELS_MAP);
// lookup map of grade keys to their index positions
const GRADE_KEY_TO_INDEX_MAP = {};
for (const [index, gradeKey] of GRADE_KEYS.entries()) {
  GRADE_KEY_TO_INDEX_MAP[gradeKey] = index;
}

/** @type {ChartOptions<'bar'>} */
export const BAR_GRAPH_OPTIONS = {
  responsive: true, // chart adapts to container size changes
  maintainAspectRatio: false, // allows chart to use available height
  plugins: {
    legend: {
      onClick: undefined, // disables legend click interactions
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 45, // maximum degrees label will be rotated when attempting to justify narrower viewport
        minRotation: 0, // minimum label rotation angle (horizontal)
        font: {
          size: 11,
        },
        maxTicksLimit: 0, // removes limit on number of ticks shown
        autoSkip: false, // prevents automatic skipping of labels when viewport is narrow
      },
    },
    y: {
      beginAtZero: true, // forces y-axis to start from zero
      suggestedMax: 10, // suggested maximum value for y-axis
      ticks: {
        precision: 0, // prevents y-axis from representing decimal point numbers
      },
    },
  },
};

/**
 * Build a Chart.js bar chart data object for grade distribution.
 * @param {string[]} labels - Labels for the x-axis (grade categories)
 * @param {number[]} dataValues - Numeric values corresponding to each label
 * @returns {Object} - Chart.js bar data object
 */
export function createBarChartData(labels, dataValues) {
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Individual Grades",
        data: dataValues,
        backgroundColor: Array.from({ length: dataValues.length }).fill("rgba(22, 216, 237, 0.2)"),
        borderColor: Array.from({ length: dataValues.length }).fill("rgba(22, 216, 237, 1)"),
        borderWidth: 2,
      },
    ],
  };
}

/**
 * Build a Chart.js doughnut chart data object for summary categories.
 * @param {string[]} labels - Labels for the doughnut slices
 * @param {number[]} dataValues - Numeric values for each slice
 * @returns {Object} - Chart.js doughnut data object
 */
export function createDoughnutChartData(labels, dataValues) {
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Individual Grades",
        data: dataValues,
        backgroundColor: ["rgba(0,250,41,0.2)", "rgba(250,0,3,0.2)", "rgba(216,178,27,0.2)"],
        borderColor: ["rgba(0,250,41,1)", "rgba(250,0,3,1)", "rgba(216,178,27,1)"],
        borderWidth: 2,
      },
    ],
  };
}

/**
 * Generate options object for the Doughnut chart.
 * @param {string} title - The title text to display above the chart
 * @returns {ChartOptions<'doughnut'>} - Chart.js doughnut options object
 */
export function createDoughnutOptions(title) {
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
            }));
          },
        },
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
}

/**
 * Compute total passing grades based on threshold passing grade
 * @param {TClassResult} classResult - Class Result data from API
 * @param {TGradeKey} thresholdGradeKey - The lowest grade key that counts as passing (eg, "C", "C_minus", "D_plus", "D")
 * @returns {number} - Total number of passing grades at or above the threshold
 */
export function computeTotalPassingGrades(classResult, thresholdGradeKey) {
  const thresholdIndex = GRADE_KEY_TO_INDEX_MAP[thresholdGradeKey];
  if (thresholdIndex === undefined) {
    throw new Error(`Invalid threshold grade key: ${thresholdGradeKey}`);
  }

  // tally up th grades at or above the threshold (lower index = higher grade)
  let totalPassingGrades = 0;
  for (let i = 0; i <= thresholdIndex; i++) {
    const gradeKey = GRADE_KEYS[i];
    if (gradeKey in classResult) {
      totalPassingGrades += Number.parseInt(classResult[gradeKey] ?? "0");
    }
  }

  return totalPassingGrades;
}

/**
 * Compute summary statistics from grade data
 * @param {TClassResult} classResult - Class Result data from API
 * @returns {TSummaryStats} - Computed statistics
 */
export function computeSummaryStats(classResult) {
  const gradeLabels = Object.values(GRADE_VALUES_TO_LABELS_MAP);
  const gradeCounts = Object.keys(GRADE_VALUES_TO_LABELS_MAP).map((key) => classResult[key] ?? "0");

  const totalPassingGrades = computeTotalPassingGrades(classResult, "C");

  const totalGradedStudents =
    classResult.total_enrollment - Number.parseInt(classResult.Withdrawal) - classResult.inc_ng;

  return {
    gradeLabels, // ["A+", "A", "A-", ..., "F"]
    gradeCounts, // [12, 30, 25, ..., 3], gradeCounts[i] corresponds to gradeLabels[i]
    totalPassingGrades,
    totalGradedStudents, // number of students who received a letter grade (not W or INC)
  };
}

/**
 * Calculate pass rate as a decimal from grade data using a configurable threshold
 * @param {TClassResult} classResult - Class Result data from API
 * @param {TGradeKey} thresholdGradeKey - The lowest grade key that counts as passing
 * @returns {number | null} - Class passing rate as decimal (passing grades / total enrollment), or null if all grades are incomplete
 */
export function computePassingRate(classResult, thresholdGradeKey) {
  // If all students have incomplete grades, we can't determine a meaningful pass rate
  if (classResult.inc_ng >= classResult.total_enrollment) {
    return null;
  }

  const totalPassingGrades = computeTotalPassingGrades(classResult, thresholdGradeKey);
  return classResult.total_enrollment > 0 ? totalPassingGrades / classResult.total_enrollment : 0;
}
