/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const urlSelf = new URL(self.location);
const urlIconUnselected = new URL("./icons/unselected.svg", urlSelf);
const urlIconRadioSelected = new URL("./icons/radio-selected.svg", urlSelf);
const urlIconMultiSelected = new URL("./icons/multi-selected.svg", urlSelf);

function initialize() {
  document.body.style.margin = "0px";
  document.body.style.border = "0px";
  document.body.style.padding = "0px";
  document.body.style.boxSizing = "border-box";
  document.body.style.touchAction = "none";
  const bodyShadowRoot = document.body.attachShadow({ mode: "closed" });
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
  return divWindow;
}
export function rootViewSelector(args) {
  const root = initialize();
  const { div, obj } = createViewSelector(args);
  root.appendChild(div);
  return obj;
}
export function rootView(args) {
  const root = initialize();
  const { div, obj } = createView(args);
  root.appendChild(div);
  return obj;
}
export function rootFrame(args) {
  const root = initialize();
  const { div, obj } = createFrame(args);
  root.appendChild(div);
  return obj;
}
function createViewSelector(args) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.gridTemplateAreas = '"hamburger view" "views view"';
  div.style.overflow = "hidden";
  if (!args) {
    args = {};
  }
  if (!args.logo) {
    args.logo = "./icons/hamburger-menu.svg";
  }
  if (!args.appName) {
    args.appName = "";
  }
  const divHamburger = document.createElement("div");
  div.appendChild(divHamburger);
  divHamburger.style.display = "grid";
  divHamburger.style.gridArea = "hamburger";
  divHamburger.style.backgroundColor = "#808080";
  const imgLogo = document.createElement("img");
  divHamburger.appendChild(imgLogo);
  imgLogo.src = args.logo;
  imgLogo.style.display = "block";
  imgLogo.style.gridArea = "appLogo";
  imgLogo.style.backgroundColor = "#808080";
  const divAppName = document.createElement("div");
  divHamburger.appendChild(divAppName);
  divAppName.append(args.appName);
  divAppName.style.display = "block";
  divAppName.style.gridArea = "appName";
  divAppName.style.backgroundColor = "#808080";
  divAppName.style.height = "50px";
  divAppName.style.fontSize = "24pt";
  divAppName.style.overflow = "hidden";
  const divViewButtonsContainer = document.createElement("div");
  div.appendChild(divViewButtonsContainer);
  divViewButtonsContainer.style.display = "block";
  divViewButtonsContainer.style.gridArea = "views";
  divViewButtonsContainer.style.backgroundColor = "#00FF00";
  divViewButtonsContainer.style.border = "0px";
  divViewButtonsContainer.style.boxSizing = "border-box";
  divViewButtonsContainer.style.overflow = "hidden";
  const divViewButtons = document.createElement("div");
  divViewButtonsContainer.appendChild(divViewButtons);
  divViewButtons.style.display = "block";
  divViewButtons.style.width = "100%";
  divViewButtons.style.backgroundColor = "#00FF00";
  divViewButtons.style.border = "0px";
  divViewButtons.style.boxSizing = "border-box";
  divViewButtons.style.overflow = "hidden";

  const views = new Map();
  collapseViewsMenu();

  function expandViewsMenu() {
    div.style.gridTemplateColumns = "1fr 6fr";
    div.style.gridTemplateRows = "50px 1fr";
    imgLogo.src = args.logo;
    divHamburger.style.gridTemplateColumns = "50px 1fr";
    divHamburger.style.gridTemplateRows = "1fr";
    divHamburger.style.gridTemplateAreas = '"appLogo appName"';
    divAppName.style.display = "block";
    for (const view of views.values()) {
      const divViewTitle = view.btn.children[1];
      divViewTitle.style.display = "flex";
      divViewTitle.style.alignItems = "center";
    }
  }
  function collapseViewsMenu() {
    div.style.gridTemplateColumns = "50px 1fr";
    div.style.gridTemplateRows = "50px 1fr";
    imgLogo.src = "./icons/hamburger-menu.svg";
    divHamburger.style.gridTemplateColumns = "50px";
    divHamburger.style.gridTemplateRows = "1fr";
    divHamburger.style.gridTemplateAreas = '"appLogo"';
    divAppName.style.display = "none";
    for (const view of views.values()) {
      const divViewTitle = view.btn.children[1];
      divViewTitle.style.display = "none";
    }
  }

  imgLogo.addEventListener("click", () => {
    if (divAppName.style.display === "none") {
      expandViewsMenu();
    } else {
      collapseViewsMenu();
    }
  });

  const obj = {
    addView(args) {
      const { icon, title } = args;
      const { div: divView, obj: objView } = createView(args);
      const btn = document.createElement("button");
      divViewButtons.appendChild(btn);
      btn.style.display = "grid";
      btn.style.gridTemplateColumns = "50px 1fr";
      btn.style.gridTemplateRows = "50px";
      btn.style.gridTemplateAreas = '"icon title"';
      btn.style.border = "0px";
      btn.style.margin = "0px";
      btn.style.padding = "0px";
      btn.style.width = "100%";
      btn.style.boxSizing = "border-box";
      const imgView = document.createElement("img");
      btn.appendChild(imgView);
      imgView.src = icon;
      imgView.style.display = "block";
      imgView.style.gridArea = "icon";
      const divViewTitle = document.createElement("div");
      btn.appendChild(divViewTitle);
      if (divAppName.style.display === "none") {
        divViewTitle.style.display = "none";
      } else {
        divViewTitle.style.display = "flex";
        divViewTitle.style.alignItems = "center";
      }
      divViewTitle.style.gridArea = "title";
      divViewTitle.style.height = "100%";
      const divViewTitleText = document.createElement("div");
      divViewTitle.appendChild(divViewTitleText);
      divViewTitleText.innerHTML = title;
      divViewTitleText.style.display = "block";
      divViewTitleText.style.fontSize = "24pt";
      divViewTitleText.style.whiteSpace = "nowrap";
      divViewTitleText.style.overflow = "hidden";
      divViewTitleText.style.textOverflow = "ellipsis";
      views.set(objView, { icon, title, btn, div: divView, obj: objView });
      div.appendChild(divView);
      divView.style.display = "none";
      divView.style.gridArea = "view";
      btn.addEventListener("click", () => {
        for (const view of views.values()) {
          view.div.style.display = "none";
        }
        divView.style.display = "grid";
      });
      return objView;
    },
    deleteView(obj) {
      if (!views.has(obj)) {
        throw new Error("This is not a view of this container.");
      }
      const { icon, title, btn, div } = views.get(obj);
      btn.remove();
      div.remove();
      views.delete(id);
    },
    moveViewBefore(objToMove, obj) {
      const btnToMove = objToMove.btn;
      const btn = obj.btn;
      divViewButtons.insertBefore(btnToMove, btn);
    }
  };
  return {
    div,
    obj,
  };
}

