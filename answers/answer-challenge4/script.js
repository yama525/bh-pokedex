  
// URLを取得
const url = new URL(window.location.href);
// URLSearchParamsオブジェクトを取得
const params = url.searchParams;
// getメソッド
let pageNum = params.get('page');
// 好きなポケモンのURL
let apiUrl = "";
let tmpId = 0;
if(pageNum == null || pageNum == 1){
  pageNum = 1;
  apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
} else {
  tmpId = (pageNum - 1) * 20
  apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${(pageNum - 1) * 20}&limit=20`;
}
  
// URLからポケモンのデータを取得
async function fetchData() {
  try{
    // ポケモンリストデータを取得
    const listResponse = await fetch(apiUrl);
    const listData = await listResponse.json();
    const pokeResults = listData.results;

    // ページネーション
    console.log(listData.next)
    const nextUrl = listData.next;

    if(pageNum != 1){
      $("#pagination").append(`<a href='index.html?page=${pageNum - 1}'><span class="paginationCursor"><</span></a>`);
    }
    $("#pagination").append(`<span>${pageNum}</span>`);
    $("#pagination").append(`<a href='index.html?page=${Number(pageNum) + 1}'><span class="paginationCursor">></span></a>`);

    // 取得したリストから画面を作成
    for(let i = 0; i < pokeResults.length; i++){
      const response = await fetch(pokeResults[i].url);
      const data = await response.json();
      const japaneseName = await getJapaneseName(data);
      $("#pokemonList").append(`<li id='pokeCard${i}' class='poke-wrapper'></li>`);
      // TODO id の修正
      $(`#pokeCard${i}`).append(`<a href='show.html?id=${tmpId + i + 1}' id='poke${i}'></a>`)
      $(`#poke${i}`).append(`<p class='pokemonName'>${japaneseName}</p>`);
      $(`#poke${i}`).append(`<img src=${data.sprites.other.home.front_default} class='poke-img'></img>`);
    }
    
  }catch(e){
    // データ取得に失敗した場合
    console.log(e)
    $("#pokemonList").html("ポケモンデータを取得できませんでした。");
  }
}

// ポケモンの日本語名を取得する関数
async function getJapaneseName(data){
  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();
  const japaneseName = speciesData.names[0].name;
  return japaneseName;
}

fetchData();
  
