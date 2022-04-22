import { useEffect, useState } from 'react';
import './App.css';
import {change}  from './util/changeNameByIds';
import { Main } from './component/main';
import { getFreeChampions } from './apis/getRotationChampions';
import { RotationChampionList } from './component/rotationChampionList';
import { championArrs } from './util/changeNameByIds';
import { SummonerInfo } from './page/summonerInfo';
import { Route } from 'react-router-dom';

const App = () => {
  const [getRotationChamps,setRotationChamps] = useState([]);
  
  useEffect(()=>{
    getFreeChampions()
    .then(async(res)=>{
      const rotationChampionList = await change(res.data.freeChampionIds);
      setRotationChamps(rotationChampionList);
    })
    .catch((error)=>{
      console.log(error.message);
    })
  
  },[])


  return (
    <div className="App">
       <Route exact path="/find"> 
        <SummonerInfo/>
      </Route>
      <Route exact path="/"> 
        <Main/>
        <RotationChampionList getRotationChamps= {getRotationChamps}/>
      </Route>
      
      
    </div>

  );
}





export default App;