const frameTypes = new Map();
function createView(args) {
  const { type, title, topType, topTitle } = args;
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.backgroundColor = "#00FF00";
  div.style.gridTemplateColumns = "1fr";
  div.style.gridTemplateRows = "50px 1fr";
  div.style.gridTemplateAreas = '"topBar" "content"';
  div.style.overflow = "hidden";

  const divTopBar = document.createElement("div");
  div.appendChild(divTopBar);
  divTopBar.style.display = "grid";
  divTopBar.style.gridArea = "topBar";
  divTopBar.style.backgroundColor = "#FF0000";
  divTopBar.style.gridTemplateColumns = "1fr 50px";
  divTopBar.style.gridTemplateRows = "50px";
  divTopBar.style.gridTemplateAreas = '"breadcrumbs actions"';

  const divBreadcrumbs = document.createElement("div");
  divTopBar.appendChild(divBreadcrumbs);
  divBreadcrumbs.style.display = "grid";
  divBreadcrumbs.style.gridArea = "breadcrumbs";
  divBreadcrumbs.style.gridTemplateRows = "1fr";
  divBreadcrumbs.style.backgroundColor = "#0000C0";

  const imgActions = document.createElement("img");
  divTopBar.appendChild(imgActions);
  imgActions.src = "./icons/kebob-menu.svg";
  imgActions.style.display = "block";
  imgActions.style.gridArea = "actions";
  imgActions.style.backgroundColor = "#0000FF";

  const imgHome = document.createElement("img");
  divBreadcrumbs.appendChild(imgHome);
  imgHome.src = "./icons/home.svg";
  imgHome.style.display = "block";
  imgHome.style.gridArea = "home";
  imgHome.style.backgroundColor = "white";
  imgHome.style.height = "50px";

  const imgEllipsis = document.createElement("img");
  divBreadcrumbs.appendChild(imgEllipsis);
  imgEllipsis.src = "./icons/ellipsis.svg";
  imgEllipsis.style.display = "block";
  imgEllipsis.style.gridArea = "ellipsis";
  imgEllipsis.style.backgroundColor = "white";
  imgEllipsis.style.borderLeft = "1px solid black";
  imgEllipsis.style.boxSizing = "border-box";
  imgEllipsis.style.height = "50px";

  const divPenultimate = document.createElement("div");
  divBreadcrumbs.appendChild(divPenultimate);
  divPenultimate.style.display = "flex";
  divPenultimate.style.alignItems = "center";
  divPenultimate.style.gridArea = "penultimate";
  divPenultimate.style.backgroundColor = "white";
  divPenultimate.style.height = "50px";
  divPenultimate.style.fontSize = "24pt";
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
  divBreadcrumbs.appendChild(divUltimate);
  divUltimate.style.display = "flex";
  divUltimate.style.alignItems = "center";
  divUltimate.style.gridArea = "ultimate";
  divUltimate.style.backgroundColor = "white";
  divUltimate.style.height = "50px";
  divUltimate.style.fontSize = "24pt";
  divUltimate.style.overflow = "hidden";
  divUltimate.style.borderLeft = "1px solid black";
  divUltimate.style.boxSizing = "border-box";
  const divUltimateText = document.createElement("div");
  divUltimate.appendChild(divUltimateText);
  divUltimateText.style.display = "block";
  divUltimateText.style.whiteSpace = "nowrap";
  divUltimateText.style.overflow = "hidden";
  divUltimateText.style.textOverflow = "ellipsis";
  const frames = [];
  function removeLastFrame() {
    const removedFrame = frames.pop();
    removedFrame.div.remove();
  }
  imgHome.addEventListener("click", () => {
    while (frames.length > 1) {
      removeLastFrame();
    }
    updateBreadcrumbs();
  });
  imgEllipsis.addEventListener("click", () => {
    
  });
  divPenultimate.addEventListener("click", () => {
    removeLastFrame();
    updateBreadcrumbs();
  });
  function updateBreadcrumbs() {
    switch (frames.length) {
      case 0: {
        // Empty
        divBreadcrumbs.style.gridTemplateColumns = "50px 1fr";
        divBreadcrumbs.style.gridTemplateAreas = '"home ultimate"';
        imgEllipsis.style.display = "none";
        divPenultimate.style.display = "none";
        divPenultimate.innerHTML = "";
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
      }
        break;
      case 1: {
        // Home Only
        divBreadcrumbs.style.gridTemplateColumns = "50px 1fr";
        divBreadcrumbs.style.gridTemplateAreas = '"home ultimate"';
        imgEllipsis.style.display = "none";
        divPenultimate.style.display = "none";
        divPenultimate.innerHTML = "";
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
        divUltimate.append(frames[frames.length - 1].title);
      }
        break;
      case 2: {
        // One level
        divBreadcrumbs.style.gridTemplateColumns = "50px 1fr 1fr";
        divBreadcrumbs.style.gridTemplateAreas = '"home penultimate ultimate"';
        imgEllipsis.style.display = "none";
        divPenultimate.style.display = "block";
        divPenultimate.innerHTML = "";
        divPenultimate.append(frames[frames.length - 2].title);
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
        divUltimate.append(frames[frames.length - 1].title);
      }
        break;
      default: {
        // Multiple Levels
        divBreadcrumbs.style.gridTemplateColumns = "50px 50px 1fr 1fr";
        divBreadcrumbs.style.gridTemplateAreas = '"home ellipsis penultimate ultimate"';
        imgEllipsis.style.display = "block";
        divPenultimate.style.display = "block";
        divPenultimate.innerHTML = "";
        divPenultimate.append(frames[frames.length - 2].title);
        divUltimate.style.display = "block";
        divUltimate.innerHTML = "";
        divUltimate.append(frames[frames.length - 1].title);
      }
    };
    for (const frame of frames) {
      frame.div.style.display = "none";
    }
    frames[frames.length - 1].div.style.display = frames[frames.length - 1].display;
  }
  const obj = {
    addFrame(args) {
      const { type, title, args: frameArgs } = args;
      const funcCreate = frameTypes.get(type);
      const { div: divFrame, obj: objFrame } = funcCreate(frameArgs);
      frames.push({
        title,
        div: divFrame,
        display: divFrame.style.display,
      });
      divFrame.style.display = "none";
      divFrame.style.gridArea = "content";
      div.appendChild(divFrame);
      updateBreadcrumbs();
      return objFrame;
    },
    back() {
      if (frames.length === 1) {
        throw new Error("No more frames to remove.");
      }
      removeLastFrame();
      updateBreadcrumbs();
    },
  };
  obj.topFrame = obj.addFrame({
    type: topType,
    title: topTitle,
  });
  updateBreadcrumbs();
  return {
    div,
    obj,
  };
}

