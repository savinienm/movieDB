// fonction de recherche

let input = document.querySelector(".input_text");
let Button = document.querySelector("#sub");

// permet l'utilisation de la touche entrée 

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sub").click();
  }
});

Button.addEventListener("click", function () {

  // supprime le contenu principal de la page

  $(".main").remove();

  let recherche = document.getElementById("recherche-section");

  // sert à réactualiser le contenu de recherche lorsqu'une nouvelle recherche a lieu

  if (recherche) {
    recherche.remove();
  }

  // ajoute le contenu de la recherche

  $(".research-section").append(`
    <div class="container" id="recherche-section">
      <div class="row title-section">
      <h1>Votre recherche de films</h1>
    </div>
    <div class="row" id="search"></div>
    <div class="row d-flex align-items-center justify-content-center" id="btn">
      <div class="col-1" id="btn"></div>
    </div></div>
    `);

  fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&query=" +
      input.value
  )
    .then((resp) => resp.json())
    .then((data) => {
      Movie(data);
    });

  function Movie(data) {
    for (let i in data.results) {
      let image = data.results[i].poster_path;
      let title = data.results[i].title;
      let date = data.results[i].release_date.substring(0, 4);
      let resume = data.results[i].overview;
      let vote = data.results[i].vote_average;
      let voteCount = data.results[i].vote_count;

      $("#search").append(`<div class="movie col shadow p-3 m-3 rounded">
      <p id="affiche${i}"></p>
      <h2 class="text-center" id="title${i}"></h2>
      <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
      <i class="fas fa-plus"></i>
      </button>
      </div>
      <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
      <h2 class="text-center" id="titleM${i}"></h2>
      </div>
      <div class="modal-body">
      <h3 id="date${i}"></h3>
      <p id="resume${i}"></p>
      <h4 id="note${i}"></h4>
      </div>
      <div class="modal-footer">
      <button
      type="button"
      class="btn btn-danger"
      data-dismiss="modal"
    >
      <i class="fas fa-times"></i>
    </button></div>
      </div>
      </div>
      </div>`);

      if (title == "") {
        title = "Aucun titre disponible";
      } else if (date == "") {
        date = "Aucune date disponible";
      } else if (resume == "") {
        resume = "Aucun résumé disponible";
      } else if (vote == "") {
        vote = "Aucune note disponible";
      } else if (voteCount == "") {
        voteCount = "Aucun vote";
      }

        if (image == undefined) {
        document.getElementById(
          `affiche${i}`
        ).innerHTML = `<img class="affiche" src="img/noimg.jpg"/>`;
      } else {
        document.getElementById(
          `affiche${i}`
        ).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
      }
      document.getElementById(
        `title${i}`
      ).innerHTML = `<h2 class="name">${title}</h2>`;
      document.getElementById(
        `date${i}`
      ).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
      document.getElementById(
        `resume${i}`
      ).innerHTML = `<p class="italic">${resume}</p>`;
      document.getElementById(
        `note${i}`
      ).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;
    }

    input.value = "";
  }

  document.getElementById(
    "btn"
  ).innerHTML = `<button type="button" class="btn btn-danger" id="retour" onclick="window.location.reload()" />RETOUR</button>`;
});

async function main() {
  const upcomingMovie = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&page=1`
  )
    .then((resultat) => resultat.json())
    .then((json) => json);

  const discoverMovie = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=153bac550dbfc9bda1b2f5ef2f99a808&language=fr&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1`
  )
    .then((resultat) => resultat.json())
    .then((json) => json);

  displayupcomingMovieInfos(upcomingMovie);
  displaydiscoverMovieInfos(discoverMovie);
  displayHeroInfos(upcomingMovie);
}

