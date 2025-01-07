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
    type: UI.symFormView,
    args: {
      title: "Form",
    },
  });
  const button = homeView.addElement({
    type: UI.symButton,
    args: {
      caption: "Submit",
    },
  });
  button.addEventListener("click", () => {
    window.alert("Clicked");
  });
  const tilesView = windowObj.addView({
    type: UI.symTilesView,
    args: {
      title: "Tiles",
    },
  });
  const listView = windowObj.addView({
    type: UI.symListView,
    args: {
      title: "List",
    },
  });
  const mapView = windowObj.addView({
    type: UI.symMapView,
    args: {
      title: "Map",
    },
  });
}
