import axios from "axios";
import { useEffect, useState } from "react"
import { getChampionDetail } from "../util/getChampionDetail";

const ChampionDetail = () =>{
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    const championName = urlParams.getAll('name');
    const cdn_version = '12.6.1'
    const [champDetail , setChampDetail] = useState({});
    useEffect(()=>{
        getChampionDetail(championName[0])
        .then((res)=>{
            setChampDetail(res);
            console.log(res);
        })
        

    },[])
    return(
        <div>
            {Object.entries(champDetail).map(([key, value], i) => {
                return (
                    <div key={key}>
                        <div className="champDetailArea">
                            <div className="champion_image01">
                                 <img src={`https://opgg-static.akamaized.net/images/lol/champion/${value.id}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_264&v=1651762875310`}/>
                            </div>   
                                 <span className="champ_name01">{value.name}</span><br/>
                                 <span className="passive_image01"><img src={`https://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/passive/${value.passive.image.full}`}/></span>
                                 {value.spells.map((item)=>{
                                     return(
                                          <span className="skillSetImage01">
                                             <img src={`http://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/spell/${item.id}.png`}/>
                                          </span>
                                     )
                                 })}
                        <div className="skillExplain">
                            <h2>스킬설명</h2>
                            <h3> 패시브 </h3>
                            <div>  
                                <img src={`https://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/passive/${value.passive.image.full}`}/>
                                <span className="passive_desc">{value.passive.name} </span>
                            </div>
                            <div className="descPassive">
                                 {value.passive.description}
                            </div>
                            <h3> 스킬 </h3>
                            {value.spells.map((item)=>{
                                return(
                                    <div className="spellImage001">
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/${cdn_version}/img/spell/${item.id}.png`}/>
                                        <span className="spellItems001">{item.name}</span> :
                                        {item.description}
                                       (재사용 대기시간 : {item.cooldownBurn}/ 사거리 : {item.rangeBurn})
                                    </div>
                                )
                            })}

                            <h3> 스킨 </h3>
                            <div className="skinList001">
                            {value.skins.map((item)=>{
                                return(
                                    <div className="itemSkins001">
                                        <img src= {`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName[0]}_${item.num}.jpg`}/>
                                        <span className="itemSkinsName001">{item.name}</span>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                            
                        </div>
                    </div>
                )
		})}
            
        </div>
    )
}

export {ChampionDetail}