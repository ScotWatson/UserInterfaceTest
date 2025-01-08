/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const pageLoadStart = performance.now();

const loadingPage = new Promise((resolve, reject) => {
  window.addEventListener("load", (e) => {
    resolve({
      loadTime: performance.now() - pageLoadStart,
    });
  });
});

const loadingUI = import("./ui.mjs");

Promise.all([ loadingPage, loadingUI ]).then(start);

function start([ Page, UI ]) {
  const windowObj = UI.rootViewSelector({
    appName: "TestApp",
  });
  const formView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "Form",
  });
  const formFrame = formView.addFrame({
    type: UI.symFormFrame,
  });
  const textEntry = formFrame.addElement({
    type: UI.symTextEntry,
  });
  textEntry.setPrompt("Text Prompt");
  const multiSelect = formFrame.addElement({
    type: UI.symMultiSelect,
  });
  const numericEntry = formFrame.addElement({
    type: UI.symNumericEntry,
  });
  numericEntry.setPrompt("Numeric Prompt");
  const textDisplay = formFrame.addElement({
    type: UI.symTextDisplay,
  });
  textDisplay.setText("Test text");
  const button = formFrame.addElement({
    type: UI.symButton,
    caption: "Submit",
  });
  /*
  button.addEventListener("click", () => {
    window.alert("Clicked");
  });
  */
  (async () => {
    for await (const event of button.click()) {
      window.alert("Clicked " + textEntry.getValue() + " " + numericEntry.getValue());
    }
  })();
  const tilesView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "Tiles",
    type: UI.symTilesView,
  });
  const tilesFrame = tilesView.addFrame({
    type: UI.symTilesFrame,
  });
  const listView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "List",
    type: UI.symListView,
  });
  const listFrame = tilesView.addFrame({
    type: UI.symListFrame,
  });
  const mapView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "Map",
    type: UI.symMapView,
  });
  const mapFrame = mapView.addFrame({
    type: UI.symMapFrame,
  });
}
