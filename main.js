`use strict`;
//fetch API
function getAnime(user) {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${user}&limit=1`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      renderAnime(resJson.results);
    });
}
//Render Thumbnails
function renderAnime(results) {
  //for loop items through array
  for (let i = 0; i < results.length; i++) {
    console.log(results);
    $(`#ani_results`).append(
      `<div> <a target="_blank" href="${results[i].url}"><img src="${results[i].image_url}"></a>${results[i].title}</div>`
    );
  }
}
function theListener() {
  $("#ani_form").submit(e => {
    e.preventDefault();
    let user = $("#userInput").val();
    getAnime(user);
    $("#ani_results").empty();
  });
}
$(theListener);
