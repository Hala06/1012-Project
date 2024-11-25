"use strict";

// Settings object to store values
let settings = {
    volume: 50,
    music: false,
    theme: 'default'
};

// Load settings into the UI
document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volume');
    const musicToggle = document.getElementById('music-toggle');
    const themeSelector = document.getElementById('theme-selector');
    const backButton = document.getElementById('back-button');
    const saveButton = document.getElementById('save-button');

    // Initialize UI with current settings
    volumeSlider.value = settings.volume;
    musicToggle.checked = settings.music;
    themeSelector.value = settings.theme;

    // Save button functionality
    saveButton.addEventListener('click', () => {
        settings.volume = volumeSlider.value;
        settings.music = musicToggle.checked;
        settings.theme = themeSelector.value;

        alert('Settings saved!');
    });

    // Back button functionality
    backButton.addEventListener('click', () => {
        window.location.href = 'page1.html'; 
    });
});

