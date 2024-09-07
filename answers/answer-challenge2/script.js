  // 好きなポケモンのURL
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    
  // URLからポケモンのデータを取得
  async function fetchData() {
    try{
      // ポケモンリストデータを取得
      const listResponse = await fetch(apiUrl);
      const listData = await listResponse.json();
      const pokeResults = listData.results;

      // 取得したリストから画面を作成
      for(let i = 0; i < pokeResults.length; i++){
        const response = await fetch(pokeResults[i].url);
        const data = await response.json();
        $("#pokemonList").append(`<li id='poke${i}' class='poke-wrapper'></li>`);
        $(`#poke${i}`).append(`<p>${data.name}</p>`);
        $(`#poke${i}`).append(`<img src=${data.sprites.other.home.front_default} class='poke-img'></img>`);
      }
      
    }catch(e){
      // データ取得に失敗した場合
      console.log(e)
      $("#pokemonList").html("ポケモンデータを取得できませんでした。");
    }
  }

  fetchData();  
  
