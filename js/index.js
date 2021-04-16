window.onload = () => {
	let settingsDropdownToggle = document.getElementById("settingsDropdownToggle");
	let settingsDropdown = document.getElementById("settingsDropdown");

	/* When the user clicks on the button,
	toggle between hiding and showing the dropdown content */
	settingsDropdownToggle.onclick = (e) => {
		stopClickPropagation(e);
		settingsDropdown.classList.toggle("rex-cd-show");
	};

	// Close the dropdown menu if the user clicks outside of it
	window.onclick = function(event) {
		if (!event.target.matches('.rex-cd-dropbtn')) {
			var dropdowns = document.getElementsByClassName("rex-cd-dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('rex-cd-show')) {
					openDropdown.classList.remove('rex-cd-show');
				}
			}
		}
	}
};

