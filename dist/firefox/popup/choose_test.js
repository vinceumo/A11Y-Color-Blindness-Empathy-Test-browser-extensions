function listenForClicks() {
  const labels = document.querySelectorAll("label");

  Array.prototype.forEach.call(labels, (el, i) => {
    const currentLabel = labels[i];
    const currentInput = labels[i].querySelector('input[type="radio"]');
    const testType = currentInput.getAttribute("name");
    const testClass = currentInput.getAttribute("value");

    currentLabel.addEventListener("click", () => {
      function toggleTests(tabs) {
        for (let tab of tabs) {
          browser.tabs.sendMessage(tab.id, {
            command: "toggleTests",
            testType: testType,
            testClass: testClass
          });
        }
      }

      function reset(tabs) {
        for (let tab of tabs) {
          browser.tabs.sendMessage(tab.id, {
            command: "reset",
            testType: testType
          });
        }
      }

      function reportError(error) {
        console.error(`Could not test: ${error}`);
      }

      if (testClass != "reset") {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(toggleTests)
          .catch(reportError);
      } else {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(reset)
          .catch(reportError);
      }
    });
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_scripts/runTest.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
