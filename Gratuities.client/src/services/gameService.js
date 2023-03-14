import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GameService{

  async destroyBlock(value){
    const res = await api.put('/account', {currency: value})
    logger.log(res.data)
    return res.data
  }

}

export const gameService = new GameService()