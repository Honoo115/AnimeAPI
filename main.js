`use strict`;
//fetch Anime API
function getAnime(user) {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${user}&limit=1`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      renderAnime(resJson.results);
    });
}
//fetch Youtube API
function getVideo(user) {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAWh79kLdrRMXs2xpiSrnl6cCeVOi60OXA&q=${user}&part=snippet&maxResults=1&type=video`
  )
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      renderVideos(resJson.items);
    });
}
//Render Thumbnails
function renderAnime(results) {
  //for loop items through array
  for (let i = 0; i < results.length; i++) {
    console.log(results);
    $(`#ani_results`).append(
      `<div> <a target="_blank" href="${results[i].url}"><img src="${results[i].image_url}"></a></div>`
    );
  }
}
function renderVideos(items) {
  for (let i = 0; i < items.length; i++) {
    console.log(items);
    $(`#ani_vids`).append(
      `<div> <iframe width="560" height="315" src="https://www.youtube.com/embed/${items[i].id.videoId}" 
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe></div>`
    );
  }
}
function theListener() {
  $("#ani_form").submit(e => {
    e.preventDefault();
    let user = $("#userInput").val();
    user += " intro";
    getAnime(user);
    getVideo(user);
    $("#ani_results").empty();
    $("#ani_vids").empty();
  });
}
$(theListener);
