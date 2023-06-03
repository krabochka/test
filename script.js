const input = document.querySelector("#input");
const output = document.querySelector("#output");
const selectfrom = document.querySelector("#select-from");
const selectto = document.querySelector("#select-to");

const Api = "https://translate.iswebdev.ru";

async function main() {
  const responce = await fetch(`${Api}/languages`);
  const data = await responce.json();
  let options = "";
  console.log(data);
  for (const lang of data) {
    options += `<option value="${lang.code}">${lang.name}</option>`;
  }
    selectfrom.insertAdjacentHTML('afterbegin', options);
    selectto.insertAdjacentHTML('afterbegin', options);

}

async function handleChange() {
  const body = {
    q: input.value,
    source: selectfrom.value,
    target: selectto.value,
  };
  const responce = await fetch(`${Api}/translate`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await responce.json();
  output.textContent = data.translatedText;
}

input.addEventListener("input", handleChange);

main()