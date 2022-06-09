/*
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        salesChannel: process.env.SHOPIFY_APP_ID, // Optional but recommended
      },
    },
    'gatsby-plugin-image',
  ]
*/
import type { GatsbyConfig } from 'gatsby';
require('dotenv').config();
const config: GatsbyConfig = {
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        password: process.env.SHOPIFY_APP_PASSWORD,
        shopifyConnections: ['collections'], // source product collections too
      },
    },
    /*  {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },*/
  ],
  jsxRuntime: `automatic`,
};

export default config;
