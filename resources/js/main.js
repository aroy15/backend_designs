$(document).ready(function(){
  // Sidebar show hide
  $("#menuBar").click(function(){
    $(this).toggleClass('active');
     $("#sidebarNav").toggleClass("nav-active");
     $("#mainItem").toggleClass("main_item-active");
   });
  // Logout Icons looping animation
  $('.logout-icon').click(function(){
    $('.lgt_icons').attr('src','./resources/img/icons/loop.png');
    $('.lgt_icons').addClass('looping');  
    setTimeout(function(){ 
      $('.lgt_icons').attr('src','./resources/img/icons/logout.png');
      $('.lgt_icons').removeClass('looping');   
    }, 2000);
  });
  
  /* nice-select plugin activation */
  if($('body').find('select').length){
    $('select').niceSelect();
  }
  /*--x--/nice-select plugin activation--x---- */
  /*===== bootstrap modal common script===== */
  $('button.delete').on('click', function (e) {
    e.preventDefault();
    var id = $(this).closest('tr').data('id');
    $('.modalContainer').data('id', id).modal('show');
  });
    /* yes button click function */
    $('.deleteYesBtn').click(function () {
      var id = $(this).parents('.modalContainer').data('id');
      $('[data-id=' + id + ']').remove();
      $(this).parents('.modalContainer').modal('hide');
    });
  /*===X== bootstrap modal common script==X===*/

  /*===Request a Feature | modal included====== */
  if($('body').find('select#sort_requestFeature').length){
    $( "select#sort_requestFeature" )
    .change(function() {
      // Monthly
      $( "select option:selected" ).each(function() {
        $('#sort_requestFeature + .nice-select .current').prepend('<span class="active_text">Sorted by category "</span>');
        $('#sort_requestFeature + .nice-select .current').append('<span class="active_qoute">"</span>');
      });
    }).trigger( "change" );

    $('#sort_requestFeature + .nice-select .current').prepend('<span class="active_text">Sorted by category "</span>');
    $('#sort_requestFeature + .nice-select .current').append('<span class="active_qoute">"</span>');
  }
  /*==X===Request a Feature ===X=== */

  /*=========Live Console============= */
// if($('body').find('#consoleText').length){
//  $('#consoleText').perfectScrollbar();
// }

  /*=====X====Live Console=======X====== */
  // preloader jquery plugin active
  if($('body').find('.preloader-js').length){
    $('.preloader-js').preloadinator({
      minTime: 600
    });
    setTimeout(function(){ $('.preloader-js').addClass('d-none'); }, 700);
  }

  /* Added .dahsboard class on dashboard page main element*/
  if( $('body').find('#deshboardItem').length){
    $('#mainItem').addClass('dashboard');
  }
  
});

/*======= Fullscreen icon function =======*/
$(function() {    
  // $(".fullscreen-supported").toggle($(document).fullScreen() != null);
  // $(".fullscreen-not-supported").toggle($(document).fullScreen() == null);  
  $(document).bind("fullscreenchange", function(e) {
     $(".full-screen-wrap .top-left").toggleClass('animMoveRight');
     $(".full-screen-wrap .top-left-horiz").toggleClass('animMoveDown');
     $(".full-screen-wrap .top-right").toggleClass('animMoveLeft');
     $(".full-screen-wrap .top-right-horiz").toggleClass('animMoveDown');
     $(".full-screen-wrap .bottom-left").toggleClass('animMoveRight');
     $(".full-screen-wrap .bottom-left-horiz").toggleClass('animMoveUp');
     $(".full-screen-wrap .bottom-right").toggleClass('animMoveLeft');
     $(".full-screen-wrap .bottom-right-horiz").toggleClass('animMoveUp');
     //text($(document).fullScreen() ? "Full screen enabled" : "Full screen disabled");
  });  
  $(document).bind("fullscreenerror", function(e) {
     console.log("Full screen error.");
    //  $("#status").text("Browser won't enter full screen mode for some reason.");
  });  
 
});
/*===X=== End of Fullscreen icon function ====X==*/


/**********************************************************/
/*=========== Chart JS activation started (chart.js)===========*/
/**********************************************************/

