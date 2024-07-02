
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
    document.getElementById("web-content").innerHTML = '<div class="flex w-full flex-wrap items-center justify-center h-full" id="main-content"><p class="text-primary text-sm p-4">Select an item on the left or type above to search.</p></div><div class="player" id="player"><div class="player-content"> <div class="player-control"><div class="controls" id="replay"><i class="fa-solid fa-rotate-left"></i></div><div class="controls" id="play"><i class="fa-solid fa-play"></i></div><div class="controls" id="volume"><i class="fa-solid fa-volume-high"></i></div></div><div class="player-line"><input type="range" name="player-range" id="player-range" min="0" max="1" step="0.01" value="0"></div><div class="player-time" id="player-time"></div></div><div class="player-voice-wave"><div class="form-wave" data-audio-file=""></div></div><!-- footer add button --><div class="footer-button"><!-- for other buttons --><span></span><button class="btn">Add</button></div></div>';
    let wavesurfer = null;
    let playerTime = document.getElementById('player-time');
    let playControl = document.getElementById('play');
    let replayControl = document.getElementById('replay');
    let volumeControl = document.getElementById('volume');
    let rangeControl = document.getElementById('player-range');










    // Sample directory data (nested structure with folders and files)
    const directoryData = [
        {
            name: "Impact",
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
                            <div class="wave-form" data-audio-file="Media/${item.name}/${child.name}">
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


    // document.querySelectorAll('.wave-form').forEach(waveform => {
    //     const audioFile = waveform.getAttribute('data-audio-file');
    //     const wavesurfer = WaveSurfer.create({
    //         container: waveform,
    //         waveColor: '#ffffffce',
    //         progressColor: '#383351',
    //         height: 110,
    //         barWidth: 4,
    //         responsive: true,
    //         barRadius: 4,
    //         url: audioFile,
    //     });

    //     // wavesurfer.on('interaction', () => {
    //     //     wavesurfer.play();
    //     // });
    // });
    // if (playControl && replayControl && volumeControl && rangeControl) {
    //     document.querySelectorAll(".voice-card").forEach(function (voiceCard) {
    //         voiceCard.addEventListener("click", function () {
    //             // get the audio file from .voice-card> .wave-form
    //             let audioFile_play = voiceCard.querySelector(".wave-form").getAttribute("data-audio-file");

    //             // form-wave
    //             let form_wave = document.querySelector(".form-wave");

    //             // remove data-audio-file from form_wave
    //             form_wave.removeAttribute("data-audio-file");
    //             form_wave.innerHTML = '';

    //             form_wave.setAttribute("data-audio-file", audioFile_play);

    //             // debug the files are ready to play or not
    //             // console.log('audio file ready to play');

    //             if (wavesurfer) {
    //                 wavesurfer.destroy();
    //             }

    //             wavesurfer = WaveSurfer.create({
    //                 container: form_wave,
    //                 waveColor: '#ffffffce',
    //                 progressColor: '#383351',
    //                 height: 90,
    //                 barWidth: 4,
    //                 responsive: true,
    //                 barRadius: 4,
    //                 url: audioFile_play,
    //             });

    //             wavesurfer.on('ready', function () {
    //                 // Get the duration of the audio file
    //                 let duration = wavesurfer.getDuration();

    //                 // Format the duration to HH:MM:SS
    //                 let formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);

    //                 // Set the formatted duration to the player-time element
    //                 playerTime.innerText = formattedDuration;

    //                 // Reset range control
    //                 rangeControl.value = 0;
    //             });

    //             wavesurfer.on('audioprocess', function () {
    //                 let currentTime = wavesurfer.getCurrentTime();
    //                 let duration = wavesurfer.getDuration();
    //                 let remainingTime = duration - currentTime;
    //                 let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
    //                 playerTime.innerText = formattedTime;

    //                 // Update range input
    //                 rangeControl.value = currentTime / duration;
    //             });

    //             wavesurfer.on('seek', function () {
    //                 let currentTime = wavesurfer.getCurrentTime();
    //                 let duration = wavesurfer.getDuration();
    //                 let remainingTime = duration - currentTime;
    //                 let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
    //                 playerTime.innerText = formattedTime;
    //             });

    //             wavesurfer.on('finish', function () {
    //                 // Reset play button to 'play' icon
    //                 playControl.querySelector('i').classList.remove('fa-pause');
    //                 playControl.querySelector('i').classList.add('fa-play');
    //             });

    //             // Show the player
    //             let player = document.getElementById('player');

    //             // Ensure the player's right style is set to 0 initially if it doesn't exist
    //             if (player) {
    //                 if (!player.style.display) {
    //                     player.style.display = 'block';
    //                 }
    //                 if (player.style.block === 'block') {
    //                     player.style.block = 'none';
    //                 }
    //             }
    //         });
    //     });

    //     playControl.addEventListener('click', function () {
    //         if (wavesurfer) {
    //             wavesurfer.playPause();
    //             this.querySelector('i').classList.toggle('fa-play');
    //             this.querySelector('i').classList.toggle('fa-pause');
    //         }
    //     });

    //     replayControl.addEventListener('click', function () {
    //         if (wavesurfer) {
    //             wavesurfer.seekTo(0);
    //             wavesurfer.play();
    //             playControl.querySelector('i').classList.remove('fa-play');
    //             playControl.querySelector('i').classList.add('fa-pause');
    //         }
    //     });

    //     volumeControl.addEventListener('click', function () {
    //         if (wavesurfer) {
    //             let currentVolume = wavesurfer.getVolume();
    //             let newVolume = currentVolume === 0 ? 1 : 0;
    //             wavesurfer.setVolume(newVolume);
    //             this.querySelector('i').classList.toggle('fa-volume-high');
    //             this.querySelector('i').classList.toggle('fa-volume-mute');
    //         }
    //     });

    //     rangeControl.addEventListener('input', function () {
    //         if (wavesurfer) {
    //             let seekTo = this.value * wavesurfer.getDuration();
    //             wavesurfer.seekTo(seekTo / wavesurfer.getDuration());
    //         }
    //     });
    // }



    initializeFavorites();

    // Call initializeDirectory to set up the observer
    initializeDirectory();



    // // Initialize WaveSurfer for all wave-forms
    // initializeWaveSurfer();

    // // Initialize player controls for all voice-cards
    // initializePlayerControls();
});

