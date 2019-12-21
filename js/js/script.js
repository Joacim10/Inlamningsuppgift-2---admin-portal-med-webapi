getFullName("Joacim", "Hammarström");

function getFullName(firstName, lastName) {
  fetch(
    `https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstName}&lastname=${lastName}`
  )
    .then(res => res.text())
    .then(data => (document.getElementById("userLogin").innerHTML = data))
    .then(data => (document.getElementById("userWelcome").innerHTML = data));
}

getMessages();

function getMessages() {
  fetch("https://inlupp-fa.azurewebsites.net/api/messages")
    .then(res => res.json())
    .then(messages => {
      for (message in messages) {
        document.getElementById("dropDownforMessages").insertAdjacentHTML(
          "beforeend",
          `                  
            <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
                <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
            </div>
            <div class="preview-item-content flex-grow">
              <h6 class="preview-subject ellipsis font-weight-normal">${messages[message].from}
              </h6>
              <p class="font-weight-light small-text text-muted mb-0">
                ${messages[message].title}
              </p>
            </div>
            </a>`
        );
      }
    });
}

getNotifications();

function getNotifications() {
  fetch("https://inlupp-fa.azurewebsites.net/api/notifications")
    .then(res => res.json())
    .then(notifications => {
      for (n in notifications) {

        switch (notifications[n].subtitle) {
          case 'Just now': 
          {color = 'success'
          symbol = 'information'
          }
            break
          case 'Private message': 
          {color = 'warning'
          symbol = 'settings'
          }
            break
          case '2 days ago': 
          {color = 'info'
          symbol = 'account-box'
          } 
            break
        }


        document.getElementById("dropDownforNotifications").insertAdjacentHTML(
          "beforeend",
          `                  
        <a class="dropdown-item preview-item">
        <div class="preview-thumbnail">
          <div class="preview-icon bg-${color}">
            <i class="mdi mdi-${symbol} mx-0"></i>
          </div>
        </div>
        <div class="preview-item-content">
          <h6 class="preview-subject font-weight-normal">${notifications[n].title}</h6>
          <p class="font-weight-light small-text mb-0 text-muted">
          ${notifications[n].subtitle}
          </p>
        </div>
      </a>`
       );
      }
    });
}


getTotal("Sales", "https://inlupp-fa.azurewebsites.net/api/total-sales");
getTotal("Purchases", "https://inlupp-fa.azurewebsites.net/api/total-purchases");
getTotal("Orders", "https://inlupp-fa.azurewebsites.net/api/total-orders");
getTotal("Growth", "https://inlupp-fa.azurewebsites.net/api/total-growth");

function getTotal(id, url) {
  fetch(url)
    .then(res => res.json())
    .then(
      data =>
        (document.getElementById(
          `total${id}`
        ).innerHTML = `${data.currency}${data.amount}`)
    );
}


getTotalGraph("Projects", "https://inlupp-fa.azurewebsites.net/api/total-projects");
getTotalGraph("Users", "https://inlupp-fa.azurewebsites.net/api/total-users");

function getTotalGraph(id, url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let idSmall = id.toLowerCase();

      document
        .getElementById(`total${id}`)
        .getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(
        data[idSmall]
      )}`;
      document
        .getElementById(`total${id}`)
        .getElementsByTagName("p")[0].innerHTML = `+${data.growth}%`;

      function getGraphData() {
        let labels = data.dataset.labels;
        for (x in labels) {
          areaData.labels.push(labels[x]);
        }
        let values = data.dataset.data;
        for (x in values) {
          areaData.datasets[0].data.push(values[x]);
        }
      }

      if (id === "Projects") {
        if ($(`#projects-chart`).length) {
          var areaData = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: ["#e5f2ff"],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: "origin",
                label: "purchases"
              }
            ]
          };

          getGraphData();

          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: "transparent",
                    zeroLineColor: "#eeeeee"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: 0.05
              },
              point: {
                radius: 0
              }
            }
          };
          var salesChartCanvas = $("#projects-chart")
            .get(0)
            .getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: "line",
            data: areaData,
            options: areaOptions
          });
        }
      }

      if (id === "Users") {
        if ($("#users-chart").length) {
          var areaData = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: ["#e0fff4"],
                borderWidth: 2,
                borderColor: "#00c689",
                fill: "origin",
                label: "purchases"
              }
            ]
          };

          getGraphData();

          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: "transparent",
                    zeroLineColor: "#eeeeee"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: 0.35
              },
              point: {
                radius: 0
              }
            }
          };
          var salesChartCanvas = $("#users-chart")
            .get(0)
            .getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: "line",
            data: areaData,
            options: areaOptions
          });
        }
      }
    });
}

