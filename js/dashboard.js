window.onload = () => {
	let settingsDropdownToggle = document.getElementById("settingsDropdownToggle");
	let settingsDropdown = document.getElementById("settingsDropdown");
	let dashboardSiteDropdownToggle = document.getElementById("dashboardSiteDropdownToggle");
	let dashboardSiteDropdown = document.getElementById("dashboardSiteDropdown");
	let dashboardFilterDropdownToggle = document.getElementById("dashboardFilterDropdownToggle");
	let dashboardFilterDropdown = document.getElementById("dashboardFilterDropdown");

	/* When the user clicks on the button,
	toggle between hiding and showing the dropdown content */
	settingsDropdownToggle.onclick = (e) => {
		stopClickPropagation(e);
		settingsDropdown.classList.toggle("rex-cd-show");
	};
	dashboardSiteDropdownToggle.onclick = (e) => {
		stopClickPropagation(e);
		dashboardSiteDropdown.classList.toggle("rex-cd-show");
	};
	dashboardFilterDropdownToggle.onclick = (e) => {
		stopClickPropagation(e);
		dashboardFilterDropdown.classList.toggle("rex-cd-show");
	};
	
	// Close the dropdown menu if the user clicks outside of it
	window.onclick = function(event) {
		handleSettingsDropdown(event);
		handleMinDropdown(event);
		handleDateSelectorDropdown(event);
	}

	function handleSettingsDropdown(event){
		if (!event.target.matches('.rex-cd-dropbtn')) {
			let dropdowns = document.getElementsByClassName("rex-cd-dropdown-content");
			for (let i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('rex-cd-show')) {
					openDropdown.classList.remove('rex-cd-show');
				}
			}			
		}
	}

	function handleMinDropdown(event){
		if (!event.target.matches('.rex-cd-dropbtn')) {
			let dropdowns = document.getElementsByClassName("rex-cd-dropdown-content-min");
			for (let i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('rex-cd-show')) {
					openDropdown.classList.remove('rex-cd-show');
				}
			}
		}
	}

	
	let navPos = 0;
	window.onscroll = () => {
		let header = document.getElementById("stickyNav");
		let stickyPos = header.offsetTop;
		if(stickyPos > navPos){
			navPos = stickyPos;
		}
		if (window.pageYOffset > navPos) {
			header.classList.add("custom-sticky");
			header.classList.add("rex-box-shadow2");
		} else {
			header.classList.remove("custom-sticky");
			header.classList.remove("rex-box-shadow2");
		}
	};

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = null;
	function createChart(){
		myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['Apr 21', 'Apr 22', 'Apr 23', 'Apr 24', 'Apr 25', 'Apr 26'],
				datasets: [
				{
					label: 'Visitors',
					fill: true,// fill the background color under the chart
					data: [12, 5, 3, 9, 6, 12],
					backgroundColor: 'rgba(56, 89, 220, 0.2)',
					borderColor: 'rgb(56, 89, 220)',
					borderWidth: 3// border width of the chart
				}
				]
			},
			options: {
				interaction: {//tooltip appears on hovering over chart
					mode: 'index',
					intersect: false
				},
				plugins:{// remove the dataset label
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						beginAtZero: true
					},
					x: {// remove the vertical grid lines
						grid: {
							display: false
						}
					}
				},
				elements: { //remove the dot on the line
					point:{
						radius: 0
					}
				}
			}
		});
	}

	createChart();

	let myPicker = document.getElementById("myPicker");
	dateRangePicker = new AnalyticsDateRangePicker(myPicker, {
		startDate: new Date("01/08/2021"),
		endDate: new Date("01/20/2021"),
		menus: [
		{
			menuLabel: 'Today',
			getDisplayLabel: () => {
				return 'Today'
			},
			getRange: () => {
				return {
					startDate: new Date("01/01/2021"),
					endDate: new Date()
				};
			}
		},
		{
			menuLabel: 'Last 7 days',
			getDisplayLabel: () => {
				return 'Last 7 days'
			},
			getRange: () => {
				return {
					startDate: new Date("01/01/2021"),
					endDate: new Date()
				};
			}
		},
		{
			menuLabel: 'Last 30 days',
			getDisplayLabel: () => {
				return 'Last 30 days'
			},
			getRange: () => {
				return {
					startDate: new Date("01/05/2018"),
					endDate: new Date()
				};
			}
		},
		{
			menuLabel: 'Last 6 months',
			getDisplayLabel: () => {
				return 'Last 6 months'
			},
			getRange: () => {
				return {
					startDate: new Date("01/05/2018"),
					endDate: new Date()
				};
			}
		},
		{
			menuLabel: 'Last 12 months',
			getDisplayLabel: () => {
				return 'Last 12 months'
			},
			getRange: () => {
				return {
					startDate: new Date("01/05/2018"),
					endDate: new Date()
				};
			}
		}
		]
	});

	dateRangePicker.onUpdateListener = response => {
		console.log(response.startDate);
		console.log(response.endDate);
	};

	let countriesContainer = document.getElementsByClassName("custom-dashboard-countries-container")[0];
	google.charts.load('current', {
		'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyDXby8gajXjYyDwX2TTib0XsnX95c9JtDQ',
        'safeMode': true,
        'enableRegionInteractivity': true,
        'region': 'world',
    });

	google.charts.setOnLoadCallback(drawRegionsMap);

	let chart;
	let data;
	let options;
	let isChartLoaded = false;

	function drawRegionsMap() {
		isChartLoaded = true;
		data = google.visualization.arrayToDataTable([
			['Country', 'Visitors'],
			['Germany', 200],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['Nigeria', 1000],
			['France', 600],
			['RU', 700]
			]);

		options = {
			chartArea: {width:'100%',height:'100%'},
			colorAxis: {colors: ['#3730A3']},
			legend: 'none'
		};

		chart = new google.visualization.GeoChart(countriesContainer);

		google.visualization.events.addListener(chart, 'select', function () {
			let selection = chart.getSelection();
			if (selection.length > 0) {
				let clickedCountryName = data.getValue(selection[0].row, 0);
				console.log(clickedCountryName);
			}
		});

		chart.draw(data, options);
	}

	function redrawRegionsMap(){
		if(!isChartLoaded) return;
		chart.draw(data, options);
	}

	let resizeValue = -1;
	function updateWindowSize(){
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;

		redrawRegionsMap();

		if(w < 384){
			if(resizeValue != 4){
				resizeValue = 4;
				myChart.destroy();
				ctx.canvas.height = 230;
				createChart();
			}
		}else if(w < 500){
			if(resizeValue != 3){
				resizeValue = 3;
				myChart.destroy();
				ctx.canvas.height = 200;
				createChart();
			}			
		}else if(w < 775){
			if(resizeValue != 2){
				resizeValue = 2;
				myChart.destroy();
				ctx.canvas.height = 170;
				createChart();
			}
		}else if(w < 950){
			if(resizeValue != 1){
				resizeValue = 1;
				myChart.destroy();
				ctx.canvas.height = 140;
				createChart();
			}
		}else if(w < 1000){
			if(resizeValue != 0){
				resizeValue = 0;
				myChart.destroy();
				ctx.canvas.height = 110;
				createChart();
			}
		}
	}

	window.addEventListener("resize", updateWindowSize);

	updateWindowSize();

};