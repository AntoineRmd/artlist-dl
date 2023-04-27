// Constants & functions
const xpathMusic = "/html/body/div[11]/section/div/section/div/footer/div/div/div/div[8]/div/div/div[2]";
const xpathSFX = "/html/body/div[3]/div[1]/div[3]/div/div[3]/div[1]/div";

function getElementByXPath(XPath) {
    return document.evaluate(XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Create download button
const downloadButton = document.createElement('a');
downloadButton.id = "dl-button";
downloadButton.target = "_blank";
downloadButton.innerHTML = `<div><img src="${chrome.runtime.getURL('assets/img/dl-icon.svg')}" alt="Download Sample"></div>`;

// Main function
function executeMainContent() {

    // Check audio presence
    var isAudioPresent = false;
    var audioElements = Array.from(document.getElementsByTagName('audio'));
    var audioElement = null;

    audioElements.forEach(element => {
        if (element !== null && element.hasAttribute('src')){
            audioElement = element;
        }
    })

    if (audioElement !== null){
        isAudioPresent = true;
    }

    // Get & assign that audio link 🤙
    if (isAudioPresent) {
        var link = audioElement.src;
        downloadButton.href = `${link}`;
        downloadButton.download = `${link}`;
    }

    // Inject button on page
    if (isAudioPresent) {
        try {
            var iconBarDiv = getElementByXPath(xpathMusic);
            iconBarDiv.appendChild(downloadButton);
        } catch {}
        try {
            var iconBarDiv = getElementByXPath(xpathSFX);
            iconBarDiv.appendChild(downloadButton);
        } catch {}
    }
}

// Main code execution loop
const intervalID = setInterval(executeMainContent, 500);