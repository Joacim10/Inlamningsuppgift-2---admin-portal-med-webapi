

getFullName('Joacim', 'Hammarström')

function getFullName(firstName, lastName) {
    fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstName}&lastname=${lastName}`) 
    .then(res => res.text())
    .then(data => document.getElementById('userLogin').innerHTML = data)
    .then(data => document.getElementById('userWelcome').innerHTML = data)
}

getMessages()

function getMessages() {
    fetch('https://inlupp-fa.azurewebsites.net/api/messages') 
    .then(res => res.json())
    .then(messages => {
      for (message in messages) {
        document.getElementById('dropDownforMessages').insertAdjacentHTML("beforeend", `                  
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
            </a>`);
        }
  })}

getNotifications()

function getNotifications() {
    fetch('https://inlupp-fa.azurewebsites.net/api/notifications') 
    .then(res => res.json())
    .then(notifications => {
      for (n in notifications) {
        document.getElementById('dropDownforNotifications').insertAdjacentHTML("beforeend", `                  
        <a class="dropdown-item preview-item">
        <div class="preview-thumbnail">
          <div class="preview-icon bg-success">
            <i class="mdi mdi-information mx-0"></i>
          </div>
        </div>
        <div class="preview-item-content">
          <h6 class="preview-subject font-weight-normal">${notifications[n].title}</h6>
          <p class="font-weight-light small-text mb-0 text-muted">
          ${notifications[n].subtitle}
          </p>
        </div>
      </a>`);
        }
  })}


getTotal('Sales', 'https://inlupp-fa.azurewebsites.net/api/total-sales')
getTotal('Purchases', 'https://inlupp-fa.azurewebsites.net/api/total-purchases')
getTotal('Orders', 'https://inlupp-fa.azurewebsites.net/api/total-orders')
getTotal('Growth', 'https://inlupp-fa.azurewebsites.net/api/total-growth')

function getTotal(id, url) {
  fetch(url) 
  .then(res => res.json())
  .then(data => document.getElementById(`total${id}`).innerHTML = `${data.currency}${data.amount}`)
}




getTotalGraph('Projects', 'https://inlupp-fa.azurewebsites.net/api/total-projects')
getTotalGraph('Users', 'https://inlupp-fa.azurewebsites.net/api/total-users')


function getTotalGraph(id, url) {
  fetch(url) 
  .then(res => res.json())
  .then(data => {

    let idSmall = id.toLowerCase()

    document.getElementById(`total${id}`).getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(data[idSmall])}`;
    document.getElementById(`total${id}`).getElementsByTagName("p")[0].innerHTML = `+${data.growth}%`

    function getGraphData() {
      let labels = data.dataset.labels;
      for (x in labels) {
          areaData.labels.push(labels[x])
      }
      let values = data.dataset.data;
      for (x in values) {    
          areaData.datasets[0].data.push(values[x]) 
      }
    }

    if (id === 'Projects') {
      if ($(`#projects-chart`).length) {
        var areaData = {
          labels: [],
          datasets: [{
              data: [],
              backgroundColor: [
                '#e5f2ff'
              ],
              borderWidth: 2,
              borderColor: "#3da5f4",
              fill: 'origin',
              label: "purchases"
            }
          ]
        };

        getGraphData()

        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [{
              display: false,
              ticks: {
                display: true
              },
              gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
              }
            }],
            yAxes: [{
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
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          elements: {
            line: {
              tension: .05
            },
            point: {
              radius: 0
            }
          }
        }
        var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
        var salesChart = new Chart(salesChartCanvas, {
          type: 'line',
          data: areaData,
          options: areaOptions
        });
      }
    } 

    if (id === 'Users') {
      if ($("#users-chart").length) {
        var areaData = {
          labels: [],
          datasets: [{
              data: [],
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: "purchases"
            }
          ]
        };

        getGraphData()

        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            filler: {
              propagate: false
            }
          },
          scales: {
            xAxes: [{
              display: false,
              ticks: {
                display: true
              },
              gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
              }
            }],
            yAxes: [{
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
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          elements: {
            line: {
              tension: .35
            },
            point: {
              radius: 0
            }
          }
        }
        var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
        var salesChart = new Chart(salesChartCanvas, {
          type: 'line',
          data: areaData,
          options: areaOptions
        });
      }
    } 

  })
}

totalSalesGraph()

