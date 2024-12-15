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

// console.log(solution1(expenses));

const company = {
  name: "TechCorp",
  founded: 2005,
  employees: [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Software Engineer",
      skills: ["JavaScript", "React", "Node.js"],
      performance: {
        lastYear: "Excellent",
        currentYear: "Good",
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Product Manager",
      skills: ["Agile", "Scrum", "Leadership"],
      performance: {
        lastYear: "Good",
        currentYear: "Excellent",
      },
    },
  ],
  departments: {
    development: {
      teamName: "Dev Wizards",
      head: "Alice Johnson",
      projects: [
        {
          projectName: "AI Assistant",
          budget: 500000,
          status: "In Progress",
        },
        {
          projectName: "E-commerce Platform",
          budget: 750000,
          status: "Completed",
        },
      ],
    },
    marketing: {
      teamName: "Brand Boosters",
      head: "Charlie Davis",
      campaigns: [
        {
          campaignName: "Summer Sale",
          budget: 150000,
          results: "Successful",
        },
        {
          campaignName: "Social Media Expansion",
          budget: 100000,
          results: "Moderate Success",
        },
      ],
    },
  },
};
console.log("typeOf", typeof company);

const deepClone = (value) => {
  if (typeof value !== "object" || value === null) return value;

  if (Array.isArray(value)) return value.map(deepClone);

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)])
  );
};

// const spred = { ...company };

const copy = deepClone(company);
const newhh = structuredClone(company);

newhh.departments.development.head = "ggggg";

// console.log("copy", copy.departments.development.head);
// console.log("company", company.departments.development.head);
// console.log("newhh", newhh.departments.development.head);

const clearLogBtn = document.querySelector(".js-clear");
const logList = document.querySelector(".log-list");
let keypressCounter = 1;

document.addEventListener("keydown", logMessage);
// document.addEventListener("keyup", logMessage);
clearLogBtn.addEventListener("click", reset);

function logMessage({ type, key, code }) {
  const markup = `<div class="log-item">
    <span class="chip">${keypressCounter}</span>
    <ul>
      <li><b>Event</b>: ${type}</li>
      <li><b>Key</b>: ${key}</li>
      <li><b>Code</b>: ${code}</li>
    </ul>
  </div>`;

  logList.insertAdjacentHTML("afterbegin", markup);

  if (type === "keydown") {
    incrementKeypressCounter();
  }
}

function reset() {
  keypressCounter = 1;
  logList.innerHTML = "";
}

function incrementKeypressCounter() {
  keypressCounter += 1;
}
