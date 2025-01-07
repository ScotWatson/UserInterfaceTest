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
    type: UI.symFormView,
    args: {
      icon: "./icons/home.svg",
      title: "Form",
    },
  });
  const button = formView.addElement({
    type: UI.symButton,
    args: {
      caption: "Submit",
    },
  });
  button.addEventListener("click", () => {
    window.alert("Clicked");
  });
  const tilesView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "Tiles",
    type: UI.symTilesView,
    args: {
      icon: "./icons/home.svg",
      title: "Tiles",
    },
  });
  const listView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "List",
    type: UI.symListView,
    args: {
      icon: "./icons/home.svg",
      title: "List",
    },
  });
  const mapView = windowObj.addView({
    icon: "./icons/home.svg",
    title: "Map",
    type: UI.symMapView,
    args: {
      icon: "./icons/home.svg",
      title: "Map",
    },
  });
}
