import getConfig from "next/config";
import { Configuration, OpenAIApi, CreateImageRequestSizeEnum } from "openai";
import { useState, PropsWithChildren } from "react";
import { Button } from "../components/Button";
import { Result } from "../components/Result";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";
import "./App.scss";

const imageSizeOptions = [
  { label: "256 x 256", value: "256x256" },
  { label: "512 x 512", value: "512x512" },
  { label: "1024 x 1024", value: "1024x1024" },
];

type CustomError = string | undefined;

export default function App() {
  const [imageResult, setImageResult] = useState("");
  const [textPrompt, setTextPrompt] = useState("");
  const [promptError, setPromptError] = useState<CustomError>();
  const [imageSize, setImageSize] = useState(imageSizeOptions[0].value);
  const [loading, setLoading] = useState(false);
  const [resultError, setResultError] = useState<CustomError>();

  const { publicRuntimeConfig } = getConfig();
  const apiKey =
    typeof publicRuntimeConfig !== "undefined" && publicRuntimeConfig.apiKey
      ? publicRuntimeConfig.apiKey
      : process.env.API_KEY;

  if (!apiKey) {
    throw new Error("apiKey is not defined");
  }

  const configuration = new Configuration({ apiKey });
  delete configuration.baseOptions.headers["User-Agent"]; // the fix for error: Refused to set unsafe header "User-Agent"
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    if (!textPrompt.length && !promptError) {
      setPromptError("Please add your description. It's required.");
      return;
    }

    if (resultError) {
      setResultError(undefined);
    }

    setLoading(true);

    // const generatedExample =
    //   "https://oaidalleapiprodscus.blob.core.windows.net/private/org-vlaWMOf9DQoKKX0PkXCBPwgR/user-MEP4wZ1uPHbxJmXj5jVL0cHe/img-2FiLXg2JuZX0tpzz4dyYT5Ff.png?st=2023-05-10T14%3A34%3A49Z&se=2023-05-10T16%3A34%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-10T02%3A38%3A18Z&ske=2023-05-11T02%3A38%3A18Z&sks=b&skv=2021-08-06&sig=bs8m6YEQun5ggg/yz3YfItsFRC0dOBiKl4ewZHnItGk%3D";

    // setTimeout(() => {
    //   setLoading(false);
    //   setImageResult(generatedExample);
    // }, 3000);

    try {
      const response = await openai.createImage({
        prompt: textPrompt, // maxLength: 1000 characters
        n: 1, // 1-10, default: 1
        size: imageSize as CreateImageRequestSizeEnum, // 256x256, 512x512 or 1024x1024, default: 1024x1024
      });

      const imageData = response.data;
      const imageUrl = imageData.data[0].url;
      console.log("imageUrl: ", imageUrl);

      setImageResult(imageUrl || "");
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with no 2xx status code
        setResultError(error.response.data.error.message);
      } else if (error.request) {
        // The request was made but no response was received
        setResultError(error.request.responseText);
      } else {
        // Anything else
        setResultError(error.message);
      }

      console.log(error);
      setLoading(false);
    }
  };

  const resetErrors = () => {
    if (promptError) {
      setPromptError(undefined);
    }

    if (resultError) {
      setResultError(undefined);
    }
  };

  const onTextPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (promptError || resultError) {
      resetErrors();
    }

    setTextPrompt(e.target.value);
  };

  const onImageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (promptError || resultError) {
      resetErrors();
    }

    setImageSize(e.target.value);
  };

  return (
    <div className="app">
      <h1>Create images with your mind and DALL-E</h1>
      <Textarea
        disabled={loading}
        label="Describe your image, use as much details as you like:"
        placeholder="Happy pink elephant riding bicycle on a stone path"
        error={promptError}
        value={textPrompt}
        onChange={onTextPromptChange}
      />
      <Select
        disabled={loading}
        label="Select image size (px):"
        options={imageSizeOptions}
        value={imageSize}
        onChange={onImageSizeChange}
      />
      <Button disabled={loading} onClick={generateImage}>
        Generate Image
      </Button>
      <Result loading={loading} imageUrl={imageResult} error={resultError} />
    </div>
  );
}
