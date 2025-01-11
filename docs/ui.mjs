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
  const { type, title, topType, topTitle } = args;
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
  imgHome.addEventListener("click", () => {
    
  });
  imgEllipsis.addEventListener("click", () => {
    
  });
  divPenultimate.addEventListener("click", () => {
    frames.pop();
    updateBreadcrumbs();
  });
  const frames = [];
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
      frames.pop();
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
  const div = document.createElement("div");
  const divScroll = document.createElement("div");
  const elements = [];
  const { div: divItem, obj: objItem } = createItemDetail(args);
  objItem.mainFrame.append("contents");
  const obj = {
    addElement({ icon, title }) {
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
    addItem() {
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
  };
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
      div.appendChild(divElement);
      return objElement;
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
        div.appendChild(imgSelect);
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
              divElement.children[0].src = "./icons/unselected.svg";
            }
            imgSelect.src = "./icons/radio-selected.svg"
          },
          unselect() {
            throw new Error("Radio buttons cannot be unselected.");
          },
          isSelected() {
            return !(imgSelect.src === "./icons/unselected.svg");
          }
        }
        optionLines.set(objOption, { div: divOption, obj: objOption });
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
        divContent.appendChild(divOption);
        imgSelect.addEventListener("click", () => {
          if (objOption.isSelected()) {
            objOption.unselect();
          } else {
            objOption.select();
          }
        });
      }
    }
    default: {
      div.style.display = "grid";
      div.style.gridTemplateRows = "1fr";
      div.style.gridTemplateColumns = "50px 1fr";
      div.style.gridTemplateAreas = '"header" "scroll"';
      const divHeader = document.createElement("div");
      div.appendChild(divHeader);
      divHeader.style.display = "grid";
      divHeader.style.gridArea = "header";
      divHeader.style.gridTemplateRows = "1fr";
      divHeader.style.gridTemplateColumns = "1fr 1fr";
      divHeader.style.gridTemplateAreas = '"required current"';
      const divRequired = document.createElement("div");
      div.appendChild(divRequired);
      divRequired.style.display = "block";
      divRequired.style.gridArea = "required";
      divRequired.innerHTML = minOptions + " to " + maxOptions + " of " + options.length;
      const divCurrent = document.createElement("div");
      div.appendChild(divCurrent);
      divCurrent.style.display = "block";
      divCurrent.style.gridArea = "current";
      divCurrent.innerHTML = 0 + " of " + options.length;
      function refreshCurrent() {
        let numSelected = 0;
        for (const { obj: objOption } of optionLines) {
          if (objOption.isSelected()) {
            ++numSelected;
          }
        }
        divCurrent.innerHTML = numSelected + " of " + options.length;
        divCurrent.style.color = ((numSelected >= minOptions) && (numSelected <= maxOptions)) ? "black" : "red";
      }
      const divScroll = document.createElement("div");
      div.appendChild(divScroll);
      const divContent = document.createElement("div");
      divScroll.appendChild(divContent);
      for (const option of options) {
        const divOption = document.createElement("div");
        div.appendChild(divOption);
        divOption.style.display = "grid";
        divOption.style.width = "100%";
        divOption.style.height = "50px";
        divOption.style.gridTemplateColumns = "50px 1fr";
        divOption.style.gridTemplateRows = "1fr";
        divOption.style.gridTemplateAreas = '"select element"';
        const imgSelect = document.createElement("img");
        div.appendChild(imgSelect);
        imgSelect.src = "./icons/unselected.svg";
        imgSelect.style.display = "block";
        imgSelect.style.gridArea = "select";
        const funcCreate = formElementTypes.get(option.type);
        const { div: divElement, obj: objElement } = funcCreate(args);
        const objOption = {
          element: objElement,
          select() {
            imgSelect.src = "./icons/multi-selected.svg";
          },
          unselect() {
            imgSelect.src = "./icons/unselected.svg";
          },
          isSelected() {
            return !(imgSelect.src === "./icons/unselected.svg");
          },
        }
        optionLines.set(objOption, { div: divOption, obj: objOption });
        divContent.appendChild(divOption);
        imgSelect.addEventListener("click", () => {
          if (objOption.isSelected()) {
            objOption.unselect();
          } else {
            objOption.select();
          }
        });
      }
      let lines = optionLines.values();
      for (let i = 0; i < minOptions; ++i) {
        lines[i].select();
      }
    }
  };
  const obj = {
    lines: optionLines.values(),
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
    clicked: factoryAsyncIterableIterator((resolve, reject) => {
      div.addEventListener("click", (e) => {
        resolve(e);
      });
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
    clicked: factoryAsyncIterableIterator((resolve, reject) => {
      btn.addEventListener("click", (e) => {
        resolve(e);
      });
    }),
  };
  return {
    div,
    obj,
  };
}
function factoryAsyncIterableIterator(init) {
  return function createAsyncIterableIterator() {
    return {
      [Symbol.asyncIterator]: createAsyncIterableIterator,
      next() {
        return new Promise(init);
      }
    };
  };
}
