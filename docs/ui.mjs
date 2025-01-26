/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as AsyncEvents from "https://scotwatson.github.io/WebCommon/20240119/async-events.mjs";

const urlSelf = new URL(self.location);
const urlIconClose = import.meta.resolve("./icons/close.svg");
const urlIconEllipsis = import.meta.resolve("./icons/ellipsis.svg");
const urlIconHome = import.meta.resolve("./icons/home.svg");
const urlIconKebobMenu = import.meta.resolve("./icons/kebob-menu.svg");
const urlIconUnselected = import.meta.resolve("./icons/unselected.svg");
const urlIconRadioSelected = import.meta.resolve("./icons/radio-selected.svg");
const urlIconMultiSelected = import.meta.resolve("./icons/multi-selected.svg");

const rootTypeFunctions = new Map();
rootTypeFunctions.set("navigation", createNavigationTabBar);

function createControlledPromise() {
  let resolve = null;
  let reject = null;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
};

export function initialize(args) {
  const { type, options } = args;
  const metaWidth = document.createElement("meta");
  metaWidth.name = "viewport";
  metaWidth.content = "width=device-width";
  document.head.appendChild(metaWidth);
  document.body.style.margin = "0px";
  document.body.style.border = "0px";
  document.body.style.padding = "0px";
  document.body.style.boxSizing = "border-box";
  document.body.style.touchAction = "none";
  const bodyShadowRoot = document.body.attachShadow({ mode: "closed" });
  const topStyleSheet = new CSSStyleSheet();
  topStyleSheet.insertRule("* { --device-pixel-ratio: " + window.devicePixelRatio + "; }");
  topStyleSheet.insertRule("* { --min-touch-size: 0.25in; }");
  topStyleSheet.insertRule("* { --header-size: calc(30pt / var(--device-pixel-ratio)); }");
  topStyleSheet.insertRule("* { --subheader-size: calc(18pt / var(--device-pixel-ratio)); }");
  topStyleSheet.insertRule("* { --body-text-size: calc(12pt / var(--device-pixel-ratio)); }");
  topStyleSheet.insertRule("* { --caption-size: calc(9pt / var(--device-pixel-ratio)); }");
  topStyleSheet.insertRule(".hidden { display: none; }");
  bodyShadowRoot.adoptedStyleSheets = [...bodyShadowRoot.adoptedStyleSheets, topStyleSheet];
  const divWindow = document.createElement("div");
  document.body.appendChild(divWindow);
  divWindow.style.display = "grid";
  divWindow.style.width = "100%";
  divWindow.style.backgroundColor = "black";
  divWindow.style.overflow = "hidden";
  const resize = () => {
    divWindow.style.height = window.innerHeight + "px";
  };
  window.addEventListener("resize", resize);
  resize();
  bodyShadowRoot.appendChild(divWindow);
  const funcCreate = rootTypeFunctions.get(type);
  const { controller: controllerView, obj: objView } = funcCreate(options);
  divWindow.appendChild(divView);
  return {
    view: objView,
  };
}

function createNavigationTabBar(args) {
  if (!args) {
    args = {};
  }
  const { tabs } = args;
  const obj = {
    tabs: [],
  };
  const controller = createController();
  obj.removed = controller.removed;
  const div = controller.elem;
  div.style.display = "grid";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.gridTemplateColumns = "var(--min-touch-size) 6fr";
  div.style.gridTemplateRows = "1fr";
  div.style.gridTemplateAreas = '"views view"';
  div.style.overflow = "hidden";
  const divViewButtons = document.createElement("div");
  div.appendChild(divViewButtons);
  divViewButtons.style.display = "flex";
  divViewButtons.style.gridArea = "views";
  divViewButtons.style.flexDirection = "column";
  divViewButtons.style.placeContent = "space-around";
  divViewButtons.style.alignItems = "center";
  divViewButtons.style.width = "100%";
  divViewButtons.style.backgroundColor = "white";
  divViewButtons.style.border = "0px";
  divViewButtons.style.boxSizing = "border-box";
  divViewButtons.style.overflow = "hidden";
  const viewControllers = [];
  for (const tab of tabs) {
    const { icon, title, view } = tab;
    const { controller: controllerTab, obj: objTab } = createTab({ icon, title });
    divViewButtons.appendChild(divTab);
    const { controller: controllerView, obj: objView } = createView(view);
    viewContainers.push(controllerView);
    divViewContainer.appendChild(divView);
    objTab.show = () => {
      for (const controller of viewControllers) {
        controller.hide();
      }
      controllerView.show();
    },
    objTab.view = objView,
    divTab.addEventListener("click", () => {
      objTab.show();
    });
    obj.tabs.push(objTab);
  }
  function createTab({ icon, title }) {
    const obj = {};
    const controller = createController("button");
    const div = controller.elem;
    div.style.display = "grid";
    div.style.gridTemplateColumns = "var(--min-touch-size)";
    div.style.gridTemplateRows = "var(--min-touch-size) var(--caption-size)";
    div.style.gridTemplateAreas = '"icon" "title"';
    div.style.border = "0px";
    div.style.margin = "0px";
    div.style.padding = "0px";
    div.style.width = "100%";
    div.style.boxSizing = "border-box";
    const imgView = document.createElement("img");
    div.appendChild(imgView);
    imgView.src = icon;
    imgView.style.display = "block";
    imgView.style.gridArea = "icon";
    const divTabTitle = document.createElement("div");
    div.appendChild(divTabTitle);
    divTabTitle.style.gridArea = "title";
    divTabTitle.style.height = "100%";
    const divTabTitleText = document.createElement("div");
    divTabTitle.appendChild(divTabTitleText);
    divTabTitleText.innerHTML = title;
    divTabTitleText.style.display = "block";
    divTabTitleText.style.width = "100%";
    divTabTitleText.style.fontSize = "var(--caption-size)";
    divTabTitleText.style.whiteSpace = "nowrap";
    divTabTitleText.style.overflow = "hidden";
    divTabTitleText.style.textOverflow = "ellipsis";
    return {
      div,
      obj,
    };
  }
  return {
    div,
    obj,
  };
}

