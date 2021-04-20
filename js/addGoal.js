window.onload = () => {

	let btnPageview = document.getElementById("btn_pageview");
	let btnCustomevent = document.getElementById("btn_customevent");
	let goalContainer = document.getElementsByClassName("custom-settingsAddGoal-container");

	const PAGEVIEW_TYPE = 0;
	const CUSTOM_EVENT_TYPE = 1;

	let goalType = 0;

	btnPageview.onclick = () => {
		if(goalType != PAGEVIEW_TYPE){
			goalType = PAGEVIEW_TYPE;
			updateGoalContainer();
		}
	};

	btnCustomevent.onclick = () => {
		if(goalType != CUSTOM_EVENT_TYPE){
			goalType = CUSTOM_EVENT_TYPE;
			updateGoalContainer();
		}
	};

	function updateGoalContainer(){
		if(goalType == PAGEVIEW_TYPE){
			btnPageview.className = "rex-center-text rex-pad8px custom-billing-background rex-color-white rex-curDiv-tl-8px rex-curDiv-bl-8px rex-hover";
			btnCustomevent.className = "rex-center-text rex-pad8px rex-curDiv-tr-8px rex-curDiv-br-8px rex-selectable-item-background rex-hover";
			goalContainer[0].style.display = "block";
			goalContainer[1].style.display = "none";
		}else{
			btnPageview.className = "rex-center-text rex-pad8px rex-curDiv-tl-8px rex-curDiv-bl-8px rex-selectable-item-background rex-hover";
			btnCustomevent.className = "rex-center-text rex-pad8px custom-billing-background rex-color-white rex-curDiv-tr-8px rex-curDiv-br-8px rex-hover";
			goalContainer[0].style.display = "none";
			goalContainer[1].style.display = "block";
		}
	}

	btnPageview.click();
};