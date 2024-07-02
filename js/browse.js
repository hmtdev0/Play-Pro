
const menuButtons = ["Browse", "Edit"];
let activeTab = 0;
let tabsHtml = "";

// Function to handle tab button clicks
function handleTabClick(index) {
    activeTab = index; // Set the clicked tab as active
    updateTabs(); // Update the tab buttons with new active state
}
// Function to update the tab buttons based on activeTab
function updateTabs() {
    tabsHtml = "";
    for (let index = 0; index < menuButtons.length; index++) {
        tabsHtml += `<button style="background-color: transparent" type="button" onclick="handleTabClick(${index})" class="${activeTab === index ? 'text-white' : 'text-gray-500'} border-none text-xl mr-1 font-bold underline">${menuButtons[index]}</button>`;
    }
    document.getElementById("tabs").innerHTML = tabsHtml;
}
// Initial rendering of tabs
updateTabs();
document.getElementById("tabs").innerHTML = tabsHtml;


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("web-content").innerHTML = '<div class="flex w-full flex-wrap items-center justify-center h-full" id="main-content"><p class="text-primary text-sm p-4">Select an item on the left or type above to search.</p></div>';

    // Sample directory data (nested structure with folders and files)
    const directoryData = [
        {
            name: "Impacts",
            type: "folder",
            children: [
                { name: "PM_Impact 01 Strong.wav", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                { name: "PM_Impact 02 Quick.wav", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                { name: "PM_Impact 03 Epic.wav", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                { name: "PM_Impact 04 Stutter.wav", type: "file", track: "Impacts/PM_Impact 04 Stutter.png" },
                { name: "PM_Impact 05 Stutter Boom.wav", type: "file", track: "Impacts/PM_Impact 05 Stutter Boom.png" }
            ]
        },
        {
            name: "Random",
            type: "folder",
            children: [
                { name: "PM_Bonus 01 Lion Roar.wav", type: "file", track: "Random/PM_Bonus 01 Lion Roar.png" },
                { name: "PM_Bonus 02 Crowd Cheer.wav", type: "file", track: "Random/PM_Bonus 02 Crowd Cheer.png" }
            ]
        },
        {
            name: "Risers",
            type: "folder",
            children: [
                { name: "PM_Riser 01 Quick.wav", type: "file", track: "Risers/PM_Riser 01 Quick.png" },
                { name: "PM_Riser 02 Long.wav", type: "file", track: "Risers/PM_Riser 02 Long.png" },
                { name: "PM_Riser 03 Deep.wav", type: "file", track: "Risers/PM_Riser 03 Deep.png" }
            ]
        },
        {
            name: "Whooshes",
            type: "folder",
            children: [
                { name: "PM_Whoosh 01 Deep.wav", type: "file", track: "Whooshes/PM_Whoosh 01 Deep.png" },
                { name: "PM_Whoosh 02 Shallow.wav", type: "file", track: "Whooshes/PM_Whoosh 02 Shallow.png" },
                { name: "PM_Whoosh 03 Airy.wav", type: "file", track: "Whooshes/PM_Whoosh 03 Airy.png" },
                { name: "PM_Whoosh 04 Middle.wav", type: "file", track: "Whooshes/PM_Whoosh 04 Middle.png" },
                { name: "PM_Whoosh 05 Textured.wav", type: "file", track: "Whooshes/PM_Whoosh 05 Textured.png" }
            ]
        }
    ];
    // Get the container where cards will be appended
    const container = document.getElementById('main-content');
    // Function to populate the directory sidebar
    function populateDirectory(data, parentElement) {
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.classList.add('directory-item');

            if (item.type === 'folder' && item.children) {
                const ul = document.createElement('ul');
                ul.style.display = 'none'; // Initially hide subfolders
                li.appendChild(ul);

                // Event listener for folders to toggle visibility of subfolders
                li.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent parent folders from collapsing

                    const contentArea = document.getElementById('main-content');
                    contentArea.classList.add('justify-start', 'p-1', 'items-start');
                    contentArea.style.height = "auto";
                    contentArea.innerHTML = '';

                    // Display each file name
                    item.children.forEach((child, _id) => { // Adjusted here
                        contentArea.innerHTML += `<div class="w-full sm:w-1/2 lg:w-1/3" style="padding:0 5px">
                        <div class="card voice-card" style="margin: 4px 0">
                            <div class="wave-form" data-audio-file="./Media/${item.name}/${child.name}">
                                <img class="w-full" style="cursor: pointer; max-height: 100px" src="./Media/${child.track}" />
                            </div>
                            <div class="voice-card-content">
                                <div class="voice-card-content-det">
                                    <div class="voice-det">
                                        <div class="image_cover" style="padding:0 3px; border: 1px solid #01E0B9; height: 24px;">
                                            <img src="images/audio-wave.png" alt="" class="img" style="height: 100%;">
                                        </div>
                                        <span class="text-sm">${child.name}</span>
                                    </div>
                                    <button type="button" class="bg-transparent border-none star-icon add-to-favorites" data-_id="${_id}" data-files="${child.track}" data-folder="${item.name}" data-child-folder="${item.name}" onclick="toggleFavorite(event)">
                                        <i class="fa-solid fa-star"></i>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>`;
                    });

                    if (ul.style.display === 'none') {
                        ul.style.display = 'block';
                    } else {
                        ul.style.display = 'none';
                    }
                });

                // Recursively populate subfolders
                populateDirectory(item.children, ul);
            } else if (item.type === 'file') {
                // Display files directly without further action
                li.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent files from triggering further actions
                    displayFileDetails(item); // Example function to handle file details display
                });
            }

            parentElement.appendChild(li);
        });
    }
    // Example function to display file details
    function displayFileDetails(file) {
        console.log('Clicked file:', file.name);
    }
    // Function to display details of selected directory item
    function displayDirectoryDetails(item) {
        const contentArea = document.querySelector('.content');
        contentArea.innerHTML = `<h2>${item.name}</h2><p>Type: ${item.type}</p>`;
    }


    // Function to handle search input
    function handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        const directoryItems = document.querySelectorAll('.directory-item');

        directoryItems.forEach(item => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                // Highlight the matched text
                const regex = new RegExp(searchTerm, 'gi');
                item.classList.display = 'block'; // Show the item
                item.style.display = 'block'; // Show the item
                item.classList.add('bg-gray-100');
            } else {
                item.style.display = 'none'; // Hide the item if it doesn't match
            }
        });
    }

    // Initialize the directory
    const directoryContainer = document.getElementById('directory');
    populateDirectory(directoryData, directoryContainer);

    // Attach event listener to search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);


    let wavesurfer = null;
    let playerTime = null;
    let playControl = null;
    let replayControl = null;
    let volumeControl = null;
    let rangeControl = null;

    // Function to create the player section dynamically
    function createPlayer(audioFile) {
        // Remove existing player section if it exists
        let existingPlayer = document.getElementById('player');
        if (existingPlayer) {
            existingPlayer.parentNode.removeChild(existingPlayer);
        }
        // Create player section
        let playerSection = document.createElement('div');
        playerSection.classList.add('player');
        playerSection.id = 'player';
        playerSection.innerHTML = `
                <div class="player-content">
                    <div class="player-control">
                        <div class="controls" id="replay"><i class="fa-solid fa-rotate-left"></i></div>
                        <div class="controls" id="play"><i class="fa-solid fa-play"></i></div>
                        <div class="controls" id="volume"><i class="fa-solid fa-volume-high"></i></div>
                    </div>
                    <div class="player-line">
                        <input type="range" name="player-range" id="player-range" min="0" max="1" step="0.01" value="0">
                    </div>
                    <div class="player-time" id="player-time"></div>
                </div>
                <div class="player-voice-wave">
                    <div class="form-wave" data-audio-file="${audioFile}"></div>
                </div>
                <div class="footer-button">
                    <span></span>
                    <button class="btn">Add</button>
                </div>
            `;

        console.log('player is creating')

        // Append player section to web-content
        let webContent = document.getElementById('web-content');
        // webContent.innerHTML = ''; // Clear existing content
        webContent.appendChild(playerSection);
        // displaying player
        playerSection.style.display = 'block';

        // Assign variables to elements in the player section
        playerTime = document.getElementById('player-time');
        playControl = document.getElementById('play');
        replayControl = document.getElementById('replay');
        volumeControl = document.getElementById('volume');
        rangeControl = document.getElementById('player-range');

        // Initialize WaveSurfer
        wavesurfer = WaveSurfer.create({
            container: '.form-wave',
            waveColor: '#ffffffce',
            progressColor: '#383351',
            height: 90,
            barWidth: 4,
            responsive: true,
            barRadius: 4,
            backend: 'WebAudio', // Use 'WebAudio' or 'MediaElement' based on compatibility
            normalize: true, // Normalize audio levels across all browsers
            url: audioFile
        });

        // Event listeners for WaveSurfer events
        wavesurfer.on('ready', function () {
            let duration = wavesurfer.getDuration();
            let formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);
            playerTime.innerText = formattedDuration;
            rangeControl.value = 0;
        });

        wavesurfer.on('audioprocess', function () {
            let currentTime = wavesurfer.getCurrentTime();
            let duration = wavesurfer.getDuration();
            let remainingTime = duration - currentTime;
            let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
            playerTime.innerText = formattedTime;
            rangeControl.value = currentTime / duration;
        });

        wavesurfer.on('seek', function () {
            let currentTime = wavesurfer.getCurrentTime();
            let duration = wavesurfer.getDuration();
            let remainingTime = duration - currentTime;
            let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
            playerTime.innerText = formattedTime;
        });

        wavesurfer.on('finish', function () {
            playControl.querySelector('i').classList.remove('fa-pause');
            playControl.querySelector('i').classList.add('fa-play');
        });

        // Event listener for play control
        playControl.addEventListener('click', function () {
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                this.querySelector('i').classList.remove('fa-pause');
                this.querySelector('i').classList.add('fa-play');
            } else {
                wavesurfer.play();
                this.querySelector('i').classList.remove('fa-play');
                this.querySelector('i').classList.add('fa-pause');
            }
        });

        // Event listener for replay control
        replayControl.addEventListener('click', function () {
            wavesurfer.stop();
            wavesurfer.play();
            playControl.querySelector('i').classList.remove('fa-play');
            playControl.querySelector('i').classList.add('fa-pause');
        });

        // Event listener for volume control
        volumeControl.addEventListener('click', function () {
            let currentVolume = wavesurfer.getVolume();
            wavesurfer.setVolume(currentVolume === 0 ? 1 : 0);
            this.querySelector('i').classList.toggle('fa-volume-up');
            this.querySelector('i').classList.toggle('fa-volume-mute');
        });

        // Event listener for range control
        rangeControl.addEventListener('input', function () {
            let seekTo = this.value * wavesurfer.getDuration();
            wavesurfer.seekTo(seekTo / wavesurfer.getDuration());
        });
    }

    // Event listener for .voice-card clicks
    document.addEventListener("click", function (event) {
        const voiceCard = event.target.closest(".voice-card");
        if (voiceCard) {
            const audioFile = voiceCard.querySelector(".wave-form").getAttribute("data-audio-file");
            if (audioFile) {
                createPlayer(audioFile);
            } else {
                console.error("Data attribute 'data-audio-file' not found on .wave-form element.");
            }
        }
    });




    initializeFavorites();

    // Call initializeDirectory to set up the observer
    initializeDirectory();

});



