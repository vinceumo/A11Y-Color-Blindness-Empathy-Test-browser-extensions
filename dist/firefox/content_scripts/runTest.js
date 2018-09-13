(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  let hasInsertedFiles = false;
  const colorBlindnessClasses = ["protanopia", "protanomaly", "deuteranopia", "deuteranomaly", "tritanopia", "tritanomaly", "achromatopsia", "achromatomaly", "grayscale"];
  const visionClasses = ["vision-loss-moderate", "vision-loss-severe", "vision-blindness"];

  function toggleTest(testType, testClass) {
    if(!hasInsertedFiles) {
      insertFiles();
      hasInsertedFiles = true;
    }

    removeTests(testType);
    document.body.classList.add(testClass);
  }

  function insertFiles() {
    const svgFilter = document.createElement("img");
    svgFilter.setAttribute("src", "access/access-filters.svg");
    document.body.appendChild(svgFilter);

    const accessCSS = document.createElement("link");
    accessCSS.setAttribute("rel", "stylesheet");
    accessCSS.setAttribute("type", "text/css");
    accessCSS.setAttribute("href", "access/access/style.min.css");
    document.head.appendChild(accessCSS);
  }

  function removeTests(testType) {
    if(testType == "vision") {
      for (let i = 0; i < visionClasses.length; i++) {
        document.body.classList.remove(visionClasses[i]);
      }
    } else if (testType == "colorBlindness") {
      for (let i = 0; i < colorBlindnessClasses.length; i++) {
        document.body.classList.remove(colorBlindnessClasses[i]);
      }
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command !== "reset") {
      toggleTest(message.testType, message.testClass);
    } else {
      removeTests(message.testType);
    }
  });
})();
