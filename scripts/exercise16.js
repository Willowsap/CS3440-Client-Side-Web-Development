function updateTime() {
    let current_date = new Date();
    let hours = current_date.getHours();
    let minutes = current_date.getMinutes();
    let seconds = current_date.getSeconds();
    let hourPad = hours < 10 ? "0" : "";
    let minutePad = minutes < 10 ? "0" : "";
    let secondPad = seconds < 10 ? "0" : "";

    th = document.getElementById("timeheader");
    th.innerHTML = hourPad + hours + ":" 
                 + minutePad + minutes + ":" 
                 + secondPad + seconds;
                 
    setTimeout("updateTime();", 1000);
}
