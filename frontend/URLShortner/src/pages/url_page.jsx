import { useState } from "react";
import { shortenUrl } from "../services/urlServices";   
import { Input } from "../components/Input";            
import { ResultCard } from "../components/result_card"; 
import { HistoryList } from "../components/history_list"; 

export default function UrlPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [data, setData] = useState(null);   
  const [history, setHistory] = useState([]); 

  const handleShorten = async () => {
    if (!originalUrl) return alert("Please enter a URL");

    try {
      const result = await shortenUrl(originalUrl); 

      // orginalURL
      const resultWithOriginal = { ...result, originalUrl, clicks: result.clicks || 0 };

      setData(resultWithOriginal);

      // hist list
      setHistory((prev) => [resultWithOriginal, ...prev]);
      
      // clear intput 
      setOriginalUrl("");
      
    } catch (error) {
      alert("Failed to shorten URL!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-20">
      <h1 className="text-5xl text-center">URL Shortener</h1>

      <div className="flex flex-col items-center bg-juniper-400 text-juniper-950 rounded-lg shadow-lg p-6 w-1/3 gap-4">

        {/*main div*/}
        <Input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Shorten
        </button>

        {/* result card */}
        {data && <ResultCard data={data} />}

      </div>

      {/*  hist list*/}
      <HistoryList history={history} onSelect={(item) => setData(item)} />
    </div>
  );
}
    