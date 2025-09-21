import { env } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
