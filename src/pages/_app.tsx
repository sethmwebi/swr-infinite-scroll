import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "@styles/globals.css";
import { SWRConfig } from "swr";

axios.defaults.baseURL = "http://localhost:3001";

function MyApp({ Component, pageProps }) {
  return (
    <div className="p-3">
      <SWRConfig value={{fetcher: (url: string) => axios(url).then(res => res.data), dedupingInterval: 10000, revalidateOnFocus: true}}>
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
}

export default MyApp;
