// Function to add a link to local storage and display it as a saved link
function addSavedLink() {
    const linkInput = document.getElementById('websiteLink');
    const link = linkInput.value.trim();
  
    if (link) {
      // Retrieve existing saved links from local storage
      const savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
  
      // Add the new link to the saved links array
      savedLinks.push(link);
  
      // Save the updated saved links back to local storage
      localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
  
      // Clear the input field
      linkInput.value = '';
  
      // Update the list of saved links
      displaySavedLinks();
    }
  }
  
  // Function to display saved links from local storage
  function displaySavedLinks() {
    const savedLinksContainer = document.getElementById('savedLinks');
    savedLinksContainer.innerHTML = '';
  
    // Retrieve saved links from local storage
    const savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
  
    if (savedLinks.length === 0) {
      savedLinksContainer.innerHTML = '<p>No saved links yet.</p>';
    } else {
      const ul = document.createElement('ul');
      savedLinks.forEach((link) => {
        const li = document.createElement('li');
        li.textContent = link;
        ul.appendChild(li);
      });
      savedLinksContainer.appendChild(ul);
    }
  }
  
  // Add an event listener to the "Save" button
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', addSavedLink);
  
  // Display saved links when the page loads
  window.addEventListener('load', displaySavedLinks);
  