totalSalesGraph();

function totalSalesGraph() {
  fetch("https://inlupp-fa.azurewebsites.net/api/total-sales-chart")
    .then(res => res.json())
    .then(data => {
      document.getElementById("revenueValue").innerHTML = `${numberWithCommas(data.revenue)}`;
      document.getElementById("returnsValue").innerHTML = `${numberWithCommas(data.returns)}`;
      document.getElementById("queriesValue").innerHTML = `${numberWithCommas(data.queries)}`;
      document.getElementById("invoicesValue").innerHTML = `${numberWithCommas(data.invoices)}`;

      function getGraphData() {
        let labels = data.labels;
        for (x in labels) {
          areaData.labels.push(labels[x]);
        }

        let values = data.datasets[0].data;
        for (x in values) {
          areaData.datasets[0].data.push(values[x]);
        }

        let values2 = data.datasets[1].data;
        for (x in values2) {
          areaData.datasets[1].data.push(values2[x]);
        }
      }

      if ($("#total-sales-chart").length) {
        var areaData = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: ["rgba(61, 165, 244, .0)"],
              borderColor: ["rgb(61, 165, 244)"],
              borderWidth: 2,
              fill: "origin",
              label: "services"
            },
            {
              data: [],
              backgroundColor: ["rgba(241, 83, 110, .0)"],
              borderColor: ["rgb(241, 83, 110)"],
              borderWidth: 2,
              fill: "origin",
              label: "services"
            }
          ]
        };

        getGraphData();

        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor: "#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: "transparent",
                  zeroLineColor: "#eeeeee"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function(value) {
                    var ranges = [
                      { divider: 1e6, suffix: "M" },
                      { divider: 1e3, suffix: "k" }
                    ];
                    function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (
                            (n / ranges[i].divider).toString() +
                            ranges[i].suffix
                          );
                        }
                      }
                      return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          elements: {
            line: {
              tension: 0.37
            },
            point: {
              radius: 0
            }
          }
        };
        var revenueChartCanvas = $("#total-sales-chart")
          .get(0)
          .getContext("2d");
        var revenueChart = new Chart(revenueChartCanvas, {
          type: "line",
          data: areaData,
          options: areaOptions
        });
      }
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

downloads();

function downloads() {
  fetch("https://inlupp-fa.azurewebsites.net/api/downloads")
    .then(res => res.json())
    .then(data => {
      let offlineAmount = data[0].offlineAmount;
      let offlineCircleValue = data[0].circleValue;
      let onlineAmount = data[1].onlineAmount;
      let onlineCircleValue = data[1].circleValue;

      document.getElementById(`downloadsOffline`).getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(offlineAmount)}`;
      document.getElementById(`downloadsOnline`).getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(onlineAmount)}`;

      if ($("#offlineProgress").length) {
        var bar = new ProgressBar.Circle(offlineProgress, {
          color: "#000",
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 6,
          trailWidth: 6,
          easing: "easeInOut",
          duration: 1400,
          text: {
            autoStyleContainer: true,
            style: {
              color: "#fff",
              position: "absolute",
              left: "40%",
              top: "50%"
            }
          },
          svgStyle: {
            width: "90%"
          },
          from: {
            color: "#f1536e",
            width: 6
          },
          to: {
            color: "#f1536e",
            width: 6
          },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText("");
            } else {
              circle.setText(value);
            }
          }
        });

        bar.text.style.fontSize = "1rem";

        bar.animate(offlineCircleValue); // Number from 0.0 to 1.0
      }

      if ($("#onlineProgress").length) {
        var bar = new ProgressBar.Circle(onlineProgress, {
          color: "#000",
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 6,
          trailWidth: 6,
          easing: "easeInOut",
          duration: 1400,
          text: {
            autoStyleContainer: true,
            style: {
              color: "#fff",
              position: "absolute",
              left: "40%",
              top: "50%"
            }
          },
          svgStyle: {
            width: "90%"
          },
          from: {
            color: "#fda006",
            width: 6
          },
          to: {
            color: "#fda006",
            width: 6
          },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText("");
            } else {
              circle.setText(value);
            }
          }
        });

        bar.text.style.fontSize = "1rem";
        bar.animate(onlineCircleValue); // Number from 0.0 to 1.0
      }
    });
}

