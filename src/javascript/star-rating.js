let currentIndex = 0

//variaveis da area Star Rating
const starContainer = document.querySelectorAll("#stars")
const stars = starContainer[currentIndex].querySelectorAll('.star');
const starBackgrounds = starContainer[currentIndex].querySelectorAll('.star_background');

let currentRating = Number(starContainer[currentIndex].getAttribute("data-totalScore"))
let total_score = Number(starContainer[currentIndex].getAttribute("data-currentRating"))

// console.log(currentRating)
// console.log(total_score)

// Atualiza o preenchimento das estrelas com base no movimento do mouse
function updateStars(event) {
  const targetStar = event.currentTarget;
  const boundingRect = targetStar.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const width = boundingRect.width;
  
  const index_MouseStar = Array.from(stars).indexOf(targetStar);
  const fillPercentage = Math.max(0, Math.min((offsetX / width) * 100, 100));

  // Usar fillPercentage diretamente sem .toFixed()
  const rating = index_MouseStar + fillPercentage / 100;

  // Verificar se o rating está dentro do intervalo válido
  if (rating >= 0.0 && rating <= 5.0) {
    currentRating = rating.toFixed(1);
  }

  // Atualiza o preenchimento das estrelas
  stars.forEach((starElem, i) => {
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
  starContainer[currentIndex].setAttribute("data-totalScore", `${currentRating}`)
  starContainer[currentIndex].setAttribute("data-currentRating", `${currentRating}`)

}

function handleMouseMove(event) {
  updateStars(event);
}

starContainer[currentIndex].addEventListener("mouseover", () => {

  starContainer[currentIndex].style.cursor = `url("img/color-pixels-pokeball-pointer.png"), pointer;`

  // Associa o evento de movimento às estrelas
  stars.forEach(star => {
    star.addEventListener('mousemove', handleMouseMove);
  });

  starContainer[currentIndex].addEventListener('click', () => {
    removeMouseEvents();
    starContainer[currentIndex].style.cursor = `url("img/color-pixels-pokeball-default\ \(1\).png"), auto;`
    //console.log(`Classificação final: ${currentRating} estrelas`);
  });

})

// Remove o evento de movimento após o clique
function removeMouseEvents() {
  stars.forEach(star => {
    star.removeEventListener('mousemove', handleMouseMove);
  });
}

function star_level_rating_fill_level() {

  stars_ratings.forEach((rating_star_level, index) => {

    let rating_star_level_score = Number(rating_star_level.querySelector(".number_reviews").textContent)
    const rating_star_level_width = rating_star_level.querySelector(".rating_score_fill")

    let fillPercentage = Math.max(0, Math.min((rating_star_level_score / total_score) * 100, 100));

    //console.log(`star level: ${index+1}, score: ${rating_star_level_score}`)

    rating_star_level_width.style.width = `${fillPercentage}%`
  })

}

// Limpa o preenchimento ao sair das estrelas
function resetStars() {
  starBackgrounds.forEach(star => star.style.width = '0%');
}