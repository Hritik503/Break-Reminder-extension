chrome.alarms.onAlarm.addListener(
    () => {
        chrome.notifications.create(
            // "Take A Break_alarm",
            {
                type: "basic",
                iconUrl: "alarm.jpg",
                title: "Please take a break.You have been Working for too long.",
                message: "",
                silent: false
            },
            () => { }
        )
    },
);
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.time)
            createAlarm(request.time);

        sendResponse(false);
    }
);

function createAlarm(timeInMinutes) {
    chrome.alarms.create(
        "Break From Work Alarm",
        {
            delayInMinutes: timeInMinutes,
            periodInMinutes: timeInMinutes
        }
    );
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cancelAlarm) {
      chrome.alarms.clear("Break From Work Alarm", function() {
        sendResponse("Alarm cancelled");
      });
    }
  });