getDistribution();
function getDistribution(info) {
  fetch("https://inlupp-fa.azurewebsites.net/api/distribution")
    .then(res => res.json())
    .then(i => {
      if ($("#distribution-chart").length) {
        var areaData = {
          labels: ["Jan", "Feb", "Mar"],
          datasets: [
            {
              data: [i.data[0], i.data[1], i.data[2]],
              backgroundColor: ["#3da5f4", "#f1536e", "#fda006"],
              borderColor: "rgba(0,0,0,0)"
            }
          ]
        };
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          segmentShowStroke: false,
          cutoutPercentage: 72,
          elements: {
            arc: {
              borderWidth: 4
            }
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          legendCallback: function(chart) {
            var text = [];
            text.push('<div class="distribution-chart">');
            text.push(
              '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                chart.data.datasets[0].backgroundColor[0] +
                '"></div>'
            );
            text.push(`<p>${i.cities[0]}</p>`);
            text.push("</div>");
            text.push(
              '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                chart.data.datasets[0].backgroundColor[1] +
                '"></div>'
            );
            text.push(`<p>${i.cities[1]}</p>`);
            text.push("</div>");
            text.push(
              '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                chart.data.datasets[0].backgroundColor[2] +
                '"></div>'
            );
            text.push(`<p>${i.cities[2]}</p>`);
            text.push("</div>");
            text.push("</div>");
            return text.join("");
          }
        };
        var distributionChartPlugins = {
          beforeDraw: function(chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = 0.96;
            ctx.font = "600 " + fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";

            var text = `${i.procentage}%`,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        };
        var distributionChartCanvas = $("#distribution-chart")
          .get(0)
          .getContext("2d");
        var distributionChart = new Chart(distributionChartCanvas, {
          type: "doughnut",
          data: areaData,
          options: areaOptions,
          plugins: distributionChartPlugins
        });
        document.getElementById(
          "distribution-legend"
        ).innerHTML = distributionChart.generateLegend();
      }
    });
}

getOpenInvoices();

function getOpenInvoices() {
  fetch("https://inlupp-fa.azurewebsites.net/api/open-invoices")
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("tableBodyInvoices");

      generateTable(table, data);

      function generateTable(table, data) {
        for (let element of data) {
          let row = table.insertRow();
          var preSymbol = ''
          var columnCount = 0;

          for (key in element) {

            let text = document.createTextNode(element[key]);
            var cell

            switch (element[key]) {
              case "€":
                preSymbol = '€'
                break;
              case "$":
                preSymbol = '$'
                break;
              case "Closed":
                cell = row.insertCell();
                text = document.createTextNode(element[key]);
                cell.appendChild(text);                 
                break;
              case "Progress":
                preSymbol = ''
                cell = row.insertCell();
                div = document.createElement("div");
                div.className = "badge badge-success badge-fw";
                div.appendChild(text);
                cell.appendChild(div);
                break;
              case "Open":
                preSymbol = ''
                cell = row.insertCell();
                div = document.createElement("div");
                div.className = "badge badge-warning badge-fw";
                div.appendChild(text);
                cell.appendChild(div);
                break;
              case "On hold":
                preSymbol = ''
                cell = row.insertCell();
                div = document.createElement("div");
                div.className = "badge badge-danger badge-fw";
                div.appendChild(text);
                cell.appendChild(div);
                break;
              default:
                cell = row.insertCell();
                text = document.createTextNode(preSymbol+element[key]);
                cell.appendChild(text);

                if (columnCount === 4) {
                  cell.className = 'font-weight-bold';
                }
            }
            columnCount++
          }
        }
      }
    });
}

