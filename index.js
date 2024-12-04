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
  let totalExpenses = 0;

  for (const [yearMonth, days] of Object.entries(expenses)) {
    let firstSunday = null;

    for (let day = 1; day <= 7; day++) {
      const [year, month] = yearMonth.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      if (date.getDay() === 0) {
        firstSunday = day;
        break;
      }
    }

    if (firstSunday) {
      for (let day = 1; day <= firstSunday; day++) {
        const dayKey = String(day).padStart(2, "0");
        if (days[dayKey]) {
          const dailyExpenses = Object.values(days[dayKey]).flat();
          totalExpenses += dailyExpenses.reduce((sum, value) => sum + value, 0);
        }
      }
    }
  }

  return Number(totalExpenses.toFixed(2));
}

console.log(solution1(expenses));
