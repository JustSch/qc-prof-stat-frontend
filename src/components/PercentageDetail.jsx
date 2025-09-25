/**
 * @param {Object} props
 * @param {number} props.decimal - Decimal value (e.g., 0.85 for 85%)
 * @param {string} props.type - The type/label to display after the percentage
 * @param {boolean} props.inverse - Whether to invert the color logic
 * @returns {JSX.Element}
 */
export function PercentageDetail({ decimal, type, inverse = false }) {
  let percentage = (decimal * 100).toFixed(2);

  // make into whole number
  if (percentage.endsWith(".00")) {
    percentage = percentage.slice(0, -3);
  }

  let colorClass;
  if (percentage < 50) {
    colorClass = inverse ? "text-success" : "text-danger";
  } else if (percentage < 75) {
    colorClass = "text-warning";
  } else {
    colorClass = inverse ? "text-danger" : "text-success";
  }

  return (
    <span className={colorClass}>
      {percentage}% {type}
    </span>
  );
}
