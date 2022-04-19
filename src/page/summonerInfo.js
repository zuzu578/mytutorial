import { useEffect, useState } from 'react';
import { getSummonerInfo } from '../apis/getSummonerInfo';
import { getSummonerRank } from '../apis/getSummonerRank';
import { getMatchListByPuuid } from '../apis/getMatchListByPuuid';
import { getMatchDetailByMatchId } from '../apis/getMatchDetailByMatchId';
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const summonerName = urlParams.getAll('name');

const SummonerInfo = () => {
    const [summonerInfo , setSummonerInfo] = useState({});
    const [summonerRankInfo , setSummonerRankInfo] = useState([]);
    const [getMatchDetail, setMatchDetail] = useState([]);
   
    /**
     * 
     getMatchListByPuuid(res.puuid)
     */
    useEffect(()=>{
        getSummonerInfo(summonerName[0])
        .then((res)=>{
            setSummonerInfo(res.data);
            
            return res.data;
        })
        .then((res)=>{
            getMatchListByPuuid(res.puuid)
            .then((res)=>{
                //matchList get by puuid
                const getMatchDetail = async()=> {
                    for (const param of res.data) {
                        const res = await getMatchDetailByMatchId(param);
                        console.log(res.data.info);
                        setMatchDetail(res.data);
                      }
                }
                getMatchDetail();
                
                
            })
            return getSummonerRank(res.id);

        })
        .then((res)=>{
            setSummonerRankInfo(res.data);
        })
        
        // getMatchListByPuuid(getPuuid)
        // .then((res)=>{
        //     console.log('test!!==>',res.data);
        // })
    },[])
        return (
            <div>
              <div className="main_background">
                <div className="left">
                {getSummonerInfo.length !==0 ?
               <>
                <p> 갱신일자 : {summonerInfo.revisionDate}</p>
                  <div className="summoner_001">
                    
                    <div className="summonerImage">
                        <img src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerInfo.profileIconId}.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280`}/>
                    </div>
                    
                    <div className="summonerName">
                        <p> {summonerInfo.name}</p>
                    </div>
                   </div>
                    <div className="summonerLevel">
                        <p>{summonerInfo.summonerLevel}.LV</p>
                    </div>
                    
                        {summonerRankInfo.length !==0 ?summonerRankInfo.map((item)=>{
                            return(
                            <div key={item.id}>
                              <div className="summonerRank">
                                  <div className="rank_image">
                                    <img src={`https://opgg-static.akamaized.net/images/medals/${item.tier}_1.png?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280`}/>
                                  </div>
                                  <div className="queueType">
                                    <p class="rank_para">{item.queueType === 'RANKED_SOLO_5x5'? '솔로랭크' : '자유랭크'}</p>
                                    <p class="tier_para">{item.tier}</p>
                                    <p class="Lp">{item.leaguePoints}LP / {item.wins}승 {item.losses}패</p>
                                  </div>
                                </div>
                            </div>
                            )
                        }):
                        <div className="summonerRank">
                            <div className="rank_image">
                                <img src='https://opgg-static.akamaized.net/images/medals/default.png?image=q_auto&image=q_auto,f_webp,w_auto&v=1650333355280'/>
                            </div>
                            <div className="queueType">
                                <p class="rank_para">Unranked</p>
                            </div>
                        </div>
                        }
                    
                  
                    </>: <></>}

                </div>

                <div className="right">
                        {/* {getMatchDetail.map((item)=>{
                            return(
                                <div>
                                   
                                </div>
                            )
                        })} */}
            
                </div>
              
               </div>
            </div>
        )

   
    
}

export{SummonerInfo};