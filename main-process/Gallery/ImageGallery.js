const {ipcMain} = require('electron');
const axios = require('axios').default;


const PICSUM_URL_ENTRY = `https://picsum.photos/v2/list/`;


ipcMain.handle("fetch-images", async (event, args) => {

    const apiUrl = `${PICSUM_URL_ENTRY}?limit=${args.limit}`;
  
    const response = await axios.get(apiUrl);

    return response.data;
  })
  