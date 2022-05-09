const DATA_KEY = "ril-pwa-entries";

const div_loading = document.getElementById("loading");
const div_content = document.getElementById("content-container");

const template = document.getElementsByClassName("_template")[0];

function createReadableDate(dateString) {
  const date = new Date(dateString);
  return `${date
    .getFullYear()
    .toString()
    .slice(2)}-${date.getMonth()}-${date.getDate()} | ${date
    .toLocaleTimeString()
    .slice(0, 5)}`;
}
function createEntry(data) {
  const item = template.cloneNode(true);
  item.childNodes[1].textContent = createReadableDate(data.created);
  item.childNodes[3].textContent = data.title;
  item.childNodes[4].href = data.link;
  item.classList.remove("d-none");
  item.classList.remove("_template");
  div_content.append(item);
}

const dummy = `{"created":"2022-05-09T21:21:58.297Z", "title":"a story you will never read again", "link":"index.html"}`;
const data = JSON.parse(
  localStorage.getItem(DATA_KEY) || `[${dummy},${dummy}]`
);

console.log(data);

data.forEach((element) => createEntry(element));

div_loading.classList = ["d-none"];
div_content.classList.remove("d-none");
