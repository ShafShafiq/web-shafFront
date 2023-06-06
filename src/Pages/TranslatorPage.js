import React, { useEffect } from 'react'
import axios from 'axios'
function TranslatorPage() {
    const [options , setOptions] = React.useState([])
const [to , setTo] = React.useState('en')
const [from , setFrom] = React.useState('en')
const [text , setText] = React.useState('')
const [translatedText , setTranslatedText] = React.useState('')
// curl -X 'GET' \
//   'https://libretranslate.com/languages' \
//   -H 'accept: application/json'

useEffect(() => {
  axios.get("https://libretranslate.com/languages",{
    headers: {
        'accept': "application/json",
    },

}).then(res => {
    console.log(res.data);
    setOptions(res.data);
    

}).catch(err => {})

}, []);

const translate = async () => {

    //  const params = new URLSearchParams();
    //     params.append('q', text);
    //     params.append('source', from);
    //     params.append('target', to);
    //     params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    // axios.post("https://libretranslate.de/translate",params,{
    //     headers: {
    //         'accept': "application/json",
    //         'Content-Type':'application/x-ww-form-urlencoded'
    //     },
    
    // }).then(res => {
    //     console.log(res.data);
    //     setTranslatedText(res.data.translatedText);
        
    
    // }).catch(err => {})
   let url =`https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`
    fetch(url).then(res => res.json()).then(res => {
        console.log(res)
        setTranslatedText(res.responseData.translatedText)
    }
    ).catch(err => {
        console.log(err)
    }
    )

}

  return (
    <div >
        
        <h3 id='translatorheading'>Translator</h3>
        
           
        <div className='translator'>
        <div >
        <label>From: </label>
            <select onChange={(e) =>{ setFrom(e.target.value)}}>
               {options.map((option) => {
                     return <option key= {option.code} value={option.code}>{option.name}</option>
               })}
            </select>
            </div>
        <div>
            <textarea rows="4" cols="50" onInput={(e)=>{setText(e.target.value)}}>
            </textarea>

        </div>
        <div>
        <label>To: </label>
            <select onChange={(e) =>{ setTo(e.target.value)}}>
               {options.map((option) => {
                     return <option   key= {option.code}  value={option.code}>{option.name}</option>
               })}
            </select>
        </div>
        <div>
            <textarea rows="4" cols="50"  value={translatedText}>
            </textarea>
        </div>
        <div>
            <button onClick={translate}>Translate</button>
        </div>

        </div>
        
    </div>
  )
}

export default TranslatorPage