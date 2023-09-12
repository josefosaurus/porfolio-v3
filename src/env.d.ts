declare global {
  var myString: string;
  function myFunction(): boolean;
}

export { };

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SPOTIFY_API: string;
  readonly PUBLIC_SPOTIFY_API_CLIENT_ID: string;
  readonly PUBLIC_CLIENT_SECRET: string;
  readonly POCKET_API: string;
  readonly OPEN_WEATHER_API: string;
}