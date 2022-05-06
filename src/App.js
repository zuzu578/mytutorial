import { useEffect, useState } from 'react';
import './App.css';
import {change}  from './util/changeNameByIds';
import { Main } from './component/main';
import { getFreeChampions } from './apis/getRotationChampions';
import { RotationChampionList } from './component/rotationChampionList';
import { championArrs } from './util/changeNameByIds';
import { SummonerInfo } from './page/summonerInfo';
import { Route } from 'react-router-dom';
import { getAllChampionData } from './util/changeNameByIds';
import { ChampionInfo } from './page/championInfo';
import { ChampionDetail } from './page/championDetail';

const App = () => {

  const [getRotationChamps,setRotationChamps] = useState([]);
  const [championData , setChapionData] = useState([]);

  useEffect(()=>{
    getFreeChampions()
    .then(async(res)=>{
      const rotationChampionList = await change(res.data.freeChampionIds);
      setRotationChamps(rotationChampionList);
    })

     // 모든 챔피언 list 를 key value 로 가져온다.
     getAllChampionData()
     .then((res)=>{
         setChapionData(res);
     })
    .catch((error)=>{
      console.log(error.message);
    })
  
  },[])


  return (
    <div className="App">
       <Route exact path="/find"> 
        <SummonerInfo />
      </Route>
      <Route exact path="/"> 
        <Main/>
        <RotationChampionList getRotationChamps= {getRotationChamps}/>
      </Route>
      <Route exact path="/champion"> 
      <ChampionInfo/>
      </Route>
      <Route exact path="/championDetail">
      <ChampionDetail/>
      </Route>
      
    </div>

  );
}





export default App;
