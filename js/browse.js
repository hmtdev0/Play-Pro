
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




    var minOffset = 340;
    var maxOffset = 800;

    var handle = document.querySelector('.handle');
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');

    var isDragging = false;
    var startX = 0;
    var startSidebarWidth = 0;
    var startContentWidth = 0;

    handle.addEventListener('mousedown', function (ev) {
        isDragging = true;
        startX = ev.pageX;
        startSidebarWidth = sidebar.offsetWidth;
        startContentWidth = content.offsetWidth;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    let timeout = null;

    function mouseMoveHandler(ev) {
        if (!isDragging) return;

        var offsetX = ev.pageX - startX;
        var newSidebarWidth = startSidebarWidth + offsetX;
        var newContentWidth = startContentWidth - offsetX;

        // Ensure sidebar width stays within minOffset and maxOffset
        newSidebarWidth = Math.max(minOffset, Math.min(maxOffset, newSidebarWidth));

        sidebar.style.width = newSidebarWidth + 'px';
        content.style.width = newContentWidth + 'px';

        // Debounce the function to limit the rate of execution
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Perform any additional actions after debounce delay if needed
        }, 16); // Adjust delay as needed (e.g., 16ms for 60fps)
    }
    function mouseUpHandler() {
        isDragging = false;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.getElementById("web-content").innerHTML = '<div class="flex w-full flex-wrap items-center justify-center h-full" id="main-content"><p class="text-primary text-sm p-4">Select an item on the left or type above to search.</p></div>';

    const directoryData = [
        {
            name: "Impacts",
            type: "folder",
            children: [
                {
                    name: "Impact1",
                    type: "folder",
                    children: [
                        { name: "PM_Impact 01 Strong", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                        { name: "PM_Impact 02 Quick", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                        { name: "PM_Impact 03 Epic", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                    ]
                },
                {
                    name: "Impact2",
                    type: "folder",
                    children: [
                        { name: "PM_Impact 01 Strong", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                        { name: "PM_Impact 02 Quick", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                        { name: "PM_Impact 03 Epic", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                    ]
                },
            ]
        },
        {
            name: "Transitions",
            type: "folder",
            children: [
                {
                    name: "Transition1",
                    type: "folder",
                    children: [
                        { name: "PM_Impact 01 Strong", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                        { name: "PM_Impact 02 Quick", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                        { name: "PM_Impact 03 Epic", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                    ]
                },
                {
                    name: "Transition2",
                    type: "folder",
                    children: [
                        { name: "PM_Impact 01 Strong", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                        { name: "PM_Impact 02 Quick", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                        { name: "PM_Impact 03 Epic", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                    ]
                },
            ]
        },
        {
            name: "Sound Effects",
            type: "folder",
            children: [
                {
                    name: "Random",
                    type: "folder",
                    children: [
                        { name: "PM_Bonus 01 Lion Roar", type: "file", track: "Random/PM_Bonus 01 Lion Roar.png" },
                        { name: "PM_Bonus 02 Crowd Cheer", type: "file", track: "Random/PM_Bonus 02 Crowd Cheer.png" }
                    ]
                },
                {
                    name: "Risers",
                    type: "folder",
                    children: [
                        { name: "PM_Riser 01 Quick", type: "file", track: "Risers/PM_Riser 01 Quick.png" },
                        { name: "PM_Riser 02 Long", type: "file", track: "Risers/PM_Riser 02 Long.png" },
                        { name: "PM_Riser 03 Deep", type: "file", track: "Risers/PM_Riser 03 Deep.png" }
                    ]
                },
                {
                    name: "Whooshes",
                    type: "folder",
                    children: [
                        { name: "PM_Whoosh 01 Deep", type: "file", track: "Whooshes/PM_Whoosh 01 Deep.png" },
                        { name: "PM_Whoosh 02 Shallow", type: "file", track: "Whooshes/PM_Whoosh 02 Shallow.png" },
                        { name: "PM_Whoosh 03 Airy", type: "file", track: "Whooshes/PM_Whoosh 03 Airy.png" },
                        { name: "PM_Whoosh 04 Middle", type: "file", track: "Whooshes/PM_Whoosh 04 Middle.png" },
                        { name: "PM_Whoosh 05 Textured", type: "file", track: "Whooshes/PM_Whoosh 05 Textured.png" }
                    ]
                },
                {
                    name: "Impact",
                    type: "folder",
                    children: [
                        { name: "PM_Impact 01 Strong", type: "file", track: "Impacts/PM_Impact 01 Strong.png" },
                        { name: "PM_Impact 02 Quick", type: "file", track: "Impacts/PM_Impact 02 Quick.png" },
                        { name: "PM_Impact 03 Epic", type: "file", track: "Impacts/PM_Impact 03 Epic.png" },
                    ]
                },
            ]
        },
    ];
    const container = document.getElementById('main-content');
    function populateDirectory(data, parentElement) {
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.classList.add('directory-item', "flex-wrap");


            // Check if it's a folder with children
            if (item.type === 'folder' && item.children) {
                // Create the first SVG element
                const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg1.setAttribute('fill', 'none');
                svg1.setAttribute('viewBox', '0 0 24 24');
                svg1.setAttribute('stroke-width', '1.5');
                svg1.setAttribute('stroke', 'currentColor');
                svg1.setAttribute('class', 'size-6');
                svg1.setAttribute('style', 'height: 20px; margin-right: 8px'); // Fix: style attribute corrected

                const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path1.setAttribute('stroke-linecap', 'round');
                path1.setAttribute('stroke-linejoin', 'round');
                path1.setAttribute('d', 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z');

                svg1.appendChild(path1);
                li.prepend(svg1);

                // Create the second SVG element
                const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg2.setAttribute('fill', 'none');
                svg2.setAttribute('viewBox', '0 0 24 24');
                svg2.setAttribute('stroke-width', '1.5');
                svg2.setAttribute('stroke', 'currentColor');
                svg2.setAttribute('class', 'size-6');
                svg2.setAttribute('style', 'height: 20px; margin-right: 8px;'); // Fix: style attribute corrected


                const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path2.setAttribute('stroke-linecap', 'round');
                path2.setAttribute('stroke-linejoin', 'round');
                path2.setAttribute('d', 'm8.25 4.5 7.5 7.5-7.5 7.5');

                svg2.appendChild(path2);

                // Prepend the second SVG element to the li
                li.prepend(svg2);
            } else {
                const fileIcon1 = document.createElement('div1');
                const icon = document.createElement('i');
                icon.setAttribute('class', 'fas fa-star');
                icon.setAttribute('style', 'transform: translateX(-38px)');
                fileIcon1.append(icon);
                const fileIcon = document.createElement('div');
                fileIcon.setAttribute('class', 'image_cover');
                fileIcon.setAttribute('style', 'padding: 0 3px; border: 1px solid #01E0B9; height: 14px; display: flex; items: center;');
                fileIcon.innerHTML = `
            <img src="images/audio-wave.png" alt="" class="img" style="transform: scale(1.2); height: 100%;">
        `;
                // li.appendChild(fileIcon);
                li.prepend(fileIcon1, fileIcon)
            }




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

                        if (child.type !== "folder") {
                            contentArea.innerHTML += `<div class="overflow-hidden w-full sm:w-1/2 lg:w-1/3" style="padding:0 5px; min-width: 250px;">
                        <div class="card voice-card w-full" style="margin: 4px 0">
                            <div class="wave-form" data-audio-file="./Media/${item.name}/${child.name}">
                                <img class="w-full" style="cursor: pointer; max-height: 160px height: 100%;" src="./Media/${child.track}" />
                            </div>
                            <div class="voice-card-content">
                                <div class="voice-card-content-det">
                                    <div class="voice-det">
                                        <div class="image_cover" style="padding:0 3px; border: 1px solid #01E0B9; height: 24px;">
                                            <img src="images/audio-wave.png" alt="" class="img" style="height: 100%;">
                                        </div>
                                        <span class="text-sm">${child.name}</span>
                                    </div>
                                    <button type="button" class="bg-transparent border-none star-icon add-to-favorites" data-_id="${_id}" data-files="Media/${child.name}" data-folder="${item.name}" data-child-folder="${item.name}" onclick="toggleFavorite(event)">
                                        <i class="fa-solid fa-star" style="color:blue"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                        }
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
    function displayFileDetails(file) {
        console.log('Clicked file:', file.name);
    }


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

    const directoryContainer = document.getElementById('directory');
    populateDirectory(directoryData, directoryContainer);

    document.getElementById('searchInput').addEventListener('input', handleSearch);

    let wavesurfer = null;
    let playerTime = null;
    let playControl = null;
    let replayControl = null;
    let volumeControl = null;
    let rangeControl = null;

    function createPlayer(audioFile) {
        let existingPlayer = document.getElementById('player');
        if (existingPlayer) {
            existingPlayer.parentNode.removeChild(existingPlayer);
        }
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
            backend: 'WebAudio',
            normalize: true,
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


    document.getElementById("favorites_list").style.display = "none";

    initializeFavorites();

    // Call initializeDirectory to set up the observer
    initializeDirectory();

});


function checkAndSetColorForCards() {
    if (typeof localStorage !== 'undefined') {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        let buttons = document.querySelectorAll('.add-to-favorites');

        buttons.forEach(button => {
            let dataValue = button.getAttribute('data-files');
            const isFavorite = favorites.some(favorite => favorite.files === dataValue);
            if (isFavorite) {
                button.querySelector('i').style.color = '#EA8E37'; // Set star color
            } else {
                button.querySelector('i').style.color = ''; // Reset star color
            }
        });
    }
}


let directoryHtml = document.getElementById("directory").innerHTML;
let showFav = false;
const directoryElement = document.getElementById("directory");
const showAllFavorite = () => {
    if (showFav) {
        directoryElement.style.display = "block";
        document.getElementById("favorites_list").style.display = "none";
    } else {
        directoryElement.style.display = "none";
        document.getElementById("favorites_list").style.display = "block";
    }
    showFav = !showFav;

    const icon = document.querySelector("#showAllFavorite i");
    const currentColor = icon.style.color;

    // if (currentColor === "black") {
    //     icon.style.color = "#3391e6";
    // } else {
    //     icon.style.color = "black";
    // }
}



function initializeDirectory() {
    const container = document.getElementById('main-content');

    const observerConfig = { childList: true, subtree: true };

    const observerCallback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Child nodes have been added or removed from #main-content
                checkAndSetColorForCards();
            }
        }
    };

    const observer = new MutationObserver(observerCallback);

    observer.observe(container, observerConfig);

    checkAndSetColorForCards();
}




function toggleFavorite(event) {
    const button = event.currentTarget;
    const audioFileName = button.getAttribute('data-files');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(favorite => favorite.files === audioFileName);

    if (index !== -1) {
        favorites.splice(index, 1);
        button.querySelector('i').style.color = "black";
    } else {
        favorites.push({ files: audioFileName });
        button.querySelector('i').style.color = "rgb(234, 142, 55)";
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    initializeFavorites()
}

function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.getElementById("favorites_list").innerHTML = favorites.map((fav) => {
        // Check if fav.files is not null before splitting
        const fileNameParts = (fav.files || '').split('.');
        const displayFileName = fileNameParts[0];
        return `
        <li class="flex p-2 items-center justify-between">
           <div class="flex items-center">
                <div class="image_cover mr-1" style="padding: 0 3px; border: 1px solid #01E0B9; height: 14px; display: flex; items: center;">
                    <img src="images/audio-wave.png" alt="" class="img" style="transform: scale(1); height: 100%;">
                </div>
                <p class="text-white" style="font-size: 12px;">${displayFileName}</p>
            </div>
            <button type="button" class="bg-transparent border-none star-icon remove-favorites" style="color: rgb(234, 142, 55);" data-files="${displayFileName}">
                <i class="fa-solid fa-star" style="color: rgb(234, 142, 55);"></i>
            </button>
        </li>
    `;
    }).join("");

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-favorites').forEach(button => {
        button.addEventListener('click', function (event) {
            var dataFile = this.getAttribute('data-files');
            removeFavorites(dataFile);
        });
    });
}



// remove favorites its from localstorage favorites

function removeFavorites(audioFileName) {
    console.log('Removing file:', audioFileName);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Current favorites:', favorites);

    // Find the index of the favorite to remove based on matching 'files' property
    const index = favorites.findIndex(favorite => favorite.files === audioFileName);
    console.log('Index:', index);

    if (index !== -1) {
        // Remove the favorite from the array
        favorites.splice(index, 1);

        // Update localStorage with the modified favorites array
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Reinitialize the favorites list to reflect the updated state
        initializeFavorites();
    } else {
        // If the file is not found in favorites, show an alert
        alert("This file is not in your favorites");
    }
}

// // dom content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFavorites();
});