function createItemDetail(args) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.gridTemplateColumns = "1fr 1fr";
  div.style.gridTemplateRows = "1fr";
  div.style.gridTemplateAreas = '"main item"';
  div.style.overflow = "hidden";

  const divItemDetail = document.createElement("div");
  div.appendChild(divItemDetail);
  divItemDetail.style.display = "grid";
  divItemDetail.style.gridArea = "item";
  divItemDetail.style.gridTemplateColumns = "1fr";
  divItemDetail.style.gridTemplateRows = "50px 1fr";
  divItemDetail.style.gridTemplateAreas = '"topBar" "content"';
  divItemDetail.style.backgroundColor = "white";
  divItemDetail.style.borderLeft = "1px solid black";
  divItemDetail.style.overflow = "hidden";

  const divItemTopBar = document.createElement("div");
  divItemDetail.appendChild(divItemTopBar);
  divItemTopBar.style.display = "grid";
  divItemTopBar.style.gridArea = "topBar";
  divItemTopBar.style.gridTemplateColumns = "50px 1fr 50px";
  divItemTopBar.style.gridTemplateRows = "50px";
  divItemTopBar.style.gridTemplateAreas = '"close title actions"';
  divItemTopBar.style.backgroundColor = "white";

  const imgClose = document.createElement("img");
  divItemTopBar.appendChild(imgClose);
  imgClose.src = "./icons/close.svg";
  imgClose.style.display = "block";
  imgClose.style.gridArea = "close";
  imgClose.style.backgroundColor = "white";
  imgClose.style.fontSize = "24pt";
  imgClose.style.overflow = "hidden";
