const jokeButton = document.querySelector(".jokeButton");
const jokeCard = document.querySelector(".jokeCard");

const fetchJoke = async () => {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    const data = await res.json();

    jokeCard.textContent = data.joke || `${data.setup} - ${data.delivery}`;
  } catch (error) {
    console.log(error);
    jokeCard.textContent = "Something went wrong...";
  }
};

jokeButton.addEventListener("click", fetchJoke);
