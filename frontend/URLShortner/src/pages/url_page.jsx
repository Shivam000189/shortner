import { useState } from "react";
import { shortenUrl } from "../services/urlServices";   // ⬅️ IMPORT SERVICE
import { Input } from "../components/Input";            // ⬅️ IMPORT INPUT
import { ResultCard } from "../components/ResultCard";  // ⬅️ IMPORT RESULT CARD
import { HistoryList } from "../components/HistoryList"; // optional if using history

export default function UrlPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [data, setData] = useState(null);   // store shorten response
  const [history, setHistory] = useState([]); // for HistoryList

  const handleShorten = async () => {
    if (!originalUrl) return alert("Please enter a URL");

    try {
      const result = await shortenUrl(originalUrl); // ⬅️ USING SERVICE

      // Add originalUrl to result for display purposes
      const resultWithOriginal = { ...result, originalUrl, clicks: result.clicks || 0 };

      setData(resultWithOriginal);

      // update history list
      setHistory((prev) => [resultWithOriginal, ...prev]);
      
      // Clear input after successful shortening
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

        {/* INPUT COMPONENT */}
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

        {/* RESULT COMPONENT */}
        {data && <ResultCard data={data} />}

      </div>

      {/* OPTIONAL: HISTORY LIST */}
      <HistoryList history={history} onSelect={(item) => setData(item)} />
    </div>
  );
}
    