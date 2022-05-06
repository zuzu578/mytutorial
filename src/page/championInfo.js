import { useEffect, useState } from "react";
import { getChampionData } from "../util/changeNameByIds";

const ChampionInfo = () => {
    
    const [championInfo , setChampionInfo] = useState({});
    useEffect(()=>{
        getChampionData()
        .then((res)=>{
            setChampionInfo(res);
            
        })
    },[]);

    return(
        <div>
            <p className="titleChampList"> 챔피언 정보 </p>
            <div className="championList_title">
                
                {Object.entries(championInfo).map(([key, value], i) => {
                return (
                    <div key={key}>
                        <div className="champ_image_list">
                           <a href={value.id}><img src={`https://opgg-static.akamaized.net/images/lol/champion/${value.id}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_264&v=1651762875310`}/></a>
                        </div>
                        <a href={value.id}>{value.name}</a>
                    </div>
                )
		})}
            </div>
        </div>
    )
}

export {ChampionInfo}