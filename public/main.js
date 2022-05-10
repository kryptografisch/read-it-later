const DATA_KEY = "ril-pwa-entries";

const div_loading = document.getElementById("loading");
const div_debug = document.getElementById("debug");
const div_content = document.getElementById("content-container");

const template = document.getElementsByClassName("_template")[0];

function createReadableDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes()}`;
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

const dummy = `{"created":"2022-05-09T21:21:58.297Z", "title":"a story you will never read again", "link":"http://test"}`;
const data = JSON.parse(localStorage.getItem(DATA_KEY) || `[${dummy}]`);

const parsedUrl = new URL(window.location.toString());
if (parsedUrl.searchParams.get("title")?.length) {
  console.log("WE HAVE A NEW ENTRY!");
  const newEntry = {
    created: new Date().toISOString(),
    title: parsedUrl.searchParams.get("title"),
    link:
      parsedUrl.searchParams.get("text") || parsedUrl.searchParams.get("url"),
  };
  div_debug.textContent = JSON.stringify(newEntry);

  data.push(newEntry);
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

console.log(data);

data.reverse().forEach((element) => createEntry(element));

div_loading.classList = ["d-none"];
div_content.classList.remove("d-none");