const viewTypeFunctions = new Map();
viewTypeFunctions.set("elements", createElementListLevel);
viewTypeFunctions.set("form", createFormLevel);
viewTypeFunctions.set("tiles", createTilesFrame);
viewTypeFunctions.set("list", createListFrame);
viewTypeFunctions.set("map", createMapFrame);
function createView(args) {
  const { type, options, title, actions } = args;
  const controller = createController();
  const div = controller.elem;
  div.style.display = "grid";
  div.style.backgroundColor = "white";
  div.style.gridTemplateColumns = "1fr";
  div.style.gridTemplateRows = "var(--min-touch-size) 1fr";
  div.style.gridTemplateAreas = '"topBar" "contents"';
  div.style.overflow = "hidden";
  div.style.height = "100%";
  const divTopBar = document.createElement("div");
  div.appendChild(divTopBar);
  divTopBar.style.display = "grid";
  divTopBar.style.gridArea = "topBar";
  divTopBar.style.backgroundColor = "white";
  divTopBar.style.gridTemplateColumns = "1fr var(--min-touch-size)";
  divTopBar.style.gridTemplateRows = "var(--min-touch-size)";
  divTopBar.style.gridTemplateAreas = '"home actions"';
  const divContents = document.createElement("div");
  div.appendChild(divContents);
  divContents.style.display = "grid";
  divContents.style.gridArea = "contents";
  divContents.style.backgroundColor = "white";
  divContents.style.gridTemplateColumns = "1fr";
  divContents.style.gridTemplateRows = "1fr";
  divContents.style.gridTemplateAreas = '"main"';
  const imgBack = document.createElement("img");
  divTopBar.appendChild(imgBack);
  imgBack.src = urlIconHome;
  imgBack.style.display = "none";
  imgBack.style.gridArea = "back";
  imgBack.style.backgroundColor = "white";
  imgBack.style.height = "var(--min-touch-size)";
  const divHome = document.createElement("div");
  divTopBar.appendChild(divHome);
  divHome.style.display = "flex";
  divHome.style.alignItems = "center";
  divHome.style.gridArea = "home";
  divHome.style.backgroundColor = "white";
  divHome.style.height = "var(--min-touch-size)";
  divHome.style.fontSize = "var(--header-size)";
  divHome.style.overflow = "hidden";
  divHome.style.borderLeft = "1px solid black";
  divHome.style.boxSizing = "border-box";
  const divHomeText = document.createElement("div");
  divHome.appendChild(divHomeText);
  divHomeText.style.display = "block";
  divHomeText.style.whiteSpace = "nowrap";
  divHomeText.style.overflow = "hidden";
  divHomeText.style.textOverflow = "ellipsis";
  divHomeText.append(title);
  const imgEllipsis = document.createElement("img");
  divTopBar.appendChild(imgEllipsis);
  imgEllipsis.src = urlIconEllipsis;
  imgEllipsis.style.display = "block";
  imgEllipsis.style.gridArea = "ellipsis";
  imgEllipsis.style.backgroundColor = "white";
  imgEllipsis.style.borderLeft = "1px solid black";
  imgEllipsis.style.boxSizing = "border-box";
  imgEllipsis.style.height = "var(--min-touch-size)";
  const divPenultimate = document.createElement("div");
  divTopBar.appendChild(divPenultimate);
  divPenultimate.style.display = "flex";
  divPenultimate.style.alignItems = "center";
  divPenultimate.style.gridArea = "penultimate";
  divPenultimate.style.backgroundColor = "white";
  divPenultimate.style.height = "var(--min-touch-size)";
  divPenultimate.style.fontSize = "var(--header-size)";
  divPenultimate.style.overflow = "hidden";
  divPenultimate.style.borderLeft = "1px solid black";
  divPenultimate.style.boxSizing = "border-box";
  const divPenultimateText = document.createElement("div");
  divPenultimate.appendChild(divPenultimateText);
  divPenultimateText.style.display = "block";
  divPenultimateText.style.whiteSpace = "nowrap";
  divPenultimateText.style.overflow = "hidden";
  divPenultimateText.style.textOverflow = "ellipsis";
  const divUltimate = document.createElement("div");
  divTopBar.appendChild(divUltimate);
  divUltimate.style.display = "flex";
  divUltimate.style.alignItems = "center";
  divUltimate.style.gridArea = "ultimate";
  divUltimate.style.backgroundColor = "white";
  divUltimate.style.height = "var(--min-touch-size)";
  divUltimate.style.fontSize = "var(--header-size)";
  divUltimate.style.overflow = "hidden";
  divUltimate.style.borderLeft = "1px solid black";
  divUltimate.style.boxSizing = "border-box";
  const divUltimateText = document.createElement("div");
  divUltimate.appendChild(divUltimateText);
  divUltimateText.style.display = "block";
  divUltimateText.style.whiteSpace = "nowrap";
  divUltimateText.style.overflow = "hidden";
  divUltimateText.style.textOverflow = "ellipsis";
  const imgActions = document.createElement("img");
  divTopBar.appendChild(imgActions);
  imgActions.src = urlIconKebobMenu;
  imgActions.style.display = "block";
  imgActions.style.gridArea = "actions";
  imgActions.style.backgroundColor = "white";
  const levels = [];
  function removeLastLevel() {
    const removedLevel = levels.pop();
    removedLevel.remove();
  }
  divHome.addEventListener("click", () => {
    while (levels.length > 1) {
      removeLastLevel();
    }
    updateBreadcrumbs();
  });
  imgEllipsis.addEventListener("click", () => {
    
  });
  divPenultimate.addEventListener("click", () => {
    removeLastLevel();
    updateBreadcrumbs();
  });
  function updateBreadcrumbs() {
    switch (levels.length) {
      case 0: {
        // Empty
        throw new Error("Internal Logic Error");
      }
        break;
      case 1: {
        // Home Only
        if (title === "" && actions.length === 0) {
          div.style.gridTemplateRows = "1fr";
          div.style.gridTemplateAreas = '"contents"';
          divTopBar.style.display = "none";
        } else {
          div.style.gridTemplateRows = "var(--min-touch-size) 1fr";
          div.style.gridTemplateAreas = '"topBar" "contents"';
          divTopBar.style.display = "grid";
        }
        if (actions.length === 0) {
          divTopBar.style.gridTemplateColumns = "1fr";
          divTopBar.style.gridTemplateAreas = '"home"';
        } else {
          divTopBar.style.gridTemplateColumns = "1fr var(--min-touch-size)";
          divTopBar.style.gridTemplateAreas = '"home actions"';
        }
        divHome.style.display = "flex";
        imgEllipsis.style.display = "none";
        divPenultimate.style.display = "none";
        divPenultimate.innerHTML = "";
        divUltimate.style.display = "none";
        divUltimate.innerHTML = "";
        divUltimate.append(levels[levels.length - 1].title);
      }
        break;
      case 2: {
        // One level
        div.style.gridTemplateRows = "var(--min-touch-size) 1fr";
        div.style.gridTemplateAreas = '"topBar" "contents"';
        divTopBar.style.display = "grid";
        if (actions.length === 0) {
          divTopBar.style.gridTemplateColumns = "1fr 1fr 1fr";
          divTopBar.style.gridTemplateAreas = '"home penultimate ultimate"';
        } else {
          divTopBar.style.gridTemplateColumns = "1fr 1fr 1fr var(--min-touch-size)";
          divTopBar.style.gridTemplateAreas = '"home penultimate ultimate actions"';
        }
        imgEllipsis.style.display = "none";
        divPenultimate.style.display = "block";
        divPenultimate.innerHTML = "";
        divPenultimate.append(levels[levels.length - 2].title);
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
        divUltimate.append(levels[levels.length - 1].title);
      }
        break;
      default: {
        // Multiple Levels
        div.style.gridTemplateRows = "var(--min-touch-size) 1fr";
        div.style.gridTemplateAreas = '"topBar" "contents"';
        divTopBar.style.display = "grid";
        divBreadcrumbs.style.gridTemplateColumns = "1fr var(--min-touch-size) 1fr 1fr var(--min-touch-size)";
        divBreadcrumbs.style.gridTemplateAreas = '"home ellipsis penultimate ultimate actions"';
        imgEllipsis.style.display = "block";
        divPenultimate.style.display = "block";
        divPenultimate.innerHTML = "";
        divPenultimate.append(levels[levels.length - 2].title);
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
        divUltimate.append(levels[levels.length - 1].title);
      }
    };
    for (const level of levels) {
      level.objViewVisibility.hide();
    }
    levels[levels.length - 1].objViewVisibility.show();
  }
  imgActions.addEventListener("click", () => {
    toggleActions();
  });
  function toggleActions() {
    if (levels[levels.length - 1].divActionVisibility.isVisible) {
      levels[levels.length - 1].objActionsVisibility.hide();
    } else {
      levels[levels.length - 1].objActionsVisibility.show();
    }
  }
  const obj = {};
  ({ promise: obj.removed, resolve: obj.remove } = createControlledPromise());
  obj.removed.then(() => {
    div.remove();
  });
  let secondary = null;
  obj.closeSecondary = () => {
    divContents.style.display = "grid";
    divContents.style.gridTemplateRows = "1fr";
    divContents.style.gridTemplateColumns = "1fr";
    divContents.style.gridTemplateAreas = '"main"';
    secondary.obj.remove();
  };
  obj.openSecondary = ({ title, actions, options }) => {
    divContents.style.display = "grid";
    divContents.style.gridTemplateRows = "1fr";
    divContents.style.gridTemplateColumns = "2fr 1fr";
    divContents.style.gridTemplateAreas = '"main secondary"';
    secondary = createSecondaryPanel({ title, actions, options });
    divContents.appendChild(secondary.div);
    AsyncEvents.listen(secondary.obj.closeRequested, (event) => {
      obj.closeSecondary();
    });
    return secondary.obj.content;
  };
  obj.addLevel = (args) => {
    const { type, options, title, actions } = args;
    const obj = {};
    const funcCreate = viewTypeFunctions.get(type);
    const { controller: controllerView, obj: objView } = funcCreate(options, view);
    divContents.appendChild(controllerView.elem);
    divView.style.gridArea = "main";
    const { controller: controllerActionList, obj: objActionList} = createActionList(actions);
    div.appendChild(controllerActionList.elem);
    const level = {
      title,
      controllerView,
      controllerActionList,
      remove: obj.remove,
    };
    if (levels.length !== 0) {
      levels[levels.length - 1].controllerActionList.hide();
    }
    if (secondary !== null) {
      secondary.obj.remove();
    }
    levels.push(level);
    obj.removed = controllerView.removed;
    obj.removed.then(() => {
      controllerView.remove();
      controllerActionList.remove();
    });
    obj.contents = objView;
    obj.actions = objActionList.actions;
    updateBreadcrumbs();
    return obj;
  };
  function createSecondaryPanel(args) {
    const { title, options, actions } = args;
    const obj = {};
    const controller = createController();
    obj.removed = controller.removed;
    const div = controller.elem;
    div.style.display = "grid";
    div.style.gridArea = "secondary";
    div.style.gridTemplateColumns = "1fr";
    div.style.gridTemplateRows = "var(--min-touch-size) 1fr";
    div.style.gridTemplateAreas = '"topBar" "content"';
    div.style.backgroundColor = "white";
    div.style.borderLeft = "1px solid black";
    div.style.overflow = "hidden";
    const divSecondaryTopBar = document.createElement("div");
    div.appendChild(divSecondaryTopBar);
    divSecondaryTopBar.style.display = "grid";
    divSecondaryTopBar.style.gridArea = "topBar";
    divSecondaryTopBar.style.gridTemplateColumns = "var(--min-touch-size) 1fr var(--min-touch-size)";
    divSecondaryTopBar.style.gridTemplateRows = "var(--min-touch-size)";
    divSecondaryTopBar.style.gridTemplateAreas = '"close title actions"';
    divSecondaryTopBar.style.backgroundColor = "white";
    const imgSecondaryClose = document.createElement("img");
    divSecondaryTopBar.appendChild(imgSecondaryClose);
    imgSecondaryClose.src = urlIconClose;
    imgSecondaryClose.style.display = "block";
    imgSecondaryClose.style.gridArea = "close";
    imgSecondaryClose.style.backgroundColor = "white";
    imgSecondaryClose.style.fontSize = "24pt";
    imgSecondaryClose.style.overflow = "hidden";
    imgSecondaryClose.style.boxSizing = "border-box";
    const divSecondaryTitle = document.createElement("div");
    divSecondaryTopBar.appendChild(divSecondaryTitle);
    divSecondaryTitle.style.gridArea = "title";
    divSecondaryTitle.style.backgroundColor = "white";
    divSecondaryTitle.style.fontSize = "24pt";
    divSecondaryTitle.style.overflow = "hidden";
    divSecondaryTitle.style.borderLeft = "1px solid black";
    divSecondaryTitle.style.boxSizing = "border-box";
    const imgSecondaryActions = document.createElement("img");
    divSecondaryTopBar.appendChild(imgSecondaryActions);
    imgSecondaryActions.src = urlIconKebobMenu;
    imgSecondaryActions.style.gridArea = "actions";
    imgSecondaryActions.style.backgroundColor = "white";
    imgSecondaryActions.style.boxSizing = "border-box";
    const { div: divContent, obj: objContent } = createElementListLevel();
    div.appendChild(divContent);
    divContent.style.gridArea = "content";
    obj.content = objContent;
    obj.closeRequested = new AsyncEvents.EventIterable(({ next, complete, error }) => {
      imgSecondaryClose.addEventListener("click", next);
    });
    obj.removed.then(() => {
      div.remove();
    });
    return {
      controller,
      obj,
    };
  }
  function createActionList(actions) {
    const obj = {};
    const controller = createController();
    const div = controller.elem;
    div.style.display = "none";
    div.style.flexDirection = "column";
    div.style.position = "relative";
    div.style.right = "0px";
    div.style.top = "0px";
    for (const action of actions) {
      const { controller: controllerAction, obj: objAction } = createAction(obj);
      div.appendChild(divAction);
      obj.actions.push(objAction);
    }
    obj.show = () => {
      div.style.display = "block";
    }
    obj.hide = () => {
      div.style.display = "none";
    }
    return {
      controller,
      obj,
    };
  }
  function createAction() {
    const obj = {};
    const controller = createController();
    const div = controller.elem;
    div.style.display = "block";
    div.style.height = "var(--min-touch-size)";
    div.style.width = "100%";
    obj.clicked = new AsyncEvents.EventIterable(({ next, complete, error }) => {
      div.addEventListener("click", next);
      obj.removed.then(() => {
        div.removeEventListener("click", next);
        complete();
      });
    });
    obj.removed.then(() => {
      div.remove();
    });
    return {
      controller,
      obj,
    };
  }
  obj.back = () => {
    if (frames.length === 1) {
      throw new Error("No more frames to remove.");
    }
    removeLastLevel();
    updateBreadcrumbs();
  };
  obj.firstView = obj.addLevel({
    type,
    options,
    actions,
  });
  return {
    controller,
    obj,
  };
}
function createTilesFrame(args) {
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  const divScroll = createVerticalScrollable(div);
  div.style.height = "100%";
  divScroll.style.display = "flex";
  divScroll.style.flexDirection = "row";
  divScroll.style.flexWrap = "wrap";
  divScroll.style.justifyContent = "space-around";
  divScroll.style.alignItems = "center";
  divScroll.style.alignContent = "space-around";
  divScroll.style.boxSizing = "border-box";
  const elements = [];
  obj.addItem = ({ icon, title, item }) => {
    const divNewTile = document.createElement("div");
    divScroll.appendChild(divNewTile);
    const imgIcon = document.createElement("img");
    divNewTile.appendChild(imgIcon);
    imgIcon.src = icon;
    const divTitle = document.createElement("div");
    divNewTile.appendChild(divTitle);
    divTitle.append(title);
    divNewTile.style.display = "block";
    divNewTile.style.width = "calc(2 * var(--min-touch-size))"; // ~1 in
    divNewTile.style.aspectRatio = "1";
    divNewTile.style.border = "1px solid black";
    divNewTile.style.margin = "2%";
    return {
      selected: new AsyncEvents.EventIterable(({ next, complete, error }) => {
        divNewTile.addEventListener("click", () => { next(item); });
      }),
    };
  },
  obj.clearAllItems = () => {
    divScroll.innerHTML = "";
  };
  obj.removed.then(() => {
    div.remove();
  });
  return {
    controller,
    obj,
  };
}
function createListFrame(args) {
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  const divScroll = createVerticalScrollable(div);
  div.style.height = "100%";
  divScroll.style.display = "flex";
  divScroll.style.flexDirection = "column";
  divScroll.style.flexWrap = "no-wrap";
  divScroll.style.justifyContent = "space-around";
  divScroll.style.alignItems = "center";
  divScroll.style.alignContent = "space-around";
  divScroll.style.boxSizing = "border-box";
  const elements = [];
  obj.addItem = ({ icon, title, item }) => {
    const divNewLine = document.createElement("div");
    divScroll.appendChild(divNewLine);
    const imgIcon = document.createElement("img");
    divNewLine.appendChild(imgIcon);
    imgIcon.style.gridArea = "icon";
    imgIcon.src = icon;
    imgIcon.style.aspectRatio = "1";
    const divTitle = document.createElement("div");
    divNewLine.appendChild(divTitle);
    divTitle.style.gridArea = "title";
    divTitle.append(title);
    divNewLine.style.display = "grid";
    divNewLine.style.gridTemplateRows = "var(--min-touch-size)";
    divNewLine.style.gridTemplateColumns = "var(--min-touch-size) 1fr";
    divNewLine.style.gridTemplateAreas = '"icon title"';
    divNewLine.style.width = "100%";
    return {
      selected: new AsyncEvents.EventIterable(({ next, complete, error }) => {
        divNewLine.addEventListener("click", () => { next(item); });
      }),
    };
  };
  obj.clearAllItems = () => {
    divScroll.innerHTML = "";
  };
  obj.removed.then(() => {
    div.remove();
  });
  return {
    controller,
    obj,
  };
}
function createMapFrame(args) {
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  let changeViewport;
  obj.viewportChanged = new AsyncEvents.EventIterable(({ next, complete, error }) => {
    changeViewport = next;
  });
  const canvas = document.createElement("canvas", {
    alpha: false,
    colorSpace: "srgb",
    desynchronized: true,
    willReadFrequently: false,
  });
  obj.clicked = new AsyncEvents.EventIterable(({ next, complete, error }) => {
    canvas.addEventListener("click", (evt) => {
      const canvasPoint = new DOMPoint(evt.offsetX * window.devicePixelRatio, evt.offsetY * window.devicePixelRatio);
      next({
        canvasPoint,
        imagePoint: canvasPoint.matrixTransform(ctx.getTransform().inverse()),
      });
    });
  });
  div.style.height = "100%";
  div.appendChild(canvas);
  div.style.overflow = "hidden";
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.touchAction = "none";
  canvas.width = 1;
  canvas.height = 1;
  const canvasResize = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const canvasRect = entry.contentRect;
      if ((canvasRect.width === 0) || (canvasRect.height === 0)) {
        return;
      }
      const workingTransform = ctx.getTransform();
      canvas.style.width = canvasRect.width + "px";
      canvas.style.height = canvasRect.height + "px";
      const oldCenter = new DOMPoint(canvas.width / 2, canvas.height / 2);
      canvas.width = canvasRect.width * window.devicePixelRatio;
      canvas.height = canvasRect.height * window.devicePixelRatio;
      const newCenter = new DOMPoint(canvas.width / 2, canvas.height / 2);
      const translate = createTranslationMatrix2d({
        tx: newCenter.x - oldCenter.x,
        ty: newCenter.y - oldCenter.y,
      });
      ctx.setTransform(translate.multiply(workingTransform));
      createNewViewport();
    }
  });
  canvasResize.observe(div);
  const ctx = canvas.getContext("2d");
  const pointers = new Map();
  canvas.addEventListener("pointerdown", (evt) => {
    pointers.set(evt.pointerId, new DOMPoint(evt.offsetX * window.devicePixelRatio, evt.offsetY * window.devicePixelRatio));
    update();
    evt.preventDefault();
  });
  canvas.addEventListener("pointermove", (evt) => {
    const thisPointer = pointers.get(evt.pointerId);
    if (thisPointer) {
      thisPointer.x = evt.offsetX * window.devicePixelRatio;
      thisPointer.y = evt.offsetY * window.devicePixelRatio;
      update();
    }
    evt.preventDefault();
  });
  canvas.addEventListener("pointerup", (evt) => {
    pointers.delete(evt.pointerId);
    update();
    evt.preventDefault();
  });
  let movement = null;
  let baseTransform = null;
  const VPcanvas = new OffscreenCanvas(canvas.width, canvas.height);
  let viewport = {
    ctx: VPcanvas.getContext("2d"),
    accept() {
    },
  };
  obj.getViewport = () => {
    return viewport;
  };
  function cloneDOMMatrix2d(matrix) {
    return new DOMMatrix([ matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f ]);
  }
  function createTranslationMatrix2d({ tx, ty }) {
    return (new DOMMatrix()).translateSelf(tx, ty);
  }
  function createScalingMatrix2d({ scaleX, scaleY }) {
    return (new DOMMatrix()).scaleSelf(scaleX, scaleY);
  }
  function createRotationMatrix2d(rotX, rotY) {
    return (new DOMMatrix()).rotateSelf(rotX, rotY);
  }
  function update() {
    const pointerArray = Array.from(pointers.values());
    switch (pointerArray.length) {
      case 0: {
        // end pan
        if (movement === null) {
          break;
        }
        baseTransform = ctx.getTransform();
        createNewViewport();
        movement = null;
      }
        break;
      case 1: {
        // panning, end zooming
        if ((movement === null) || (movement.type !== "pan")) {
          baseTransform = ctx.getTransform();
          movement = {
            type: "pan",
            startPoint: DOMPoint.fromPoint(pointerArray[0]),
          };
        } else {
          const endPoint = pointerArray[0];
          const translation = createTranslationMatrix2d({
            tx: endPoint.x - movement.startPoint.x,
            ty: endPoint.y - movement.startPoint.y,
          });
          // Matricies must be multiplied in reverse order of application
          ctx.setTransform(translation.multiply(baseTransform));
          render();
        }
      }
        break;
      case 2: {
        // panning & zooming
        if ((movement === null) || (movement.type !== "panZoom")) {
          baseTransform = ctx.getTransform();
          movement = {
            type: "panZoom",
            startPoint: midpoint(pointerArray[0], pointerArray[1]),
            startLength: distance(pointerArray[0], pointerArray[1]),
          };
        } else {
          const endPoint = midpoint(pointerArray[0], pointerArray[1]);
          const endLength = distance(pointerArray[0], pointerArray[1]);
          const scale = endLength / movement.startLength;
          const translateStartToOrigin = createTranslationMatrix2d({
            tx: -movement.startPoint.x,
            ty: -movement.startPoint.y,
          });
          const scaling = createScalingMatrix2d({
            scaleX: scale,
            scaleY: scale,
          });
          const translateOriginToEnd = createTranslationMatrix2d({
            tx: endPoint.x,
            ty: endPoint.y,
          });
          // Matricies must be multiplied in reverse order of application
          ctx.setTransform(translateOriginToEnd.multiply(scaling).multiply(translateStartToOrigin).multiply(baseTransform));
          render();
        }
      }
        break;
      default: {
        // too many points, end panning & zooming
        baseTransform = ctx.getTransform();
        movement = null;
        render();
      }
        break;
    }
  }
  function midpoint(point1, point2) {
    return new DOMPoint((point2.x + point1.x) / 2, (point2.y + point1.y) / 2);
  }
  function distance(point1, point2) {
    return Math.sqrt((point2.x - point1.x)**2 + (point2.y - point1.y)**2);
  }
  function createNewViewport() {
    const VPcanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const VPcanvasCtx = VPcanvas.getContext("2d");
    VPcanvasCtx.drawImage(canvas, 0, 0);
    VPcanvasCtx.setTransform(ctx.getTransform());
    const thisViewport = {
      ctx: VPcanvasCtx,
      accept() {
        viewport = thisViewport;
        render();
      },
    }
    const obj = {
      viewport: thisViewport,
    };
    changeViewport(obj);
  }
  function getBounds(ctx) {
    const transform = ctx.getTransform().invertSelf();
    return {
      pointUL: (new DOMPoint(0, 0)).matrixTransform(transform),
      pointUR: (new DOMPoint(ctx.canvas.width, 0)).matrixTransform(transform),
      pointLL: (new DOMPoint(0, ctx.canvas.height)).matrixTransform(transform),
      pointLR: (new DOMPoint(ctx.canvas.width, ctx.canvas.height)).matrixTransform(transform),
    };
  }
  function render() {
    const currentTransform = viewport.ctx.getTransform();
    const workingTransform = ctx.getTransform();
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(workingTransform.multiply(currentTransform.inverse()));
    ctx.drawImage(viewport.ctx.canvas, 0, 0);
    ctx.restore();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  createNewViewport();
  obj.setTransform = (transform) => {
    ctx.setTransform(transform);
    render();
    createNewViewport();
  }
  obj.removed.then(() => {
    div.remove();
  });
  return {
    controller,
    obj,
  };
}

