const jokeButton = document.querySelector(".joke-btn");
const jokeCard = document.querySelector(".joke-card");
const categoryAny = document.querySelector("#category-select");

const categories = {
  Any: "https://v2.jokeapi.dev/joke/Any?safe-mode",
  Misc: "https://v2.jokeapi.dev/joke/Misc?safe-mode",
  Programming: "https://v2.jokeapi.dev/joke/Programming?safe-mode",
  Pun: "https://v2.jokeapi.dev/joke/Pun?safe-mode",
  Spooky: "https://v2.jokeapi.dev/joke/Spooky?safe-mode",
  Christmas: "https://v2.jokeapi.dev/joke/Christmas?safe-mode",
};

const fetchJoke = async () => {
  jokeCard.classList.remove("scaleFadeSlideInUp");
  jokeCard.innerHTML = "";

  try {
    const selected = categoryAny.value;
    console.log("Selected:", selected);

    const finalUrl = categories[selected] || categories.Any;
    console.log("Final URL:", finalUrl);

    const res = await fetch(finalUrl);
    const data = await res.json();

    if (data.type === "single") {
      const p = document.createElement("p");
      p.classList.add("joke-text");
      p.textContent = data.joke;
      jokeCard.appendChild(p);
    } else {
      const setup = document.createElement("p");
      setup.classList.add("joke-setup");
      setup.textContent = data.setup;

      const delivery = document.createElement("p");
      delivery.classList.add("joke-delivery");
      delivery.textContent = data.delivery;

      jokeCard.appendChild(setup);
      jokeCard.appendChild(delivery);
    }

    jokeCard.classList.add("is-visible");
    void jokeCard.offsetWidth;
    jokeCard.classList.add("scaleFadeSlideInUp");
  } catch (error) {
    console.log(error);
    const p = document.createElement("p");
    p.classList.add("joke-text");
    p.textContent = "Something went wrong, please try again!";
    jokeCard.appendChild(p);

    jokeCard.classList.add("is-visible");
  }
};

jokeButton.addEventListener("click", fetchJoke);
