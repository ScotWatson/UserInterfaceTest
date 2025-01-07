/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function initialize() {
  document.body.style.margin = "0px";
  document.body.style.border = "0px";
  document.body.style.padding = "0px";
  document.body.style.boxSizing = "border-box";
  const bodyShadowRoot = document.body.attachShadow({ mode: "closed" });
  const divWindow = document.createElement("div");
  document.body.appendChild(divWindow);
  divWindow.style.display = "grid";
  divWindow.style.width = "100%";
  divWindow.style.backgroundColor = "black";
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

  const divViewButtons = document.createElement("div");
  divViewButtonsContainer.appendChild(divViewButtons);
  divViewButtons.style.display = "block";
  divViewButtons.style.width = "100%";
  divViewButtons.style.backgroundColor = "#00FF00";
  divViewButtons.style.border = "0px";
  divViewButtons.style.boxSizing = "border-box";

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
  const div = document.createElement("div");
  div.style.display = "grid";
  div.style.backgroundColor = "#00FF00";
  div.style.gridTemplateColumns = "1fr";
  div.style.gridTemplateRows = "50px 1fr";
  div.style.gridTemplateAreas = '"topBar" "content"';

  const divTopBar = document.createElement("div");
  div.appendChild(divTopBar);
  divTopBar.style.display = "grid";
  divTopBar.style.gridArea = "topBar";
  divTopBar.style.backgroundColor = "#FF0000";
  divTopBar.style.gridTemplateColumns = "1fr 50px";
  divTopBar.style.gridTemplateRows = "50px";
  divTopBar.style.gridTemplateAreas = '"breadcrumbs actions"';

  const divMajorFrame = document.createElement("div");
  div.appendChild(divMajorFrame);
  divMajorFrame.style.display = "grid";
  divMajorFrame.style.gridArea = "content";
  divMajorFrame.style.backgroundColor = "#000080";

  const divBreadcrumbs = document.createElement("div");
  divTopBar.appendChild(divBreadcrumbs);
  divBreadcrumbs.style.display = "grid";
  divBreadcrumbs.style.gridArea = "breadcrumbs";
  divBreadcrumbs.style.gridTemplateRows = "1fr";
  divBreadcrumbs.style.backgroundColor = "#0000C0";
  // Home Only
  divBreadcrumbs.style.gridTemplateColumns = "50px 1fr";
  divBreadcrumbs.style.gridTemplateAreas = '"home ultimate"';
  // One level
  divBreadcrumbs.style.gridTemplateColumns = "50px 1fr 1fr";
  divBreadcrumbs.style.gridTemplateAreas = '"home penultimate ultimate"';
  // Multiple Levels
  divBreadcrumbs.style.gridTemplateColumns = "50px 50px 1fr 1fr";
  divBreadcrumbs.style.gridTemplateAreas = '"home ellipsis penultimate ultimate"';

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

  imgHome.addEventListener("click", () => {
    
  });
  imgEllipsis.addEventListener("click", () => {
    
  });

  const obj = {
    topFrame: {},
    addFrame(args) {
      const { type, icon, title } = args;
      const funcCreate = frameTypes.get(type);
      const { div: divFrame, obj: objFrame } = funcCreate(args);
      divFrame.style.gridArea = "content";
      div.appendChild(divFrame);
      return objFrame;
    },
  };
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

  const divItemDetail = document.createElement("div");
  div.appendChild(divItemDetail);
  divItemDetail.style.display = "grid";
  divItemDetail.style.gridArea = "item";
  divItemDetail.style.gridTemplateColumns = "1fr";
  divItemDetail.style.gridTemplateRows = "50px 1fr";
  divItemDetail.style.gridTemplateAreas = '"topBar" "content"';
  divItemDetail.style.backgroundColor = "#800000";
  divItemDetail.style.borderLeft = "1px solid black";

  const divItemTopBar = document.createElement("div");
  divItemDetail.appendChild(divItemTopBar);
  divItemTopBar.style.display = "grid";
  divItemTopBar.style.gridArea = "topBar";
  divItemTopBar.style.gridTemplateColumns = "50px 1fr 50px";
  divItemTopBar.style.gridTemplateRows = "50px";
  divItemTopBar.style.gridTemplateAreas = '"close title actions"';
  divItemTopBar.style.backgroundColor = "#000040";

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

  const { div: divItemContent, obj: objItem } = createFormFrame();
  divItemDetail.appendChild(divItemContent);
  divItemContent.style.gridArea = "content";

  openItemDetail();

  function openItemDetail() {
    div.style.gridTemplateColumns = "2fr 1fr";
    div.style.gridTemplateRows = "1fr";
    div.style.gridTemplateAreas = '"major minor"';
    divItemDetail.style.display = "block";
  }
  function closeItemDetail() {
    div.style.gridTemplateColumns = "1fr";
    div.style.gridTemplateRows = "1fr";
    div.style.gridTemplateAreas = '"major"';
    divItemDetail.style.display = "none";
  }

  imgClose.addEventListener("click", () => {
    closeItemDetail();
  });

  const divMain = document.createElement("div");
  div.appendChild(divMain);
  divMain.style.display = "block";
  divMain.style.gridArea = "main";

  let itemCallback = null;
  const obj = {
    openItemDetail() {
      objItem.clear();
      itemCallback(objItem);
      openItemDetail();
    },
    closeItemDetail() {
      closeItemDetail();
      divItemContent.innerHTML = "";
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
export const symTilesFrame = Symbol();
export const symListFrame = Symbol();
export const symMapFrame = Symbol();
frameTypes.set(symFormFrame, createFormFrame);
frameTypes.set(symTilesFrame, createTilesFrame);
frameTypes.set(symListFrame, createListFrame);
frameTypes.set(symMapFrame, createMapFrame);

function createTilesFrame(args) {
  const divTop = document.createElement("div");
  const divScroll = document.createElement("div");
  const elements = [];
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append("contents");
  const obj = {
    id: crypto.randomUUID(),
    addElement(icon, title) {
    },
  };
  return {
    div: divItem,
    obj,
  };
}
function createListFrame(args) {
  const divTop = document.createElement("div");
  const elements = [];
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append("contents");
  const obj = {
    id: crypto.randomUUID(),
    addElement() {
    },
  };
  return {
    div: divItem,
    obj,
  };
}
function createMapFrame(args) {
  const divTop = document.createElement("div");
  const canvas = document.createElement("canvas");
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append("contents");
  const obj = {
    id: crypto.randomUUID(),
  };
  return {
    div: divItem,
    obj,
  };
}

export const symTextEntry = Symbol();
export const symMultiSelect = Symbol();
export const symNumericEntry = Symbol();
export const symTextDisplay = Symbol();
export const symButton = Symbol();

const formElementTypes = new Map();
formElementTypes.set(symTextEntry, createTextEntry);
formElementTypes.set(symMultiSelect, createMultiSelect);
formElementTypes.set(symNumericEntry, createNumericEntry);
formElementTypes.set(symTextDisplay, createTextDisplay);
formElementTypes.set(symButton, createButton);

function createFormFrame(args) {
  const divTop = document.createElement("div");
  const elements = [];
  const obj = {
    id: crypto.randomUUID(),
    addElement(args) {
      const { type } = args;
      const funcCreate = formElementTypes.get(type);
      const newElement = funcCreate(args);
      elements.push(newElement);
      return newElement.obj;
    },
  };
  return {
    div: divTop,
    obj,
  };
}
function createTextEntry(args) {
  const divTop = document.createElement("div");
  divTop.style.display = "grid";
  divTop.style.width = "100%";
  if (args.icon) {
    divTop.style.gridTemplateColumns = "50px 1fr";
    divTop.style.gridTemplateRows = "1fr 1fr";
    divTop.style.gridTemplateAreas = '"icon prompt" "icon input"';
    const imgIcon = document.createElement("img");
    divTop.appendChild(imgIcon);
    imgIcon.src = args.icon;
    imgIcon.style.display = "block";
  } else {
    divTop.style.gridTemplateColumns = "1fr";
    divTop.style.gridTemplateRows = "1fr";
    divTop.style.gridTemplateAreas = '"prompt" "input"';
  }
  const divPrompt = document.createElement("div");
  divTop.appendChild(divPrompt);
  divPrompt.style.display = "block";
  divPrompt.style.width = "100%";
  divItemTitle.style.fontSize = "12pt";
  divItemTitle.style.overflow = "hidden";
  const input = document.createElement("input");
  divTop.appendChild(input);
  input.type = "text";
  input.style.display = "block";
  input.style.gridArea = "input";
  input.style.width = "100%";
  divItemTitle.style.fontSize = "12pt";
  input.style.border = "1px solid black";
  input.style.boxSizing = "border-box";
  const obj = {
    id: crypto.randomUUID(),
    getValue() {
      return input.value;
    },
  };
  return {
    div: divTop,
    obj,
  };
}
function createMultiSelect(args) {
  const divTop = document.createElement("div");
  divTop.style.display = "block";
  divTop.style.width = "100%";
  divTop.style.height = "50px";
  const div = document.createElement("div");
  div.style.display = "block";
  div.style.width = "100%";
  div.style.height = "50px";
  const obj = {
    id: crypto.randomUUID(),
  };
  return {
    div: divTop,
    obj,
  };
}
function createNumericEntry(args) {
  const divTop = document.createElement("div");
  divTop.style.display = "block";
  divTop.style.width = "100%";
  divTop.style.height = "50px";
  const obj = {
    id: crypto.randomUUID(),
  };
  return {
    div: divTop,
    obj,
  };
}
function createTextDisplay(args) {
  const divTop = document.createElement("div");
  divTop.style.display = "block";
  divTop.style.width = "100%";
  divTop.style.height = "50px";
  const divPrimary = document.createElement("div");
  divPrimary.style.display = "block";
  divPrimary.style.width = "100%";
  divPrimary.style.height = "50px";
  const obj = {
    id: crypto.randomUUID(),
  };
  return {
    div: divTop,
    obj,
  };
}
function createButton(args) {
  const divTop = document.createElement("div");
  divTop.style.display = "block";
  divTop.style.width = "100%";
  divTop.style.height = "50px";
  const btn = document.createElement("button");
  divTop.appendChild(btn);
  btn.style.width = "80%";
  btn.style.height = "40px";
  btn.style.borderRadius = "20px";
  const obj = {
    id: crypto.randomUUID(),
    addEventListener(eventName, handler) {
      btn.addEventListener(eventName, handler);
    },
    removeEventListener(eventName, handler) {
      btn.addEventListener(eventName, handler);
    },
  };
  return {
    div: divTop,
    obj,
  };
}
