const inputContainer=document.getElementById("input-container");
const countdownForm=document.getElementById("countdown-form");
const dateEl=document.getElementById("date-picker");

const countdownEl=document.getElementById("countdown");
const countdownTitleEl=document.getElementById("countdown-title");
const countdownBtn=document.getElementById("countdown-button");
const timeElements=document.querySelectorAll("span");

const completeEl=document.getElementById("complete");
const completInfoEl=document.getElementById("complete-info");
const completeBtn=document.getElementById("complete-button");

//Global variables
let countdownTitle='';
let countdowndate='';
let countdownValue = Date;
let coundownInterval;

//time constants
const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

//Get todays date
const today=new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

//get the countdown values and update DOm
function updateDOM(){
    if(countdowndate==''){
        alert("Enter date")
    }else{
        
        coundownInterval=setInterval(()=>{
        const now=new Date().getTime();
        const distance=countdownValue-now;
        const days=Math.floor(distance/day);
        const hours=Math.floor((distance%day)/hour);
        const minutes=Math.floor((distance%hour)/minute);
        const seconds=Math.floor((distance%minute)/second);
        if(distance<0){
            completInfoEl.textContent=`${countdownTitle} is complete on ${countdowndate}`;
            clearInterval(coundownInterval);
            countdownEl.hidden=true;
            completeEl.hidden=false;
        }else{
                 //Populate the values in the countdown page
            countdownTitleEl.textContent=`${countdownTitle}`;
            timeElements[0].textContent=`${days}`;
            timeElements[1].textContent=`${hours}`;
            timeElements[2].textContent=`${minutes}`;
            timeElements[3].textContent=`${seconds}`;
        }           
    },1000);    
    }
    inputContainer.hidden=true;
    countdownEl.hidden=false;
}


//Get the values from the form
function updateCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdowndate=e.srcElement[1].value;
    //Get number version of current date and update DOM
    countdownValue=new Date(countdowndate).getTime();
    updateDOM();
}

//Reset all the values
const reset=()=>{
    clearInterval(coundownInterval);
    countdownTitle='';
    countdowndate='';
    countdownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
}


//Event Listeners
countdownForm.addEventListener("submit",updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);