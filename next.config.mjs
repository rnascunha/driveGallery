/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/g",
  //       headers: [
  //         {
  //           key: "Cross-Origin-Opener-Policy",
            // value: "unsafe-none",
          //   value: "same-origin-allow-popups"
          // },
          // {
          //   key: "Cross-Origin-Embedder-Policy",
          //   value: "unsafe-none",
          // },
  //       ],
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "www.googleapis.com",
      //   port: "",
      //   pathname: "**",
      // }
    ],
  },
  output: "standalone",
};

export default nextConfig;
