export default function sortStat(stat) {
  stat.sort((a, b) => {
    let term0 = a.term.split(" ");
    let term1 = b.term.split(" ");

    if (term0[1] === term1[1]) {
      if (term0[0] === "Fall") {
        if (term0[0] === term1[0]) {
          return 0;
        } else {
          return -1;
        }
      }
      if (term0[0] === "Spring") {
        if (term0[0] === term1[0]) {
          return 0;
        } else {
          return 1;
        }
      }
    }
    return term1[1] - term0[1];
  });
  return stat;
}