function totalSalesGraph() {
  fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart') 
  .then(res => res.json())
  .then(data => {

    
    a = data.revenue
    
    console.log(a)
    
    a = data.returns
    a = data.queries
    a = data.invoices
    
    a = data.labels
    a = data.datasets[0].data
    a = data.datasets[1].data


if ($("#total-sales-chart").length) {
  var areaData = {
    labels: ["Mon","","Tue","", "Wed","", "Thu","", "Fri","", "Sat"],
    datasets: [
      {
        data: [240000, 200000, 290000, 230000, 200000, 180000, 180000, 360000, 240000, 280000, 180000],
        backgroundColor: [
          'rgba(61, 165, 244, .0)'
        ],
        borderColor: [
          'rgb(61, 165, 244)'
        ],
        borderWidth: 2,
        fill: 'origin',
        label: "services"
      },
      {
        data: [160000, 120000, 175000, 290000, 380000, 210000, 320000, 150000, 310000, 180000, 160000],
        backgroundColor: [
          'rgba(241, 83, 110, .0)'
        ],
        borderColor: [
          'rgb(241, 83, 110)'
        ],
        borderWidth: 2,
        fill: 'origin',
        label: "services"
      }
    ]
  };
  var areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      filler: {
        propagate: false
      }
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          display: true,
          padding: 20,
          fontColor:"#000",
          fontSize: 14
        },
        gridLines: {
          display: false,
          drawBorder: false,
          color: 'transparent',
          zeroLineColor: '#eeeeee'
        }
      }],
      yAxes: [{
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
                { divider: 1e6, suffix: 'M' },
                { divider: 1e3, suffix: 'k' }
            ];
            function formatNumber(n) {
                for (var i = 0; i < ranges.length; i++) {
                  if (n >= ranges[i].divider) {
                      return (n / ranges[i].divider).toString() + ranges[i].suffix;
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
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    },
    elements: {
      line: {
        tension: .37
      },
      point: {
        radius: 0
      }
    }
  }
  var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
  var revenueChart = new Chart(revenueChartCanvas, {
    type: 'line',
    data: areaData,
    options: areaOptions
  });
}


  })
}




function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


downloads()

function downloads() {
  fetch('https://inlupp-fa.azurewebsites.net/api/downloads') 
  .then(res => res.json())
  .then(data => {

    let offlineAmount = data[0].offlineAmount
    let offlineCircleValue = data[0].circleValue
    let onlineAmount = data[1].onlineAmount
    let onlineCircleValue = data[1].circleValue

    document.getElementById(`downloadsOffline`).getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(offlineAmount)}`;
    document.getElementById(`downloadsOnline`).getElementsByTagName("h2")[0].innerHTML = `${numberWithCommas(onlineAmount)}`;

    if ($('#offlineProgress').length) {
      var bar = new ProgressBar.Circle(offlineProgress, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style : {
            color : "#fff",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#f1536e',
          width: 6
        },
        to: {
          color: '#f1536e',
          width: 6
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '1rem';

      bar.animate((offlineCircleValue)); // Number from 0.0 to 1.0


    }

    if ($('#onlineProgress').length) {
      var bar = new ProgressBar.Circle(onlineProgress, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style : {
            color : "#fff",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#fda006',
          width: 6
        },
        to: {
          color: '#fda006',
          width: 6
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '1rem';
      bar.animate(onlineCircleValue); // Number from 0.0 to 1.0
    }
})}






getDistribution()
function getDistribution(info) {
  fetch('https://inlupp-fa.azurewebsites.net/api/distribution') 
  .then(res => res.json())
  .then(i => {

    if ($("#distribution-chart").length) {
      
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
            data: [i.data[0], i.data[1], i.data[2]],
            backgroundColor: [
              "#3da5f4", "#f1536e", "#fda006"
            ],
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
            text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
            text.push(`<p>${i.cities[0]}</p>`);
            text.push('</div>');
            text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
            text.push(`<p>${i.cities[1]}</p>`);
            text.push('</div>');
            text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
            text.push(`<p>${i.cities[2]}</p>`);
            text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var distributionChartPlugins = {
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
      
          ctx.restore();
          var fontSize = .96;
          ctx.font = "600 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
      
          var text = `${i.procentage}%`,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
      
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
      var distributionChart = new Chart(distributionChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: distributionChartPlugins
      });
      document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
    }

  })}