const formElementTypes = new Map();
formElementTypes.set("text-entry", createTextEntry);
formElementTypes.set("numeric-entry", createNumericEntry);
formElementTypes.set("text-display", createTextDisplay);
formElementTypes.set("button", createButton);

function createElementListLevel(args) {
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  div.style.display = "block";
  div.style.overflow = "hidden";
  const divContent = document.createElement("div");
  div.appendChild(divContent);
  divContent.style.display = "flex";
  divContent.style.flexDirection = "column";
  const elements = new Map();
  obj.addElement = (args) => {
    const { type } = args;
    const funcCreate = formElementTypes.get(type);
    const { div: divElement, obj: objElement } = funcCreate(args);
    elements.set(objElement, { div: divElement, obj: objElement });
    divContent.appendChild(divElement);
    return objElement;
  };
  obj.clear = () => {
    divContent.textContent = "";
    elements.clear();
  };
  return {
    controller,
    obj,
  };
}
function createTextEntry(args) {
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  div.style.display = "grid";
  div.style.width = "100%";
  if (args.icon) {
    div.style.gridTemplateColumns = "var(--min-touch-size) 1fr";
    div.style.gridTemplateRows = "1fr 1fr";
    div.style.gridTemplateAreas = '"icon prompt" "icon input"';
    const imgIcon = document.createElement("img");
    div.appendChild(imgIcon);
    imgIcon.src = args.icon;
    imgIcon.style.display = "block";
  } else {
    div.style.gridTemplateColumns = "1fr";
    div.style.gridTemplateRows = "1fr 1fr";
    div.style.gridTemplateAreas = '"prompt" "input"';
  }
  const divPrompt = document.createElement("div");
  div.appendChild(divPrompt);
  divPrompt.style.display = "block";
  divPrompt.style.width = "100%";
  divPrompt.style.fontSize = "var(--subheader-size)";
  divPrompt.style.overflow = "hidden";
  const input = document.createElement("input");
  div.appendChild(input);
  input.type = "text";
  input.style.display = "block";
  input.style.gridArea = "input";
  input.style.width = "100%";
  input.style.fontSize = "var(--body-text-size)";
  input.style.border = "1px solid black";
  input.style.boxSizing = "border-box";
  obj.setPrompt = (text) => {
    divPrompt.innerHTML = "";
    divPrompt.append(text);
  };
  obj.getValue = () => {
    return input.value;
  };
  return {
    controller,
    obj,
  };
}