/*  divClose.style.borderLeft: 1px solid black; */
  imgClose.style.boxSizing = "border-box";

  const divItemTitle = document.createElement("div");
  divItemTopBar.appendChild(divItemTitle);
  divItemTitle.style.gridArea = "title";
  divItemTitle.style.backgroundColor = "white";
  divItemTitle.style.fontSize = "24pt";
  divItemTitle.style.overflow = "hidden";
  divItemTitle.style.borderLeft = "1px solid black";
  divItemTitle.style.boxSizing = "border-box";

  const imgActions = document.createElement("img");
  divItemTopBar.appendChild(imgActions);
  imgActions.src = "./icons/kebob-menu.svg";
  imgActions.style.gridArea = "actions";
  imgActions.style.backgroundColor = "white";
  imgActions.style.boxSizing = "border-box";

  const { div: divItemContent, obj: objItemContent } = createFormFrame();
  divItemDetail.appendChild(divItemContent);
  divItemContent.style.gridArea = "content";

  closeItemDetail();

  function openItemDetail() {
    div.style.gridTemplateColumns = "2fr 1fr";
    div.style.gridTemplateRows = "1fr";
    divItemDetail.style.display = "grid";
  }
  function closeItemDetail() {
    div.style.gridTemplateColumns = "1fr";
    div.style.gridTemplateRows = "1fr";
    divItemDetail.style.display = "none";
  }

  imgClose.addEventListener("click", () => {
    closeItemDetail();
  });

  const divMain = document.createElement("div");
  div.appendChild(divMain);
  divMain.style.display = "block";
  divMain.style.gridArea = "main";
  divMain.style.overflow = "hidden";

  let itemCallback = null;
  const obj = {
    openItemDetail(objItem) {
      objItemContent.clear();
      itemCallback({ objItemContent, objItem });
      openItemDetail();
    },
    closeItemDetail() {
      closeItemDetail();
      objItemContent.clear();
    },
    mainFrame: divMain,
    setItemCallback(newCallback) {
      itemCallback = newCallback;
    },
  };
  return {
    div,
    obj,
  };
}

