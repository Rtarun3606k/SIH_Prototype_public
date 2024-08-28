// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Form Submission for Booking (Form Validation)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const destination = document.getElementById('destination').value;
    const dates = document.getElementById('dates').value;
    const travelers = parseInt(document.getElementById('travelers').value, 10);

    // Check for empty fields
    if (!destination || !dates || !travelers) {
        alert('Please fill in all fields before booking.');
        return;
    }

    // Check if the date is in the future
    const today = new Date().toISOString().split('T')[0];
    if (dates < today) {
        alert('Please select a future date.');
        return;
    }

    // Check if the number of travelers is within the valid range
    if (travelers < 1 || travelers > 10) {
        alert('Please enter a valid number of travelers (1-10).');
        return;
    }

    // Sample action after form submission
    alert(`Booking confirmed for ${destination} on ${dates} for ${travelers} traveler(s).`);
    // Optionally, redirect to a confirmation page or process the data
    // window.location.href = 'confirmation.html';
});

// Scroll Header Background on Scroll (Sticky Header Effect)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Function to Show Details for Gallery Items
function showDetails(place) {
    let details = '';

    switch (place) {
        case 'hawaii':
            details = 'Hawaii: A stunning tropical paradise with lush greenery, volcanoes, and world-famous beaches. Perfect for adventure and relaxation.';
            break;
        case 'paris':
            details = 'Paris: The city of lights, known for the Eiffel Tower, exquisite cuisine, romantic ambiance, and rich cultural heritage.';
            break;
        case 'tokyo':
            details = 'Tokyo: A vibrant city where traditional temples coexist with modern skyscrapers, offering a unique experience of culture and innovation.';
            break;
        default:
            details = 'Details not available.';
    }

    alert(details);
}
