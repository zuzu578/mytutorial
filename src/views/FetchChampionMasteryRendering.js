/**
 * 검색한 소환사의 챔피언 숙련도 정보를 rendering 해주는 component 
 * @param {*} props 
 * @returns 
 */
const FetchChampionMasteryRendering = (props) => {
    return(
        <div>
            <h1>{props.userName}님의 챔피언 숙련도 정보</h1>

                    <table>
                        <tbody>
                            {props.championMastery.map(function (items, index) {
                                return (
                                    <tr key={index}>
                                        <td>{items.championId}</td>
                                        <td>{items.championLevel}</td>
                                        <td>{items.championPoints}</td>
                                        <td>{items.tokensEarned}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
             
        </div>
    )
}

export default FetchChampionMasteryRendering;