//153bac550dbfc9bda1b2f5ef2f99a808

let input = document.querySelector('.input_text');
let Button = document.querySelector('#sub');

$(input).keydown(function(event){
  let keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == 13) {
        event.preventDefault();
        document.getElementById("sub").click();
      }
});
 
Button.addEventListener('click', research());



    // function Movie(data) {

    // let image = data.results[0].poster_path;
    // let title = data.results[0].title;
    // let date = data.results[0].release_date.substring(0,4);
    // let resume = data.results[0].overview;
    // let tabGenre = data.results[0].genre_ids;
    // let vote = data.results[0].vote_average;
    // let voteCount = data.results[0].vote_count;

    // if (image == "") {
    //     image = "Aucune image disponible";
    // } else if  (title == "") {
    //     title = "Aucun titre disponible"
    // } else if  (date == "") {
    //     date = "Aucune date disponible"
    // } else if  (resume == "") {
    //     resume = "Aucun résumé disponible"
    // } else if  (vote == "") {
    //     vote = "Aucune note disponible"
    // } else if  (voteCount == "") {
    //     voteCount = "Aucun vote"
    // }

    // document.getElementById(`affiche`).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
    // document.getElementById(`title`).innerHTML = `<h2 class="name">${title}</h2>`;
    // document.getElementById(`date`).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
    // document.getElementById(`resume`).innerHTML = `<p class="italic">${resume}</p>`;
    // document.getElementById(`note`).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;
    // input.value ="";
    
    // }
 


async function research() {

  $('#main').remove();
  $('#search').append();

  document.getElementById('btn').innerHTML = `<input type="button" value="Retour" id="retour" onclick="window.location.reload()" />`;

  let researchedMovie = await fetch('https://api.themoviedb.org/3/search/movie?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&query=' + input.value)
  .then((resultat) => resultat.json())
  .then((json) => json)
  .catch(err => alert("Film inexistant !"));

  input.value ="";

  console.log(researchedMovie);
  displayResearchInfos(researchedMovie);

    
// const genre = await fetch(
//     `https://api.themoviedb.org/3/genre/movie/list?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr`
//     )
//     .then((resultat) => resultat.json())
//     .then((json) => json);

};

async function main() {

  const popularMovie = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&page=1`
      )
      .then((resultat) => resultat.json())
      .then((json) => json);

  const topRatedMovie = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&page=1`
      )
      .then((resultat) => resultat.json())
      .then((json) => json);

      
  displayMovieInfos(popularMovie);

    
// const genre = await fetch(
//     `https://api.themoviedb.org/3/genre/movie/list?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr`
//     )//153bac550dbfc9bda1b2f5ef2f99a808

let input = document.querySelector('.input_text');
let Button = document.querySelector('#sub');
 
input.addEventListener("keyup", function(event) {
  
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sub").click();
    }
    }); 
 
Button.addEventListener('click', function(){

    $('#main').remove();
    $('#search').append();

    document.getElementById('btn').innerHTML = `<input type="button" value="Retour" id="retour" onclick="window.location.reload()" />`;

    fetch('https://api.themoviedb.org/3/search/movie?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&query=' + input.value)
    .then(resp => resp.json())
    .then(data => {
        Movie(data);
    })
    // .catch(err => alert("Film inexistant !"));

    function Movie(data) {

    for(let i in data.results) {

        console.log(data.results);

        $('#search').append(`<div class="movie">
        <p id="affiche${i}"></p>
        <h2 id="title${i}"></h2>
        <h3 id="date${i}"></h3>
        <p id="resume${i}"></p>
        <h4 id="note${i}"></h4>
        </div>`);

        let image = data.results[i].poster_path;
        let title = data.results[i].title;
        let date = data.results[i].release_date.substring(0,4);
        let resume = data.results[i].overview;
        // let tabGenre = data.results[i].genre_ids;
        let vote = data.results[i].vote_average;
        let voteCount = data.results[i].vote_count;

        if (image == "") {
            image = "Aucune image disponible";
        } else if  (title == "") {
            title = "Aucun titre disponible"
        } else if  (date == "") {
            date = "Aucune date disponible"
        } else if  (resume == "") {
            resume = "Aucun résumé disponible"
        } else if  (vote == "") {
            vote = "Aucune note disponible"
        } else if  (voteCount == "") {
            voteCount = "Aucun vote"
        }

        document.getElementById(`affiche${i}`).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
        document.getElementById(`title${i}`).innerHTML = `<h2 class="name">${title}</h2>`;
        document.getElementById(`date${i}`).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
        document.getElementById(`resume${i}`).innerHTML = `<p class="italic">${resume}</p>`;
        document.getElementById(`note${i}`).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;

    }

    input.value ="";
    
    }
 
})

