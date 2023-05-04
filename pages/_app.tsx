import type { AppProps } from "next/app";
import getConfig from "next/config";
import Image from "next/image";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import imageIcon from "../assets/imageIcon.png";
import "./App.css";

export default function App({ Component, pageProps }: AppProps) {
  const [imageResult, setImageResult] = useState("");
  const [textPrompt, setTextPrompt] = useState("");

  const { publicRuntimeConfig } = getConfig();
  const apiKey =
    typeof publicRuntimeConfig !== "undefined" && publicRuntimeConfig.apiKey
      ? publicRuntimeConfig.apiKey
      : process.env.API_KEY;

  if (!apiKey) {
    throw new Error("apiKey is not defined");
  }

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const response = await openai.createImage({
        prompt: textPrompt, // maxLength: 1000 characters
        n: 1, // 1-10, default: 1
        size: "256x256", // 256x256, 512x512 or 1024x1024, default: 1024x1024
      });

      const imageData = response.data;
      const imageUrl = imageData.data[0].url;
      console.log("imageUrl: ", imageUrl);

      setImageResult(imageUrl || "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Create images with your mind and DALL-E</h1>
      <div className="text-prompt">
        <label htmlFor="prompt-input">
          Describe the image, use as much details as you like:
        </label>
        <textarea
          id="prompt-input"
          placeholder="Happy pink elephant riding bicycle on a stone path"
          value={textPrompt}
          onChange={(e) => setTextPrompt(e.target.value)}
        />
      </div>
      <button onClick={generateImage}>Generate Image</button>
      {imageResult ? (
        <Image
          src={imageResult}
          alt="Image generated by AI"
          width={300}
          height={300}
          className="result-image"
        />
      ) : (
        <Image
          src={imageIcon}
          alt="Image placeholder"
          width={256}
          height={256}
        />
      )}
    </div>
  );
}
