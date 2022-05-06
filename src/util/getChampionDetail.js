import axios from "axios"

const getChampionDetail = async(championName) =>{
    const result = await axios.get(`http://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion/${championName}.json`)
    return result.data.data;
}


export { getChampionDetail }