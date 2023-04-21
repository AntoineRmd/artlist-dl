// Check for updates every 24 hours
setInterval(() => {
    chrome.runtime.requestUpdateCheck((status) => {
      if (status == "update_available") {
        chrome.runtime.reload();
      }
    });
  }, 1000 * 60 * 60 * 24);
  