import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Translate/translate.css";

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const { data } = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=en|${languageCode}`,
      { cancelToken: cancelToken.token }
    );

    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    }
    return "";
  } catch (err) {
    console.error("Translation error:", err);
    return "";
  }
};

const Translate = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text) {
      setTranslated("");
      return;
    }

    const cancelToken = axios.CancelToken.source();
    setLoading(true);

    doTranslation(text, language, cancelToken)
      .then((result) => {
        setTranslated(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Translation failed:", err);
        setTranslated("");
        setLoading(false);
      });

    return () => {
      try {
        cancelToken.cancel();
        setLoading(false);
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div className="">
      <label className="label">Output</label>
      {loading ? (
        <p>Translating...</p>
      ) : (
        <h1 className="title">{translated}</h1>
      )}
    </div>
  );
};

export default Translate;
