const main_container = document.getElementById("main_container")
//const anime_area_items = document.querySelectorAll(".anime_area")
const index_page_container = document.querySelectorAll(".index_page")

let previusIndex = index_page_container[0]
let previousIndexNumber = 0

index_page_container.forEach( (item, index) => {
    item.addEventListener("click", () => {
        const currentIndex = item

        if (currentIndex != previusIndex) {
            previusIndex.classList.remove("current_index")
            currentIndex.classList.add("current_index")

            if (index > previousIndexNumber) {

                const inicial = -100 * previousIndexNumber
                const final = -100 * index
                
                document.documentElement.style.setProperty('--startPosition', `${inicial}`)
                document.documentElement.style.setProperty('--finishPosition', `${final}`)

                main_container.classList.add("nextSlide")
                main_container.setAttribute("style", `left: ${final}dvw;`)

                console.log(`Conta Pos. inicial: ${inicial}`)
                console.log(`Conta Pos. final: ${final}`)

            }

            else if (index < previousIndexNumber) {

                const inicial = Number(main_container.getAttribute("style").replace(/[^\d+-]/g, ''))
                const final = -100 * index
                
                document.documentElement.style.setProperty('--startPosition', `${inicial}`)
                document.documentElement.style.setProperty('--finishPosition', `${final}`)

                main_container.classList.add("prevSlide")
                main_container.setAttribute("style", `left: ${final}dvw;`)

                console.log(`Conta Pos. inicial: ${inicial}`)
                console.log(`Conta Pos. final: ${final}`)

            }

            main_container.addEventListener("animationend", () => {
                if (main_container.classList.contains("nextSlide")) {
                    main_container.classList.remove("nextSlide")
                }
            
                if (main_container.classList.contains("prevSlide")) {
                    main_container.classList.remove("prevSlide")
                }
            })

            const main_start_position = getComputedStyle(document.documentElement).getPropertyValue('--startPosition')
            const main_finish_position = getComputedStyle(document.documentElement).getPropertyValue('--finishPosition')

            console.log(`>--------------------------<\nPosição inicial: ${main_start_position}`)
            console.log(`Posição final: ${main_finish_position}`)
            console.log(`Indice atual: ${index}`)
            console.log(`Indice antigo: ${previousIndexNumber}\n>--------------------------<`)

        }

        previousIndexNumber = index
        previusIndex = currentIndex
    })
})