async function main() {

const popularMovie = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&page=1`
    )
    .then((resultat) => resultat.json())
    .then((json) => json);

const topRatedMovie = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&page=1`
    )
    .then((resultat) => resultat.json())
    .then((json) => json);

    displayMovieInfos(popularMovie);

    
const genre = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr`
    )
    .then((resultat) => resultat.json())
    .then((json) => json);

};

function displayMovieInfos(data) {

    for(let i in data.results) {

            $('#popularMovies').append(`<div class="movie">
            <p id="affiche${i}"></p>
            <h2 id="title${i}"></h2>
            <h3 id="date${i}"></h3>
            <p id="resume${i}"></p>
            <h4 id="note${i}"></h4>
            </div>`);

        let image = data.results[i].poster_path;
        let title = data.results[i].title;
        let date = data.results[i].release_date.substring(0,4);
        let resume = data.results[i].overview;
        let tabGenre = data.results[i].genre_ids;
        let vote = data.results[i].vote_average;
        let voteCount = data.results[i].vote_count;

        if (image == "") {
            image = "Aucune image disponible";
        } else if  (title == "") {
            title = "Aucun titre disponible"
        } else if  (date == "") {
            date = "Aucune date disponible"
        } else if  (resume == "") {
            resume = "Aucun résumé disponible"
        } else if  (vote == "") {
            vote = "Aucune note disponible"
        } else if  (voteCount == "") {
            voteCount = "Aucun vote"
        }

        document.getElementById(`affiche${i}`).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
        document.getElementById(`title${i}`).innerHTML = `<h2 class="name">${title}</h2>`;
        document.getElementById(`date${i}`).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
        document.getElementById(`resume${i}`).innerHTML = `<p class="italic">${resume}</p>`;
        document.getElementById(`note${i}`).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;

    }

};

main();
//     .then((resultat) => resultat.json())
//     .then((json) => json);

};

function displayMovieInfos(data) {

    for(let i in data.results) {

            $('#popularMovies').append(`<div class="movie">
            <p id="affiche${i}"></p>
            <h2 id="title${i}"></h2>
            <h3 id="date${i}"></h3>
            <p id="resume${i}"></p>
            <h4 id="note${i}"></h4>
            </div>`);

        let image = data.results[i].poster_path;
        let title = data.results[i].title;
        let date = data.results[i].release_date.substring(0,4);
        let resume = data.results[i].overview;
        let tabGenre = data.results[i].genre_ids;
        let vote = data.results[i].vote_average;
        let voteCount = data.results[i].vote_count;

        if (image == "") {
            image = "Aucune image disponible";
        } else if  (title == "") {
            title = "Aucun titre disponible"
        } else if  (date == "") {
            date = "Aucune date disponible"
        } else if  (resume == "") {
            resume = "Aucun résumé disponible"
        } else if  (vote == "") {
            vote = "Aucune note disponible"
        } else if  (voteCount == "") {
            voteCount = "Aucun vote"
        }

        document.getElementById(`affiche${i}`).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
        document.getElementById(`title${i}`).innerHTML = `<h2 class="name">${title}</h2>`;
        document.getElementById(`date${i}`).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
        document.getElementById(`resume${i}`).innerHTML = `<p class="italic">${resume}</p>`;
        document.getElementById(`note${i}`).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;

    }

};

function displayResearchInfos(data) {

    for(let i in data.results) {

            $('#search').append(`<div class="movie">
            <p id="affiche${i}"></p>
            <h2 id="title${i}"></h2>
            <h3 id="date${i}"></h3>
            <p id="resume${i}"></p>
            <h4 id="note${i}"></h4>
            </div>`);

        let image = data.results[i].poster_path;
        let title = data.results[i].title;
        let date = data.results[i].release_date.substring(0,4);
        let resume = data.results[i].overview;
        let tabGenre = data.results[i].genre_ids;
        let vote = data.results[i].vote_average;
        let voteCount = data.results[i].vote_count;

        if (image == "") {
            image = "Aucune image disponible";
        } else if  (title == "") {
            title = "Aucun titre disponible"
        } else if  (date == "") {
            date = "Aucune date disponible"
        } else if  (resume == "") {
            resume = "Aucun résumé disponible"
        } else if  (vote == "") {
            vote = "Aucune note disponible"
        } else if  (voteCount == "") {
            voteCount = "Aucun vote"
        }

        document.getElementById(`affiche${i}`).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
        document.getElementById(`title${i}`).innerHTML = `<h2 class="name">${title}</h2>`;
        document.getElementById(`date${i}`).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
        document.getElementById(`resume${i}`).innerHTML = `<p class="italic">${resume}</p>`;
        document.getElementById(`note${i}`).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;

    }

};

main();
