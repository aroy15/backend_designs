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



// var numberSuffixK = function(value) {
//     var ranges = [
//       { divider: 1e6, suffix: 'M' },
//       { divider: 1e3, suffix: 'k' }
//     ];
//     function formatNumber(n) {
//       for (var i = 0; i < ranges.length; i++) {
//           if (n >= ranges[i].divider) {
//             return (n / ranges[i].divider).toString() + ranges[i].suffix;
//           }
//       }
//       return n;
//     }
//     return formatNumber(value);
//   }
//   /*--X--- end of suffix 1000 = 1k ---X-- */

// var ctx = document.getElementById('myChart').getContext('2d');
// var background_1 = ctx.createLinearGradient(0, 10, 0, 600);
// background_1.addColorStop(1, 'black');
// background_1.addColorStop(0, 'lime');

// var background_2 = ctx.createLinearGradient(0, 0, 0, 600);
// background_2.addColorStop(0, 'green');
// background_2.addColorStop(1, 'orange');

// var background_3 = ctx.createLinearGradient(0, 0, 0, 600);
// background_3.addColorStop(0, 'orange');
// background_3.addColorStop(1, 'purple');

// var background_4 = ctx.createLinearGradient(0, 0, 0, 600);
// background_4.addColorStop(0, 'green');
// background_4.addColorStop(1, 'violet');

// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['', '', '', '', '', ''],
//         anjon:['skyblue', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [1200 , 1900, 3000, 5000, 200, 300],
//             backgroundColor: [
//                 background_1,
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1,
//             borderRadius:5,
//         }]
//     },
//     plugins:[ChartDataLabels],
//     options: {
//         layout:{
//             padding:10,
//         },
//         plugins:{
//             legend:{
//                display:false 
//             },
//             datalabels:{
//                color:'green',
//                 rotation:-90,
//                 align:'end',
//                 anchor:'start',
//                 padding: {top: 0, left: 10, right: 0, bottom: 0},
//                 formatter: function(value, context){
//                     return context.chart.data.anjon[context.dataIndex];
//                 },
// //                clip:true,
//             }           
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     // Include a dollar sign in the ticks
//                     stepSize:1000,
//                     callback: numberSuffixK,
//                 },
//                 suggestedMin: 0,
//                 suggestedMax:4000,
//             },
//              x: {
//                 title: {
//                   display: true,
//                   text: 'Networks',
//                   color: 'gray',
//                   font: {
//                     size: 15,
//                     weight: 'normal',
//                     lineHeight: 1,
//                   },
//                   padding: {top: -20, left: 0, right: 0, bottom: 0}
//                 }
//             }
//         }
//     },
    
// });