# image-gen-app

A simple image generator application written in React and Typescript. The app creates unique images based on provided text description using [OpenAI API](https://platform.openai.com/docs/api-reference/images/create) (DALL-E model).

## UI Example

<p align="middle">
  <img src="https://github.com/agapas/image-gen-app/blob/main/assets/exampleUI.png" width="800"/>
</p>

## Additional Info

To use the app, you have to sign up to the [OpenAI platform](https://platform.openai.com/signup) for an API key. Currently, you will receive $5 credit that you can use during 3-month trial period. After the trial or spending your entire credit, you will have to pay for the service based on the size of generated image. You can find more info about current [pricing](https://openai.com/pricing#image-models).

## Project Setup

### Installation

- download or clone this repo

- make sure that [Node.js](https://nodejs.org/en) is installed as DALL-E uses NPM (Node Package Manager). Check it's version via command in console:

```bash
node -v
```

- go to your local project directory in console and install all packages:

```bash
npm i
# or
yarn
# or
pnpm i
```

### API Key

- open the project in your editor
- add new .env file to the project root directory with following content:

```bash
API_KEY="your-api-key-taken-from-OpenAI"
```

- add `.env` to .gitignore file

#### A NOTE:

The API key setup in `.env` file is just to use the app locally. In the case if you will use the Vercel or another deployment platform, you will have an option to set the API_KEY as an environment variable in the project settings and use it instead.

### Running Project Locally

The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) from [Next.js](https://nextjs.org/). So, following commands can be used to run the project:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

- to run a production build locally use command:

```bash
npm run build
#or
yarn build
#or
pnpm build
```

You can also build the application deploying on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is licensed under the [MIT] License - see the [LICENSE.md](LICENSE) file for details.
