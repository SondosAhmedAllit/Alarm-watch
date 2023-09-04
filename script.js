let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("./alarm.mp3");
let initialHour=0,initialMinute=0,alarmIndex=0;

/// لاضافة الصفر للرقم ذات الخانة الواحدة
const appendZero = (value) => (value < 10 ? "0" + value : value);

/// للبحث عن القيمة بداخل الاوبجكت
const searchObject = (parameter , value) => {
    let alarmObject ,objIndex ,
    exists = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter]== value){
            exists=true;
            alarmObject = alarm;
            objIndex = index ;
            return false;

        }

    });
    return [exists , alarmObject , objIndex];

};

///لعرض الوقت 
 function displayTimer() {
    let date = new Date ();
    let [ hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  ///المنبة
  

alarmsArray.forEach((alarm ,index) => {
    if (alarm.isActive) {
        if ( `${alarm.alarmHour}:${alarm.alarmMinute}`
         ===  `${hours} : ${minutes}`) {
            alarmSound.play();
            alarmSound.loop = true;
        }
    }
});
}
 const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue <10 ){
        inputValue = appendZero(inputValue);
    }
    return inputValue;

 };
 hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
 });
 minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
 });

 const createAlarm = (alarmobj) =>{
    const {id,alarmHour,alarmMinute}= alarmobj ;
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id",id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.addEventListener("click",(e) =>{
        if (e.target.checked){
            startAlarm(e);  }
            else {
                stopAlarm(e);
            }
      
    });
    alarmDiv.appendChild(checkbox);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `delete`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) =>
    deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
 };

 setAlarm.addEventListener("click",() =>{
    alarmIndex +=1;

    let alarmobj = {};
    alarmobj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmobj.alarmHour = hourInput.value;
    alarmobj.alarmMinute = minuteInput.value;
    alarmobj.isActive = false;
    console.log(alarmobj);
    alarmsArray.push(alarmobj);
    createAlarm(alarmobj);
    hourInput.value=appendZero(initialHour);
    minuteInput.value=appendZero(initialMinute);
 });

 ///بدء التنبية
 const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists,obj,index] = searchobject("id",searchId);
    if(exists){
        alarmsArray[index].isActive= true;
    } 
 };
 ///ايقاف التنبية
 const stopAlarm = (e) => {
    let searchId = e.target.parentElement.
    parentElement.getAttribute("data-id");
    let [exists,obj,index] = searchobject("id",searchId);
    if(exists){
        alarmsArray[index].isActive= false;
        alarmSound.pause();
    } 
 };
///حذف المنبة
const deleteAlarm = (e) =>{
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists,obj,index] = searchobject("id",searchId);
    if(exists){
        e.target.parentElement.parentElement.remove();
        alarmsArray.splice(index,1);
    } 
};

 window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray =[];
    hourInput.value = appendZero(initialHour);
   minuteInput.value = appendZero(initialMinute);
}