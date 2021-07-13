var numberSuffixK = function(value) {
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
  /*--X--- end of suffix 1000 = 1k ---X-- */

var ctx = document.getElementById('myChart').getContext('2d');
var background_1 = ctx.createLinearGradient(0, 10, 0, 600);
background_1.addColorStop(1, 'black');
background_1.addColorStop(0, 'lime');

var background_2 = ctx.createLinearGradient(0, 0, 0, 600);
background_2.addColorStop(0, 'green');
background_2.addColorStop(1, 'orange');

var background_3 = ctx.createLinearGradient(0, 0, 0, 600);
background_3.addColorStop(0, 'orange');
background_3.addColorStop(1, 'purple');

var background_4 = ctx.createLinearGradient(0, 0, 0, 600);
background_4.addColorStop(0, 'green');
background_4.addColorStop(1, 'violet');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['', '', '', '', '', ''],
        anjon:['skyblue', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [1200 , 1900, 3000, 5000, 200, 300],
            backgroundColor: [
                background_1,
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderRadius:5,
        }]
    },
    plugins:[ChartDataLabels],
    options: {
        layout:{
            padding:10,
        },
        plugins:{
            legend:{
               display:false 
            },
            datalabels:{
               color:'green',
                rotation:-90,
                align:'end',
                anchor:'start',
                padding: {top: 0, left: 10, right: 0, bottom: 0},
                formatter: function(value, context){
                    return context.chart.data.anjon[context.dataIndex];
                },
//                clip:true,
            }           
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Include a dollar sign in the ticks
                    stepSize:1000,
                    callback: numberSuffixK,
                },
                suggestedMin: 0,
                suggestedMax:4000,
            },
             x: {
                title: {
                  display: true,
                  text: 'Networks',
                  color: 'gray',
                  font: {
                    size: 15,
                    weight: 'normal',
                    lineHeight: 1,
                  },
                  padding: {top: -20, left: 0, right: 0, bottom: 0}
                }
            }
        }
    },
    
});
/*===================================*/
//var ctx = document.getElementById('myChart').getContext('2d');
//var myChart = new Chart(ctx, {
//    type: 'bar',
//    data: {
//        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//        
//        datasets: [{
//            label: '# of Votes',
//            data: [12, 19, 3, 5, 2, 3],
//            backgroundColor: [
//                'rgba(255, 99, 132, 0.2)',
//                'rgba(54, 162, 235, 0.2)',
//                'rgba(255, 206, 86, 0.2)',
//                'rgba(75, 192, 192, 0.2)',
//                'rgba(153, 102, 255, 0.2)',
//                'rgba(255, 159, 64, 0.2)'
//            ],
//            borderColor: [
//                'rgba(255, 99, 132, 1)',
//                'rgba(54, 162, 235, 1)',
//                'rgba(255, 206, 86, 1)',
//                'rgba(75, 192, 192, 1)',
//                'rgba(153, 102, 255, 1)',
//                'rgba(255, 159, 64, 1)'
//            ],
//            borderWidth: 1,
//        },
//        {
//            label: '# of Votes',
//            data: [12, 19, 3, 5, 2, 3],
//            backgroundColor: [
//                'rgba(255, 99, 132, 0.2)',
//                'rgba(54, 162, 235, 0.2)',
//                'rgba(255, 206, 86, 0.2)',
//                'rgba(75, 192, 192, 0.2)',
//                'rgba(153, 102, 255, 0.2)',
//                'rgba(255, 159, 64, 0.2)'
//            ],
//            borderColor: [
//                'rgba(255, 99, 132, 1)',
//                'rgba(54, 162, 235, 1)',
//                'rgba(255, 206, 86, 1)',
//                'rgba(75, 192, 192, 1)',
//                'rgba(153, 102, 255, 1)',
//                'rgba(255, 159, 64, 1)'
//            ],
//            borderWidth: 1,
//        }
//    ]
//    },
//    options: {
//        scales: {
//            y: {
//                beginAtZero: true
//            }
//        },
//        animation: {
//      onComplete: function() {
//        var chartInstance = this.chart;
//        var ctx = chartInstance.ctx;
//        console.log(chartInstance);
//        var height = chartInstance.controller.boxes[0].bottom;
//        ctx.textAlign = "center";
//        Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
//          var meta = chartInstance.controller.getDatasetMeta(i);
//          Chart.helpers.each(meta.data.forEach(function(bar, index) {
//            ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 1) - 0);
//          }), this)
//        }), this);
//      }
//    }
//    }
//});
/*===X=================X=============*/
//var ctx = document.getElementById("myChart");
//var myChart = new Chart(ctx, {
//  type: 'bar',
//  data: {
//    labels: ["Red", "Green"],
//    datasets: [{
//      label: '# of Votes',
//      data: [12, 23]
//    }]
//  },
//  options: {
//    scales: {
//      yAxes: [{
//        ticks: {
//          beginAtZero: true
//        }
//      }]
//    },
//    animation: {
//      onComplete: function() {
//        var chartInstance = this.chart;
//        var ctx = chartInstance.ctx;
//        console.log(chartInstance);
//        var height = chartInstance.controller.boxes[0].bottom;
//        ctx.textAlign = "center";
//        Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
//          var meta = chartInstance.controller.getDatasetMeta(i);
//          Chart.helpers.each(meta.data.forEach(function(bar, index) {
//            ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 2) - 10);
//          }), this)
//        }), this);
//      }
//    }
//  }
//});

