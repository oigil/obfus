var button = document.querySelector("#__wrapper__ button");
button.addEventListener("click", function(){
	var h2 = document.querySelector(".__title2__");
	var clone = h2.cloneNode(true);
	document.getElementById("__wrapper__").appendChild(clone);


});