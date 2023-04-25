import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <h2>Create images with your mind</h2>
      <textarea
        className="app-input"
        placeholder="Create any type of image with added description. Use as much details as you like."
      />
      <button>Generate Image</button>
    </>
  );
}
