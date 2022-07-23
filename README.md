# Installation
```jsx
npm install d3
```

```jsx
npm install --save @types/d3
```

Go to config files
```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   loader: 'akamai',
  //   path: "/"
  // },
  basePath: '/CSC3007-assignment3',
  assetPrefix: '/CSC3007-assignment3',
}

module.exports = nextConfig
```

Add this at package.json

```jsx
    "export": "next export",
    "deploy": "gh-pages -d out -t true"
```

# JSON Processing
Dataset can be found at
- https://www.fao.org/faostat/en/#data/ET