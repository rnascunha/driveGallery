import Script from "next/script";

interface GoogleLoadScriptsProps {
  gapiLoad?: () => void;
  gsiLoad?: () => void;
  gapiReady?: () => void;
  gsiReady?: () => void;
}

export default function GoogleLoadScripts({
  gapiLoad,
  gsiLoad,
  gapiReady,
  gsiReady,
}: GoogleLoadScriptsProps) {
  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={gapiLoad}
        onReady={gapiReady}
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={gsiLoad}
        onReady={gsiReady}
      />
    </>
  );
}