/*===== Suffix add on chart like: 1,000=1k 10,000,000=1M ======*/
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
/*=====X===== end of suffix 1000 = 1k =====X======*/
   
/*===============*Ref = #createLegend | Helping to HTML Legend Plugin ================== */
const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};
/*========X=======*Ref = #createLegend | Helping to HTML Legend Plugin ==========X======== */

/*===============*Ref = #anjon#01 | HTML Legend Plugin ================== */
/* Connected with Ref = #createLegend */
const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);
    ul.classList.add('pieLegend');
    // // Remove old legend items
    // while (ul.firstChild) {
    //   ul.firstChild.remove();
    // }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(item => {
      const li = document.createElement('li');     
      li.classList.add('listBlock');

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.classList.add('rec_Lgnd');
      // boxSpan.style.borderWidth = item.lineWidth + 'px';
      // boxSpan.style.display = 'inline-block';
      // boxSpan.style.height = '20px';
      // boxSpan.style.marginRight = '10px';
      // boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      const chartData = document.createElement('span');
      chartData.classList.add("chart-data");

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      textContainer.appendChild(chartData);
      ul.appendChild(li);
    });
  }
};
/*========X=======*Ref = #anjon#01 | HTML Legend Plugin ========X========== */

/*===============*Ref = #ageGroup | Age Group Target Bar chart =============== */
if( $('body').find('#ageTarget_chart').length) {
  var age_barChart = document.getElementById('ageTarget_chart').getContext('2d');
  var background_1 = age_barChart.createLinearGradient(0, 0, 0, 300);
  background_1.addColorStop(0.3, '#42ADE2');
  background_1.addColorStop(1, '#177BBD');

  var ageGroupData = {
    labels:['0-10', '10-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '>65'],
    datasets: [{
        label: 'number of user',
        data: [500 , 2200, 2600, 2800, 4300, 4300, 3100, 2900,1000,3900,1500,700],
        backgroundColor: background_1,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius:2,
    }]
  }

  var ageTarget_chart = new Chart(age_barChart, {
      type: 'bar',
      data: ageGroupData,
      options: {
        maintainAspectRatio:false,
          layout:{
              padding:10,
          },
          plugins:{
              legend:{
                display:false,              
              }
          },       
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize:1000,
                      callback: numberSuffixK,
                  },
                  suggestedMin: 0,
                  suggestedMax:4000,
                  grid: {
                    display: false
                  }
              },
              x: {
                  title: {
                    display: false,
                  },               
                  grid: {
                    display: false
                  },
                  ticks:{
                    font:{
                      size:9.3
                    }  
                  }            
              }
          },
          maxBarThickness: 25,
          minBarLength: 2,
      },    
  });
}
/*======X======*Ref = #ageGroup | Age Group Target bar chart ====X======*/

/*===============*Ref = #anjon#02 | Subscription Cancelled Pie Chart ================== */
/* Connnected with Ref = #anjon#01 and #ChartLiDelete */
if( $('body').find('#chart_SubCancel').length) {
  var sub_cancel_data = {
    labels:['too few option','other tool found','too complicated Operation','no longer need','too expensive','other'],
    datasets: [{
        label: 'subscription cancel',
        data: [15,10,12,13,20,30],
        backgroundColor: ['#2AB8FF','#009EEC','#008ACF','#0B71B4','#115A8A','#60C4F6'],
        borderColor: 'transparent',
        borderWidth: 0,
    }]
  }
  var sub_cancel = document.getElementById('chart_SubCancel').getContext('2d');
  var chart_SubCancel = new Chart(sub_cancel, {
    type: 'pie',
    data: sub_cancel_data,  
    plugins: [htmlLegendPlugin, ChartDataLabels],
    options: {
      maintainAspectRatio:false, 
      rotation:-15,
      plugins: {
        htmlLegend: {
          // ID of the container to put the legend in
          containerID: 'chart_SC_legend',
        },
        legend: {
          display: false,
        },
        datalabels:{
          color:'#ffffff',
          align:'center',
          anchor:'center',
          padding: {top: 0, left: 10, right: 0, bottom: 0},
          font:{
            size:17
          },
          formatter: function(value, context){
            return context.chart.data.datasets[0].data[context.dataIndex] + "%";
          }
        }
      }
    }
  });
  const get_SC_data = chart_SubCancel.data.datasets[0].data;
  const chart_SC_legend = $('.chart_SC_legend .chart-data');
  chart_SC_legend.each((index,element)=>{  
    element.innerHTML = " (" + get_SC_data[index] + "%)";
   });
}
 /*========X=======*Ref = #anjon#02 | Subscription Cancelled Pie Chart ==========X======== */


