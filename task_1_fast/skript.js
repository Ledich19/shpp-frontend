// 1
const cssButton = document.getElementById("square_CSS");
const jsButton = document.getElementById("square_JS");
const cssJsButton = document.getElementById("square_CSS+JS");
const toggleButton = document.getElementById("toggle_CSS+JS");
const toggleAllButton = document.getElementById("toggle_all");

const square = document.getElementById("square");
const square_2 = document.getElementById("square_2");
const squares = document.querySelectorAll(".square");

cssButton.addEventListener("click", () => {
  square.style.display = "none";
});

jsButton.addEventListener("click", () => {
  square.remove();
});

cssJsButton.addEventListener("click", () => {
  square.classList.add("hidden");
});

toggleButton.addEventListener("click", () => {
  square_2.classList.toggle("hidden");
});

toggleAllButton.addEventListener("click", () => {
  squares.forEach((square) => square.classList.toggle("hidden"));
});

//===
const inputSelector = document.getElementById("input_selector");
const removeElementBySelectorButton = document.getElementById(
  "remove_element_by_selector"
);
removeElementBySelectorButton.addEventListener("click", () => {
  const element = document.querySelector(inputSelector.value);
  element.remove();
});
//===
const squareYellow = document.getElementById("square_yellow");
const squareYellowText = document.getElementById("square_yellow_text");

const handleClick = () => {
  alert("Привіт");
  squareYellow.removeEventListener("click", handleClick);
  squareYellow.addEventListener("click", () => {
    squareYellow.remove();
  });
};

squareYellow.addEventListener("click", handleClick);
//::: 6
const squareRed = document.getElementById("square_red");
const squareRedHoverButton = document.getElementById("square_red_hover");

squareRedHoverButton.addEventListener("mouseenter", () => {
  squareRed.style.display = "block";
});
squareRedHoverButton.addEventListener("mouseleave", () => {
  squareRed.style.display = "none";
});
//::: 7
const squareGreen = document.getElementById("square_green");
const squareGreenFocus = document.getElementById("square_green_focus");

squareGreenFocus.addEventListener("focus", () => {
  squareGreen.style.display = "block";
});

squareGreenFocus.addEventListener("blur", () => {
  squareGreen.style.display = "none";
});
//::: 8
const imgByLink = document.getElementById("img_by_link");
const imgByLinkInput = document.getElementById("img_by_link_input");
const imgByLinkButton = document.getElementById("img_by_link_button");

imgByLinkButton.addEventListener("click", () => {
  const link = imgByLinkInput.value;
  imgByLink.setAttribute("src", link);
});
//::: 9

const imgsByLink = document.getElementById("imgs_by_link");
const imgsByLinkTextarea = document.getElementById("imgs_by_link_textarea");
const imgsByLinkButton = document.getElementById("imgs_by_link_button");

imgsByLinkButton.addEventListener("click", () => {
  const links = imgsByLinkTextarea.value.split("\n");
  console.log(links);
  links.forEach((link) => {
    const img = document.createElement("img");
    img.style.objectFit = "cover";
    img.style.height = "100%";
    img.style.width = "100%";
    img.setAttribute("src", link);
    imgsByLink.appendChild(img);
  });
});
//::: 10, 11
const coordBlock = document.getElementById("coord_block");
const mouseCoordsDiv = document.querySelector("#coord_block .mouse_coords");
const langCoordsDiv = document.querySelector("#coord_block .lang_coords");

document.addEventListener("mousemove", async (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  mouseCoordsDiv.innerHTML = `X: ${mouseX}, Y: ${mouseY}___`;
  langCoordsDiv.innerHTML = `МОВА: ${navigator.language.toLocaleUpperCase()}___`;
});

//::: 12
const positionCoordsDiv = document.querySelector(
  "#coord_block .position_coords"
);

navigator.geolocation.getCurrentPosition((position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  positionCoordsDiv.innerHTML = `
  Ш: ${latitude.toFixed(5)}
  Д: ${longitude.toFixed(5)}`;
});

//::: 13
const editBlockLocal = document.getElementById("edit_block_local");
const editBlockCookies = document.getElementById("edit_block_cookies");
const editBlockSession = document.getElementById("edit_block_session");

const keys = {
  local: "local",
  session: "session",
  cookies: "cookies",
};

window.addEventListener("load", () => {
  const localStorageValue = localStorage.getItem(keys.local);
  const sessionStorageValue = sessionStorage.getItem(keys.session);
  const cookiesStorageValue = document.cookie
    ? document.cookie.replace(`${keys.cookies}=`, "")
    : null;

  editBlockLocal.textContent = localStorageValue || editBlockLocal.textContent;
  editBlockSession.textContent =
    sessionStorageValue || editBlockSession.textContent;
  editBlockCookies.textContent =
    cookiesStorageValue || editBlockCookies.textContent;
});

editBlockLocal.addEventListener("input", (e) => {
  localStorage.setItem(keys.local, e.target.textContent);
});

editBlockCookies.addEventListener("input", (e) => {
  document.cookie = `${keys.cookies}=${e.target.textContent}`;
});

editBlockSession.addEventListener("input", (e) => {
  sessionStorage.setItem(keys.session, e.target.textContent);
});

//::: 14

const upButton = document.getElementById("up-button");

upButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("scroll", (e) => {
  e.preventDefault;
  if (
    document.documentElement.clientHeight / 2 <
    document.documentElement.scrollTop
  ) {
    upButton.style.display = "block";
  } else {
    upButton.style.display = "none";
  }
});

//::: 15

const alertBig = document.getElementById("alert_big");
const alertSmall = document.getElementById("alert_small");

alertBig.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    alert("alertBig");
  }
});
alertSmall.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    alert("alertSmall");
  }
});

//::: 16

const blockerElement = document.getElementById("blocker_element");
const blockerButton = document.getElementById("blocker_button");

blockerButton.addEventListener("click", () => {
  blockerElement.classList.toggle("hidden");
  document.body.style.overflow = "hidden";
});

blockerElement.addEventListener("click", () => {
  blockerElement.classList.toggle("hidden");
  document.body.style.overflow = "";
});

//::: 17

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
});

//::: 18

const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");
const fileDropArea = document.querySelector(".file-drop-area");

const showFilename = (file) => {
  selectedFile.textContent = file ? `Вибраний файл: ${file.name}` : "";
};

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  showFilename(file);
});

fileDropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileDropArea.classList.add("dragover");
});

fileDropArea.addEventListener("dragleave", () => {
  fileDropArea.classList.remove("dragover");
});

fileDropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileDropArea.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  showFilename(file);
});
