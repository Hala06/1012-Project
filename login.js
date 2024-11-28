// Get the input and button elements
const playerNameInput = document.getElementById('playerName');
const submitButton = document.getElementById('submitButton');

// Add event listener to the submit button
submitButton.addEventListener('click', function () {
  const playerName = playerNameInput.value.trim(); // Get and trim the input value

  if (playerName) {
    // Store the player's name in localStorage
    localStorage.setItem('playerName', playerName);

    // Redirect to Page 1
    window.location.href = 'page1.html'; // Replace 'page1.html' with the actual file name
  } else {
    alert('Please enter your name!');
  }
});
