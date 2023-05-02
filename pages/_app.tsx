import type { AppProps } from "next/app";
import getConfig from "next/config";
import Image from "next/image";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import imageIcon from "../assets/imageIcon.png";
import "./App.css";

export default function App({ Component, pageProps }: AppProps) {
  const [imageResult, setImageResult] = useState(imageIcon);

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
    const response = await openai.createImage({
      prompt: "dummy image",
      n: 1,
      size: "1024x1024",
    });
    console.log("response data: ", response.data);
  };

  return (
    <div className="app">
      <h2>Create images with your mind and DALL-E</h2>
      <textarea
        className="app-input"
        placeholder="Create any type of image from your description. Use as much details as you like."
      />
      <button onClick={generateImage}>Generate Image</button>
      <Image src={imageResult} alt="Image result" width={256} height={256} />
    </div>
  );
}
