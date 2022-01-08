import axios from "axios";

export const helpHttp = () => {

   const get = async (url) => {
      const response = await axios.get(url);

      return response;
   }

   const post = async (url, options) => {
      const response = await axios.post(url, options.body, options.headers);

      return response;
   }
   return {
      get,
      post,
   }
}