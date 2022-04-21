import { getMatchListByPuuid } from "../apis/getMatchListByPuuid";
let count = 20;
const getMoreMatchButtons =(puuid) => {
   count += 10;
  return getMatchListByPuuid(puuid,count);
   
}

const MoreMatchLoadButton = (puuid) =>{
    return (
      <div className="moreLoad">
        <button onClick={(e)=>{getMoreMatchButtons(puuid.puuid, e)}}> 매치 더 가져오기 </button>
      </div>
    )
}

export{MoreMatchLoadButton,getMoreMatchButtons}