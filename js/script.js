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

    // search box query
    document.getElementById('search').addEventListener('input', function () {
        // Get the search query
        const query = this.value.toLowerCase();

        // Get all the navbar links
        const links = document.querySelectorAll('.nav-link, .navbar-nav-link');
        const navBars = document.querySelectorAll('.navbar-nav');

        // Reset all navbar heights to 0 initially
        navBars.forEach(navBar => {
            navBar.style.removeProperty('height');
        });

        // Iterate over each link
        links.forEach(link => {
            // Get the text content of the link
            const text = link.textContent.toLowerCase();

            // Check if the text includes the search query
            if (text.includes(query) && query !== '') {
                // Add the active class if it matches
                link.classList.add('active');

                // If it's a navbar-nav-link, set the height of its parent navbar-nav to auto
                if (link.classList.contains('navbar-nav-link')) {
                    const navBar = link.closest('.navbar-nav');
                    if (navBar) {
                        navBar.style.height = 'auto';
                    }
                }
            } else {
                // Remove the active class if it doesn't match
                link.classList.remove('active');
            }
        });
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





























