const selectFormElementTypes = new Map();
selectFormElementTypes.set("text-entry", createTextEntry);
selectFormElementTypes.set("numeric-entry", createNumericEntry);
selectFormElementTypes.set("select", createSelect);
selectFormElementTypes.set("button", createButton);

function createSelect(args) {
  const divText = document.createElement("div");
  divText.style.display = "block";
  const divPrimary = document.createElement("div");
  divText.appendChild(divPrimary);
  divPrimary.style.display = "block";
  divPrimary.style.width = "100%";
  divPrimary.style.fontSize = "var(--subheader-size)";
  const divSecondary = document.createElement("div");
  divText.appendChild(divSecondary);
  divSecondary.style.display = "block";
  divSecondary.style.width = "100%";
  divSecondary.style.fontSize = "var(--body-text-size)";
  const imgSubmenu = document.createElement("img");
  div.appendChild(imgSubmenu);
  imgSubmenu.src = "./right-caret.svg";  
  const obj = {
    expanded: new AsyncEvents.EventIterable(({ next, complete, error }) => {
      imgSubmenu.addEventListener("click", () => {
        const callback = (options) => {
          view.addLevel({
            title: primaryText,
            type: "form",
            options,
          });
        }
        next(callback);
      });
    }),
  };
  return {
    controller,
    obj,
  };
}

