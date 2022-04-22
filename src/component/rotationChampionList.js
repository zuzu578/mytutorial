const RotationChampionList = (params) => {
    console.log(params.getRotationChamps)
    return(
        <div>
            <p className="para1"> 이번주의 로테이션 챔피언 </p>
                <div className="rotation_champion_image">
                    {}
                    {params.getRotationChamps.map((item)=>{
                    return (
                        <div>
                            {item.map((item)=>{
                                return(
                                    <div>
                                        <div key={item.id}>
                                        <div className="flex-box">
                                        <img src={'https://opgg-static.akamaized.net/images/lol/champion/'+item+'.png?image=q_auto:best&v=1635906101'}/> 
                                        </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    // <div>
                    //     <div key={item.id}>
                        
                    //         <div className="flex-box">
                    //             <img src={'https://opgg-static.akamaized.net/images/lol/champion/'+item.champions+'.png?image=q_auto:best&v=1635906101'}/> 
                    //         </div>
                    //         </div>

                    // </div>
                    )
                    })} 
                </div>
        </div>
    )
}
export {RotationChampionList};