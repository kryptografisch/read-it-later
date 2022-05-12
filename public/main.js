const DATA_KEY = "ril-pwa-entries";

const div_loading = document.getElementById("loading");
const div_debug = document.getElementById("debug");
const div_content = document.getElementById("content-container");

const template = document.getElementsByClassName("_template")[0];

const dummy = {
  created: createReadableDate(new Date()),
  title:
    "Hello rookie 👋 Your shared links will appear here after sharing to this app 🚀",
  link: "https://kryptografische.biz",
};

function createReadableDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
function createEntry(data) {
  const item = template.cloneNode(true);
  item.children[0].children[0].textContent = createReadableDate(data.created);
  item.children[0].children[1].textContent = data.title;
  item.children[1].children[0].href = data.link;
  item.classList.remove("d-none");
  item.classList.remove("_template");
  div_content.append(item);
}

const parsedUrl = new URL(window.location.toString());
if (parsedUrl.searchParams.get("title")?.length) {
  console.log("WE HAVE A NEW ENTRY!");
  const newEntry = {
    created: new Date().toISOString(),
    title: parsedUrl.searchParams.get("title"),
    link:
      parsedUrl.searchParams.get("url") ||
      parsedUrl.searchParams.get("text") ||
      parsedUrl.searchParams.get("title"),
  };
  div_debug.textContent = JSON.stringify(newEntry);

  const data = JSON.parse(localStorage.getItem(DATA_KEY) ?? "[]");
  data.push(newEntry);
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
  window.location.search = "";
}

JSON.parse(localStorage.getItem(DATA_KEY) ?? JSON.stringify([dummy]))
  .reverse()
  .forEach((element) => createEntry(element));

div_loading.classList = ["d-none"];
div_content.classList.remove("d-none");
