let current_date, hours, minutes, seconds, 
    minutePad, secondPad;
function updateTime() {
    current_date = new Date();
    hours = current_date.getHours();
    minutes = current_date.getMinutes();
    seconds = current_date.getSeconds();
    minutePad = minutes < 10 ? "0" : "";
    secondPad = seconds < 10 ? "0" : "";

    document.getElementById("timeheader")
        .innerHTML = hours + ":" 
            + minutePad + minutes + ":" 
            + secondPad + seconds;
    console.log("updated time");
    setTimeout("updateTime();", 1000);
}
