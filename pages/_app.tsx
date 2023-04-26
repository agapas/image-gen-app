import type { AppProps } from "next/app";
import "./App.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <h2>Create images with your mind</h2>
      <textarea
        className="app-input"
        placeholder="Create any type of image with added description. Use as much details as you like."
      />
      <button>Generate Image</button>
    </div>
  );
}