export const symFormFrame = Symbol();
export const symSelectFormFrame = Symbol();
export const symTilesFrame = Symbol();
export const symListFrame = Symbol();
export const symMapFrame = Symbol();
frameTypes.set(symFormFrame, createFormFrame);
frameTypes.set(symSelectFormFrame, createSelectFormFrame);
frameTypes.set(symTilesFrame, createTilesFrame);
frameTypes.set(symListFrame, createListFrame);
frameTypes.set(symMapFrame, createMapFrame);

function createTilesFrame(args) {
  const { div: div, obj: objScroll } = createVerticalScrollable();
  const divScroll = objScroll.content;
  divScroll.style.display = "flex";
  divScroll.style.flexDirection = "row";
  divScroll.style.flexWrap = "wrap";
  divScroll.style.justifyContent = "space-around";
  divScroll.style.alignItems = "center";
  divScroll.style.alignContent = "space-around";
  divScroll.style.boxSizing = "border-box";
  const elements = [];
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append(div);
  const obj = {
    addItem({ icon, title, item }) {
      const divNewTile = document.createElement("div");
      divScroll.appendChild(divNewTile);
      const imgIcon = document.createElement("img");
      divNewTile.appendChild(imgIcon);
      imgIcon.src = icon;
      const divTitle = document.createElement("div");
      divNewTile.appendChild(divTitle);
      divTitle.append(title);
      divNewTile.style.display = "block";
      divNewTile.style.width = "96px"; // ~1 in
      divNewTile.style.aspectRatio = "1";
      divNewTile.style.border = "1px solid black";
      divNewTile.style.margin = "2%";
      divNewTile.addEventListener("click", (evt) => {
        objItem.openItemDetail(item);
      });
      return {
      };
    },
    clearAllItems() {
      divScroll.innerHTML = "";
    },
    setCallback(callback) {
      objItem.setItemCallback(callback);
    }
  };
  return {
    div: divItem,
    obj,
  };
}
function createListFrame(args) {
  const { div: div, obj: objScroll } = createVerticalScrollable();
  const divScroll = objScroll.content;
  divScroll.style.display = "flex";
  divScroll.style.flexDirection = "column";
  divScroll.style.flexWrap = "no-wrap";
  divScroll.style.justifyContent = "space-around";
  divScroll.style.alignItems = "center";
  divScroll.style.alignContent = "space-around";
  divScroll.style.boxSizing = "border-box";
  const elements = [];
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append(div);
  const obj = {
    addItem({ icon, title, item }) {
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
      divNewLine.style.gridTemplateRows = "50px";
      divNewLine.style.gridTemplateColumns = "50px 1fr";
      divNewLine.style.gridTemplateAreas = "icon title";
      divNewLine.style.width = "100%";
      divNewLine.addEventListener("click", (evt) => {
        objItem.openItemDetail(item);
      });
      return {
      };
    },
    clearAllItems() {
      divScroll.innerHTML = "";
    },
    setCallback(callback) {
      objItem.setItemCallback(callback);
    }
  };
  return {
    div: divItem,
    obj,
  };
}
function createMapFrame(args) {
  const obj = {};
  let changeViewport;
  obj.viewportChanged = new EventGenerator((generate, final, reject) => {
    changeViewport = generate;
  });
  const canvas = document.createElement("canvas", {
    alpha: false,
    colorSpace: "srgb",
    desynchronized: true,
    willReadFrequently: false,
  });
  obj.clicked = new EventGenerator((generate, final, reject) => {
    canvas.addEventListener("click", (evt) => {
      const canvasPoint = new DOMPoint(evt.offsetX * window.devicePixelRatio, evt.offsetY * window.devicePixelRatio);
      generate({
        canvasPoint,
        imagePoint: canvasPoint.matrixTransform(ctx.getTransform().inverse()),
      });
    });
  });
  const { div: divItem, obj: objItem } = createItemDetail(args);
  const div = objItem.mainFrame;
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
  return {
    div: divItem,
    obj,
  };
}

