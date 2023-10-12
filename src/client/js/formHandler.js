async function handleSubmit(event) {
    event.preventDefault()

// check what text was put into the form field
const input = document.getElementById('input').value
Client.checkForName(input);
console.log("::: Form Submitted :::")

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
const lang = 'en';

const apiKey = 'ddf5d7129fe1371886821fd5f0bcd335';
// let KEYS = await getApiKey();
// const apiKey = KEYS.apiKey;
// console.log(apiKey)
    
    const url =
    `${baseURL}&key=${apiKey}&url=${input}&lang=${lang}`
    const response = await fetch(url)
      try {
        const newData = await response.json()
        document.getElementById('agreement').innerHTML = newData.agreement;
        document.getElementById('confidence').innerHTML = newData.confidence + "%";
        document.getElementById('irony').innerHTML = newData.irony;
        document.getElementById('subjectivity').innerHTML = newData.subjectivity;
        document.getElementById('score_tag').innerHTML = newData.score_tag;
      }
      catch (error) {
        console.log("error", error);
      }
}

// // GET API KEY
//     async function getApiKey (){
//         const request = await fetch('/api');
//         try{
//             const KEY = await request.json();
//             return KEY;
//         }
//         catch (error){
//             console.log('error', error);
//         }
//     }
 
export { handleSubmit }
