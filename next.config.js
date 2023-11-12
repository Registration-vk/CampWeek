/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    additionalData: `@import "src/assets/styles/variables.scss";`,
  },
};

module.exports = nextConfig;
