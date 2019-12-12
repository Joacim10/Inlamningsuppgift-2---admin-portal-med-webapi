

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
    document.getElementById(`total${id}`).getElementsByTagName("h2")[0].innerHTML = `${data[idSmall]}`;
    document.getElementById(`total${id}`).getElementsByTagName("p")[0].innerHTML = `+${data.growth}%`
  })
}




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