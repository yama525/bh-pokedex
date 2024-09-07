// URLを取得
const url = new URL(window.location.href);
// URLSearchParamsオブジェクトを取得
const params = url.searchParams;
// getメソッド
const pokemonNum = params.get('id');
// PokeAPI の URL
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNum}`;

// URLからポケモンのデータを取得
async function fetchData() {
  try{
    // ポケモンデータを取得
    const response = await fetch(apiUrl);
    const data = await response.json();

    // 【おまけ】日本語名取得
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    const japaneseName = speciesData.names[0].name;

    // 背景色を取得
    const backgroundColor = getBackgroundByType(data.types[0].type.name);

    // 取得したデータから画面を作成
    $(".show-header").css("background",backgroundColor);
    $("#name").append(`<span>${japaneseName}</span>`);
    $("#englishName").append(`<span>英名：</span><span>${data.name}</span>`);
    $("#image").append(`<img src=${data.sprites.other.showdown.front_default} class='poke-img'></img>`);
    $("#weight").append(`<span>体重：</span><span>${data.weight/10}</span><span>kg</span>`)
    
  }catch(e){
    // データ取得に失敗した場合
    console.log(e)
    $("#pokemonList").html("ポケモンデータを取得できませんでした。");
  }
}

// タイプから背景色を取得する関数
function getBackgroundByType(type){
  let color = "";
  if(type == "grass"){
    color = "#02d002"
  } else if(type == "fire"){
    color = "#ff1e00"
  } else if(type == "water"){
    color = "#00a6ff"
  } else if(type == "bug"){
    color = "#499700"
  } else if(type == "normal"){
    color = "#c3c3c3"
  } else if(type == "electric"){
    color = "#f8fb17"
  } else {
    color = "#c3c3c3"
  }
  return color;
}

fetchData();