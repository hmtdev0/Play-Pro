const foldersData = [
    {
        folderName: "Impacts",
        files: ["Impacts/PM_Impact 01 Strong.wav", "Impacts/PM_Impact 02 Quick.wav"],
        childFolders: [
            {
                folderName: "Risers",
                files: ["Risers/PM_Riser 01 Quick.wav", "Risers/PM_Riser 02 Long.wav"],
                childFolders: []
            }
        ]
    },
    {
        folderName: "Transitions",
        files: [],
        childFolders: [
            {
                folderName: "Risers",
                files: ["transition_riser1.mp3", "transition_riser2.mp3"],
                childFolders: []
            }
        ]
    },
    {
        folderName: "Sound Effects",
        files: [],
        childFolders: [
            {
                folderName: "Risers",
                files: ["sound_riser1.mp3", "sound_riser2.mp3"],
                childFolders: []
            },
            {
                folderName: "Whooshes",
                files: ["whoosh1.mp3", "whoosh2.mp3"],
                childFolders: []
            },
            {
                folderName: "Impacts",
                files: ["sound_impact1.mp3", "sound_impact2.mp3"],
                childFolders: []
            },
            {
                folderName: "Bonus",
                files: ["bonus1.mp3", "bonus2.mp3"],
                childFolders: []
            }
        ]
    }
];
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
        tabsHtml += "<button style='background-color: transparent' type='button' onclick='handleTabClick(" + index + ")' class='" + (activeTab === index ? "text-white" : "text-gray-500") + " border-none text-xl mr-1 font-bold underline'>" + menuButtons[index] + "</button>";
    }
    document.getElementById("tabs").innerHTML = tabsHtml;
}
// Initial rendering of tabs
updateTabs();
document.getElementById("tabs").innerHTML = tabsHtml;


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.wave-form').forEach(waveform => {
        const audioFile = waveform.getAttribute('data-audio-file');
        const wavesurfer = WaveSurfer.create({
            container: waveform,
            waveColor: '#ffffffce',
            progressColor: '#383351',
            height: 110,
            barWidth: 4,
            responsive: true,
            barRadius: 4,
            url: audioFile,
        });

        // wavesurfer.on('interaction', () => {
        //     wavesurfer.play();
        // });
    });



    // navbar query
    // Get all nav-link elements
    const navbar_links = document.querySelectorAll('.nav-link, .navbar-nav-link');

    // Add click event listener to each nav-link
    navbar_links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Find the next sibling .navbar-nav or .navbar-nav-ul-link
            const navBar = this.nextElementSibling;

            // Toggle height of the corresponding .navbar-nav or .navbar-nav-ul-link
            if (navBar && (navBar.classList.contains('navbar-nav') || navBar.classList.contains('navbar-nav-ul-link'))) {
                if (navBar.style.height === 'auto') {
                    navBar.style.height = '0';
                } else {
                    navBar.style.height = 'auto';
                }
            }
        });
    });


    document.getElementById('search').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const links = document.querySelectorAll('.nav-link, .navbar-nav-link, .navbar-nav-li-link-a');
        const navs = document.querySelectorAll('.navbar-nav, .navbar-nav-ul-link');

        // Remove previous active classes and reset height
        links.forEach(link => link.classList.remove('active'));
        navs.forEach(nav => nav.style.height = '0');

        if (query) {
            // Search for matching text
            links.forEach(link => {
                if (link.innerText.toLowerCase().includes(query)) {
                    link.classList.add('active');

                    let parentNav = link.closest('ul');
                    while (parentNav) {
                        parentNav.style.height = 'auto';
                        parentNav = parentNav.parentElement.closest('ul');
                    }
                }
            });
        }
    });


});

// Function to populate main content area with files for selected folder
// function showFilesAgainstFolder(folderName) {
//     // Find the folder in foldersData
//     const folder = foldersData.find(folder => folder.folderName === folderName);

//     // Clear existing content in main area
//     const mainContent = document.getElementById('main-content');
//     mainContent.innerHTML = '';

//     // Iterate over files in the folder and create corresponding cards
//     folder.files.forEach(file => {
//         const cardHTML = `
//             <div class="card voice-card">
//                 <div class="wave-form" data-audio-file="./Media/${folderName}/${file}">
//                 </div>
//                 <div class="voice-card-content">
//                     <div class="voice-card-content-det">
//                         <div class="voice-det">
//                             <img src="images/audio-wave.png" alt="" class="img">
//                             <span>${file}</span>
//                         </div>
//                         <button class="bg-transparent border-none star-icon">
//                             <i class="fa-solid fa-star"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;

