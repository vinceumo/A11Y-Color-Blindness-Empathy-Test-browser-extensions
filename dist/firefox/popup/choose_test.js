const testsCSS = `
.protanopia{-webkit-filter:url(accecss-filters.svg#protanopia) grayscale(0)!important;filter:url(accecss-filters.svg#protanopia) grayscale(0)!important}.protanomaly{-webkit-filter:url(accecss-filters.svg#protanomaly) grayscale(0)!important;filter:url(accecss-filters.svg#protanomaly) grayscale(0)!important}.deuteranopia{-webkit-filter:url(accecss-filters.svg#deuteranopia) grayscale(0)!important;filter:url(accecss-filters.svg#deuteranopia) grayscale(0)!important}.deuteranomaly{-webkit-filter:url(accecss-filters.svg#deuteranomaly) grayscale(0)!important;filter:url(accecss-filters.svg#deuteranomaly) grayscale(0)!important}.tritanopia{-webkit-filter:url(accecss-filters.svg#tritanopia) grayscale(0)!important;filter:url(accecss-filters.svg#tritanopia) grayscale(0)!important}.tritanomaly{-webkit-filter:url(accecss-filters.svg#tritanomaly) grayscale(0)!important;filter:url(accecss-filters.svg#tritanomaly) grayscale(0)!important}.achromatopsia{-webkit-filter:url(accecss-filters.svg#achromatopsia) grayscale(0)!important;filter:url(accecss-filters.svg#achromatopsia) grayscale(0)!important}.achromatomaly{-webkit-filter:url(accecss-filters.svg#achromatomaly) grayscale(0)!important;filter:url(accecss-filters.svg#achromatomaly) grayscale(0)!important}.grayscale{-webkit-filter:grayscale(100%);filter:grayscale(100%)}.vision-loss-moderate{-webkit-filter:blur(1px);filter:blur(1px)}.vision-loss-severe{-webkit-filter:blur(10px);filter:blur(10px)}.vision-blindness{-webkit-filter:brightness(0);filter:brightness(0)}
`;

function listenForClicks() {
  const labels = document.querySelectorAll("label");

  Array.prototype.forEach.call(labels, (el, i) => {
    const currentLabel = labels[i];
    const currentInput = labels[i].querySelector('input[type="radio"]');
    const testType = currentInput.getAttribute("name");
    const testClass = currentInput.getAttribute("value");

    currentLabel.addEventListener("click", () => {
      console.log({ testType });
      console.log({ testClass });

      function toggleTests(tabs) {
        browser.tabs.insertCSS({ code: testsCSS }).then(() => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "toggleTests",
            testType: testType,
            testClass: testClass
          });
        });
      }

      function reset(tabs) {
        browser.tabs.removeCSS({ code: testsCSS }).then(() => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "reset",
            testType: testType
          });
        });
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

browser.tabs.executeScript({file: "/content_scripts/runTest.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

// /**
//  * CSS to hide everything on the page,
//  * except for elements that have the "beastify-image" class.
//  */
// const hidePage = `body > :not(.beastify-image) {
//                     display: none;
//                   }`;

// /**
//  * Listen for clicks on the buttons, and send the appropriate message to
//  * the content script in the page.
//  */

// function listenForClicks() {
//   document.addEventListener("click", (e) => {

//     /**
//      * Given the name of a beast, get the URL to the corresponding image.
//      */
//     console.log(e);
//     function beastNameToURL(beastName) {
//       switch (beastName) {
//         case "Frog":
//           return browser.extension.getURL("beasts/frog.jpg");
//         case "Snake":
//           return browser.extension.getURL("beasts/snake.jpg");
//         case "Turtle":
//           return browser.extension.getURL("beasts/turtle.jpg");
//       }
//     }

//     /**
//      * Insert the page-hiding CSS into the active tab,
//      * then get the beast URL and
//      * send a "beastify" message to the content script in the active tab.
//      */
//     function beastify(tabs) {
//       browser.tabs.insertCSS({code: hidePage}).then(() => {
//         let url = beastNameToURL(e.target.value);
//         browser.tabs.sendMessage(tabs[0].id, {
//           command: "beastify",
//           beastURL: url
//         });
//       });
//     }

//     /**
//      * Remove the page-hiding CSS from the active tab,
//      * send a "reset" message to the content script in the active tab.
//      */
//     function reset(tabs) {
//       browser.tabs.removeCSS({code: hidePage}).then(() => {
//         browser.tabs.sendMessage(tabs[0].id, {
//           command: "reset",
//         });
//       });
//     }

//     /**
//      * Just log the error to the console.
//      */
//     function reportError(error) {
//       console.error(`Could not beastify: ${error}`);
//     }

//     /**
//      * Get the active tab,
//      * then call "beastify()" or "reset()" as appropriate.
//      */
//     if (e.target.classList.contains("beast")) {
//       browser.tabs.query({active: true, currentWindow: true})
//         .then(beastify)
//         .catch(reportError);
//     }
//     else if (e.target.classList.contains("reset")) {
//       browser.tabs.query({active: true, currentWindow: true})
//         .then(reset)
//         .catch(reportError);
//     }
//   });
// }

// /**
//  * There was an error executing the script.
//  * Display the popup's error message, and hide the normal UI.
//  */
// function reportExecuteScriptError(error) {
//   document.querySelector("#popup-content").classList.add("hidden");
//   document.querySelector("#error-content").classList.remove("hidden");
//   console.error(`Failed to execute beastify content script: ${error.message}`);
// }

// /**
//  * When the popup loads, inject a content script into the active tab,
//  * and add a click handler.
//  * If we couldn't inject the script, handle the error.
//  */
// browser.tabs.executeScript({file: "/content_scripts/runTest.js"})
// .then(listenForClicks)
// .catch(reportExecuteScriptError);
