const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = dropdowns[0];
let toCurr = dropdowns[1];
let msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amount.value = 1;
        amtVal = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let reponse = await fetch(URL);
    let data = await reponse.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.round(finalAmt)} ${toCurr.value}`;
};