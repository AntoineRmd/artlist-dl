// Constants & functions
const xpathMusic = "/html/body/div[11]/section/div/section/div/footer/div/div/div/div[8]/div/div/div[2]";
const xpathSFX = "/html/body/div[3]/div[1]/div[3]/div/div[3]/div[1]/div";

function getElementByXPath(XPath) {
    return document.evaluate(XPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Get current section
var subsection = window.location.href.split("/");
subsection = subsection[subsection.length -1];

// Create download button
const downloadButton = document.createElement('a');
downloadButton.id = "dl-button";
downloadButton.target = "_blank";
downloadButton.innerHTML = `<div><img src="${chrome.runtime.getURL('assets/img/dl-icon.svg')}"></div>`;

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
    }

    // Inject button on page
    if (isAudioPresent) {
        if (subsection == "royalty-free-music") {
            var iconBarDiv = getElementByXPath(xpathMusic);
            iconBarDiv.appendChild(downloadButton);
        } else if (subsection == "sfx") {
            var iconBarDiv = getElementByXPath(xpathSFX);
            iconBarDiv.appendChild(downloadButton);
        }
    }

    // Clear interval if button successfully injected
    if (isAudioPresent) {
        clearInterval(mainContentIntervalID);
        console.log('Button injected successfully');
    }
}

// Main code execution loop
const mainContentIntervalID = setInterval(executeMainContent, 500);