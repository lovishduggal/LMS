# LMS Frontend

## Setup instruction

Clone the Project

```text
    git clone https://github.com/lovishduggal/LMS.git
```

Move into the directory

```text
    cd frontend
```

Install dependencies

```text
    npm i
```

run the server

```text
   npm run dev
```

## Setupt instruction for tailwind

[Tailwind official instruction doc](https://tailwindcss.com/docs/installation)

Intsall Tailwind

```text
    npm install -D tailwindcss
```

Create tailwind config file

```text
    npx tailwindcss init
```

Add file extensions to config file in the content property

```text
   "./src/**/*.{html,js,jsx}"
```

Add the Tailwind directives at the top of the 'index.css'

```text
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

## Adding plugins and dependencies

```text
    npm i react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```