/*=============*Ref = #anjon#03 | Distributation Network Bar Chart ============ */
if( $('body').find('#dist_net_chart').length){
  var distNetChart = document.getElementById('dist_net_chart').getContext('2d');

  /* Instagram Gradient Color */
  var dist_bg_instagram = distNetChart.createLinearGradient(0, 100, 0, 250);
  dist_bg_instagram.addColorStop(0.0865, '#4C5FD7');
  dist_bg_instagram.addColorStop(0.2841, '#7232BD');
  dist_bg_instagram.addColorStop(0.4926, '#C32AA3');
  dist_bg_instagram.addColorStop(0.7693, '#F46F30');
  dist_bg_instagram.addColorStop(1, '#FFDC7D');
  
  /* Google Mybusiness Gradient color */
  var dist_bg_google = distNetChart.createLinearGradient(0, 100, 0, 250);
  dist_bg_google.addColorStop(0, '#4285F4');
  dist_bg_google.addColorStop(0.1562, '#4683EF');
  dist_bg_google.addColorStop(0.2188, '#D7463C');
  dist_bg_google.addColorStop(0.3594, '#DB4437');
  dist_bg_google.addColorStop(0.5052, '#DC4935');
  dist_bg_google.addColorStop(0.5885, '#F3AF02');
  dist_bg_google.addColorStop(0.724, '#F4B400');
  dist_bg_google.addColorStop(0.8281, '#F4B400');
  dist_bg_google.addColorStop(0.9427, '#47A343');
  dist_bg_google.addColorStop(1, '#0F9D58');
  
  
  var distNetChartData = {
    labels:['Twitter', 'Pinterest', 'Facebook', 'Instagram', 'LinkedIn', 'Whatsapp', 'Google Mybusiness', 'Youtube', 'Telegram'],
    datasets: [{
        label: 'Network',
        data: [1600, 2100, 2600, 2800, 3900, 4200, 3000, 4200,1800],
        backgroundColor: ['#1DA1F2','#E60023','#1877F2',dist_bg_instagram,'#0E76A8','#25D366',dist_bg_google,'#FF0000','#0088CC'],
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius:2,
    }]
  }
  
  var dist_NetChart = new Chart(distNetChart, {
      type: 'bar',
      data: distNetChartData,
      plugins:[ChartDataLabels],
      options: {
        maintainAspectRatio:false,
          layout:{
              padding:10,
          },
          plugins:{
              legend:{
                 display:false,              
              },
              datalabels:{
                color:'#ffffff',
                 rotation:-90,
                 font:{
                   size:12,
                   stretch: 'ultra-expand'
                 },
                 align:'end',
                 anchor:'start',
                 padding: {top: 0, left: 10, right: 0, bottom: 0},
                 formatter: function(value, context){
                     return context.chart.data.labels[context.dataIndex];
                 },
             }   
          },   
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize:1000,
                      callback: numberSuffixK,
                  },
                  suggestedMin: 0,
                  suggestedMax:4000,
                  grid: {
                    display: false
                  }
              },
               x: {
                  title: {
                    display: true,
                    text:'Networks',
                    color:'#A3A3A3'
                  },               
                  grid: {
                    display: false
                  },
                  ticks:{
                    display:false,
                  }            
              }
          },
          maxBarThickness: 25,
          minBarLength: 2,
      },    
  });
}
/*=====X=======*Ref = #anjon#03 | Distributation Network Bar Chart ===X======== */


