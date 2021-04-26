import axios from "axios";

export default async (text) => {
  try {
    const response = await axios.post("https://libretranslate.com/translate",
      {
        "q": text,
        "source": "en",
        "target": "es",
      }
    );
    return response.data.translatedText;
  } catch (error) {
    console.log("error", error)
    return text;
  }
}