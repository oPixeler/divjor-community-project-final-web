let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        document.querySelector("footer").classList.add("footer-hidden");
    } else {
        document.querySelector("footer").classList.remove("footer-hidden");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);


// Image scroller functionality
let currentIndex = 0;
const scroller = document.querySelector('.image-scroller-wrapper');
const images = document.querySelectorAll('.image-scroller img');
const totalImages = images.length / 2; // Adjusted for duplicated images
const imagesToShow = 3;


function scrollImages() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = currentIndex * (100 / imagesToShow);
    scroller.style.transition = 'transform 0.5s ease-in-out';
    scroller.style.transform = `translateX(-${offset}%)`;


    // When the last image is reached, reset the scroll position instantly to the first set of images
    if (currentIndex === 0) {
        setTimeout(() => {
            scroller.style.transition = 'none';
            scroller.style.transform = 'translateX(0)';
        }, 500); // Delay to match the transition duration
    }
}


setInterval(scrollImages, 3000);


// Function to fetch profiles from Google Sheets
async function fetchProfiles() {
    const sheetId = '1OFzMn8CMRGIOhmKDF1LjZwf6NiLrJn9-vo7orjxC5a0';
    const apiKey = 'AIzaSyBs5Sl_2oiOo_0wSUDfQvAuNQo-PVlHbB4';
    const range = 'J2:K';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
 
    try {
      const response = await fetch(url);
      const data = await response.json();
      const profiles = data.values;
      if (profiles.length > 0) {
        displayProfiles(profiles);
      } else {
        console.log('No profiles found in the Google Sheets data.');
      }
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
    }
  }
 
  function displayProfiles(profiles) {
    const profileWrapper = document.getElementById('profile-scroller-wrapper');
    if (!profileWrapper) {
      console.error('Error: profile-scroller-wrapper element not found on the page.');
      return;
    }
 
    const imagePaths = ['profile1.jpg', 'profile2.jpg', 'profile3.jpg', 'profile4.jpg', 'profile5.jpg', 'profile6.jpg'];
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');
    profileContainer.style.display = 'flex';
    profileContainer.style.overflowX = 'auto';
    profileContainer.style.scrollSnapType = 'x mandatory';
 
    profiles.forEach((profile, index) => {
      const [name, message] = profile;
      const imageUrl = imagePaths[index % imagePaths.length];
 
      const profileDiv = document.createElement('div');
      profileDiv.classList.add('profile');
      profileDiv.style.flexShrink = '0';
      profileDiv.style.scrollSnapAlign = 'start';
      profileDiv.style.width = '300px'; // Adjust the width as needed
      profileDiv.style.marginRight = '20px'; // Add some spacing between profiles
      profileDiv.innerHTML = `
        <div class="profile-box">
          <img src="${imageUrl}" alt="${name}" class="profile-image">
          <h4 class="profile-name">${name}</h4>
          <p class="profile-bio">${message}</p>
        </div>
      `;
      profileContainer.appendChild(profileDiv);
    });
 
    profileWrapper.innerHTML = ''; // Clear the existing content
    profileWrapper.appendChild(profileContainer);
  }
 
// Call fetchProfiles function to fetch and display profiles when the page loads
fetchProfiles();

