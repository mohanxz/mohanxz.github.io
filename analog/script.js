let clock=document.querySelector(".analogclock")
const hourneedle=document.querySelector(".hrs")
const minuteneedle=document.querySelector(".min")
const secondneedle=document.querySelector(".sec")
function runclock(){
    const time = new Date();
    const sec = (time.getSeconds())/60;
    const min = (sec + time.getMinutes())/60;
    const hrs= (min + time.getHours())/12

    hourneedle.style.setProperty('--rotation', hrs * 360);
    minuteneedle.style.setProperty('--rotation', min * 360);
    secondneedle.style.setProperty('--rotation',sec * 360);

}
runclock();
setInterval(runclock,1000)