//var data = {
//    labels: ["x1", "x2", "x3", "x4", "x5"],
//    datasets: [
//        {
//            label: "Actual",
//            backgroundColor: 'rgba(0, 0, 255, 0.5)',
//            borderWidth: 1,
//            data: [40, 150, 50, 60, 70],
//            xAxisID: "bar-x-axis1",
//            stack: true
//        },
//        {
//            label: "Target",
//            backgroundColor: 'rgba(0, 0, 0, 0.2)',
//            borderWidth: 1,
//            data: [100, 100, 100, 100, 100],
//            xAxisID: "bar-x-axis2"
//        }
//    ]
//};
//
//var options = {
//    scales: {
//        xAxes: [
//            {
////                id: "bar-x-axis2",
////                stacked: false,
////                display:false,
//                categoryPercentage: 0.5,
//                barPercentage: 0.5
//            },
//            {
////                display: false,
////                stacked: false,
////                id: "bar-x-axis1",
//                type: 'category',
//                categoryPercentage: 0.4,
//                barPercentage: 1,
//                gridLines: {
//                    offsetGridLines: true
//                }
//            }
//        ],
//
//        yAxes: [{
////            id: "bar-y-axis1",
////            stacked: false,
//            ticks: {
//                beginAtZero: true
//            }
//        }]
//
//    }
//};
//
//var ctx = document.getElementById("myChart").getContext("2d");
//var myBarChart = new Chart(ctx, {
//    type: 'bar',
//    data: data,
//    options: options
//});


//var data = {
//  labels: ["x1", "x2", "x3"],
//  datasets: [{
//    label: "First",
//    backgroundColor: 'rgba(255, 99, 132, 0.2)',
//    borderWidth: 1,
//    data: [10, 20, 30],
//    xAxisID: "bar-x-axis1",
//  }, {
//    label: "Second",
//    backgroundColor: 'rgba(255, 206, 86, 0)',
//    borderWidth: 0,
//    data: [5, 30, 35],
//    xAxisID: "bar-x-axis2",
//  }, {
//    label: "Second",
//    backgroundColor: 'rgba(255, 206, 86, 0.3)',
//    borderWidth: 1,
//    data: [5, 30, 35],
//    xAxisID: "bar-x-axis2",
//  }]
//};
//
//var options = {
//  scales: {
//    xAxes: [{
//      stacked: true,
//      id: "bar-x-axis1",
//      barThickness: 30,
//    }, {
//      display: false,
//      stacked: true,
//      id: "bar-x-axis2",
//      barThickness: 70,
//      // these are needed because the bar controller defaults set only the first x axis properties
//      type: 'category',
//      categoryPercentage: 0.8,
//      barPercentage: 0.9,
//      gridLines: {
//        offsetGridLines: true
//      },
//      offset: true
//    }],
//    yAxes: [{
//      stacked: false,
//      ticks: {
//        beginAtZero: true
//      },
//    }]
//
//  }
//};
//
//var ctx = document.getElementById("myChart").getContext("2d");
//var myBarChart = new Chart(ctx, {
//  type: 'bar',
//  data: data,
//  options: options
//});

