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
	const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
	function createChart(){
		myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['Apr 21', 'Apr 22', 'Apr 23', 'Apr 24', 'Apr 25', 'Apr 26'],
				datasets: [
				{
					label: 'Visitors',
					fill: true,
					data: [2, 4, 7, 9, NaN, 5],
					backgroundColor: 'rgba(56, 89, 220, 0.2)',
					borderColor: 'rgb(56, 89, 220)',
					borderWidth: 3,
					segment: {
						borderDash: ctx => skipped(ctx, [6, 6])
					}
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

	let resizeValue = -1;
	function updateWindowSize(){
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;

		//console.log(`width : ${w} height : ${h}`);

		if(w < 384){
			if(resizeValue != 4){
				resizeValue = 4;
				myChart.destroy();
				ctx.canvas.height = 230;
				createChart();
				console.log("chart updated 4");
			}
		}else if(w < 500){
			if(resizeValue != 3){
				resizeValue = 3;
				myChart.destroy();
				ctx.canvas.height = 200;
				createChart();
				console.log("chart updated 3");
			}			
		}else if(w < 775){
			if(resizeValue != 2){
				resizeValue = 2;
				myChart.destroy();
				ctx.canvas.height = 170;
				createChart();
				console.log("chart updated 2");
			}
		}else if(w < 950){
			if(resizeValue != 1){
				resizeValue = 1;
				myChart.destroy();
				ctx.canvas.height = 140;
				createChart();
				console.log("chart updated 1");
			}
		}else if(w < 1000){
			if(resizeValue != 0){
				resizeValue = 0;
				myChart.destroy();
				ctx.canvas.height = 110;
				createChart();
				console.log("chart updated 0");
			}
		}
	}

	window.addEventListener("resize", updateWindowSize);

	updateWindowSize();

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
};