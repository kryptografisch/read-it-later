const DATA_KEY = "ril-pwa-entries";

const div_loading = document.getElementById("loading");
const div_debug = document.getElementById("debug");
const div_content = document.getElementById("content-container");
const div_preinstall = document.getElementById("preinstall");

const template = document
  .getElementById("template_placeholder")
  .children[0].cloneNode(true);

const modal = new bootstrap.Modal(document.getElementById("modal"), {});

const dummy = {
  created: createReadableDate(new Date()),
  title:
    "Hello rookie 👋 Your web links will appear here after sharing to this app 🚀",
  link: "https://kryptografische.biz",
};

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

const initialEntries = JSON.parse(storage ?? JSON.stringify([dummy]));
fillDomWithEntries(initialEntries);

div_loading.classList = ["d-none"];
div_content.classList.remove("d-none");

// asnyc functions

function editEntry() {
  console.log("editing will be available soon");
  alert("edit not implemented yet. coming soon");
}

function select(elem) {
  elem.children[2].classList.add("show");
}
function unselect(elem) {
  elem.children[2].classList.remove("show");
}

function fillDomWithEntries(entries) {
  div_content.innerHTML = "";
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
  const item = template.cloneNode(true);
  item.children[0].children[0].textContent = createReadableDate(data.created);
  item.children[0].children[1].textContent = data.title;
  item.children[1].children[0].href = data.link;
  item.setAttribute("data-index", index);
  div_content.append(item);
  console.log(div_content.children.length);
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