function checkAndSetColorForCards() {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
        // Get the files array from localStorage or initialize an empty array
        let filesArray = JSON.parse(localStorage.getItem('files')) || [];

        // Select all buttons with class .add-to-favorites
        let buttons = document.querySelectorAll('.add-to-favorites');

        // Iterate over each button
        buttons.forEach(button => {
            // Get the data-files attribute value of the current button
            let dataValue = button.getAttribute('data-files');

            // Check if dataValue exists in filesArray
            if (filesArray.includes(dataValue)) {
                // Set star color to '#EA8E37'
                button.querySelector('i').style.color = '#EA8E37';
            }
        });
    }
}



// Function to check and set star color based on localStorage data
function checkAndSetColorForCards() {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
        // Get the favorites array from localStorage or initialize an empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Select all buttons with class .add-to-favorites
        let buttons = document.querySelectorAll('.add-to-favorites');

        // Iterate over each button
        buttons.forEach(button => {
            // Get the data-files attribute value of the current button
            let dataValue = button.getAttribute('data-files');

            // Check if dataValue exists in favorites
            const isFavorite = favorites.some(favorite => favorite.files === dataValue);

            // Set star color based on whether it's in favorites
            if (isFavorite) {
                button.querySelector('i').style.color = '#EA8E37'; // Set star color
            } else {
                button.querySelector('i').style.color = ''; // Reset star color
            }
        });
    }
}



