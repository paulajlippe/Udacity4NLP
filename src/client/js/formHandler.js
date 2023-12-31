async function handleSubmit(event) {
    event.preventDefault()

// check what text was put into the form field
const input = document.getElementById('input').value
Client.checkForName(input);
console.log("::: Form Submitted :::")

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
const lang = 'en';

const KEY = await getApiKey();
const apiKey = KEY.apiKey;
    
    const url =
    `${baseURL}&key=${apiKey}&url=${input}&lang=${lang}`
    const response = await fetch(url)
      try {
        const newData = await response.json()
        document.getElementById('agreement').innerHTML = newData.agreement.toProperCase();
        document.getElementById('confidence').innerHTML = newData.confidence + "%";
        document.getElementById('irony').innerHTML = newData.irony.toProperCase();
        document.getElementById('subjectivity').innerHTML = newData.subjectivity.toProperCase();
        document.getElementById('score_tag').innerHTML = newData.score_tag;
      }
      catch (error) {
        console.log("error", error);
      }
}

// GET API KEY
    async function getApiKey (){
        const req = await fetch('http://localhost:3000/api');
        try {
            const KEY = await req.json();
            return KEY;
        }
        catch (error) {
            console.log('error', error);
        }
    }
 
export { handleSubmit }
