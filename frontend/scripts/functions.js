function toggleMenu(x) {
    var element; var e2; var e3;
    switch (x) {
      case 0: 
        element = document.getElementById("puncy");
        element.classList.toggle("punctuation-clicked");
        return;
      case 1:
        element = document.getElementById("numby");
        element.classList.toggle("numbers-clicked");
        return;
      case 2:
        element = document.getElementById("timey30");
        element.classList.toggle("time30-clicked")
        var e2 = document.getElementById("timey15");
        var e3 = document.getElementById("timey60");
        if (e2.className !== "time15") {
          e2.classList.toggle("time-clicked");
        } if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked")
        }
        return;
      case 3:
        element = document.getElementById("timey15");
        element.classList.toggle("time-clicked")
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey60");
        if (e2.className == "time30") {
          e2.classList.toggle("time30-clicked");
        } if (e3.className !== "time60") {
          e3.classList.toggle("time-clicked")
        }
        return;
      case 4:
        element = document.getElementById("timey60");
        element.classList.toggle("time-clicked")
        e2 = document.getElementById("timey30");
        e3 = document.getElementById("timey15");
        if (e2.className == "time30") {
          e2.classList.toggle("time30-clicked");
        } if (e3.className !== "time15") {
          e3.classList.toggle("time-clicked")
        }
        return;
    }
}

//todo import React, { useState } from 'react';
function startTimer() {
    //make endTime into a parameter that changes based on the buttons
   var countDown = 0;
   var endTime = 5;
   var timerDisplay = document.getElementById("time");
   var update = setInterval(function () {
       var now = countDown++;
       timerDisplay.innerHTML = "Time elapsed: " + countDown;
 
 
       if (countDown > endTime) {
           clearInterval(update);
           timerDisplay.innerHTML = "Time's up!!!";
       }
   }, 1000);
 }
 let timerStarted = false;
 function startTimerOnce(){
    if (!timerStarted)
    {
        startTimer();
        timerStarted = true;
    }
 }
 