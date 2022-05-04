/**
  * 
  * @param arrays , type(rotation = 로테이션 챔피언 , mastery = 숙련도정보 , banned = 밴한 챔피언갯수)
  * @desc : 챔피언 id 를 챔피언 영문이름으로 변경하는 Utils 
  * @returns 
  */

 import axios from 'axios';
 let version = "12.6.1"
 
 const change = async(idx,type) => {
     if(!type){
         type = 'rotation'
     }
     let banned = [];
     if(type==='banned'){
        //console.log('idx',idx);
        for(let[bannedIdx,bannedItem] of idx.entries()){
            //console.log('banned',bannedItem.championId)
            banned.push(await changeNameByIds(bannedItem.championId));
        }
        return banned;
     }
     let temp = []
     let i = 0;
     for (let [index,item] of idx.entries()){
         if(type ==='mastery'){
             if(i===10)
             break;
         }
      temp.push(await changeNameByIds(item));
      i ++;
         
     }
     return temp;
 }
 
 const changeNameByIds = async(id) => {
     let chmpArr = [];
     const res = await axios.get('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/de_DE/champion.json')
     let championList = res.data.data;
     for (let i in championList) {
     if (championList[i].key == id) {
         chmpArr.push(championList[i].id)
    }
 }   
     return  chmpArr;
 }

 /**
  * test
  */

 const changeNameByIds2 = async() =>{
    const res = await axios.get('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/de_DE/champion.json')
    let championList = res.data.data;
    return championList;
 }
 const getAllChampionData = async()=>{
       
        let list = [];
        let obj = {};
        const championList =  await changeNameByIds2();
      
        for (let i in championList) {
            obj = {
                [championList[i].key]:championList[i].id
            }
            list.push(obj);
        }

        return list; 
 }
 getAllChampionData();


 const filteringBannedChampion = (bannedId,allChampionData) => {
   const result =  allChampionData.map((item)=>{
        //console.log('itemssss',item[bannedId]);
        return item[bannedId];
    })

    return result;

 }
  
 
 export{change,changeNameByIds,changeNameByIds2,getAllChampionData,filteringBannedChampion}