function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    // var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      // daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  function calculateEndOfToday(){
    //Get the current time in PST
    var currentUserTime = new Date();
    console.log("Current User Time: " + currentUserTime);
    //Obtain the destination's current UTC Time Offset.
    var currentMonth = currentUserTime.getMonth()+1;
    var pacificOffset;
    //If the current month is 1,2, or 12, then set the PST offset.
    if([1,2,12].includes(currentMonth)){
        pacificOffset = -8;
    }
    else{
        //if the current month is between 3-11, then set the PDT offset.
        pacificOffset = -7;
    }
    //Check the current pacific offset.
    console.log('Current pacific offset is:' + pacificOffset);

    //Use currentUserTime to get the # of ms since 1970
    var currentUserTimeMilliSeconds = currentUserTime.getTime();
    console.log("Current User Time in ms: " + currentUserTimeMilliSeconds);
    //getTimezoneOffset() is returned in minutes and needs to be converted to milliseconds
    var userUTCDifferential = currentUserTime.getTimezoneOffset() * 60000;
    console.log("UTC Differential: " + userUTCDifferential);
    //Add the user's time with PST differential to get the current time in UTC, in ms.
    var currentTimeUTC = currentUserTimeMilliSeconds + userUTCDifferential;
    console.log("current Time in UTC: " + currentTimeUTC);
    //multiply 3600000 (equiv. 1 hr) milliseconds times the offset to get the pacific time in ms.
    var currentPacificTimeMS = currentTimeUTC + (3600000*pacificOffset);
    console.log("Current Pacific Time in MS: " + currentPacificTimeMS);
    //Current Time Object on the Pacific Coast of USA.
    var currentPacificTimeObj = new Date(currentPacificTimeMS);
    console.log("Current Pacific Time: " + currentPacificTimeObj.toLocaleString());
    //Using current Time in PST, get it's nearest midnight in the future.
    var endofCurrentPacificTimeMS = currentPacificTimeObj.setHours(24,0,0,0);
    var endofCurrentPacificTime = new Date(endofCurrentPacificTimeMS);
    console.log("The end of the day in Pacific Time: " + endofCurrentPacificTime);

    return endofCurrentPacificTime;
  }
  var deadline = calculateEndOfToday();

  initializeClock('clockdiv', deadline);