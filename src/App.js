import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

import "./App.css"

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

   

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      <span className="logo">Download</span>
      <section className="content">
        <h1 className="content_title">Download YouTube to MP3 </h1>
       

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
          <button type="submit" className="form_button">Search</button>
        </form>

        {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download Now</a> : ''}
        
      </section>
    </div>
  )
}

export default App
