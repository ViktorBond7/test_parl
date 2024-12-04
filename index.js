`use strict`;
const expenses = {
  "2023-01": {
    "01": {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    "09": {
      food: [11.9],
      fuel: [190.22],
    },
  },
  "2023-03": {
    "07": {
      food: [20, 11.9, 30.2, 11.9],
    },
    "04": {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  "2023-04": {},
};

function solution1(expenses) {
  const result = {};

  for (const [yearMonth, days] of Object.entries(expenses)) {
    let firstSunday = null;

    for (let day = 1; day <= 7; day++) {
      const [year, month] = yearMonth.split("-").map(Number);
      const date = new Date(year, month - 1, day);

      if (date.getDay() === 0) {
        firstSunday = String(day).padStart(2, "0");

        break;
      }
    }

    if (firstSunday && days[firstSunday]) {
      const dailyExpenses = days[firstSunday];
      const totalExpenses = Object.values(dailyExpenses)
        .flat()
        .reduce((sum, value) => sum + value, 0);

      result[yearMonth] = totalExpenses;
    }
  }

  return result;
}

function solution2(expenses) {
  // Plusy: Szybsze przechodzenie przez miesiące przy dużej liczbie wejść.
  // Niedogodności: Nieco trudniejszy do wdrożenia.

  const result = {};

  for (const [yearMonth, days] of Object.entries(expenses)) {
    const sundayCandidates = [];

    for (const day of Object.keys(days)) {
      const [year, month] = yearMonth.split("-").map(Number);
      const date = new Date(year, month - 1, Number(day));

      if (date.getDay() === 0) {
        sundayCandidates.push(day);
      }
    }

    if (sundayCandidates.length > 0) {
      const firstSunday = sundayCandidates.reduce((min, d) =>
        d < min ? d : min
      );

      const dailyExpenses = days[firstSunday];
      const totalExpenses = Object.values(dailyExpenses)
        .flat()
        .reduce((sum, value) => sum + value, 0);

      result[yearMonth] = totalExpenses;
    }
  }

  return result;
}

console.log(solution1(expenses));
console.log(solution2(expenses));
