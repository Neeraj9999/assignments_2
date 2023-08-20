import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
});

async function getHandler(url: string) {
  const res = await api.get(url);
  return res.data;
}

export const useGet = (url: string, key = null) =>
  useQuery({
    queryKey: [key || url],
    queryFn: () => getHandler(url),
  });