/*===============*Ref = #anjon#04 | Payment Methods Pie Chart ================== */
/* Connnected with Ref = #anjon#01 and #ChartLiDelete */
if( $('body').find('#payment_methods').length){
  var payment_methods_data = {
    labels:['Paypal','Bank-Transfer','Invoice','Credit-Card','Giropay','other'],
    datasets: [{
        label: 'payment method',
        data: [15,10,12,13,20,30],
        backgroundColor: ['#2AB8FF','#009EEC','#008ACF','#0B71B4','#115A8A','#60C4F6'],
        borderColor: 'transparent',
    }]
  }
  var p_method = document.getElementById('payment_methods').getContext('2d');
  var payment_methods = new Chart(p_method, {
    type: 'pie',
    data:payment_methods_data,
    plugins: [htmlLegendPlugin, ChartDataLabels],
    options: {
      maintainAspectRatio:false, 
      rotation:-15,
      plugins: {
        htmlLegend: {
          // ID of the container to put the legend in
          containerID: 'p_method_legend',
        },
        legend: {
          display: false,
        },
        datalabels:{
          color:'#ffffff',
          align:'center',
          anchor:'center',
          padding: {top: 0, left: 10, right: 0, bottom: 0},
          font:{
            size:17
          },
          formatter: function(value, context){
            return context.chart.data.datasets[0].data[context.dataIndex] + "%";
          }
        }
      }
    },
  });
  
  const p_method_data = payment_methods.data.datasets[0].data;
  const p_method_legend = $('.p_method_legend .chart-data');
  p_method_legend.each((index,element) => {
    element.innerHTML = " (" + p_method_data[index] + "%)";
  });
}
/*========X=======*Ref = #anjon#04 | Subscription Cancelled Pie Chart ==========X======== */

/*===============*Ref = #anjon#05 | Distributation Network Bar Chart-2 ================== */
if( $('body').find('#dist_net_chart2').length){
  var distNetChart2 = document.getElementById('dist_net_chart2').getContext('2d');

  /* Gradient Color */
  var dist_net2_bg = distNetChart.createLinearGradient(0, 100, 0, 300);
  dist_net2_bg.addColorStop(0, '#42ADE2');
  dist_net2_bg.addColorStop(1, '#115A8A');
  
  
  var distNetChartData2 = {
    labels:['Poland', 'Germany', 'Austria', 'Switzerland', 'Netherlands'],
    datasets: [{
        label: 'payment completions',
        data: [30, 75, 87, 85, 35],
        backgroundColor: dist_net2_bg,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius:2,
    }]
  }
  
  var dist_NetChart2 = new Chart(distNetChart2, {
      type: 'bar',
      data: distNetChartData2,
      plugins:[ChartDataLabels],
      options: {
        maintainAspectRatio:false,
          layout:{
              padding:10,
          },
          plugins:{
              legend:{
                 display:false,              
              },
              datalabels:{
                color:'#ffffff',
                 rotation:-90,
                 font:{
                   size:12
                 },
                 align:'end',
                 anchor:'start',
                 padding: {top: 0, left: 10, right: 0, bottom: 0},
                 formatter: function(value, context){
                     return context.chart.data.labels[context.dataIndex];
                 },
             }   
          },   
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize:20,
                      callback: function(value, index, values) {
                        return value + '%';
                    }
                  },
                  suggestedMin: 0,
                  suggestedMax:100,
                  grid: {
                    display: false
                  }
              },
               x: {
                  title: {
                    display: true,
                    text:'Countries',
                    color:'#A3A3A3'
                  },               
                  grid: {
                    display: false
                  },
                  ticks:{
                    display:false,
                  }            
              }
          },
          // barThickness: 25,
          maxBarThickness: 40,
          minBarLength: 2,
      },    
  });  
}
/*========X=======*Ref = #anjon#05 | Distributation Network Bar Chart-2 ==========X======== */

