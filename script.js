let firstQuery = "https://api.pexels.com/v1/search?query=roadster";
let secondQuery = "https://api.pexels.com/v1/search?query=tigers";

const loadBtn = document.querySelector(".btn-primary");
const loadSecondBtn = document.querySelector(".btn-secondary");
const card = document.querySelectorAll(".card");
const hideBtn = document.querySelectorAll(".btn-outline-secondary");

const loadImages = () => {
  fetch(firstQuery, { headers: { Authorization: "Mnv94w7Ike2qAiXdwUdQqaJvVh157xa9JoPzZwiwUX3Lkpx8gI2QXEUo" } })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore server");
      }
    })
    .then((images) => {
      loadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(images.photos);
        card.forEach((card, i) => {
          const img = card.querySelector("img");
          img.src = images.photos[i].src.portrait;
          const idText = card.querySelector(".text-muted");
          idText.innerText = images.photos[i].id;
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
  fetch(secondQuery, { headers: { Authorization: "Mnv94w7Ike2qAiXdwUdQqaJvVh157xa9JoPzZwiwUX3Lkpx8gI2QXEUo" } })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore server");
      }
    })
    .then((images) => {
      loadSecondBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(images.photos);
        card.forEach((card, i) => {
          const img = card.querySelector("img");
          img.src = images.photos[i].src.portrait;
          const idText = card.querySelector(".text-muted");
          idText.innerText = images.photos[i].id;
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

const hideCard = () => {
  //cambio nome ai tasti edit in hide
  hideBtn.forEach((btn) => {
    if (btn.innerText === "Edit") {
      btn.innerText = "Hide";
      btn.addEventListener("click", () => {
        const singleCard = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
        singleCard.classList.add("d-none");
      });
    }
  });
};

//funzione search
const searchImage = () => {
  const searchBtn = document.querySelector(".btn-outline-success");
  const inputSearch = document.querySelector(".form-control");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    firstQuery = "https://api.pexels.com/v1/search?query=" + inputSearch.value;
    fetch(firstQuery, { headers: { Authorization: "Mnv94w7Ike2qAiXdwUdQqaJvVh157xa9JoPzZwiwUX3Lkpx8gI2QXEUo" } })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore server");
        }
      })
      .then((images) => {
        card.forEach((card, i) => {
          const img = card.querySelector("img");
          img.src = images.photos[i].src.portrait;
          const idText = card.querySelector(".text-muted");
          idText.innerText = images.photos[i].id;
        });
        inputSearch.value = "";
      })
      .catch((err) => {
        console.log("ERRORE!", err);
      });
  });
};

searchImage();
loadImages();
hideCard();
