const DATA_KEY = "ril-pwa-entries";

const div_loading = document.getElementById("loading");
const div_debug = document.getElementById("debug");
const div_content = document.getElementById("content-container");
const ul_content = div_content.children[0];
const div_preinstall = document.getElementById("preinstall");

const template = document
  .getElementById("template_placeholder")
  .children[0].cloneNode(true);

const modal = new bootstrap.Modal(document.getElementById("modal"), {});
const menu = new bootstrap.Modal(document.getElementById("menu"), {});

const menu_open = document.getElementById("menu-open");
const menu_edit = document.getElementById("menu-edit");
const menu_delete = document.getElementById("menu-delete");

menu_open.addEventListener("click", (event) => {
  const link = event.currentTarget.getAttribute("data-link");
  window.open(link);
  menu.hide();
});

menu_edit.addEventListener("click", () => {
  menu.hide();
  modal.open();
});

menu_delete.addEventListener("click", (event) => {
  const index = event.currentTarget.getAttribute("data-index");

  const entries = JSON.parse(localStorage.getItem(DATA_KEY));
  entries.splice(index, 1);
  localStorage.setItem(DATA_KEY, JSON.stringify(entries));
  fillDomWithEntries(entries);
  menu.hide();
});

const dummies = [
  {
    created: createReadableDate(new Date()),
    title:
      "Touch right side to open <u>link</u> directly<br>touch left side to open menu",
    link: "https://kryptografische.biz",
  },
  {
    created: createReadableDate(new Date()),
    title:
      "Hello rookie 👋 Your web links will appear here after sharing to this app 🚀",
    link: "https://kryptografische.biz",
  },
];

const parsedUrl = new URL(window.location.toString());
if (parsedUrl.searchParams.get("title")?.length) {
  console.log("WE HAVE A NEW ENTRY!");
  const newEntry = createEntryObject(
    new Date(),
    parsedUrl.searchParams.get("title"),
    parsedUrl.searchParams.get("url") ||
      parsedUrl.searchParams.get("text") ||
      parsedUrl.searchParams.get("title")
  );
  div_debug.textContent = JSON.stringify(newEntry);

  const data = JSON.parse(localStorage.getItem(DATA_KEY) ?? "[]");
  data.push(newEntry);
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
  window.location.search = "";
}
const storage = localStorage.getItem(DATA_KEY);
if (storage != null) {
  div_preinstall.style = "display:none";
}

const initialEntries = JSON.parse(storage ?? JSON.stringify(dummies));
fillDomWithEntries(initialEntries);

div_loading.classList = ["d-none"];
div_content.classList.remove("d-none");

// init clipboard
askClipboardPermission();
async function askClipboardPermission() {
  const queryOpts = { name: "clipboard-read", allowWithoutGesture: false };
  try {
    const permissionStatus = await navigator.permissions.query(queryOpts);

    console.log("Permission status for clipboard:", permissionStatus.state);
    if (
      permissionStatus.state == "granted" ||
      permissionStatus.state == "prompt"
    ) {
      Array.from(document.getElementsByClassName("clipboard")).forEach((elem) =>
        elem.classList.remove("d-none")
      );
    }

    permissionStatus.onchange = () => {
      console.log("changed", permissionStatus.state);
      if (
        permissionStatus.state == "granted" ||
        permissionStatus.state == "prompt"
      ) {
        Array.from(document.getElementsByClassName("clipboard")).forEach(
          (elem) => elem.classList.remove("d-none")
        );
      } else {
        Array.from(document.getElementsByClassName("clipboard")).forEach(
          (elem) => elem.classList.add("d-none")
        );
      }
    };
  } catch (exception) {
    console.log(
      "Could not access clipboard",
      window.location.toString().indexOf("localhost") ? exception : undefined
    );
  }
}

// asnyc functions

function editEntry() {
  console.log("editing will be available soon");
  alert("edit not implemented yet. coming soon");
}

function fillDomWithEntries(entries) {
  ul_content.innerHTML = "";
  entries.reverse().forEach((element, index) => createDomEntry(element, index));
}

function addNewEntry() {
  if (
    !document.getElementById("form-title").value ||
    !document.getElementById("form-link").value
  ) {
    return;
  }
  const title = document.getElementById("form-title").value;
  const link = document.getElementById("form-link").value;
  const entry = createEntryObject(new Date(), title, link);

  const entries = JSON.parse(localStorage.getItem(DATA_KEY) ?? "[]");
  entries.push(entry);
  localStorage.setItem(DATA_KEY, JSON.stringify(entries));

  fillDomWithEntries(entries);

  modal.hide();
}

function createDomEntry(data, index) {
  const li = template.cloneNode(true);
  const a = li.children[0];
  a.href = data.link;
  const content = li.children[1];
  content.children[0].textContent = createReadableDate(data.created);
  content.children[1].innerHTML = data.title;

  li.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      console.log(`li ${event.target.getAttribute("data-index")} clicked.`);
      menu.show();
    }
  });
  li.setAttribute("data-index", index);
  ul_content.append(li);
}

function createEntryObject(date, title, link) {
  return {
    created: date.toISOString(),
    title,
    link,
  };
}

function createReadableDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

async function pasteFromClipboard(event) {
  event.preventDefault();
  const element = document.getElementById("form-link");
  const text = await navigator.clipboard.readText();
  element.value = text;
}
