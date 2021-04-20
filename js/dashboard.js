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