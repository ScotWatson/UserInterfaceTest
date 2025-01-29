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
const loadingAsyncEvents = import("https://scotwatson.github.io/WebCommon/20240119/async-events.mjs");

Promise.all([ loadingPage, loadingUI, loadingAsyncEvents ]).then(start);

const urlSelf = new URL(self.location);

function start([ Page, UI, AsyncEvents ]) {
  const objLayoutViewport = UI.initialize({
    type: "navigation",
    options: {
      tabs: [
        {
          icon: "./icons/form.svg",
          title: "Form",
          view: {
            title: "Form",
            type: "elements",
            options: {},
            actions: [],
          },
        },
        {
          icon: "./icons/bento.svg",
          title: "Tiles",
          view: {
            title: "Tiles",
            type: "tiles",
            options: {},
            actions: [],
          },
        },
        {
          icon: "./icons/list.svg",
          title: "List",
          view: {
            title: "List",
            type: "list",
            options: {},
            actions: [],
          },
        },
        {
          icon: "./icons/map.svg",
          title: "Map",
          view: {
            title: "Map",
            type: "map",
            options: {},
            actions: [],
          },
        },
      ],
    },
  });
  const topView = objLayoutViewport.view
  const formTab = topView.tabs[0];
  const formView = formTab.view;
  const formFrame = formView.firstView.contents;
  const textEntry = formFrame.addElement({
    type: "text-entry",
  });
  textEntry.setPrompt("Text Prompt");
  const multiSelect = formFrame.addElement({
    type: "text-display",
  });
  multiSelect.setText("Multi-select");
  AsyncEvents.listen(multiSelect.clicked, async (event) => {
    const selection = formView.addLevel({
      title: "Multi-select",
      type: "form",
      options: {
        minOptions: 0,
        maxOptions: 2,
        options: [
          {
            type: "select",
            args: {
              minOptions: 0,
              maxOptions: 0,
              options: [];
            },
          },
          {
            type: "text-entry",
            args: {},
          },
          {
            type: "numeric-entry",
            args: {},
          },
        ],
      },
      actions: [],
    });
    selection.contents.options[0].element.setText("Option #1");
    selection.contents.options[1].element.setPrompt("Option #2: Enter some text");
    selection.contents.options[2].element.setPrompt("Option #3: Enter a number");
  });
  const numericEntry = formFrame.addElement({
    type: "numeric-entry",
  });
  numericEntry.setPrompt("Numeric Prompt");
  numericEntry.setLimits({
    min: 0,
    max: 10,
    interval: 1,
  });
  const textDisplay = formFrame.addElement({
    type: "text-display",
  });
  textDisplay.setText("Test text ".repeat(100));
  const button = formFrame.addElement({
    type: "button",
    caption: "Submit",
  });
  AsyncEvents.listen(button.clicked, async (event) => {
    window.alert("Clicked " + textEntry.getValue() + " " + numericEntry.getValue());
  });
  const tilesTab = topView.tabs[1];
  const tilesFrame = tilesTab.view.firstView.contents;
  for (let i = 1; i < 40; ++i) {
    const tile = tilesFrame.addItem({
      icon: "./icons/home.svg",
      title: i + "th",
      item: {
        description: "This is the " + i + "th item.",
      },
    });
    AsyncEvents.listen(tile.selected, (evt) => {
      const panel = tilesTab.view.openSecondary({
        options: {},
        actions: [],
      });
      const description = panel.addElement({
        type: "text-display",
      });
      description.setText(evt.item);
    });
  }
  const listTab = topView.tabs[2];
  const listFrame = listTab.view.firstView.contents;
  for (let i = 1; i < 40; ++i) {
    const listRow = listFrame.addItem({
      icon: "./icons/home.svg",
      title: i + "th",
      item: {
        description: "This is the " + i + "th item.",
      },
    });
    AsyncEvents.listen(listRow.selected, (evt) => {
      const panel = listTab.view.openSecondary({
        options: {},
        actions: [],
      });
      const description = panel.addElement({
        type: "text-display",
      });
      description.setText(evt.item);
    });
  }
  const mapTab = topView.tabs[3];
  const mapFrame = mapTab.view.firstView.contents;
  async function staticImage(imageUrl) {
    const image = new Image();
    const response = await fetch(imageUrl);
    image.src = URL.createObjectURL(await response.blob());
    await image.decode();
    const imageCanvas = new OffscreenCanvas(image.naturalWidth, image.naturalHeight);
    imageCanvasCtx = imageCanvas.getContext("2d");
    imageCanvasCtx.drawImage(image, 0, 0);
    let viewport = null;
    AsyncEvents.listen(mapFrame.viewportChanged, async (event) => {
      event.viewport.ctx.drawImage(image, 0, 0);
      event.viewport.accept();
      viewport = event.viewport;
    });
    AsyncEvents.listen(mapFrame.clicked, async (event) => {
      console.log(event);
      const path = new Path2D("M 200 200 l 200 0 l 0 200 l -200 0 l 0 -200");
      console.log(mapFrame.getViewport().ctx.isPointInPath(path, event.canvasPoint.x, event.canvasPoint.y));
      mapFrame.getViewport().ctx.stroke(path);
    });
  }
  staticImage(new URL("./map-of-the-world-2241469.png", urlSelf));
}
