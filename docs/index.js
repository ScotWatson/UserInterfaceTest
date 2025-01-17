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
    views: [
      {
        icon: "./icons/form.svg",
        title: "Form",
        topType: "form",
        topTitle: "Form",
      },
      {
        icon: "./icons/bento.svg",
        title: "Tiles",
        topType: "tiles",
        topTitle: "Tiles",
      },
      {
        icon: "./icons/list.svg",
        title: "List",
        topType: "list",
        topTitle: "List",
      },
      {
        icon: "./icons/map.svg",
        title: "Map",
        topType: "map",
        topTitle: "Map",
      },
    ],
  });
  const formView = windowObj.views[0];
  const formFrame = formView.topFrame;
  const textEntry = formFrame.addElement({
    type: "textEntry",
  });
  textEntry.setPrompt("Text Prompt");
  const multiSelect = formFrame.addElement({
    type: "textDisplay",
  });
  multiSelect.setText("Multi-select");
  (async () => {
    for await (const event of multiSelect.clicked) {
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
    }
  })();
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
  textDisplay.setText("Test text".repeat(100));
  const button = formFrame.addElement({
    type: "button",
    caption: "Submit",
  });
  (async () => {
    for await (const event of button.clicked) {
      window.alert("Clicked " + textEntry.getValue() + " " + numericEntry.getValue());
    }
  })();
  const tilesView = windowObj.views[1];
  const tilesFrame = tilesView.topFrame;
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
  const listView = windowObj.views[2];
  const listFrame = listView.topFrame;
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
  const mapView = windowObj.views[3];
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
        console.log(event);
        const path = new Path2D("M 200 200 l 200 0 l 0 200 l -200 0 l 0 -200");
        console.log(mapFrame.getViewport().ctx.isPointInPath(path, event.canvasPoint.x, event.canvasPoint.y));
        mapFrame.getViewport().ctx.stroke(path);
      }
    })();
  }
  staticImage(new URL("./map-of-the-world-2241469.png", urlSelf));
}