/*===============*Ref = #anjon#06 | Sales by Period Bar chart ================== */
if($('body').find('#salesPeriod_chart').length){
  // Monthly values
  var monthLabel_sales= ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var monthData_sales = [1500, 2200, 2700,2800,4200,2900,1500,3100,1450,2200,3900,3200];
  // Yearly values
  var yearLabel_sales = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032];
  var yearData_sales = [4500,5000,7000,15000,19000,5000,15000,17000,7000,9100,10000,8000];
  // Weekly values
  var weekLabel_sales = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var weekData_sales= [500,1500,1700,1200,450,1300,700];
  // Daily values
  var dailyLabel_sales = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  var dailyData_sales = [100,200,250,50,500,650,900,100,200,250,50,500,650,900,100,200,250,50,500,650,900,100,200,250,50,500,650,900,550,300,420];
  // Step Size yAxis
  var stepSizeMonthly_sales= 1000;
  var stepSizeYearly_sales = 5000;
  var stepSizeWeekly_sales= 500;
  var stepSizeDaily_sales = 100;
  // Connect with canvas ID
  var sales_period_Chart_ID = document.getElementById("salesPeriod_chart");
  var sales_period_chart = sales_period_Chart_ID.getContext('2d');
    /* Gradient Color */
    var sales_period_bg = sales_period_chart.createLinearGradient(0, 150, 0, 300);
    sales_period_bg.addColorStop(0, '#42ADE2');
    sales_period_bg.addColorStop(1, '#177BBD');

    var sales_period_data = {
      labels:monthLabel_sales,
      datasets: [{
          label: 'Sales Amount',
          data: monthData_sales,
          backgroundColor: sales_period_bg,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius:2,
      }]
    }
    
    var sales_periodChart = new Chart(sales_period_chart, {
        type: 'bar',
        data: sales_period_data,
        plugins:[ChartDataLabels],
        options: {
          maintainAspectRatio:false,
            layout:{
                padding:10,
            },
            plugins:{
              tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.dataset.label || '';
                        var amountValues = context.chart.data.datasets[0].data[context.dataIndex]; 
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          /* Using currency formatter plugin */
                            label += OSREC.CurrencyFormatter.format(amountValues, { currency: 'EUR' });
                        }
                        return label;                      
                    }
                  }
              },
                legend:{
                  display:false,              
                },
                datalabels:{
                  color:'#ffffff',
                  rotation:-90,
                  font:{
                    size:12
                  },
                  align:'end',
                  anchor:'start',
                  padding: {top: 0, left: 10, right: 0, bottom: 0},
                  formatter: function(value, context){
                    var amountValue = context.chart.data.datasets[0].data[context.dataIndex]; 
                    /* Using currency formatter plugin */
                    return OSREC.CurrencyFormatter.format(amountValue, { currency: 'EUR' });
                  },
              }   
            },   
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize:stepSizeMonthly_sales,
                        callback: numberSuffixK,
                    },
                    suggestedMin: 0,
                    suggestedMax:100,
                    grid: {
                      display: false
                    }
                },
                x: {
                    title: {
                      display: false,
                    },               
                    grid: {
                      display: false
                    },
                    ticks:{
                      display:true,
                    }            
                }
            },
            // barThickness: 25,
            maxBarThickness: 40,
            minBarLength: 2,
        },    
    });  
  //salesPeriodUpdate

  $( "select#salesPeriodUpdate" )
  .change(function() {
    // Monthly
    $( "select option#monthSales_P:selected" ).each(function() {
      sales_periodChart.data.labels = monthLabel_sales;
      sales_periodChart.data.datasets[0].data = monthData_sales;
      sales_periodChart.options.scales.y.ticks.stepSize = stepSizeMonthly_sales;   
      sales_periodChart.options.plugins.datalabels.font.size = 12;      
      sales_periodChart.update();
    });

    // yearly
    $( "select option#yearSales_P:selected" ).each(function() {
      sales_periodChart.data.labels = yearLabel_sales;
      sales_periodChart.data.datasets[0].data = yearData_sales;
      sales_periodChart.options.scales.y.ticks.stepSize = stepSizeYearly_sales;
      sales_periodChart.options.plugins.datalabels.font.size = 12;         
      sales_periodChart.update();
    });
    // weekly
    $( "select option#weekSales_P:selected" ).each(function() {
      sales_periodChart.data.labels = weekLabel_sales;
      sales_periodChart.data.datasets[0].data = weekData_sales;
      sales_periodChart.options.scales.y.ticks.stepSize = stepSizeWeekly_sales;    
      sales_periodChart.options.plugins.datalabels.font.size = 12;     
      sales_periodChart.update();
      
    });
    // Daily
    $( "select option#dailySales_P:selected" ).each(function() {
      sales_periodChart.data.labels = dailyLabel_sales;
      sales_periodChart.data.datasets[0].data = dailyData_sales;
      sales_periodChart.options.scales.y.ticks.stepSize = stepSizeDaily_sales;        
      sales_periodChart.options.plugins.datalabels.font.size = 8;        
      sales_periodChart.update();
    });
  })
  .trigger( "change" );
}
/*========X=======*Ref = #anjon#06 | Sales by Period Bar chart ==========X======== */

