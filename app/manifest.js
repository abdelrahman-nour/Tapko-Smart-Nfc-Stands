export default function manifest() {
  return {
    name: "tapko — تابكو",
    short_name: "tapko",
    description: "ستاندات NFC + QR بهوية مكانك",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0e0e",
    theme_color: "#0f0e0e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
