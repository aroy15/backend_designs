$(document).ready(function(){
  // Sidebar show hide
  $("#menuBar").click(function(){
    $(this).toggleClass('active');
     $("#sidebarNav").toggleClass("nav-active");
     $("#mainItem").toggleClass("main_item-active");
   });

   // preloader jquery plugin active
    if($('body').find('.preloader-js').length){
      $('.preloader-js').preloadinator({
        minTime: 600
      });
      setTimeout(function(){ $('.preloader-js').addClass('d-none'); }, 700);
    }
});

/*======= Fullscreen icon function =======*/
$(function() {    
  // $(".fullscreen-supported").toggle($(document).fullScreen() != null);
  // $(".fullscreen-not-supported").toggle($(document).fullScreen() == null);  
  $(document).bind("fullscreenchange", function(e) {
     console.log("Full screen changed.");
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
  
    // Logout Icons looping animation
    $('.logout-icon').click(function(){
      $('.lgt_icons').attr('src','./resources/img/icons/loop.png');
      $('.lgt_icons').addClass('looping');  
      setTimeout(function(){ 
        $('.lgt_icons').attr('src','./resources/img/icons/logout.png');
        $('.lgt_icons').removeClass('looping');   
      }, 2000);
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
  var dist_bg_instagram = distNetChart.createLinearGradient(0, 150, 0, 360);
  dist_bg_instagram.addColorStop(0.0865, '#4C5FD7');
  dist_bg_instagram.addColorStop(0.2841, '#7232BD');
  dist_bg_instagram.addColorStop(0.4926, '#C32AA3');
  dist_bg_instagram.addColorStop(0.7693, '#F46F30');
  dist_bg_instagram.addColorStop(1, '#FFDC7D');
  
  /* Google Mybusiness Gradient color */
  var dist_bg_google = distNetChart.createLinearGradient(0, 150, 0, 350);
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

  /* Instagram Gradient Color */
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

/* ==========*Ref = #ChartLiDelete | Remove Additional Pie Chart Legend li Data ============== */
/* Connnected with Ref = #anjon#01, #anjon#04*/
var stayData = $('.pieLegend li').addClass('anjon');
$(stayData).click(function(){ 
  $(this).toggleClass("line-through");
    $(".pieLegend li:not(.anjon)").remove();
});
/* ======X====*Ref = #ChartLiDelete | Remove Additional Pie Chart Legend li Data=======X======= */