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

Folder : Preprocessing

- Dataset can be found at
 https://www.fao.org/faostat/en/#data/ET

- Data for temperature:
 https://crudata.uea.ac.uk/cru/data/hrg/cru_ts_3.23/crucy.1506241137.v3.23/countries/tmp/ 

- Data for gases and sectors:
https://github.com/owid/co2-data
