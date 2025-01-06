/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export function initialize() {
  document.body.style.margin = "0px";
  document.body.style.border = "0px";
  document.body.style.padding = "0px";
  const divWindow = document.createElement("div");
  document.body.appendChild(divWindow);
  divWindow.style.display = "grid";
  divWindow.style.width = "100%";
  divWindow.style.gridTemplateColumns = "1fr 6fr";
  divWindow.style.gridTemplateRows = "50px 1fr";
  divWindow.style.gridTemplateAreas = '"appName actions" "views main"';
  divWindow.style.backgroundColor = "black";
  const resize = () => {
    divWindow.style.height = window.innerHeight + "px";
  };
  window.addEventListener("resize", resize);
  resize();
  const divAppName = document.createElement("div");
  divWindow.appendChild(divAppName);
  divAppName.style.display = "block";
  divAppName.style.gridArea = "appName";
  divAppName.style.backgroundColor = "#808080";

  const divActions = document.createElement("div");
  divWindow.appendChild(divActions);
  divActions.style.display = "block";
  divActions.style.gridArea = "actions";
  divActions.style.backgroundColor = "#FF0000";

  const divViews = document.createElement("div");
  divWindow.appendChild(divViews);
  divViews.style.display = "block";
  divViews.style.gridArea = "views";
  divViews.style.backgroundColor = "#00FF00";

  const divMain = document.createElement("div");
  divWindow.appendChild(divMain);
  divMain.style.display = "grid";
  divMain.style.gridArea = "main";
  divMain.style.backgroundColor = "#0000FF";
  divMain.style.gridTemplateColumns = "2fr 1fr";
  divMain.style.gridTemplateRows = "1fr";
  divMain.style.gridTemplateAreas = '"major minor"';

  const divMajorFrame = document.createElement("div");
  divMain.appendChild(divMajorFrame);
  divMajorFrame.style.display = "grid";
  divMajorFrame.style.gridArea = "major";
  divMajorFrame.style.gridTemplateColumns = "1fr";
  divMajorFrame.style.gridTemplateRows = "50px 1fr";
  divMajorFrame.style.gridTemplateAreas = '"breadcrumbs" "content"';
  divMajorFrame.style.backgroundColor = "#000080";

  const divMajorTitle = document.createElement("div");
  divMajorFrame.appendChild(divMajorTitle);
  divMajorTitle.style.display = "grid";
  divMajorTitle.style.gridArea = "breadcrumbs";
  divMajorTitle.style.gridTemplateRows = "1fr";
  // Home Only
  divMajorTitle.style.gridTemplateColumns = "50px 1fr";
  divMajorTitle.style.gridTemplateAreas = '"home ultimate"';
  divMajorTitle.style.backgroundColor = "#0000C0";
  // One level
  divMajorTitle.style.gridTemplateColumns = "50px 1fr 1fr";
  divMajorTitle.style.gridTemplateAreas = '"home penultimate ultimate"';
  divMajorTitle.style.backgroundColor = "#0000C0";
  // Multiple Levels
  divMajorTitle.style.gridTemplateColumns = "50px 50px 1fr 1fr";
  divMajorTitle.style.gridTemplateAreas = '"home ellipsis penultimate ultimate"';
  divMajorTitle.style.backgroundColor = "#0000C0";

  const imgHome = document.createElement("img");
  divMajorTitle.appendChild(imgHome);
  imgHome.src = "./icons/home.svg";
  imgHome.style.display = "block";
  imgHome.style.gridArea = "home";
  imgHome.style.backgroundColor = "white";
  imgHome.style.height = "50px";

  const imgEllipsis = document.createElement("img");
  divMajorTitle.appendChild(imgEllipsis);
  imgEllipsis.src = "./icons/ellipsis.svg";
  imgEllipsis.style.display = "block";
  imgEllipsis.style.gridArea = "ellipsis";
  imgEllipsis.style.backgroundColor = "white";
  imgEllipsis.style.borderLeft = "1px solid black";
  imgEllipsis.style.boxSizing = "border-box";
  imgEllipsis.style.height = "50px";

  const divPenultimate = document.createElement("div");
  divMajorTitle.appendChild(divPenultimate);
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
  divMajorTitle.appendChild(divUltimate);
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

  const divMajorContent = document.createElement("div");
  divMajorFrame.appendChild(divMajorContent);
  divMajorContent.style.display = "block";
  divMajorContent.style.gridArea = "content";
  divMajorContent.style.backgroundColor = "white";
  divMajorContent.style.borderTop = "1px solid black";
  divMajorContent.style.boxSizing = "border-box";

  const divMinorFrame = document.createElement("div");
  divMain.appendChild(divMinorFrame);
  divMinorFrame.style.display = "grid";
  divMinorFrame.style.gridArea = "minor";
  divMinorFrame.style.gridTemplateColumns = "1fr";
  divMinorFrame.style.gridTemplateRows = "50px 1fr";
  divMinorFrame.style.gridTemplateAreas = '"title" "content"';
  divMinorFrame.style.backgroundColor = "#800000";
  divMinorFrame.style.borderLeft = "1px solid black";

  const divMinorTitle = document.createElement("div");
  divMinorFrame.appendChild(divMinorTitle);
  divMinorTitle.style.display = "grid";
  divMinorTitle.style.gridArea = "title";
  divMinorTitle.style.gridTemplateColumns = "50px 1fr 50px";
  divMinorTitle.style.gridTemplateRows = "1fr";
  divMinorTitle.style.gridTemplateAreas = '"expand title close"';
  divMinorTitle.style.backgroundColor = "#000040";

  const divExpand = document.createElement("div");
  divMinorTitle.appendChild(divExpand);
  divExpand.style.gridArea = "expand";
  divExpand.style.backgroundColor = "white";
  divExpand.style.height = "50px";
  divExpand.style.fontSize = "24pt";
  divExpand.style.overflow = "hidden";
  divExpand.style.boxSizing = "border-box";

  const divItemTitle = document.createElement("div");
  divMinorTitle.appendChild(divItemTitle);
  divItemTitle.style.gridArea = "title";
  divItemTitle.style.backgroundColor = "white";
  divItemTitle.style.height = "50px";
  divItemTitle.style.fontSize = "24pt";
  divItemTitle.style.overflow = "hidden";
  divItemTitle.style.borderLeft = "1px solid black";
  divItemTitle.style.boxSizing = "border-box";

  const imgClose = document.createElement("img");
  divMinorTitle.appendChild(imgClose);
  imgClose.src = "./icons/close.svg";
  imgClose.style.gridArea = "close";
  imgClose.style.backgroundColor = "white";
  imgClose.style.height = "50px";
  imgClose.style.fontSize = "24pt";
  imgClose.style.overflow = "hidden";
/*  divClose.style.borderLeft: 1px solid black; */
  imgClose.style.boxSizing = "border-box";

  const divMinorContent = document.createElement("div");
  divMinorFrame.appendChild(divMinorContent);
  divMinorContent.style.display = "block";
  divMinorContent.style.gridArea = "content";
  divMinorContent.style.backgroundColor = "white";
  divMinorContent.style.borderTop = "1px solid black";
  divMinorContent.style.boxSizing = "border-box";

  openMinorFrame();

  imgHome.addEventListener("click", () => {
    
  });
  imgEllipsis.addEventListener("click", () => {
    
  });
  imgClose.addEventListener("click", () => {
    closeMinorFrame();
  });

  const btnOpen = document.createElement("button");
  divMajorContent.appendChild(btnOpen);
  btnOpen.innerHTML = "Open";
  btnOpen.addEventListener("click", () => {
    openMinorFrame();
  });

  function openMinorFrame() {
    divMinorFrame.style.display = "block";
  }
  function closeMinorFrame() {
/*
divMain.style.gridTemplateColumns = "1fr";
    divMain.style.gridTemplateRows = "1fr";
    divMain.style.gridTemplateAreas = '"major"';
    */
    divMinorFrame.style.display = "none";
  }
  const obj = {
    homeView: {},
    addFormView() {
      const { div, obj } = createFormView();
      divMajorContent.appendChild(div);
      return obj;
    },
  };
  return obj;
}
function createFormView() {
  const divTop = document.createElement("div");
  const elements = [];
  const obj = {
    addTextEntry() {},
    addMultiSelect() {},
    addNumericEntry() {},
    addTextDisplay() {},
    remove() {},
  };
  return {
    div,
    obj,
  };
}
function createTilesView() {}
function createListView() {}
function createMapView() {}
function createTextEntry() {}
  
