/**
 * 인게임 정보를 렌더링 해주는 component 
 * @param {*} props 
 * @returns 
 */
const IngameRenderComponent = (props) =>{
   // console.log('props data =>' , props.searchNameData);
    if(props.ingameData){
        return(
            <div>
                <h1>인게임정보</h1>
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