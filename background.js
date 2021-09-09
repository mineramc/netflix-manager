let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.privacy.services.passwordSavingEnabled.get({}, function(details) {
  if (details.value) {
    console.log('Password is on!');
  } else {
    console.log('Password is off!');
  }
});

chrome.privacy.services.passwordSavingEnabled.get({}, function(details) {
  console.log(details.levelOfControl)
  if (details.levelOfControl === 'controllable_by_this_extension') {
    chrome.privacy.services.passwordSavingEnabled.set({ value: false }, function() {
      if (chrome.runtime.lastError === undefined) {
        console.log("Hooray, it worked!");
      } else {
        console.log("Sadness!", chrome.runtime.lastError);
      }
    });
  }
});
