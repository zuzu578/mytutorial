import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios'
//import FetchData from './views/Temp';


function App() {

  let [temp , setTemp] = useState({freeChampionIdsForNewPlayers:[]});
  let temp2 = [];

  // useEffect 한번만 실행 => [] 추가시 첫 렌더링일때만 실행 
  /* */
  useEffect(()=>{
    
    async function fetchData(){
      
      try{

        const fetch = await axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-f49d623b-e8cb-49d4-98bc-a4fe51bfce95');
        setTemp(fetch.data);
      
      }catch(error){
        console.log('error!',error);
      }
     
      
    }

    fetchData();
    

  },[]);

  console.log(temp);
  return (

    <div className="App">
      {temp.freeChampionIdsForNewPlayers.map((championId, index) => (
        <div key={index}>
          {championId}
        </div>
      ))}
    </div>
    
  );
}

export default App;