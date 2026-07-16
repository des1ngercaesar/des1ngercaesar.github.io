const buttons = document.querySelectorAll(".layout-btn");

buttons.forEach(button=>{

button.onclick=()=>{

buttons.forEach(b=>b.classList.remove("active"));

button.classList.add("active");

}

});
