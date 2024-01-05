import axios from "axios";
import * as cheerio from "cheerio";



export default class FetchResult {

  Afunc = async () => {
    try {
      const url = "https://satta-king-online.in/";
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const dataArray = [];

      $('table tr').each((index, element) => {
        if (index === 0) {
          // Skip the first row, which contains headers
          return;
        }

        const row = $(element).find('td');

        const dataObject = {
          date: row.eq(0).text().trim(),
          disawer: row.eq(1).text().trim(),
          indiaBazar: row.eq(2).text().trim(),
          faridabad: row.eq(3).text().trim(),
          gaziabad: row.eq(4).text().trim(),
          gali: row.eq(5).text().trim(),
        };

        dataArray.push(dataObject);
      });
      console.log(new Date().toLocaleDateString());
      const day = new Date().getDate()
      const sen = new Array();
      sen.push(dataArray[day - 2])
      sen.push(dataArray[day - 1])
      return (sen);
    } catch (error) {
      console.error(error);
      return ('An error occurred while fetching data from the first website.');
    }
  }

  // meth 2

  Bfunc = async () => {
    try {
      const url1 = "https://a7-satta.com/";
      const response = await axios.get(url1);
      const html = response.data;
      const $ = cheerio.load(html);
      const result = [];

      $('tbody tr').each((index, element) => {
        const $row = $(element);
        const name = $row.find('.gamenameeach').text().trim();
        const time = $row.find('.foryellow').text().trim();
        const yesterday = $row.find('.yesterday-number .special-bold').text().trim();
        const today = $row.find('.today-number').text().trim();
        result.push({
          name,
          time,
          yesterday,
          today,
        });
      });

      // console.log(result[2]);
      // console.log(result[3]);

      const sen = [result[2], result[3]];
      return (sen);
    } catch (error) {
      console.error(error);
      return ('An error occurred while fetching data from the second website.');
    }
  }



  Cfunc = async () => {
    console.log("Cfunc");
    const cfunresult = await axios.get("https://satta-king-online.in")
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const result = [];

        $('.row .onlinecolumn').each((index, element) => {
          const name = $(element).find('.onlinename2').text().trim();
          const time = $(element).find('.time').text().trim();
          const lastNumber = $(element).find('.onlinenumber').first().text().trim();
          const todayNumber = $(element).find('.onlinenumber').last().text().trim();

          switch (name) {
            case 'DISAWER':
              result.push({
                name,
                time,
                lastNumber,
                todayNumber,
              });
              break;
            case 'GALI':
              result.push({
                name,
                time,
                lastNumber,
                todayNumber,
              });
              break;
            case 'GAZIYABAD':
              result.push({
                name,
                time,
                lastNumber,
                todayNumber,
              });
              break;
            case 'FARIDABAD':
              result.push({
                name,
                time,
                lastNumber,
                todayNumber,
              });
              break;
            default:
              break;

          }
          // console.log(name,time,lastNumber,todayNumber);

        });
        // console.log(result);
        return (result);
      })
      .catch(error => {
        return ('Error fetching the HTML:', error);
      });
    return cfunresult;
  }

  sttakingfast = async (url) => {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const todayNumbers = {};

      // Specify the game names and their corresponding position in the list
      const gameNames = ['DESAWAR', 'FARIDABAD', 'SHRI GANESH', 'GHAZIABAD', 'GALI']; // Adjust with actual game names
      const gamePositions = {};

      // Find game positions dynamically based on their names
      gameNames.forEach(gameName => {
        const gameRow = $(`.game-result:contains('${gameName}')`);
        const gameId = gameRow.attr('id');
        gamePositions[gameName] = gameId;
      });

      // Fetch today numbers based on the dynamically found game positions
      for (const gameName in gamePositions) {
        if (gamePositions.hasOwnProperty(gameName)) {
          const gameId = gamePositions[gameName];
          const todayNumber = $(`#${gameId} .today-number h3`).text();
          todayNumbers[gameName] = todayNumber;
        }
      }

      return todayNumbers;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  }

}
const fetch = new FetchResult
// Example usage:
let url = 'https://satta-king-fast.com';

fetch.sttakingfast(url)
  .then(todayNumbers => {
    console.log('Today Numbers:', todayNumbers);
  })
  .catch(error => {
    console.error(error.message);
  });

// const result = new FetchResult();
