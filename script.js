document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#amount");
    input.value = "";
    input.placeholder = `enter amount`;
    document.querySelector(".msg").textContent = "1 USD = 278 PKR";
})

const updateFlage = (element) => {
    let countryCode = countryList[element.value];
    element.parentElement.querySelector("img").src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

const selects = document.querySelectorAll("select");

selects.forEach((select) => {
    for (let currencyCode in countryList) {
        const option = document.createElement("option");
        option.value = currencyCode;
        option.innerText = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            option.selected = "selected";
        }
        if (select.name === "to" && currencyCode === "PKR") {
            option.selected = "selected";
        }
        select.appendChild(option);
    }
    select.addEventListener("change", (e) => {
        updateFlage(e.target);
    });
    updateFlage(select);
})


const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const result = document.querySelector(".msg");

document.querySelector("button").addEventListener("click", async (e) => {
    e.preventDefault();

    let inputValue = document.querySelector("#amount").value;
    inputValue = inputValue === "" || inputValue < 1 ? inputValue = 1 : Number(inputValue);
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.value.toLowerCase()}.json`;
    let data = await fetch(url).then((response) => response.json());
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let exchangedAmount = (inputValue * rate).toFixed(2);
    result.innerText = `${inputValue} ${fromCurrency.value} = ${exchangedAmount} ${toCurrency.value}`;
})