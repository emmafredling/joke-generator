const jokeButton = document.querySelector(".jokeButton");
const jokeCard = document.querySelector(".jokeCard");
const categoryAny = document.querySelector("#category-select");

const categories = [
  { name: "Any", url: "https://v2.jokeapi.dev/joke/Any?safe-mode" },
  { name: "Misc", url: "https://v2.jokeapi.dev/joke/Misc?safe-mode" },
  {
    name: "Programming",
    url: "https://v2.jokeapi.dev/joke/Programming?safe-mode",
  },
  { name: "Dark", url: "https://v2.jokeapi.dev/joke/Dark?safe-mode" },
  { name: "Pun", url: "https://v2.jokeapi.dev/joke/Pun?safe-mode" },
  { name: "Spooky", url: "https://v2.jokeapi.dev/joke/Spooky?safe-mode" },
  { name: "Christmas", url: "https://v2.jokeapi.dev/joke/Christmas?safe-mode" },
];

const backgroundQueries = {
  Any: "abstract background",
  Programming: "programming code background",
  Christmas: "Christmas background",
  Pun: "funny colorful background",
  Spooky: "spooky halloween background",
  Dark: "dark abstract background",
  Misc: "minimal abstract background",
};

const fetchBackground = async (selectedCategory) => {
  console.log("fetchBackground received:", selectedCategory);

  const categoryKey = selectedCategory || "Any";
  const query = backgroundQueries[categoryKey] || backgroundQueries.Any;

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=20`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  const data = await res.json();
  console.log("Pexels data:", data);

  if (!data.photos || data.photos.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * data.photos.length);
  const photo = data.photos[randomIndex];
  const url = photo.src.large;

  return url;
};

const fetchJoke = async () => {
  try {
    const selected = categoryAny.value;
    console.log("Selected:", selected);

    const bgUrl = await fetchBackground(selected);
    console.log("Background URL:", bgUrl);

    const category = categories.find((cat) => cat.name === selected);
    const anyCategory = categories.find((cat) => cat.name === "Any");
    console.log("Category object;", category);

    const finalUrl = category ? category.url : anyCategory.url;
    console.log("Final URL:", finalUrl);

    const res = await fetch(finalUrl);
    const data = await res.json();

    jokeCard.textContent = data.joke || `${data.setup} - ${data.delivery}`;

    if (bgUrl) {
      jokeCard.style.backgroundImage = `url(${bgUrl})`;
    }

    jokeCard.style.display = "block";
  } catch (error) {
    console.log(error);
    jokeCard.textContent = "Something went wrong, please try again!";
  }
};

jokeButton.addEventListener("click", fetchJoke);
