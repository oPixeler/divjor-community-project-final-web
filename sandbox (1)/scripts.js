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
    const range = 'J2:L'; // Adjust range to match columns J, L, and M
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const profiles = data.values; // Assuming first row contains headers
        displayProfiles(profiles);
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
    }
}

// Function to display profiles on the page
function displayProfiles(profiles) {
    const profileWrapper = document.getElementById('profile-scroller-wrapper');
    const imagePaths = ['images/pfp1.jpg', 'images/pfp2.jpg', 'images/pfp3.jpg', 'images/pfp4.jpg', 'images/pfp5.jpg', 'images/pfp6.jpg'];

    profiles.forEach(profile => {
        const [name, message] = profile;
        const imageUrl = imagePaths[Math.floor(Math.random() * imagePaths.length)]; // Randomly select an image

        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.innerHTML = `
            <div class="profile-box">
                <img src="${imageUrl}" alt="${name}" class="profile-image">
                <h4 class="profile-name">${name}</h4>
                <p class="profile-bio">${message}</p>
            </div>
        `;
        profileWrapper.appendChild(profileDiv);
    });
}

// Call fetchProfiles function to fetch and display profiles when the page loads
fetchProfiles();
