const importedScripts = [];

function tryImport(...fileNames) {
  try {
    const toRun = new Set(fileNames.filter(f => !importedScripts.includes(f)));
    if (toRun.length) {
      importedScripts.push(...toRun)
      importScripts(...toRun);
    }
    console.log('he',toRun[0])
    return true;
  } catch (e) {
    console.error(e);
  }
}

self.oninstall = () => {
  // The imported script shouldn't do anything, but only declare a global function
  // (someComplexScriptAsyncHandler) or use an analog of require() to register a module
  tryImport('popup.js');
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'somethingComplex') {
    if (tryImport('popup.js')) {
      // calling a global function from some-complex-script.js
      someComplexScriptAsyncHandler(msg, sender, sendResponse)
      return true;
    }
  }
});
