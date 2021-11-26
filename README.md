# 리액트에서 useEffect 사용하기 
- 리액트에서 useEffect를 사용하여 api 를 fetch 하는작업을 해봅니다.
 <img width="1067" alt="스크린샷 2021-11-26 오후 3 22 45" src="https://user-images.githubusercontent.com/69393030/143536189-899e2b7f-e993-46bb-bb78-719f56aab816.png">

- useEffect 는 컴포넌트가 마운트될때 실행됩니다. 
- [] 추가시 첫 렌더링일때만 실행됩니다.
# useEffect 에서 async 사용방법 

 useEffect(()=>{
    
    async function fetchData(){
      
      const fetch = await axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-f49d623b-e8cb-49d4-98bc-a4fe51bfce95');
      setTemp(fetch.data.freeChampionIdsForNewPlayers);
      //console.log(fetch.data.freeChampionIdsForNewPlayers);  
    }

    fetchData();
    

  },[]);
  
 이렇게 useEffect 안에 async function 을 선언 , 그후 호출하여 api 를 fetch 합니다. 
