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

const categories = [
  { name: "Any", url: "https://v2.jokeapi.dev/joke/Any?safe-mode" },
  { name: "Misc", url: "https://v2.jokeapi.dev/joke/Misc?safe-mode" },
  {
    name: "Programming",
    url: "https://v2.jokeapi.dev/joke/Programming?safe-mode",
  },
  { name: "Dark", url: "https://v2.jokeapi.dev/joke/Dark?safe-mode" },
  { name: "pun", url: "https://v2.jokeapi.dev/joke/Pun?safe-mode" },
  { name: "Spooky", url: "https://v2.jokeapi.dev/joke/Spooky?safe-mode" },
  { name: "Christmas", url: "https://v2.jokeapi.dev/joke/Christmas?safe-mode" },
];