function createFormLevel(args, view) {
  const { minOptions, maxOptions, options } = args;
  const obj = {};
  const controller = createController();
  const div = controller.elem;
  const optionsArray = [];
  if ((minOptions < 0) || (minOptions > options.length)) {
    throw new Error("Invalid minOptions value: " + minOptions + ", must be between 0 & " + options.length);
  }
  if ((maxOptions < minOptions) || (maxOptions > options.length)) {
    throw new Error("Invalid maxOptions value: " + maxOptions + ", must be between " + minOptions + " & " + options.length);
  }
  let displayType = "";
  if (maxOptions === 1) {
    displayType = "radio";
  }
  if (minOptions === options.length) {
    displayType = "allSelected";
  }
  div.style.display = "block";
  div.style.height = "100%";
  obj.selectionChanged = AsyncEvents.EventIterable(({ next, complete, error }) => {
    
  });
  {
    isSelected();
    getValue();
    valueChanged;
  }
  switch (displayType) {
    case "radio": {
      const divContent = createVerticalScroll(div);
      div.appendChild(divContent);
      const arrControllerOption = [];
      for (const option of options) {
        const { controllerOption, objOption } = createRadioOption(option);
        optionsArray.push(objOption);
        arrControllerOption.push(controllerOption);
        divContent.appendChild(controllerOption.elem);
      }
      function unselectAll() {
        for (const controllerOption of arrControllerOption) {
          controllerOption.select.src = urlIconUnselected.toString();
        }
      }
      function createRadioOption(args) {
        const { type } = args;
        const obj = {};
        const controller = createController();
        const div = controller.elem;
        obj.removed = controller.removed;
        div.style.display = "grid";
        div.style.gridTemplateRows = "1fr";
        div.style.gridTemplateColumns = "var(--min-touch-size) 1fr var(--min-touch-size)";
        div.style.gridTemplateAreas = '"radio control status"';
        div.style.width = "100%";
        div.style.minHeight = "var(--min-touch-size)";
        const imgSelect = document.createElement("img");
        div.appendChild(imgSelect);
        imgSelect.src = urlIconUnselected;
        imgSelect.style.display = "block";
        imgSelect.style.gridArea = "radio";
        controller.select = imgSelect;
        imgSelect.addEventListener("click", () => {
          unselectAll();
          imgSelect.src = urlIconRadioSelected.toString();
        });
        const funcCreate = formElementTypes.get(option.type);
        const { div: divControl, obj: objControl } = funcCreate(args);
        divControl.style.gridArea = "control";
        div.appendChild(divControl);
        const divStatus = document.createElement("img");
        div.appendChild(divStatus);
        divStatus.style.display = "block";
        divStatus.style.gridArea = "radio";
        imgSelect.addEventListener("click", objOption.select);
        obj.element = objControl;
        obj.isSelected = () => {
          return !(imgSelect.src === urlIconUnselected.toString());
        };
        obj.getValue = objControl.getValue;
        obj.valueChanged = objControl.valueChanged;
        obj.getValue = () => {
          
        };
        obj.valueChanged = new AsyncEvents.EventIterable(({ next, complete, error }) => {
          
        });
        return {
          controller,
          obj,
        };
      }
    }
      break;
    case "allSelected": {
      const divContent = document.createElement("div");
      div.appendChild(divContent);
      for (const option of options) {
        const { controllerOption, objOption } = createRadioOption(option);
        optionsArray.push(objOption);
        controllerArray.push(controllerOption);
        divContent.appendChild(controllerOption.elem);
      }
      function createAllSelectedOption(args) {
        const { type } = args;
        const obj = {};
        const controller = createController();
        const div = controller.elem;
        obj.removed = controller.removed;
        div.style.display = "grid";
        div.style.gridTemplateRows = "1fr";
        div.style.gridTemplateColumns = "1fr var(--min-touch-size)";
        div.style.gridTemplateAreas = '"control status"';
        div.style.width = "100%";
        div.style.minHeight = "var(--min-touch-size)";
        const funcCreate = formElementTypes.get(option.type);
        const { div: divControl, obj: objControl } = funcCreate(args);
        divControl.style.gridArea = "control";
        div.appendChild(divControl);
        const divStatus = document.createElement("img");
        div.appendChild(divStatus);
        divStatus.style.display = "block";
        divStatus.style.gridArea = "status";
        obj.element = objControl;
        obj.select = () => {
          throw new Error("All items must be selected.");
        };
        obj.unselect = () => {
          throw new Error("All items must be selected.");
        };
        obj.isSelected = () => {
          return !(imgSelect.src === urlIconUnselected.toString());
        };
        return {
          controller,
          obj,
        };
      }
    }
    default: {
      div.style.display = "grid";
      div.style.gridTemplateRows = "max-content 1fr";
      div.style.gridTemplateColumns = "1fr";
      div.style.gridTemplateAreas = '"header" "scroll"';
      const divHeader = document.createElement("div");
      div.appendChild(divHeader);
      divHeader.style.display = "grid";
      divHeader.style.gridArea = "header";
      divHeader.style.gridTemplateRows = "1fr";
      divHeader.style.gridTemplateColumns = "1fr 1fr";
      divHeader.style.gridTemplateAreas = '"required current"';
      const divRequired = document.createElement("div");
      divHeader.appendChild(divRequired);
      divRequired.style.display = "block";
      divRequired.style.gridArea = "required";
      divRequired.style.fontSize = "var(--header-size)";
      divRequired.innerHTML = minOptions + " to " + maxOptions + " of " + options.length;
      const divCurrent = document.createElement("div");
      divHeader.appendChild(divCurrent);
      divCurrent.style.display = "block";
      divCurrent.style.gridArea = "current";
      divCurrent.style.fontSize = "var(--header-size)";
      divCurrent.innerHTML = 0 + " of " + options.length;
      function refreshCurrent() {
        let numSelected = 0;
        for (const objOption of optionsArray) {
          if (objOption.isSelected()) {
            ++numSelected;
          }
        }
        divCurrent.innerHTML = numSelected + " of " + options.length;
        divCurrent.style.color = ((numSelected >= minOptions) && (numSelected <= maxOptions)) ? "black" : "red";
      }
      const divScroll = document.createElement("div");
      div.appendChild(divScroll);
      divScroll.style.display = "block";
      divScroll.style.gridArea = "scroll";
      const divContent = document.createElement("div");
      divContent.style.display = "block";
      divScroll.appendChild(divContent);
      for (const option of options) {
        const { controller, obj } = createDefaultOption(args);
        optionsArray.push(objOption);
        divContent.appendChild(controllerOption.elem);
        imgSelect.addEventListener("click", () => {
          if (objOption.isSelected()) {
            objOption.unselect();
          } else {
            objOption.select();
          }
        });
      }
      for (let i = 0; i < minOptions; ++i) {
        optionsArray[i].select();
      }
      function createDefaultOption(args) {
        const { type } = args;
        const obj = {};
        const controller = createController();
        const div = controller.elem;
        obj.removed = controller.removed;
        div.style.display = "grid";
        div.style.gridTemplateRows = "1fr";
        div.style.gridTemplateColumns = "1fr var(--min-touch-size) var(--min-touch-size)";
        div.style.gridTemplateAreas = '"control switch status"';
        div.style.width = "100%";
        div.style.minHeight = "var(--min-touch-size)";
        const funcCreate = formElementTypes.get(option.type);
        const { div: divControl, obj: objControl } = funcCreate(args);
        divControl.style.gridArea = "control";
        div.appendChild(divControl);
        const imgSelect = document.createElement("img");
        div.appendChild(imgSelect);
        imgSelect.src = urlIconUnselected;
        imgSelect.style.display = "block";
        imgSelect.style.gridArea = "switch";
        const divStatus = document.createElement("img");
        div.appendChild(divStatus);
        divStatus.style.display = "block";
        divStatus.style.gridArea = "status";
        obj.element = objControl;
        obj.select = () => {
          imgSelect.src = urlIconRadioSelected.toString();
        };
        obj.unselect = () => {
          imgSelect.src = urlIconUnselected.toString();
        };
        obj.isSelected = () => {
          return !(imgSelect.src === urlIconUnselected.toString());
        };
        obj.selected
        obj.unselected
        return {
          controller,
          obj,
        };
      }
    }
  };
  obj.options = optionsArray;
  obj.removed.then(() => {
    div.remove();
  });
  return {
    controller,
    obj,
  };
}
function createNumericEntry(args) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.width = "100%";
  div.style.height = "max-content";
  div.style.gridTemplateColumns = "1fr";
  div.style.gridTemplateRows = "1fr 2fr";
  div.style.gridTemplateAreas = '"prompt" "input"';
  const divPrompt = document.createElement("div");
  div.appendChild(divPrompt);
  divPrompt.style.display = "block";
  divPrompt.style.gridArea = "prompt";
  divPrompt.style.fontSize = "var(--subheader-size)";
  const divInput = document.createElement("div");
  div.appendChild(divInput);
  divInput.style.display = "grid";
  divInput.style.gridArea = "input";
  divInput.style.gridTemplateColumns = "1fr var(--min-touch-size)";
  divInput.style.gridTemplateRows = "1fr";
  divInput.style.gridTemplateAreas = '"range number"';
  const inputRange = document.createElement("input");
  divInput.appendChild(inputRange);
  inputRange.type = "range";
  inputRange.style.display = "block";
  inputRange.style.gridArea = "range";
  inputRange.style.margin = "0px";
  inputRange.style.border = "0px";
  inputRange.style.padding = "0px";
  const inputNumber = document.createElement("input");
  divInput.appendChild(inputNumber);
  inputNumber.type = "number";
  inputNumber.style.display = "block";
  inputNumber.style.gridArea = "number";
  inputNumber.style.margin = "0px";
  inputNumber.style.border = "0px";
  inputNumber.style.padding = "0px";
  const sync = (value) => {
    inputRange.value = value;
    inputNumber.value = value;
  };
  inputRange.addEventListener("change", () => { sync(inputRange.value); });
  inputNumber.addEventListener("change", () => { sync(inputNumber.value); });
  const obj = {
    setPrompt(text) {
      divPrompt.innerHTML = "";
      divPrompt.append(text);
    },
    setLimits(args) {
      inputNumber.min = args.min;
      inputNumber.max = args.max;
      inputNumber.step = args.interval;
      inputRange.min = args.min;
      inputRange.max = args.max;
      inputRange.step = args.interval;
    },
    getValue() {
      return input.value;
    },
  };
  return {
    div,
    obj,
  };
}
function createTextDisplay(args) {
  const div = document.createElement("div");
  div.style.display = "block";
  div.style.width = "100%";
  div.style.minHeight = "var(--min-touch-size)";
  const divPrimary = document.createElement("div");
  div.appendChild(divPrimary);
  divPrimary.style.display = "block";
  divPrimary.style.width = "100%";
  divPrimary.style.minHeight = "var(--min-touch-size)";
  divPrimary.style.fontSize = "var(--subheader-size)";
  const obj = {
    setText(text) {
      divPrimary.innerHTML = "";
      divPrimary.append(text);
    },
    clicked: new AsyncEvents.EventIterable(({ next, complete, error }) => {
      div.addEventListener("click", next);
    }),
  };
  return {
    div,
    obj,
  };
}
function createButton(args) {
  const div = document.createElement("div");
  div.style.display = "block";
  div.style.width = "100%";
  div.style.height = "50px";
  const btn = document.createElement("button");
  div.appendChild(btn);
  btn.style.position = "relative";
  btn.style.top = "5px";
  btn.style.left = "10%";
  btn.style.height = "var(--min-touch-size)";
  btn.style.width = "80%";
  btn.style.borderRadius = "calc(0.4 * var(--min-touch-size))";
  btn.style.border = "0px";
  btn.style.backgroundColor = "white";
  if (typeof args.caption === "string") {
    btn.innerHTML = args.caption;
  }
  const obj = {
    clicked: new AsyncEvents.EventIterable(({ next, complete, error }) => {
      btn.addEventListener("click", next);
    }),
  };
  return {
    div,
    obj,
  };
}
function createVerticalCenteredText() {
  
}
function createVerticalScrollable(div) {
  div.style.display = "block";
  div.style.backgroundColor = "#C0C0C0";
  div.style.overflowX = "hidden";
  div.style.overflowY = "scroll";
  div.style.boxSizing = "border-box";
  div.style.scrollbarWidth = "none";
  div.style.height = "100%";
  const divScroll = document.createElement("div");
  div.appendChild(divScroll);
  divScroll.style.marginLeft = "1%";
  divScroll.style.marginRight = "1%";
  divScroll.style.width = "98%";
  divScroll.style.backgroundColor = "white";
  return divScroll;
}
function createController(tagName) {
  if (typeof tagName !== "string") {
    tagName = "div";
  }
  const obj = {};
  const elem = document.createElement(tagName);
  ({ promise: obj.removed, resolve: obj.remove } = createControlledPromise());
  obj.show = () => {
    div.style.visibility = "visible";
  };
  obj.hide = () => {
    div.style.visibility = "hidden";
  };
  obj.elem = elem;
  return obj;
}
