import axios from "axios";
import { serverUrl } from "../../config.json";

const instance = axios.create({ baseURL: serverUrl });

export default instance;