// Function to initialize directory and observe changes
function initializeDirectory() {
    const container = document.getElementById('main-content');

    // Observer configuration
    const observerConfig = { childList: true, subtree: true };

    // Callback function to handle changes
    const observerCallback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Child nodes have been added or removed from #main-content
                checkAndSetColorForCards();
            }
        }
    };

    // Create a new observer
    const observer = new MutationObserver(observerCallback);

    // Start observing #main-content
    observer.observe(container, observerConfig);

    // Initial call to set colors
    checkAndSetColorForCards();
}




// Function to handle the toggle favorite action
function toggleFavorite(event) {
    const button = event.currentTarget;
    const audioFileName = button.getAttribute('data-files'); // Retrieve audio file name from data-files attribute

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the item already exists in favorites
    const index = favorites.findIndex(favorite => favorite.files === audioFileName);

    if (index !== -1) {
        // Item exists, remove it from favorites
        favorites.splice(index, 1);
        button.querySelector('i').style.color = ''; // Reset star color
        console.log('Removed from favorites:', { files: audioFileName });
    } else {
        // Item doesn't exist, add it to favorites
        favorites.push({ files: audioFileName });
        button.querySelector('i').style.color = '#EA8E37'; // Set star color
        console.log('Added to favorites:', { files: audioFileName });
    }

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to initialize favorites functionality
function initializeFavorites() {
    // Select all .add-to-favorites buttons
    const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');

    // Attach click event listener to each .add-to-favorites button
    addToFavoritesButtons.forEach(button => {
        button.addEventListener('click', toggleFavorite);

        // Set initial star color based on existing favorites
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const files = button.getAttribute('data-files');

        // Check if the current item exists in favorites
        const exists = favorites.some(favorite => favorite.files === files);

        if (exists) {
            button.querySelector('i').style.color = '#EA8E37'; // Set star color
        } else {
            button.querySelector('i').style.color = ''; // Reset star color
        }
    });
}
