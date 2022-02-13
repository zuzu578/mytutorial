# useState

Cannot read properties of undefined (reading 'map')

state 사용시 , state 값이 초기화 되어있지않은경우 
ex) 서버에서 배열을 받았는데 setState([]) 로 초기화 하지않은경우 등등 

constructor 와 componentWillMount 가 최초 렌더링 그 이전에 실행 된다 할지라도 비동기 호출은 컴포넌트가 비동기 이전에 렌더링 되는것을 막아주지 못하기 때문 
<img width="816" alt="스크린샷 2022-02-13 오후 8 53 22" src="https://user-images.githubusercontent.com/69393030/153751809-1b69a785-efd3-48e7-a9f6-239aa37c4253.png">

이러한 경우 state의 초기값을 설정해주면된다.

<img width="816" alt="스크린샷 2022-02-13 오후 8 53 55" src="https://user-images.githubusercontent.com/69393030/153751827-46fb6c98-0728-4bc7-9a04-ef764f9c69d7.png">

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
 useEffect 가 하는 일은 무엇인가 
 useEffect hook 을 사용하여 React 에게 컴포넌트가 렌더링 이후에 어떤일을 수행해야하는 지를 말한다. 즉 ,react 는 우리가 넘긴 함수를 기억했다가 DOM 업데이트를 수행한 이후에 불러낼것이다. 
 이러한 것을 통해 데이터를 가져오거나 다른 명령형 api 를 불러내는 일도 할수있다.
 
 # useEffect 를 컴포넌트 안에서 불러내는 이유?
 useEffect 를 컴포넌트 내부에 둠으로써 effect 를 통해 state 에 접근할수 있게된다. 함수범위 안에 존재하기 때문에 특별한 api 없이도 값을 얻을수있다. hook 은 자바스크립트의 클로저 문법을 이용하여 react에 한정된 api 를 고안하는것보다 자바스크립트가 이미가지고 있는방법을 이용하여 문제를 해결할수있다.

# for loop axios (반복문 안에서 axios promise 통신 하기)
<img width="802" alt="스크린샷 2021-12-04 오후 5 42 31" src="https://user-images.githubusercontent.com/69393030/144703406-25e591f7-0c5a-412b-8723-bde36ddc9f40.png">

# 프로미스 , Callback , 프로미스 체인 
``` javascript

/**
 * callback 방법
 * */

 const getData = (callback) =>{ 
    
    return callback(20);
 }

 getData(function(result){
   console.log(result);
 })


/**
 *  promise ( await / async )
 *  */

 const fetchMyData = () =>{
   return new Promise((resolve , reject)=>{
     resolve(axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d5b5b4c0-a883-4594-b46b-aa33242fe5e8'))
   })
 }

 const redneringData = async() =>{
   try{
     const data = await fetchMyData();
     console.log(data.data);
     
   }catch(error){
     console.log(error)
   }
   


 }
 fetchMyData();
 redneringData();



/**
 * promise chain 
 * */

 const fetchData = (promise) =>{
   return new Promise((resovle,result)=>{
     resovle(axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d5b5b4c0-a883-4594-b46b-aa33242fe5e8'))
   })
 }
fetchData().then((res)=>{
  console.log(res.data.freeChampionIds);
  if(res.data.freeChampionIds[0] === 1 ){
    console.log('0번째 값은 1입니다.');
  }else{
    console.log('아닙니다.');
  }
})

``` 

# promise (async , await 사용 예제)
``` javascript
const fetchUserInfo = () =>{
    return new Promise((resolve , reject) =>{
      resolve(axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%98%A4%EC%88%9C%EB%8F%84%EC%88%9C%EB%8F%84%EB%9E%80%EB%8F%84%EB%9E%80?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7'));
    })
  }

  const fetchMatchIds = (puuid) =>{
    return new Promise((resolve , reject) =>{
      resolve(axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid+'/ids?start=0&count=5&api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7'))
    })

  }

  const fetchMatchInfo = (matchIds) =>{
    return new Promise((resolve , reject) =>{
      resolve(axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/'+matchIds+'?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7'))
    })
  }

const renderingData = async()=>{
  let obj = [];
  let data1 = await fetchUserInfo();
  const puuid = data1.data.puuid;
  let data2 = await fetchMatchIds(puuid);

  for(let i = 0 ; i < data2.data.length; i++){
    let data3 = await fetchMatchInfo(data2.data[i]);
    obj.push(data3.data.info.platformId);
  }
  console.log('obj =>', obj);
}

renderingData();
``` 
# promise chainning 을 이용하여 데이터 가져와보기 + (for loop 안에서 axios 통신 , promise return 해보기)
``` javascript

const fetchUserInfo = (promise) =>{
    return new Promise((resolve , reject)=>{
      resolve(axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%98%A4%EC%88%9C%EB%8F%84%EC%88%9C%EB%8F%84%EB%9E%80%EB%8F%84%EB%9E%80?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7'))
    })
}

fetchUserInfo()
.then((res)=>{
  let puuid = res.data.puuid;
  return puuid;
})
.then((res)=>{
  let puuid = res;
  return new Promise((resolve , reject) =>{
    resolve(axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid+'/ids?start=0&count=5&api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7'))
  })
})
.then((res)=>{
  let promises = [];
  let matchList = [];
  //console.log(res.data);
   for (let i = 0; i < res.data.length; i++) {
     //console.log(res.data[i]);
                promises.push(
                   axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/'+res.data[i]+'?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7')
                        .then(response => {
                            matchList.push(response.data.metadata.matchId);
                            //console.log(response.data.metadata.matchId);
                        })
                )
            }
            Promise.all(promises).then(() => {
                console.log('matchList ==>',matchList);
                
            })
})

```
# callback function 을 이용하여 연쇄적으로 프로그래밍 해보기
``` javascript
const fetchUserInfo = async(callback) => {
  const fetchData = await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%EC%98%A4%EC%88%9C%EB%8F%84%EC%88%9C%EB%8F%84%EB%9E%80%EB%8F%84%EB%9E%80?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7')
 
  return callback(fetchData.data.puuid);
}
const fetchMatchIds = async(puuid,callback) =>{
  const fetchData = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid+'/ids?start=0&count=5&api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7')
  return callback(fetchData.data);
}
const fetchMatchInfo = async(matchIds,callback) =>{
  let objArr = [];
  for(let i = 0 ; i < matchIds.length ; i++){
    const fetchData = await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/'+matchIds[i]+'?api_key=RGAPI-519943fc-ea1a-43f2-a34f-54e29133fea7')
    //console.log(fetchData.data.metadata.matchId);
    objArr.push(fetchData.data.metadata.matchId);
      //return callback(fetchData.data.metadata.matchId);
  }
  return callback(objArr);
}

fetchUserInfo(function(result){
  fetchMatchIds(result,function(result2){
   fetchMatchInfo(result2,function(result3){
     console.log('final, =>', result3);
   })
  })

})


```