//         mainContent.innerHtml = cardHTML;
//     });
// }

// // Function to create a nested list structure recursively
// function createFolderList(folderData) {
//     // Create a new list item for the folder
//     const li = document.createElement('li');
//     li.classList.add('nav-list');

//     // Create the link for the folder
//     const link = document.createElement('a');
//     link.href = '#';
//     link.classList.add('nav-link');

//     // Create the span element with the folder name and icons
//     const span = document.createElement('span');
//     span.innerHTML = `
//         <i class="fa-solid fa-chevron-right"></i>
//         <i class="fa-solid fa-folder"></i>
//         ${folderData.folderName}
//     `;
//     link.appendChild(span);

//     // Append the link to the list item
//     li.appendChild(link);

//     // Check if the folder has child folders
//     if (folderData.childFolders.length > 0) {
//         // Create a nested ul element
//         const ul = document.createElement('ul');
//         ul.classList.add('navbar-nav');

//         // Iterate over child folders and create list items for each
//         folderData.childFolders.forEach(childFolder => {
//             const childLi = document.createElement('li');
//             childLi.classList.add('navbar-nav-list');

//             const childLink = document.createElement('a');
//             childLink.href = '#';
//             childLink.classList.add('navbar-nav-link');

//             const childSpan = document.createElement('span');
//             childSpan.innerHTML = `
//                 <i class="fa-solid fa-chevron-right"></i>
//                 <i class="fa-solid fa-folder"></i>
//                 ${childFolder.folderName}
//             `;
//             childLink.appendChild(childSpan);

//             childLi.appendChild(childLink);
//             ul.appendChild(childLi);
//         });

//         // Append the nested ul to the main list item
//         li.appendChild(ul);
//     }

//     return li;
// }

// // Function to handle click events on folder links
// function initializeClickHandlers() {
//     const folderLinks = document.querySelectorAll('.nav-link, .navbar-nav-link');

//     folderLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault(); // Prevent default link behavior

//             // Get the folder name from the link's text or data attribute
//             const folderName = this.querySelector('span').textContent.trim();

//             // Call function to populate main content area
//             showFilesAgainstFolder(folderName);
//         });
//     });
// }

// // Function to initialize the navigation bar
// function initializeNavBar() {
//     const navBar = document.getElementById('nav-bar');

//     // Clear existing content (if any)
//     navBar.innerHTML = '';

//     // Iterate over foldersData and create list items for each top-level folder
//     foldersData.forEach(folder => {
//         const folderListItem = createFolderList(folder);
//         navBar.appendChild(folderListItem);
//     });

//     initializeClickHandlers();
// }
// // Call the initialization function
// initializeNavBar();





