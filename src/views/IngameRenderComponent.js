/**
 * 인게임 정보를 렌더링 해주는 component 
 * @param {*} props 
 * @returns 
 */
const IngameRenderComponent = (props) =>{
   console.log('props data =>' , props.ingameData.bannedChampions);
    if(props.ingameData){
        return(
            <div>
                <h1>인게임정보</h1>
                    <p> 게임중 ! </p>
                    {
                        // 밴한 챔피언 id 값 !
                    props.ingameData.bannedChampions.map(function (items, index) {
                                return (
                                    <div key={index}>
                                        {items.championId}
                                    </div>
                                );
                            })
                            }
            </div>
        )
    }else{
        return(
            <div> 
                <h1> {props.searchNameData} 님은 현재 게임중이 아닙니다.</h1>
            </div>
        )
    }
    
}
export default IngameRenderComponent;