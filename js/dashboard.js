window.onload = () => {
	let settingsDropdownToggle = document.getElementById("settingsDropdownToggle");
	let settingsDropdown = document.getElementById("settingsDropdown");
	let dashboardSiteDropdownToggle = document.getElementById("dashboardSiteDropdownToggle");
	let dashboardSiteDropdown = document.getElementById("dashboardSiteDropdown");

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
	
	// Close the dropdown menu if the user clicks outside of it
	window.onclick = function(event) {
		handleSettingsDropdown(event);
		handleSiteDropdown(event);
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

	function handleSiteDropdown(event){
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
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
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
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});





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