getSalesReport();

function getSalesReport() {
  fetch("https://inlupp-fa.azurewebsites.net/api/sales-report")
    .then(res => res.json())
    .then(data => {
      document.getElementById("salesReportDownloads").innerText = numberWithCommas(data.downloads);
      document.getElementById("salesReportPurchases").innerText = numberWithCommas(data.purchases);
      document.getElementById("salesReportUsers").innerText = data.users;
      document.getElementById("salesReportGrowth").innerText = data.growth;

      if ($("#sale-report-chart").length) {
        var CurrentChartCanvas = $("#sale-report-chart")
          .get(0)
          .getContext("2d");
        var CurrentChart = new Chart(CurrentChartCanvas, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Europe",
                data: data.datasets[0].data,
                backgroundColor: ["#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4"]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function(value) {
                      var ranges = [
                        { divider: 1e6, suffix: "M" },
                        { divider: 1e3, suffix: "k" }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (
                              (n / ranges[i].divider).toString() +
                              ranges[i].suffix
                            );
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }
              ],
              xAxes: [
                {
                  stacked: false,
                  categoryPercentage: 0.6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: 0.7
                }
              ]
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          }
        });
      }
    });
}

document.getElementById('dropdown2017').addEventListener("click", function(event){
  event.preventDefault()
  document.getElementById('buttonYear').innerText = '2017';
  getTickets(0)
}) 
document.getElementById('dropdown2018').addEventListener("click", function(event){
  event.preventDefault()
  document.getElementById('buttonYear').innerText = '2018';
  getTickets(1)
}) 
document.getElementById('dropdown2019').addEventListener("click", function(event){
  event.preventDefault()
  document.getElementById('buttonYear').innerText = '2019';
  getTickets(2)
}) 


getTickets(1);

function getTickets(year) {
  fetch("https://inlupp-fa.azurewebsites.net/api/tickets")
    .then(res => res.json())
    .then(data => {
      let table = document.getElementById("tableBodyTickets");

      generateTableRow(table, data[year].tickets);

      function generateTableRow(table, data) {

        table.innerHTML = ''

        for (x of data) {

          res = x.name.split(" ", 2);
          date = x.date.split(",", 2)

          switch (x.other) {
            case 'End session': color = 'danger'
              break
            case 'Start session': color = 'info'
              break
            case 'View on map': color = 'primary'
              break
            case 'On Way': color = 'warning'
              break
          }

          table.insertAdjacentHTML(
            "beforeend",

            `<tr>
        <td class="pl-0">
          <div class="icon-rounded-${color} icon-rounded-md">
            <h4 class="font-weight-medium">${res[0].charAt(0)}${res[1].charAt(0)}</h4>
          </div>
        </td>
      
        <td>
          <p class="mb-0">${x.name}</p>
          <p class="text-muted mb-0">${x.city}</p>
        </td>
      
        <td>
          <p class="mb-0">${date[0]}</p>
          <p class="text-muted mb-0">${date[1]}</p>
        </td>
      
        <td>
          <p class="mb-0">${x.project}</p>
          <p class="text-muted mb-0">${x.other}</p>
        </td>
      
        <td class="pr-0">
          <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
        </td>
      
      </tr>`
          );
        }
      }
    });
}

getUpdates();

function getUpdates() {
  fetch("https://inlupp-fa.azurewebsites.net/api/updates")
    .then(res => res.json())
    .then(updates => {
      for (x in updates) {

        time = updates[x].time
        title = updates[x].title
        message = updates[x].message

        document.getElementById("cardUpdates").insertAdjacentHTML(
          "beforeend",
          `                  
          <li>
          <h6> ${title}</h6>
          <p class="mt-2"> ${message}</p>
          <p class="text-muted mb-4">
            <i class="mdi mdi-clock-outline"></i>
            ${time}
          </p>
        </li>
      `
        );
      }
    });
}