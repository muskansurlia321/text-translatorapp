import { useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

function App() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key":
            "6403dc4b3fmsh661a2879ceca5dbp162857jsn05f4990b0434",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: `${textInput}`,
          source: "en",
          target: `${selectValue}`,
          format: "text",
        },
      };

      const response = await axios.request(options);
      setLoading(false);
      console.log(
        response?.data?.data?.translations?.[Number(0)]?.translatedText,
      );
      setResult(
        response?.data?.data?.translations?.[Number(0)]?.translatedText,
      );
    } catch (error) {
      setLoading(false);
      console.log(error?.data);
    }
  };

  console.log(textInput);
  console.log(selectValue);

  return (
    <div className="h-screen w-screen bg-slate-900 intems-center justify-center">
      <div className="flex items-center justify-center flex-col gap-y-10 ">
        <h1 className="text-white text-4xl font-bold">Text Transaltor</h1>
        <div className="flex items-center justify-center flex-col gap-y-5 ">
          <textarea
            name="input-text"
            className=" bg-slate-500 h-30 w-[500px] border border-slate-200 outline-none rounded-lg text-lg text-white px-5 py-2"
            onChange={(e) => setTextInput(e.target.value)}
          />
          <textarea
            name="input-text"
            className="bg-slate-500 h-30 w-[500px] border border-slate-200 outline-none rounded-lg text-lg text-white px-5 py-2"
            value={result}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="options" className="text-white text-2xl font-bold">
            Converted Into:
          </label>
          <select
            className=" px-2 py-1 rounded-lg text-white text-1xl  bg-slate-500 border-gray-600 outline-none cursor-pointer"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">Select</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
          </select>
        </div>
        <button
          className="text-white text-2xl font-bold bg-slate-500 mx-auto w-[500px] py-2 rounded-lg cursor-pointer hover:bg-slate-600 flex items-center justify-center"
          onClick={handleTextTranslation}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Translate"}
        </button>
      </div>
    </div>
  );
}

export default App;
