let selectedIndex = 0
const indexPageContainer = document.querySelector(".index_page_container")
const current_index_page = document.querySelectorAll(".index_page")

//variaveis da area Star Rating
const starRatingContainer = document.querySelectorAll("#star_container")
let currentStarContainer = null
let currentStars = null

// console.log(currentRating)
// console.log(total_score)

indexPageContainer.addEventListener("click", (event) => {

  const page = event.target

  if (page.classList.contains("index_page")){
    const indexPage = event.target.dataset.index
    selectedIndex = indexPage

    ratingAnime()
  }

  //console.log(`Indice ativado: ${selectedIndex}`)
})

ratingAnime()

function ratingAnime() {

  const starContainer = starRatingContainer[selectedIndex].querySelector("#stars")
  currentStarContainer = starContainer

  const stars = starContainer.querySelectorAll('.star')
  currentStars = stars

  const starBackgrounds = starContainer.querySelectorAll('.star_background')

  starRatingContainer[selectedIndex].addEventListener("mouseenter", () => {

    //console.log(`Star Rating Index:`)
    //console.log(starRatingContainer[selectedIndex])
  
    // Associa o evento de movimento às estrelas
    stars.forEach(star => {
      star.addEventListener('mousemove', handleMouseMove);
    });
  
    starContainer.addEventListener('click', () => {
      removeMouseEvents();
      //console.log(`Classificação final: ${currentRating} estrelas`);
    });
  
  })
}

// Atualiza o preenchimento das estrelas com base no movimento do mouse
function updateStars(event) {

    let currentRating = Number(currentStarContainer.getAttribute("data-totalScore"))
    let total_score = Number(currentStarContainer.getAttribute("data-currentRating"))

  const targetStar = event.currentTarget;
  const boundingRect = targetStar.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const width = boundingRect.width;
  
  const index_MouseStar = Array.from(currentStars).indexOf(targetStar);
  const fillPercentage = Math.max(0, Math.min((offsetX / width) * 100, 100));

  // Usar fillPercentage diretamente sem .toFixed()
  const rating = index_MouseStar + fillPercentage / 100;

  // Verificar se o rating está dentro do intervalo válido
  if (rating >= 0.0 && rating <= 5.0) {
    currentRating = rating.toFixed(1);
  }

  // Atualiza o preenchimento das estrelas
  currentStars.forEach((starElem, i) => {
    const bg = starElem.querySelector(".star_background");
    if (i < index_MouseStar) {
      bg.style.width = "100%";
    } else if (i === index_MouseStar) {
      bg.style.width = `${fillPercentage}%`;
    } else {
      bg.style.width = "0%";
    }
  });

  //star_rating_txt.innerText = `${currentRating}`;
  currentStarContainer.setAttribute("data-totalScore", `${currentRating}`)
  currentStarContainer.setAttribute("data-currentRating", `${currentRating}`)

}

function handleMouseMove(event) {
  updateStars(event);
}

// Remove o evento de movimento após o clique
function removeMouseEvents() {
  currentStars.forEach(star => {
    star.removeEventListener('mousemove', handleMouseMove);
  });
}

// Limpa o preenchimento ao sair das estrelas
function resetStars(starBackgrounds) {
  starBackgrounds.forEach(star => star.style.width = '0%');
}