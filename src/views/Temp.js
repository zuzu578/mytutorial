import { useState } from "react";
import axios from 'axios'


const FetchData = async() =>{
    try {
        const res = await axios.get('https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-f49d623b-e8cb-49d4-98bc-a4fe51bfce95');
        const posts = res.data;

       // return posts;
      } catch (err) {
        console.log(err);
      }
    }
    


  export default FetchData