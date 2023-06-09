//conecta com a API
import { Configuration, OpenAIApi } from "openai"

import { config } from "../config"

const configuration = new Configuration({
  apiKey: config.openAI.apiToken,
})

export const openai = new OpenAIApi(configuration)