/*============*Ref = #anjon#07 | Sales figures by packages Pie Chart ======== */
/* Connnected with Ref = #anjon#01 and #ChartLiDelete */
if( $('body').find('#sales_figure_chart').length){
  var totalSalesData = [1700,650,650,2000];//5000
  var sumOfTotalSales = totalSalesData.reduce(function(a, b){
      return a + b;
  }, 0);
  var covertToPercentTotalSales=[
    (totalSalesData[0]/sumOfTotalSales*100),
    (totalSalesData[1]/sumOfTotalSales*100),
    (totalSalesData[2]/sumOfTotalSales*100),
    (totalSalesData[3]/sumOfTotalSales*100)
  ];
  var sales_figure_data = {
    labels:['Package-1','Package-4','Package-2','Package-3'],
    datasets: [{
        label: 'Sales Figures',
        totalsales_data:totalSalesData,
        data: covertToPercentTotalSales,
        backgroundColor: ['#BCF1FF','#177BBD','#115A8A','#42ADE2'],
        borderColor: 'transparent',
    }]
  }
  var sales_figure_ID = document.getElementById('sales_figure_chart').getContext('2d');
  var sales_figure_Chart = new Chart(sales_figure_ID, {
    type: 'pie',
    data:sales_figure_data,
    plugins: [htmlLegendPlugin, ChartDataLabels],
    options: {
      maintainAspectRatio:false, 
      rotation:-15,
      plugins: {
        htmlLegend: {
          // ID of the container to put the legend in
          containerID: 'sales_figure_legend',
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                  var label = context.dataset.label || '';
                  var totalSalesLabel_t = context.chart.data.datasets[0].totalsales_data[context.dataIndex]; 
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label +=   totalSalesLabel_t;
                  }
                  return label;                      
              }
            }
        },
        legend: {
          display: false,
        },
        datalabels:{
          color:'#ffffff',
          align:'center',
          anchor:'center',
          padding: {top: 0, left: 10, right: 0, bottom: 0},
          font:{
            size:20
          },
          formatter: function(value, context){
            return context.chart.data.datasets[0].data[context.dataIndex] + "%";
          }
        }
      }
    },
  });
  
  const sales_figure_inner_data = sales_figure_Chart.data.datasets[0].totalsales_data;
  const sales_figure_legend = $('.sales_figure_legend .chart-data');
  sales_figure_legend.each((index,element) => {
    element.innerHTML = sales_figure_inner_data[index] + " Total Sales";
  });
}
/*=====X===*Ref = #anjon#07 | Sales figures by packages Pie Chart ===X====== */

