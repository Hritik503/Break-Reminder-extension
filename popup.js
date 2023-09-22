document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["timerValue", "reminderText"], ({ timerValue, reminderText }) => {
    const frequencyInput = document.getElementById("frequencyInput");
    frequencyInput.value = timerValue || "";

    const reminderTextElement = document.getElementById("reminderText");
    reminderTextElement.innerText = reminderText || "";

    if (!reminderText) {
      reminderTextElement.innerText = "Reminder cancelled";
    }
  });

  const setTimerBtn = document.getElementById("setTimerBtn");
  setTimerBtn.addEventListener("click", () => {
    const frequencyInput = document.getElementById("frequencyInput");
    const time = parseInt(frequencyInput.value, 10);

    chrome.storage.local.set({ timerValue: time });

    const reminderText = document.getElementById("reminderText");
    reminderText.innerText = `Reminder every ${time} minutes`;

    chrome.storage.local.set({ reminderText: reminderText.innerText });

    chrome.runtime.sendMessage({ time }, function (response) {
      console.log(response);
    });
  });

  const stopTimerBtn = document.getElementById("StopTimerBtn");
  stopTimerBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["timerValue", "reminderText"], () => {
      console.log("Timer value and reminder text cleared");
    });

    const frequencyInput = document.getElementById("frequencyInput");
    frequencyInput.value = "";

    const reminderText = document.getElementById("reminderText");
    reminderText.innerText = "Reminder Off";

    chrome.runtime.sendMessage({ CancelAlarm: true }, function (response) {
      console.log(response);
    });
  });

  chrome.storage.local.get("Website Link", ({ WebsiteLink }) => {
    const defaultWebsiteLink = "https://swayam.gov.in/";
    const WebsiteLinkToOpen = WebsiteLink || defaultWebsiteLink;

    const websiteTimerBtn = document.getElementById("jump-to-your-website-timer");
    websiteTimerBtn.addEventListener("click", () => {
      window.open(WebsiteLinkToOpen, "_blank");
    });
  });

  const settingsBtn = document.getElementById("settingsLink");

  settingsBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "settings.html" });
  });
});
