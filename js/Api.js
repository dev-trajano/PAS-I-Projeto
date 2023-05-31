const urlPais = "https://restcountries.com/v3.1/all?lang=pt";

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const getPais = async () => {
  try {
    const paises = await fetchJson(urlPais);
    const select = document.querySelector("#Paises");
    const nomesPaises = new Set();
    paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
    paises.forEach(({ name: { common } }) => {
      if (!nomesPaises.has(common)) {
        nomesPaises.add(common);
        const option = new Option(common);
        select.add(option);
      }
    });

    select.addEventListener("change", (event) => {
      const paisSelecionado = event.target.value;
      const pais = paises.find((pais) => pais.name.common === paisSelecionado);
      if (pais) {
        const infoPais = document.querySelector("#InfoPais");
        infoPais.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.textContent = pais.name.common;
        infoPais.appendChild(h1);

        const img = document.createElement("img");
        img.src = pais.flags.svg;
        img.alt = `Bandeira do ${pais.name.common}`;
        infoPais.appendChild(img);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", getPais);

function toggleDetails(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  var details = document.getElementById("border-details");

  if (checkbox.checked) {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}

function buscarPais() {
  const select = document.querySelector("#Paises");
  const paisSelecionado = select.value;

  if (paisSelecionado) {
    const urlPaisSelecionado = `https://restcountries.com/v3.1/name/${paisSelecionado}?fullText=true`;

    fetchJson(urlPaisSelecionado)
      .then((paises) => {
        const infoPais = document.querySelector("#InfoPais");
        infoPais.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.textContent = paises[0].name.common;
        infoPais.appendChild(h1);

        const img = document.createElement("img");
        img.src = paises[0].flags.svg;
        img.alt = `Bandeira do ${paises[0].name.common}`;
        infoPais.appendChild(img);

        if (document.getElementById("capital-checkbox").checked) {
          const capital = document.createElement("p");
          capital.textContent = `Capital: ${paises[0].capital}`;
          infoPais.appendChild(capital);
        }

        if (document.getElementById("moeda-checkbox").checked) {
          const moeda = document.createElement("p");
          const currency =
            paises[0].currencies[Object.keys(paises[0].currencies)[0]];
          const { name, symbol } = currency;
          moeda.textContent = `Moeda: ${name} (${symbol})`;
          infoPais.appendChild(moeda);
        }

        if (document.getElementById("regiao-checkbox").checked) {
          const regiao = document.createElement("p");
          regiao.textContent = `Região: ${paises[0].region}`;
          infoPais.appendChild(regiao);
        }

        if (document.getElementById("subregiao-checkbox").checked) {
          const subregiao = document.createElement("p");
          subregiao.textContent = `Sub-região: ${paises[0].subregion}`;
          infoPais.appendChild(subregiao);
        }

        if (document.getElementById("idioma-checkbox").checked) {
          const idioma = document.createElement("p");
          idioma.textContent = `Idioma: ${Object.values(
            paises[0].languages
          ).join(", ")}`;
          infoPais.appendChild(idioma);
        }

        if (document.getElementById("fronteiras-checkbox").checked) {
          const fronteiras = document.createElement("p");
          fronteiras.textContent = `Fronteiras: ${paises[0].borders.join(
            ", "
          )}`;
          infoPais.appendChild(fronteiras);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
