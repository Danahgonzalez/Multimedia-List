const addBtn = document.querySelector('#add')
const newMovieInput = document.querySelector('#inputAdd')
const moviesContainer = document.querySelector('#moviesContainer')
const errorMessage = document.querySelector('#error')

const insertLocal = () => {
    let movieTitle = newMovieInput.value.trim()
    errorMessage.style.display = 'none'
    
    if(!movieTitle){
        errorMessage.textContent = 'input cannot be empty!!'
        errorMessage.style.display = 'block'
    }else{
        
        if(!localStorage.getItem(movieTitle)){
            localStorage.setItem(movieTitle,movieTitle)
            newMovieInput.value = ''
            addMovie(movieTitle)
        }else{
            errorMessage.textContent = 'This was already insert!!'
            errorMessage.style.display = 'block'
        }
    }

}

const addMovie = (movie) => {
    const htmlEstructure = `
        <div class="movie" id="${movie}">
            <input type="checkbox"><span>${movie}</span><button class="btnEdit material-symbols-outlined">stylus</button><button class="btnTrash material-symbols-outlined">delete</button>
        </div>
    `       
    moviesContainer.insertAdjacentHTML('beforeend', htmlEstructure)
}


window.addEventListener('DOMContentLoaded', () => {
    for (const i in localStorage) {
        if(typeof localStorage[i] === 'string'){
            addMovie(localStorage[i])
        }
    }
})

const removeMovie = (element) => {
    element.parentNode.remove()
    localStorage.removeItem(element.parentNode.id)
}

const editMovie = (element) => {
    let targetElement = element;

    if(element.classList.contains('btnEdit')){
        targetElement = targetElement.previousSibling
        newMovieInput.value = targetElement.innerText;
        removeMovie(targetElement)
    }

    

}

addBtn.addEventListener('click', () => {
    insertLocal();
});


moviesContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnTrash')){
        removeMovie(e.target)
    }
    editMovie(e.target)
})