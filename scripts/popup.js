// Getting constants
const artlistStatus = document.getElementById('artlist-status');
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

const versionSpan = document.getElementById('version');
var manifestData = chrome.runtime.getManifest();
const version = manifestData.version;

const reloadButton = document.getElementById('rl-button');

// Popup content updates
getCurrentTab().then(tab => {
    var url = (tab.url).split('/')[2];
    if (url == 'artlist.io') {
        artlistStatus.innerHTML = "On Artlist";
        artlistStatus.style.backgroundColor = "#7caa4b";
    }
});

versionSpan.innerHTML = `v.${version}`;

reloadButton.addEventListener('click', () => {
    chrome.runtime.reload();
});