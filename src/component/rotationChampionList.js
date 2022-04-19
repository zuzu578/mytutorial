const RotationChampionList = (params) => {
    return(
        <div>
            <p className="para1"> 이번주의 로테이션 챔피언 </p>
                {params.getRotationChamps.map((item)=>{
                return (
                <div className="rotation_champion_image">
                    <div key={item.id}>
                    
                        <div className="flex-box">
                            <img src={'https://opgg-static.akamaized.net/images/lol/champion/'+item.champions+'.png?image=q_auto:best&v=1635906101'}/> 
                        </div>
                        </div>

                </div>
                )
                })}
        </div>
    )
}
export {RotationChampionList};