// for player and add-to-favorites functionality
document.addEventListener("DOMContentLoaded", function () {
    let wavesurfer = null;
    let playerTime = document.getElementById('player-time');
    let playControl = document.getElementById('play');
    let replayControl = document.getElementById('replay');
    let volumeControl = document.getElementById('volume');
    let rangeControl = document.getElementById('player-range');

    if (playControl && replayControl && volumeControl && rangeControl) {
        document.querySelectorAll(".voice-card").forEach(function (voiceCard) {
            voiceCard.addEventListener("click", function () {
                // get the audio file from .voice-card> .wave-form
                let audioFile_play = voiceCard.querySelector(".wave-form").getAttribute("data-audio-file");

                // form-wave
                let form_wave = document.querySelector(".form-wave");

                // remove data-audio-file from form_wave
                form_wave.removeAttribute("data-audio-file");
                form_wave.innerHTML = '';

                form_wave.setAttribute("data-audio-file", audioFile_play);

                // debug the files are ready to play or not
                // console.log('audio file ready to play');

                if (wavesurfer) {
                    wavesurfer.destroy();
                }

                wavesurfer = WaveSurfer.create({
                    container: form_wave,
                    waveColor: '#ffffffce',
                    progressColor: '#383351',
                    height: 90,
                    barWidth: 4,
                    responsive: true,
                    barRadius: 4,
                    url: audioFile_play,
                });

                wavesurfer.on('ready', function () {
                    // Get the duration of the audio file
                    let duration = wavesurfer.getDuration();

                    // Format the duration to HH:MM:SS
                    let formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);

                    // Set the formatted duration to the player-time element
                    playerTime.innerText = formattedDuration;

                    // Reset range control
                    rangeControl.value = 0;
                });

                wavesurfer.on('audioprocess', function () {
                    let currentTime = wavesurfer.getCurrentTime();
                    let duration = wavesurfer.getDuration();
                    let remainingTime = duration - currentTime;
                    let formattedTime = new Date(remainingTime * 1000).toISOString().substr(11, 8);
                    playerTime.innerText = formattedTime;

                    // Update range input
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
                    // Reset play button to 'play' icon
                    playControl.querySelector('i').classList.remove('fa-pause');
                    playControl.querySelector('i').classList.add('fa-play');
                });

                // Show the player
                let player = document.getElementById('player');

                // Ensure the player's right style is set to 0 initially if it doesn't exist
                if (player) {
                    if (!player.style.display) {
                        player.style.display = 'block';
                    }
                    if (player.style.block === 'block') {
                        player.style.block = 'none';
                    }
                }
            });
        });

        playControl.addEventListener('click', function () {
            if (wavesurfer) {
                wavesurfer.playPause();
                this.querySelector('i').classList.toggle('fa-play');
                this.querySelector('i').classList.toggle('fa-pause');
            }
        });

        replayControl.addEventListener('click', function () {
            if (wavesurfer) {
                wavesurfer.seekTo(0);
                wavesurfer.play();
                playControl.querySelector('i').classList.remove('fa-play');
                playControl.querySelector('i').classList.add('fa-pause');
            }
        });

        volumeControl.addEventListener('click', function () {
            if (wavesurfer) {
                let currentVolume = wavesurfer.getVolume();
                let newVolume = currentVolume === 0 ? 1 : 0;
                wavesurfer.setVolume(newVolume);
                this.querySelector('i').classList.toggle('fa-volume-high');
                this.querySelector('i').classList.toggle('fa-volume-mute');
            }
        });

        rangeControl.addEventListener('input', function () {
            if (wavesurfer) {
                let seekTo = this.value * wavesurfer.getDuration();
                wavesurfer.seekTo(seekTo / wavesurfer.getDuration());
            }
        });
    }

    // Function to toggle favorite status and update star color
    function toggleFavorite() {
        const folder = this.getAttribute('data-folder');
        const childFolder = this.getAttribute('data-child-folder');
        const files = this.getAttribute('data-files');

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if the item already exists in favorites
        const index = favorites.findIndex(favorite => (
            favorite.folderName === folder &&
            favorite.childFolderName === childFolder &&
            JSON.stringify(favorite.files) === JSON.stringify(files)
        ));

        if (index !== -1) {
            // Item exists, remove it from favorites
            favorites.splice(index, 1);
            this.querySelector('i').style.color = ''; // Reset star color
            console.log('Removed from favorites:', { folderName: folder, childFolderName: childFolder, files: files });
        } else {
            // Item doesn't exist, add it to favorites
            favorites.push({ folderName: folder, childFolderName: childFolder, files: files });
            this.querySelector('i').style.color = '#EA8E37'; // Set star color
            console.log('Added to favorites:', { folderName: folder, childFolderName: childFolder, files: files });
        }

        // Save updated favorites to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to initialize favorites functionality
    function initializeFavorites() {
        // Attach click event listener to .add-to-favorites buttons
        document.querySelectorAll('.add-to-favorites').forEach(button => {
            button.addEventListener('click', toggleFavorite);

            // Set initial star color based on existing favorites
            const folder = button.getAttribute('data-folder');
            const childFolder = button.getAttribute('data-child-folder');
            const files = button.getAttribute('data-files');

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            // Check if the current item exists in favorites
            const exists = favorites.some(favorite => (
                favorite.folderName === folder &&
                favorite.childFolderName === childFolder &&
                JSON.stringify(favorite.files) === JSON.stringify(files)
            ));

            if (exists) {
                button.querySelector('i').style.color = '#EA8E37'; // Set star color
            } else {
                button.querySelector('i').style.color = ''; // Reset star color
            }
        });
    }

    initializeFavorites();

});




























































