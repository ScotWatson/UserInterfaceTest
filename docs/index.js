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

const urlSelf = new URL(self.location);

function start([ Page, UI ]) {
  const windowObj = UI.rootViewSelector({
    appName: "TestApp",
  });
  const formView = windowObj.addView({
    icon: "./icons/form.svg",
    title: "Form",
    topType: UI.symFormFrame,
    topTitle: "Form",
  });
  const formFrame = formView.topFrame;
  const textEntry = formFrame.addElement({
    type: UI.symTextEntry,
  });
  textEntry.setPrompt("Text Prompt");
  const multiSelect = formFrame.addElement({
    type: UI.symTextDisplay,
  });
  multiSelect.setText("Multi-select");
  (async () => {
    for await (const event of multiSelect.clicked) {
      const selection = formView.addFrame({
        title: "Multi-select",
        type: UI.symSelectFormFrame,
        args: {
          minOptions: 0,
          maxOptions: 2,
          options: [
            {
              type: UI.symTextDisplay,
              args: {},
            },
            {
              type: UI.symTextEntry,
              args: {},
            },
            {
              type: UI.symNumericEntry,
              args: {},
            },
          ],
        },
      });
      selection.options[0].element.setText("Option #1");
      selection.options[1].element.setPrompt("Option #2: Enter some text");
      selection.options[2].element.setPrompt("Option #3: Enter a number");
    }
  })();
  const numericEntry = formFrame.addElement({
    type: UI.symNumericEntry,
  });
  numericEntry.setPrompt("Numeric Prompt");
  numericEntry.setLimits({
    min: 0,
    max: 10,
    interval: 1,
  });
  const textDisplay = formFrame.addElement({
    type: UI.symTextDisplay,
  });
  textDisplay.setText("Test text".repeat(100));
  const button = formFrame.addElement({
    type: UI.symButton,
    caption: "Submit",
  });
  (async () => {
    for await (const event of button.clicked) {
      window.alert("Clicked " + textEntry.getValue() + " " + numericEntry.getValue());
    }
  })();
  const tilesView = windowObj.addView({
    icon: "./icons/bento.svg",
    title: "Tiles",
    topType: UI.symTilesFrame,
    topTitle: "Tiles",
  });
  const tilesFrame = tilesView.topFrame;
  const listView = windowObj.addView({
    icon: "./icons/list.svg",
    title: "List",
    topType: UI.symListFrame,
    topTitle: "List",
  });
  const listFrame = tilesView.topFrame;
  const mapView = windowObj.addView({
    icon: "./icons/map.svg",
    title: "Map",
    topType: UI.symMapFrame,
    topTitle: "Map",
  });
  const mapFrame = mapView.topFrame;
  async function staticImage(imageUrl) {
    const image = new Image();
    const response = await fetch(imageUrl);
    image.src = URL.createObjectURL(await response.blob());
    await image.decode();
    const imageCanvas = new OffscreenCanvas(image.naturalWidth, image.naturalHeight);
    imageCanvasCtx = imageCanvas.getContext("2d");
    imageCanvasCtx.drawImage(image, 0, 0);
    let viewport = null;
    (async () => {
      for await (const event of mapFrame.viewportChanged) {
        event.viewport.ctx.drawImage(image, 0, 0);
        event.viewport.accept();
        viewport = event.viewport;
      }
    })();
    (async () => {
      for await (const event of mapFrame.clicked) {
        console.log(event.point);
        const path = new Path2D("M 200 200 l 200 0 l 0 200 l -200 0 l 0 -200");
        console.log(mapFrame.getViewport().ctx.isPointInPath(path, event.point.x, event.point.y));
        viewport.ctx.strokePath(path);
      }
    })();
  }
  staticImage(new URL("./map-of-the-world-2241469.png", urlSelf));
}
