// 好きなポケモンのURL
const apiUrl = "https://pokeapi.co/api/v2/pokemon/1";
  
// URLからポケモンのデータを取得
async function fetchData() {
  try{
    // ポケモンデータを取得
    const response = await fetch(apiUrl);
    const data = await response.json()

    // 取得したデータから画面を作成
    $("#pokemon").html("<div id='poke1' class='poke-wrapper'></div>");
    $("#poke1").html(`<p>${data.name}</p>`);
    $("#poke1").append(`<img src=${data.sprites.other.home.front_default} class='poke-img'></img>`);

  }catch(e){
    // データ取得に失敗した場合
    console.log(e)
    $("#pokemon").html("ポケモンデータを取得できませんでした。");
  }
}

fetchData();  
  
