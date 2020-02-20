$(function() {
    "use strict";

	
    // chart 1

       var ctx = document.getElementById('dash2-chart-1').getContext('2d');


       var gradientStroke = ctx.createLinearGradient(0,230,0,50);

      gradientStroke.addColorStop(1, 'rgba(0, 139, 139, 0.44)');
      gradientStroke.addColorStop(0.2, 'rgba(255, 255, 255, 0.01)');
      gradientStroke.addColorStop(0, 'rgba(255, 255, 255, 0.0)'); //purple colors

              
       var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: 'Last Week Orders',
            data: [10, 8, 15, 8, 25, 12, 30],
            backgroundColor: gradientStroke,
            borderColor: '#008b8b',
            pointBackgroundColor:'#000',
            pointHoverBackgroundColor:'#fff',
            pointBorderColor :'#fff',
            pointHoverBorderColor :'#fff',
            pointBorderWidth :2,
            pointRadius :0,
            pointHoverRadius :4,
            borderWidth: 2,
          }]
        }
        ,
        options: {
                legend: {
                  display: false,
                  labels: {
                    fontColor: '#585757',  
                    boxWidth:40
                  }
                },
                tooltips: {
                  displayColors:false
                },  
              scales: {
                  xAxes: [{
                    barPercentage: .5,
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }],
                   yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }]
                 }

             }
      });

      
      // chart 2

       var ctx = document.getElementById('dash2-chart-2').getContext('2d');

       var gradientStroke = ctx.createLinearGradient(0,230,0,50);

      gradientStroke.addColorStop(1, 'rgba(238, 9, 121, 0.30)');
      gradientStroke.addColorStop(0.2, 'rgba(255, 255, 255, 0.01)');
      gradientStroke.addColorStop(0, 'rgba(255, 255, 255, 0.0)'); //purple colors
              
       var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: 'Last Week Revenue',
            data: [4, 8, 12, 5, 12, 8, 18],
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#ee0979',
            pointBackgroundColor:'#000',
            pointHoverBackgroundColor:'#fff',
            pointBorderColor :'#fff',
            pointHoverBorderColor :'#fff',
            pointBorderWidth :2,
            pointRadius :0,
            pointHoverRadius :4,
            borderWidth: 2,
          }]
        },
        options: {
                legend: {
                  display: false,
                  labels: {
                    fontColor: '#585757',  
                    boxWidth:40
                  }
                },
                tooltips: {
                  displayColors:false
                },  
              scales: {
                  xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }],
                   yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }]
                 }

             }
      });


     // chart 3

       var ctx = document.getElementById('dash2-chart-3').getContext('2d');

      var gradientStroke = ctx.createLinearGradient(0,230,0,50);

      gradientStroke.addColorStop(1, 'rgba(121, 85, 72, 0.54)');
      gradientStroke.addColorStop(0.2, 'rgba(255, 255, 255, 0.01)');
      gradientStroke.addColorStop(0, 'rgba(255, 255, 255, 0.0)'); //purple colors
              
       var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: 'Last Week Visitors',
            data: [20, 8, 12, 5, 12, 8, 16],      
            backgroundColor: gradientStroke,
            borderColor: '#795548',
            pointBackgroundColor:'#fff',
            pointHoverBackgroundColor:'#fff',
            pointBorderColor :'#fff',
            pointHoverBorderColor :'#fff',
            pointBorderWidth :2,
            pointRadius :0,
            pointHoverRadius :4,
            borderWidth: 2,
          }]
        },
        options: {
                legend: {
                  display: false,
                  labels: {
                    fontColor: '#585757',  
                    boxWidth:40
                  }
                },
                tooltips: {
                  displayColors:false
                },  
              scales: {
                  xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }],
                   yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#585757'
                    },
                    gridLines: {
                      display: true ,
                      color: "rgba(0, 0, 0, 0.03)"
                    },
                  }]
                 }

             }
      });



// worl map

jQuery('#dashboard-map').vectorMap(
{
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    zoomOnScroll: false,
    color: '#009efb',
    regionStyle : {
        initial : {
          fill : '#2e3842'
        }
      },
    markerStyle: {
      initial: {
        r: 9,
        'fill': '#fff',
        'fill-opacity':1,
        'stroke': '#000',
        'stroke-width' : 5,
        'stroke-opacity': 0.4
                },
                },
    enableZoom: true,
    hoverColor: '#009efb',
    markers : [{
        latLng : [21.00, 78.00],
        name : 'Lorem Ipsum Dollar'
      
      }],
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true,
});
  

  // chart 4

  $("#dash2-chart-4").sparkline([13,5,3,7,5,7,3,6,5,0], {
		type: 'line',
		width: '100%',
		height: '50',
		lineWidth: '2',
		lineColor: '#14abef',
		fillColor: 'rgba(20, 171, 239, 0.3)',
		spotColor: '#14abef',
		highlightSpotColor: !1,
		highlightLineColor: !1,
		minSpotColor: !1,
		maxSpotColor:!1
		
    }); 
	
	// chart 5

	$("#dash2-chart-5").sparkline([3,5,3,4,5,15,3,6,5,0], {
		type: 'line',
		width: '100%',
		height: '50',
		lineWidth: '2',
		lineColor: '#02ba5a',
		fillColor: 'rgba(2, 186, 90, 0.3)',
		spotColor: '#02ba5a',
		highlightSpotColor: !1,
		highlightLineColor: !1,
		minSpotColor: !1,
		maxSpotColor:!1
		
    }); 

	// chart 6
	
	$("#dash2-chart-6").sparkline([4,5,3,9,5,3,3,6,8,5], {
		type: 'line',
		width: '100%',
		height: '50',
		lineWidth: '2',
		lineColor: '#d13adf',
		fillColor: 'rgba(209, 58, 223, 0.3)',
		spotColor: '#d13adf',
		highlightSpotColor: !1,
		highlightLineColor: !1,
		minSpotColor: !1,
		maxSpotColor:!1
		
    }); 
    
	// chart 7
	
	$("#dash2-chart-7").sparkline([0,5,3,7,5,10,3,6,5,9], {
		type: 'line',
		width: '100%',
		height: '50',
		lineWidth: '2',
		lineColor: '#fba540',
		fillColor: 'rgba(251, 165, 64, 0.3)',
		spotColor: '#fba540',
		highlightSpotColor: !1,
		highlightLineColor: !1,
		minSpotColor: !1,
		maxSpotColor:!1
		
    }); 














      });	