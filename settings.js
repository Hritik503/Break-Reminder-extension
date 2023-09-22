document.addEventListener("DOMContentLoaded", () => {
    const settingsForm = document.getElementById("settingsForm");
  
    settingsForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const WebsiteLinkInput = document.getElementById("websiteLink");
      const WebsiteLink = WebsiteLinkInput.value;
  
      chrome.storage.local.set({ WebsiteLink }, () => {
        console.log("Website link saved!");
      });
    });
  });
  