`use strict`;
let history = [];
//fetch Anime API
function getAnime(user) {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${user}&limit=15`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      getVideo(resJson.results[0].title + " intro");
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
      `<div class="results"> <a target="_blank" href="${results[i].url}"><img class="ani_scale"src="${results[i].image_url}"></a></div>`
    );
  }
}
function renderVideos(items) {
  for (let i = 0; i < items.length; i++) {
    console.log(items);
    $(`#ani_vids`).append(
      `<iframe class="vid_res"width="560" height="315" src="https://www.youtube.com/embed/${items[i].id.videoId}" 
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>`
    );
  }
}
function renderHistory() {
  const historyDiv = $(`.history`);
  let historyHtml = " ";
  history.forEach(item => {
    historyHtml += `<div class="history_link"><a href ="#" class="history_item">${item}</a></div>`;
  });
  historyDiv.html(historyHtml);
}
function theListener() {
  const saved = localStorage.getItem(`history`);
  if (saved) {
    history = saved.split(",");
    renderHistory();
  }

  $("#ani_form").submit(e => {
    e.preventDefault();
    $("#ani_results").empty();
    $("#ani_vids").empty();
    let user = $("#userInput").val();
    // user += " intro";
    if (history.length >= 3) {
      history.shift();
    }
    getAnime(user);
    history.push(user);
    renderHistory();
    localStorage.setItem("history", history);
    // getVideo(user);
  });
  $(".history").on(`click`, `.history_link`, e => {
    e.preventDefault();
    $("#ani_results").empty();
    $("#ani_vids").empty();
    getAnime($(e.target).text());
  });
}
$(theListener);
