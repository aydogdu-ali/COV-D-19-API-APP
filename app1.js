let isError = false;
let name;
const getCorona = async function (name) {
  const url = `https://api.collectapi.com/corona/countriesData?country=${name}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "apikey 3uXYSeVN0WY35KufnNpIVT:2SCIgS9Dww2p20qtPABsyj",
      },
    });
    if (!res.ok) {
      isError = true;
      throw new Error(`Something went wrong: ${res.status} `);
    }
    const data = await res.json();
    // console.log(data);
    renderCorona(data.result);
  } catch (error) {
    // console.log(error);
  }
};

const renderCorona = (coronaCountry) => {
  const newsList = document.getElementById("news-list");

  console.log(coronaCountry);

  // const { country, totalCases, totalDeaths, totalRecovered } = coronaCountry; //! dest
  coronaCountry
    .forEach((name) => {
      const newsList = document.getElementById("news-list");
      newsList.innerHTML = `
    <div class="col-md-6  ">
         <div class="card bg-info">
        <h2> Country : <span class="countryName">${name.country}</span> </h2>
         <div class="card-body">
           <h5 class="card-title"> Total Cases:${name.totalCases}</h5>
            <p class="card-text"> Total Deaths:${name.totalDeaths}</p>
           <p class="card-text"> Total Recovere:${name.totalRecovered}</p>

          </div>
        </div>
      </div>
     `;
    })
    .filter(getCorona());
};

const veri = document.getElementById("veri");
const btn = document.querySelector(".btn");

console.log(veri);
console.log(btn);

// butona basınca veri getirme 
btn.addEventListener("click", () => {
  if (!veri.value) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = `<h2 class=" text-center text-info">Lütfen Ülke adını  ingilizce olarak giriniz</h2>`;
  }
  getCorona(`${veri.value}`);
  veri.value = "";
});

// enter ile veri sorgusu
veri.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getCorona(`${veri.value}`);
    veri.value = "";
  }
});
