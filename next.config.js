/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    additionalData: `@import "src/app/styles/variables.scss";`,
  },
};

module.exports = nextConfig;
