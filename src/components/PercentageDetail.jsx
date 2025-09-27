/**
 * @param {Object} props
 * @param {number | null} props.decimal - Decimal value (e.g., 0.85 for 85%) or null if data unavailable
 * @param {string} props.type - The type/label to display after the percentage
 * @param {boolean} [props.inverse = false] - Whether to invert the color logic
 */
export function PercentageDetail({ decimal, type, inverse = false }) {
  if (decimal === null) {
    return <span className="text-muted">Indeterminate {type}</span>;
  }

  const percentage = decimal * 100;

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
      {/* show percentage as whole number if possible, otherwise show 2 decimal places */}
      {percentage % 1 === 0 ? percentage : percentage.toFixed(2)}% {type}
    </span>
  );
}
