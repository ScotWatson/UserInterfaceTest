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
          type: "hierarchy",
          options: {
            firstView: {
              type: "form",
              options: {},
            },
          },
        },
        {
          icon: "./icons/bento.svg",
          title: "Tiles",
          type: "hierarchy",
          options: {
            firstView: {
              type: "tiles",
              options: {},
            },
          },
        },
        {
          icon: "./icons/list.svg",
          title: "List",
          type: "hierarchy",
          options: {
            firstView: {
              type: "list",
              options: {},
            },
          },
        },
        {
          icon: "./icons/map.svg",
          title: "Map",
          type: "hierarchy",
          options: {
            firstView: {
              type: "map",
              options: {},
            },
          },
        },
      ],
    },
  });
  const formTab = objLayoutViewport.view.tabs[0];
  const formFrame = formTab.view.firstView;
  const textEntry = formFrame.addElement({
    type: "textEntry",
  });
  textEntry.setPrompt("Text Prompt");
  const multiSelect = formFrame.addElement({
    type: "textDisplay",
  });
  multiSelect.setText("Multi-select");
  AsyncEvents.listen(multiSelect.clicked, async (event) => {
    const selection = formView.addFrame({
      title: "Multi-select",
      type: "selectForm",
      args: {
        minOptions: 0,
        maxOptions: 2,
        options: [
          {
            type: "textDisplay",
            args: {},
          },
          {
            type: "textEntry",
            args: {},
          },
          {
            type: "numericEntry",
            args: {},
          },
        ],
      },
    });
    selection.options[0].element.setText("Option #1");
    selection.options[1].element.setPrompt("Option #2: Enter some text");
    selection.options[2].element.setPrompt("Option #3: Enter a number");
  });
  const numericEntry = formFrame.addElement({
    type: "numericEntry",
  });
  numericEntry.setPrompt("Numeric Prompt");
  numericEntry.setLimits({
    min: 0,
    max: 10,
    interval: 1,
  });
  const textDisplay = formFrame.addElement({
    type: "textDisplay",
  });
  textDisplay.setText("Test text ".repeat(100));
  const button = formFrame.addElement({
    type: "button",
    caption: "Submit",
  });
  AsyncEvents.listen(button.clicked, async (event) => {
    window.alert("Clicked " + textEntry.getValue() + " " + numericEntry.getValue());
  });
  const tilesTab = objLayoutViewport.view.tabs[1];
  const tilesFrame = tilesTab.view.firstView;
  tilesFrame.addItem({
    icon: "./icons/home.svg",
    title: "Home",
    item: {
      description: "This is the first item.",
    },
  });
  tilesFrame.addItem({
    icon: "./icons/home.svg",
    title: "Second",
    item: {
      description: "This is the second item.",
    },
  });
  for (let i = 3; i < 40; ++i) {
    tilesFrame.addItem({
      icon: "./icons/home.svg",
      title: i + "th",
      item: {
        description: "This is the " + i + "th item.",
      },
    });
  }
  tilesFrame.setCallback(({ objItemContent, objItem }) => {
    const description = objItemContent.addElement({
      type: UI.symTextDisplay,
    });
    description.setText(objItem.description);
  });
  const listTab = objLayoutViewport.view.tabs[2];
  const listFrame = listTab.view.firstView;
  listFrame.addItem({
    icon: "./icons/home.svg",
    title: "Home",
    item: {
      description: "This is the first item.",
    },
  });
  listFrame.addItem({
    icon: "./icons/home.svg",
    title: "Second",
    item: {
      description: "This is the second item.",
    },
  });
  for (let i = 3; i < 40; ++i) {
    listFrame.addItem({
      icon: "./icons/home.svg",
      title: i + "th",
      item: {
        description: "This is the " + i + "th item.",
      },
    });
  }
  listFrame.setCallback(({ objItemContent, objItem }) => {
    const description = objItemContent.addElement({
      type: "textDisplay",
    });
    description.setText(objItem.description);
  });
  const mapTab = objLayoutViewport.view.tabs[3];
  const mapFrame = mapTab.view.firstView;
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
