import { axios } from "../axios";
import type { GrandmasterDto } from "./grandmasters.dto";

export function getGrandmastersAPI(): Promise<{ data: { players: string[] } }> {
  return axios.get("/pub/titled/GM");
}

export function getGrandmasterDetailsAPI(
  username: string
): Promise<{ data: GrandmasterDto }> {
  return axios.get(`/pub/player/${username}`);
}