// // Function to initialize WaveSurfer for each .wave-form
// function initializeWaveSurfer() {
//     // Select all .wave-form elements
//     const waveForms = document.querySelectorAll('.wave-form');

//     // Iterate over each .wave-form and initialize WaveSurfer
//     waveForms.forEach(waveform => {
//         const audioFile = waveform.getAttribute('data-audio-file');
//         const wavesurfer = WaveSurfer.create({
//             container: waveform,
//             waveColor: '#ffffffce',
//             progressColor: '#383351',
//             height: 110,
//             barWidth: 4,
//             responsive: true,
//             barRadius: 4,
//             url: audioFile,
//         });

//         // Save the WaveSurfer instance to the element for further interaction
//         waveform.wavesurfer = wavesurfer;
//     });
// }

// // Function to handle card click and initialize player controls
// function initializePlayerControls() {
//     // Select all .voice-card elements
//     const voiceCards = document.querySelectorAll('.voice-card');

//     // Get player controls
//     const playButton = document.getElementById('play');
//     const replayButton = document.getElementById('replay');
//     const volumeButton = document.getElementById('volume');
//     const rangeControl = document.getElementById('player-range');
//     const playerTime = document.getElementById('player-time');

//     // Initialize WaveSurfer and player controls for each .voice-card
//     voiceCards.forEach(voiceCard => {
//         // Add click event listener to .voice-card
//         voiceCard.addEventListener('click', function () {
//             // Get the associated WaveSurfer instance from .wave-form
//             const wavesurfer = this.querySelector('.wave-form').wavesurfer;

//             // Set data-audio-file to player's .form-wave
//             const audioFile = this.querySelector('.wave-form').getAttribute('data-audio-file');
//             const formWave = document.querySelector('.form-wave');
//             formWave.setAttribute('data-audio-file', audioFile);
//             formWave.innerHTML = ''; // Clear any previous WaveSurfer instance

//             // Destroy previous WaveSurfer instance if exists
//             if (wavesurfer) {
//                 wavesurfer.destroy();
//             }

//             // Initialize new WaveSurfer instance for player
//             wavesurfer = WaveSurfer.create({
//                 container: formWave,
//                 waveColor: '#ffffffce',
//                 progressColor: '#383351',
//                 height: 90,
//                 barWidth: 4,
//                 responsive: true,
//                 barRadius: 4,
//                 url: audioFile,
//             });

//             // Update player controls and events
//             wavesurfer.on('ready', function () {
//                 let duration = wavesurfer.getDuration();
//                 let formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);
//                 playerTime.innerText = formattedDuration;
//                 rangeControl.value = 0;
//             });

//             wavesurfer.on('audioprocess', function () {
//                 let currentTime = wavesurfer.getCurrentTime();
//                 let duration = wavesurfer.getDuration();
//                 let remainingTime = duration - currentTime;
//                 let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
//                 playerTime.innerText = formattedTime;
//                 rangeControl.value = currentTime / duration;
//             });

//             wavesurfer.on('seek', function () {
//                 let currentTime = wavesurfer.getCurrentTime();
//                 let duration = wavesurfer.getDuration();
//                 let remainingTime = duration - currentTime;
//                 let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
//                 playerTime.innerText = formattedTime;
//             });

//             wavesurfer.on('finish', function () {
//                 playButton.querySelector('i').classList.remove('fa-pause');
//                 playButton.querySelector('i').classList.add('fa-play');
//             });

//             // Example: Play/Pause button click event
//             playButton.addEventListener('click', function () {
//                 if (wavesurfer) {
//                     wavesurfer.playPause();
//                     this.querySelector('i').classList.toggle('fa-play');
//                     this.querySelector('i').classList.toggle('fa-pause');
//                 }
//             });

//             // Example: Replay button click event
//             replayButton.addEventListener('click', function () {
//                 if (wavesurfer) {
//                     wavesurfer.seekTo(0);
//                     wavesurfer.play();
//                     playButton.querySelector('i').classList.remove('fa-play');
//                     playButton.querySelector('i').classList.add('fa-pause');
//                 }
//             });

//             // Example: Volume button click event
//             volumeButton.addEventListener('click', function () {
//                 if (wavesurfer) {
//                     let currentVolume = wavesurfer.getVolume();
//                     let newVolume = currentVolume === 0 ? 1 : 0;
//                     wavesurfer.setVolume(newVolume);
//                     this.querySelector('i').classList.toggle('fa-volume-high');
//                     this.querySelector('i').classList.toggle('fa-volume-mute');
//                 }
//             });

//             // Example: Range input change event
//             rangeControl.addEventListener('input', function () {
//                 if (wavesurfer) {
//                     let seekTo = this.value * wavesurfer.getDuration();
//                     wavesurfer.seekTo(seekTo / wavesurfer.getDuration());
//                 }
//             });

//             // Display the player (if not already displayed)
//             const player = document.getElementById('player');
//             if (player) {
//                 player.style.display = 'block';
//             }
//         });
//     });
// }



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
