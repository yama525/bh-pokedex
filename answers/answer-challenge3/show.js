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

    // 取得したデータから画面を作成
    $("#name").append(`<span>${data.name}</span>`);
    $("#japaneseName").append(`<span>和名：</span><span>${japaneseName}</span>`);
    $("#image").append(`<img src=${data.sprites.other.showdown.front_default} class='poke-img'></img>`);
    $("#weight").append(`<span>体重：</span><span>${data.weight/10}</span><span>kg</span>`)
    
  }catch(e){
    // データ取得に失敗した場合
    console.log(e)
    $("#pokemonList").html("ポケモンデータを取得できませんでした。");
  }
}

fetchData();