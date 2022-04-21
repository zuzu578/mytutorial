import { useState } from "react"
import { getSpectatorData } from "../apis/getSpectatorData";


const Spectator = (props) =>{
    const [spectator , setSpectator] = useState({});
    const [clicked , setclicked] = useState(false);
    const [isGamein , setIsGameIn] = useState(true);

console.log('propsid=>',props.props);
const getData = () => {
    
    getSpectatorData(props.props)
    .then((res)=>{
        console.log('res!!!',res.data);
        setSpectator(res.data);
    }).catch((error)=>{
        setIsGameIn(false);
    })
    setclicked(true);
}
console.log('spectator',spectator);
const RenderingSpectatorData = () => {
    return (
        
        <div>
            
                 {isGamein === false ? 
                 <div className="notPlaying"> 
                     <p> 해당 소환사는 게임중이아닙니다.</p>
                 </div> : ''}
            
           
             
            {/* {spectator.bannedChampions.map((item)=>{
                return(
                    <div>
                        {item.championId}
                    </div>
                )
            })} */}
        </div>
    )
}
    
    return (
    
        <div className="ingameBtn">
            <button type="button" onClick={getData} class="btn btn-primary">인게임정보</button>
            <RenderingSpectatorData/>
        </div>
        
    )
}


export {Spectator}