function displayupcomingMovieInfos(data) {
  for (let i in data.results) {

    if (i < 4) {
      $("#carousel0").append(`<div class="movie col shadow p-3 m-3 rounded">
                <p id="affiche${i}"></p>
                <h2 class="text-center" id="title${i}"></h2>
                <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
                <i class="fas fa-plus"></i>
                </button>
                </div>
                <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h2 class="text-center" id="titleM${i}"></h2>
                </div>
                <div class="modal-body">
                <h3 id="date${i}"></h3>
                <p id="resume${i}"></p>
                <h4 id="note${i}"></h4>
                </div>
                <div class="modal-footer">
                <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                <i class="fas fa-times"></i>
              </button></div>
                </div>
                </div>
                </div>`);
    } else if (i >= 4 && i < 8) {
      $("#carousel1").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="affiche${i}"></p>
              <h2 class="text-center" id="title${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleM${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="date${i}"></h3>
              <p id="resume${i}"></p>
              <h4 id="note${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 8 && i < 12) {
      $("#carousel2").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="affiche${i}"></p>
              <h2 class="text-center" id="title${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleM${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="date${i}"></h3>
              <p id="resume${i}"></p>
              <h4 id="note${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 12 && i < 16) {
      $("#carousel3").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="affiche${i}"></p>
              <h2 class="text-center" id="title${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleM${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="date${i}"></h3>
              <p id="resume${i}"></p>
              <h4 id="note${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 16 && i < 20) {
      $("#carousel4").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="affiche${i}"></p>
              <h2 class="text-center" id="title${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modal${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleM${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="date${i}"></h3>
              <p id="resume${i}"></p>
              <h4 id="note${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    }

    let image = data.results[i].poster_path;
    let title = data.results[i].title;
    let date = data.results[i].release_date.substring(0, 4);
    let resume = data.results[i].overview;
    let vote = data.results[i].vote_average;
    let voteCount = data.results[i].vote_count;

    if (image == "") {
      image = "Aucune image disponible";
    } else if (title == "") {
      title = "Aucun titre disponible";
    } else if (date == "") {
      date = "Aucune date disponible";
    } else if (resume == "") {
      resume = "Aucun résumé disponible";
    } else if (vote == "") {
      vote = "Aucune note disponible";
    } else if (voteCount == "") {
      voteCount = "Aucun vote";
    }

    if (image == undefined) {
      document.getElementById(
        `affiche${i}`
      ).innerHTML = `<img class="affiche" src="img/noimg.jpg"/>`;
    } else {
      document.getElementById(
        `affiche${i}`
      ).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
    }

    document.getElementById(
      `title${i}`
    ).innerHTML = `<h2 class="name">${title}</h2>`;
    document.getElementById(
      `titleM${i}`
    ).innerHTML = `<h2 class="name">${title}</h2>`;
    document.getElementById(
      `date${i}`
    ).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
    document.getElementById(
      `resume${i}`
    ).innerHTML = `<p class="italic">${resume}</p>`;
    document.getElementById(
      `note${i}`
    ).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;

    // image.tmdb.org/t/p/w200/kdEorjrPno4Cn7HYVN2DA0f3ocr.jpg
  }
}

function displaydiscoverMovieInfos(data) {
  for (let i in data.results) {
    if (i < 4) {
      $("#carousel5").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="afficheR${i}"></p>
              <h2 class="text-center" id="titleR${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modalR${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modalR${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleMR${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="dateR${i}"></h3>
              <p id="resumeR${i}"></p>
              <h4 id="noteR${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 4 && i < 8) {
      $("#carousel6").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="afficheR${i}"></p>
              <h2 class="text-center" id="titleR${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modalR${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modalR${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleMR${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="dateR${i}"></h3>
              <p id="resumeR${i}"></p>
              <h4 id="noteR${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 8 && i < 12) {
      $("#carousel7").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="afficheR${i}"></p>
              <h2 class="text-center" id="titleR${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modalR${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modalR${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleMR${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="dateR${i}"></h3>
              <p id="resumeR${i}"></p>
              <h4 id="noteR${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 12 && i < 16) {
      $("#carousel8").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="afficheR${i}"></p>
              <h2 class="text-center" id="titleR${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modalR${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modalR${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleMR${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="dateR${i}"></h3>
              <p id="resumeR${i}"></p>
              <h4 id="noteR${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    } else if (i >= 16 && i < 20) {
      $("#carousel9").append(`<div class="movie col shadow p-3 m-3 rounded">
              <p id="afficheR${i}"></p>
              <h2 class="text-center" id="titleR${i}"></h2>
              <button type="button" class="bouton-voir-plus btn btn-danger" data-toggle="modal" data-target="#modalR${i}">
              <i class="fas fa-plus"></i>
              </button>
              </div>
              <div class="modal fade text-dark mt-5" id="modalR${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
              <h2 class="text-center" id="titleMR${i}"></h2>
              </div>
              <div class="modal-body">
              <h3 id="dateR${i}"></h3>
              <p id="resumeR${i}"></p>
              <h4 id="noteR${i}"></h4>
              </div>
              <div class="modal-footer">
              <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              <i class="fas fa-times"></i>
            </button></div>
              </div>
              </div>
              </div>`);
    }

    let image = data.results[i].poster_path;
    let title = data.results[i].title;
    let date = data.results[i].release_date.substring(0, 4);
    let resume = data.results[i].overview;
    let vote = data.results[i].vote_average;
    let voteCount = data.results[i].vote_count;

    if (image == "") {
      image = "Aucune image disponible";
    } else if (title == "") {
      title = "Aucun titre disponible";
    } else if (date == "") {
      date = "Aucune date disponible";
    } else if (resume == "") {
      resume = "Aucun résumé disponible";
    } else if (vote == "") {
      vote = "Aucune note disponible";
    } else if (voteCount == "") {
      voteCount = "Aucun vote";
    }

    if (image == undefined) {
      document.getElementById(
        `afficher${i}`
      ).innerHTML = `<img class="affiche" src="img/noimg.jpg"/>`;
    } else {
      document.getElementById(
        `afficheR${i}`
      ).innerHTML = `<img class="affiche" src="http://image.tmdb.org/t/p/w200${image}"/>`;
    }
    
    document.getElementById(
      `titleR${i}`
    ).innerHTML = `<h2 class="name">${title}</h2>`;
    document.getElementById(
      `titleMR${i}`
    ).innerHTML = `<h2 class="name">${title}</h2>`;
    document.getElementById(
      `dateR${i}`
    ).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
    document.getElementById(
      `resumeR${i}`
    ).innerHTML = `<p class="italic">${resume}</p>`;
    document.getElementById(
      `noteR${i}`
    ).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;
  }
}

function displayHeroInfos(data) {
  let image = data.results[0].backdrop_path;
  let title = data.results[0].title;
  let date = data.results[0].release_date.substring(0, 4);
  let resume = data.results[0].overview;
  let vote = data.results[0].vote_average;
  let voteCount = data.results[0].vote_count;

  $("#infos")
    .append(`<button type="button" class="bouton-hero btn btn-secondary text-light ml-3"  data-toggle="modal" data-target="#modal"><img class="mr-3" src="img/infos.png" alt="" height="40px">Plus d'infos</button>
  <div class="modal fade text-dark mt-5" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h2 class="text-center" id="titleM"></h2>
  </div>
  <div class="modal-body">
  <h3 id="date"></h3>
  <p id="resume"></p>
  <h4 id="note"></h4>
  </div>
  <div class="modal-footer">
  <button
  type="button"
  class="btn btn-danger"
  data-dismiss="modal"
>
  <i class="fas fa-times"></i>
</button></div>
  </div>
  </div>
  </div>`);

  document.getElementById(
    "hero"
  ).style.backgroundImage = `url('http://image.tmdb.org/t/p/original${image}')`;
  document.getElementById(`title`).innerHTML = `<h6 class="name">${title}</h6>`;
  document.getElementById(
    `titleM`
  ).innerHTML = `<h2 class="name">${title}</h2>`;
  document.getElementById(
    `date`
  ).innerHTML = `<h3 class="italic">Sorti en ${date}</h3>`;
  document.getElementById(
    `resume`
  ).innerHTML = `<p class="italic">${resume}</p>`;
  document.getElementById(
    `note`
  ).innerHTML = `<h4 class="note">Noté ${vote}/10 pour ${voteCount} votes</h4>`;
}

main();
