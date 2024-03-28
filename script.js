const select = document.querySelectorAll("#selectCurrency");
const typeCurrency = document.getElementById("typeCurrency");
const exchangeRate = document.getElementById("exchangeRate");

const host = "api.frankfurter.app";
fetch(`https://${host}/currencies`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const entries = Object.entries(data);
    console.log(entries);

    for (i = 0; i < entries.length; i++) {
      select[0].innerHTML += `<option value = '${entries[i][0]}'> ${entries[i][0]}</option>`; // This is to input the currencies into the html
      select[1].innerHTML += `<option value = '${entries[i][0]}'>${entries[i][0]}</option>`;
    }
  });

function convert() {
  const typeCurrencyValue = typeCurrency.value; // This is to bring the value from the loop
  if (select[0].value !== select[1].value) {
    fetch(
      `https://${host}/latest?amount=${typeCurrencyValue}&from=${select[0].value}&to=${select[1].value}`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = Object.values(data.rates)[0]; // This is what the output is to display
        const converted = result.toFixed(2);
        exchangeRate.value = converted;

        console.log(data);
      });
  } else {
    alert("Please enter two different currencies");
  }
}
typeCurrency.addEventListener("input", function () {
    // const value = typeCurrency.value;
    typeCurrency.value = typeCurrency.value.replace(/[^0-9.]/g,'');
    if (isNaN(typeCurrency.value)) {
      // To check if the value is not a number
      typeCurrency.style.border = "2px solid red"; // Change border to red
      typeCurrency.setCustomValidity("Numbers only"); // Set custom validation message
    } else {
      typeCurrency.style.border = ""; // Reset border
      typeCurrency.setCustomValidity(""); // Reset custom validation message
    }
});




















// const validation = input.id === NaN ? alert("Only numbers are allowed") : "";
// const validation = () => {
//   input.id === NaN ? alert("Only numbers are allowed") : "";

// }

// input.addEventListener(validation)
