<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
  // Reminders
  const reminders = [
      "Inspect and service the fleet vehicles.",
      "Update the car rental pricing plans for the upcoming season.",
      "Review customer feedback and implement improvements."
  ];

  const reminderList = document.getElementById("reminder-list");

  reminders.forEach(reminder => {
      let reminderItem = document.createElement("div");
      reminderItem.classList.add("reminder-item");
      reminderItem.textContent = reminder;
      reminderList.appendChild(reminderItem);
  });

  // Scatter Chart
  const xValues = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const yValues = [5000, 10000, 9000, 15000, 22000, 20000, 27000, 29000];

  new Chart("scatter", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: yValues
          }]
      },
      options: {
          legend: { display: false },
          title: { display: true, text: "Bookings Overview 2025" },
          scales: { yAxes: [{ ticks: { min: 0, max: 30000 } }] }
      }
  });

  // Wave Chart
  const y = [3000, 11000, 9000, 20000, 36000, 30000, 20000, 36000];

  new Chart("wave", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              fill: false,
              pointRadius: 2,
              borderColor: "rgba(0,0,255,0.5)",
              data: y
          }]
      },    
      options: {
          legend: { display: false },
          title: { display: true, text: "Earnings Summary 2025", fontSize: 16 }
      }
  });

  // Donut Chart
  const a = ["Hired", "Pending", "Cancelled"];
  const b = [65, 20, 15];
  const barColors = ["#2b5797", "lightblue", "lightgrey"];

  new Chart("donut", {
      type: "doughnut",
      data: {
          labels: a,
          datasets: [{ backgroundColor: barColors, data: b }]
      },
      options: {
          title: { display: true, text: "Rent Status 2025" }
      }
  });
});
=======
document.addEventListener("DOMContentLoaded", function () {
  // Reminders
  const reminders = [
      "Inspect and service the fleet vehicles.",
      "Update the car rental pricing plans for the upcoming season.",
      "Review customer feedback and implement improvements."
  ];

  const reminderList = document.getElementById("reminder-list");

  reminders.forEach(reminder => {
      let reminderItem = document.createElement("div");
      reminderItem.classList.add("reminder-item");
      reminderItem.textContent = reminder;
      reminderList.appendChild(reminderItem);
  });

  // Scatter Chart
  const xValues = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const yValues = [5000, 10000, 9000, 15000, 22000, 20000, 27000, 29000];

  new Chart("scatter", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: yValues
          }]
      },
      options: {
          legend: { display: false },
          title: { display: true, text: "Bookings Overview 2025" },
          scales: { yAxes: [{ ticks: { min: 0, max: 30000 } }] }
      }
  });

  // Wave Chart
  const y = [3000, 11000, 9000, 20000, 36000, 30000, 20000, 36000];

  new Chart("wave", {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              fill: false,
              pointRadius: 2,
              borderColor: "rgba(0,0,255,0.5)",
              data: y
          }]
      },    
      options: {
          legend: { display: false },
          title: { display: true, text: "Earnings Summary 2025", fontSize: 16 }
      }
  });

  // Donut Chart
  const a = ["Hired", "Pending", "Cancelled"];
  const b = [65, 20, 15];
  const barColors = ["#2b5797", "lightblue", "lightgrey"];

  new Chart("donut", {
      type: "doughnut",
      data: {
          labels: a,
          datasets: [{ backgroundColor: barColors, data: b }]
      },
      options: {
          title: { display: true, text: "Rent Status 2025" }
      }
  });
});
>>>>>>> be7cf73cf80d9ca7f6f3ced5ac389b9e424b9ea2