/*===============*Ref = #anjon#08 | Users by Period Bar chart ================== */
if($('body').find('#usersPeriod_chart').length){
  // Monthly values
  var monthLabel_Users= ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var monthData_Users = [250, 314, 390,402,580,407,277,476,262,354,533,452];
  // Yearly values
  var yearLabel_Users = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032];
  var yearData_Users = [500,1000,700,1500,1100,500,700,600,1100,750,677,980];
  // Weekly values
  var weekLabel_Users = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var weekData_Users= [80,100,150,203,167,120,70];
  // Daily values
  var dailyLabel_Users = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  var dailyData_Users = [10,20,25,50,5,33,12,25,20,25,50,45,51,35,23,17,27,47,19,49,29,37,28,46,50,21,36,48,26,55,44];
  // Step Size yAxis
  var stepSizeMonthly_Users= 100;
  var stepSizeYearly_Users = 500;
  var stepSizeWeekly_Users= 50;
  var stepSizeDaily_Users = 20;
  // Connect with canvas ID
  var Users_period_Chart_ID = document.getElementById("usersPeriod_chart");
  var Users_period_chart = Users_period_Chart_ID.getContext('2d');
    /* Gradient Color */
    var Users_period_bg = Users_period_chart.createLinearGradient(0, 150, 0, 300);
    Users_period_bg.addColorStop(0, '#42ADE2');
    Users_period_bg.addColorStop(1, '#177BBD');

    var Users_period_data = {
      labels:monthLabel_Users,
      datasets: [{
          label: 'Users Amount',
          data: monthData_Users,
          backgroundColor: Users_period_bg,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius:2,
      }]
    }
    
    var Users_periodChart = new Chart(Users_period_chart, {
        type: 'bar',
        data: Users_period_data,
        plugins:[ChartDataLabels],
        options: {
          maintainAspectRatio:false,
            layout:{
                padding:10,
            },
            plugins:{
                legend:{
                  display:false,              
                },
                datalabels:{
                  color:'#ffffff',
                  rotation:-90,
                  font:{
                    size:12
                  },
                  align:'end',
                  anchor:'start',
                  padding: {top: 0, left: 30, right: 0, bottom: 0},
              }   
            },   
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize:stepSizeMonthly_Users,
                        callback: numberSuffixK,
                    },
                    suggestedMin: 0,
                    suggestedMax:100,
                    grid: {
                      display: false
                    }
                },
                x: {
                    title: {
                      display: false,
                    },               
                    grid: {
                      display: false
                    },
                    ticks:{
                      display:true,
                    }            
                }
            },
            // barThickness: 25,
            maxBarThickness: 40,
            minBarLength: 2,
        },    
    });  

  $( "select#usersPeriodUpdate" )
  .change(function() {
    // Monthly
    $( "select option#monthUsers_P:selected" ).each(function() {
      Users_periodChart.data.labels = monthLabel_Users;
      Users_periodChart.data.datasets[0].data = monthData_Users;
      Users_periodChart.options.scales.y.ticks.stepSize = stepSizeMonthly_Users;   
      Users_periodChart.options.plugins.datalabels.font.size = 12;      
      Users_periodChart.update();
    });

    // yearly
    $( "select option#yearUsers_P:selected" ).each(function() {
      Users_periodChart.data.labels = yearLabel_Users;
      Users_periodChart.data.datasets[0].data = yearData_Users;
      Users_periodChart.options.scales.y.ticks.stepSize = stepSizeYearly_Users;
      Users_periodChart.options.plugins.datalabels.font.size = 12;         
      Users_periodChart.update();
    });
    // weekly
    $( "select option#weekUsers_P:selected" ).each(function() {
      Users_periodChart.data.labels = weekLabel_Users;
      Users_periodChart.data.datasets[0].data = weekData_Users;
      Users_periodChart.options.scales.y.ticks.stepSize = stepSizeWeekly_Users;    
      Users_periodChart.options.plugins.datalabels.font.size = 12;     
      Users_periodChart.update();
      
    });
    // Daily
    $( "select option#dailyUsers_P:selected" ).each(function() {
      Users_periodChart.data.labels = dailyLabel_Users;
      Users_periodChart.data.datasets[0].data = dailyData_Users;
      Users_periodChart.options.scales.y.ticks.stepSize = stepSizeDaily_Users;        
      Users_periodChart.options.plugins.datalabels.font.size = 8;        
      Users_periodChart.update();
    });
  })
  .trigger( "change" );
}
/*========X=======*Ref = #anjon#08 | Users by Period Bar chart ==========X======== */

/* ==========*Ref = #ChartLiDelete | Remove Additional Pie Chart Legend li Data ============== */
/* Connnected with Ref = #anjon#01, #anjon#04*/
var stayData = $('.pieLegend li').addClass('anjon');
$(stayData).click(function(){ 
  $(this).toggleClass("line-through");
    $(".pieLegend li:not(.anjon)").remove();
});
/* ======X====*Ref = #ChartLiDelete | Remove Additional Pie Chart Legend li Data=======X======= */