export const symTextEntry = Symbol();
export const symNumericEntry = Symbol();
export const symTextDisplay = Symbol();
export const symButton = Symbol();

const formElementTypes = new Map();
formElementTypes.set(symTextEntry, createTextEntry);
formElementTypes.set(symNumericEntry, createNumericEntry);
formElementTypes.set(symTextDisplay, createTextDisplay);
formElementTypes.set(symButton, createButton);

function createFormFrame(args) {
  const div = document.createElement("div");
  div.style.display = "block";
  div.style.overflow = "hidden";
  const divContent = document.createElement("div");
  div.appendChild(divContent);
  divContent.style.display = "flex";
  divContent.style.flexDirection = "column";
  const elements = new Map();
  const obj = {
    addElement(args) {
      const { type } = args;
      const funcCreate = formElementTypes.get(type);
      const { div: divElement, obj: objElement } = funcCreate(args);
      elements.set(objElement, { div: divElement, obj: objElement });
      divContent.appendChild(divElement);
      return objElement;
    },
    clear() {
      divContent.textContent = "";
      elements.clear();
    },
  };
  return {
    div,
    obj,
  };
}
function createTextEntry(args) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.width = "100%";
  if (args.icon) {
    div.style.gridTemplateColumns = "50px 1fr";
    div.style.gridTemplateRows = "1fr 1fr";
    div.style.gridTemplateAreas = '"icon prompt" "icon input"';
    const imgIcon = document.createElement("img");
    div.appendChild(imgIcon);
    imgIcon.src = args.icon;
    imgIcon.style.display = "block";
  } else {
    div.style.gridTemplateColumns = "1fr";
    div.style.gridTemplateRows = "1fr";
    div.style.gridTemplateAreas = '"prompt" "input"';
  }
  const divPrompt = document.createElement("div");
  div.appendChild(divPrompt);
  divPrompt.style.display = "block";
  divPrompt.style.width = "100%";
  divPrompt.style.fontSize = "12pt";
  divPrompt.style.overflow = "hidden";
  const input = document.createElement("input");
  div.appendChild(input);
  input.type = "text";
  input.style.display = "block";
  input.style.gridArea = "input";
  input.style.width = "100%";
  input.style.fontSize = "12pt";
  input.style.border = "1px solid black";
  input.style.boxSizing = "border-box";
  const obj = {
    setPrompt(text) {
      divPrompt.innerHTML = "";
      divPrompt.append(text);
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
function createSelectFormFrame(args) {
  const { minOptions, maxOptions, options } = args;
  const optionLines = new Map();
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
  const div = document.createElement("div");
  switch (displayType) {
    case "radio": {
      const divContent = document.createElement("div");
      div.appendChild(divContent);
      for (const option of args.options) {
        const divOption = document.createElement("div");
        div.appendChild(divOption);
        divOption.style.display = "grid";
        divOption.style.width = "100%";
        divOption.style.height = "50px";
        divOption.style.gridTemplateColumns = "50px 1fr";
        divOption.style.gridTemplateRows = "1fr";
        divOption.style.gridTemplateAreas = '"select element"';
        const imgSelect = document.createElement("img");
        divOption.appendChild(imgSelect);
        imgSelect.src = "./icons/unselected.svg";
        imgSelect.style.display = "block";
        imgSelect.style.gridArea = "select";
        const funcCreate = formElementTypes.get(option.type);
        const { div: divElement, obj: objElement } = funcCreate(args);
        divElement.style.gridArea = "element";
        divOption.appendChild(divElement);
        const objOption = {
          element: objElement,
          select() {
            for (const { div: divElement, obj: objElement } of elements) {
              divElement.children[0].src = urlIconUnselected.toString();
            }
            imgSelect.src = urlIconRadioSelected.toString();
          },
          unselect() {
            throw new Error("Radio buttons cannot be unselected.");
          },
          isSelected() {
            return !(imgSelect.src === urlIconUnselected.toString());
          }
        }
        optionLines.set(objOption, { div: divOption, obj: objOption });
        optionsArray.push(objOption);
        divContent.appendChild(divOption);
        imgSelect.addEventListener("click", objOption.select);
      }
    }
      break;
    case "allSelected": {
      const divContent = document.createElement("div");
      div.appendChild(divContent);
      for (const option of options) {
        const divOption = document.createElement("div");
        div.appendChild(divOption);
        divOption.style.display = "grid";
        divOption.style.width = "100%";
        divOption.style.height = "50px";
        divOption.style.gridTemplateColumns = "50px 1fr";
        divOption.style.gridTemplateRows = "1fr";
        divOption.style.gridTemplateAreas = '"select element"';
        const funcCreate = formElementTypes.get(option.type);
        const { div: divElement, obj: objElement } = funcCreate(args);
        divElement.style.gridArea = "element";
        divOption.appendChild(divElement);
        const objOption = {
          element: objElement,
          select() {},
          unselect() {
            throw new Error("Unable to unselect; all items must be selected.");
          },
          isSelected() {
            return true;
          },
        }
        optionLines.set(objOption, { div: divOption, obj: objOption });
        optionsArray.push(objOption);
        divContent.appendChild(divOption);
      }
    }
    default: {
      div.style.display = "grid";
      div.style.gridTemplateRows = "50px 1fr";
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
      divRequired.style.fontSize = "24pt";
      divRequired.innerHTML = minOptions + " to " + maxOptions + " of " + options.length;
      const divCurrent = document.createElement("div");
      divHeader.appendChild(divCurrent);
      divCurrent.style.display = "block";
      divCurrent.style.gridArea = "current";
      divCurrent.style.fontSize = "24pt";
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
        const divOption = document.createElement("div");
        divContent.appendChild(divOption);
        divOption.style.display = "grid";
        divOption.style.width = "100%";
        divOption.style.height = "50px";
        divOption.style.gridTemplateColumns = "50px 1fr";
        divOption.style.gridTemplateRows = "1fr";
        divOption.style.gridTemplateAreas = '"select element"';
        const imgSelect = document.createElement("img");
        divOption.appendChild(imgSelect);
        imgSelect.src = urlIconUnselected.toString();
        imgSelect.style.display = "block";
        imgSelect.style.gridArea = "select";
        const funcCreate = formElementTypes.get(option.type);
        const { div: divElement, obj: objElement } = funcCreate(args);
        divElement.style.gridArea = "element";
        divOption.appendChild(divElement);
        const objOption = {
          element: objElement,
          select() {
            imgSelect.src = urlIconMultiSelected.toString();
            refreshCurrent();
          },
          unselect() {
            imgSelect.src = urlIconUnselected.toString();
            refreshCurrent();
          },
          isSelected() {
            return !(imgSelect.src === urlIconUnselected.toString());
          },
        }
        optionLines.set(objOption, { div: divOption, obj: objOption });
        optionsArray.push(objOption);
        divContent.appendChild(divOption);
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
    }
  };
  const obj = {
    options: optionsArray,
  };
  return {
    div,
    obj,
  };
}
function createNumericEntry(args) {
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.width = "100%";
  div.style.height = "50px";
  div.style.gridTemplateColumns = "1fr";
  div.style.gridTemplateRows = "1fr 2fr";
  div.style.gridTemplateAreas = '"prompt" "input"';
  const divPrompt = document.createElement("div");
  div.appendChild(divPrompt);
  divPrompt.style.display = "block";
  divPrompt.style.gridArea = "prompt";
  const divInput = document.createElement("div");
  div.appendChild(divInput);
  divInput.style.display = "grid";
  divInput.style.gridArea = "input";
  divInput.style.gridTemplateColumns = "1fr 50px";
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
  div.style.minHeight = "50px";
  const divPrimary = document.createElement("div");
  div.appendChild(divPrimary);
  divPrimary.style.display = "block";
  divPrimary.style.width = "100%";
  divPrimary.style.minHeight = "50px";
  divPrimary.style.fontSize = "20pt";
  const obj = {
    setText(text) {
      divPrimary.innerHTML = "";
      divPrimary.append(text);
    },
    clicked: new EventGenerator((generate, final, reject) => {
      div.addEventListener("click", generate);
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
  btn.style.height = "40px";
  btn.style.width = "80%";
  btn.style.borderRadius = "20px";
  btn.style.border = "0px";
  btn.style.backgroundColor = "#C0C0C0";
  if (typeof args.caption === "string") {
    btn.innerHTML = args.caption;
  }
  const obj = {
    clicked: new EventGenerator((generate, final, reject) => {
      btn.addEventListener("click", generate);
    }),
  };
  return {
    div,
    obj,
  };
}
function createVerticalCenteredText() {
  
}
function createVerticalScrollable() {
  const div = document.createElement("div");
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
  const obj = {
    content: divScroll,
  };
  return {
    div,
    obj,
  };
}
// Implements the async iterable interface
class EventGenerator {
  #next;
  constructor(init) {
    let _resolve = null;
    let _reject = null;
    const next = () => {
      this.#next = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
      });
    }
    function generate(value) {
      _resolve({
        value,
        done: false,
      });
      next();
    }
    function final(value) {
      _resolve({
        value,
        done: false,
      });
      next();
    }
    function reject(reason) {
      _reject(reason);
      next();
    }
    init(generate, final, reject);
    next();
  }
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        return new Promise((resolve, reject) => {
          this.#next.then(resolve, reject);
        });
      },
    };
  }
}
