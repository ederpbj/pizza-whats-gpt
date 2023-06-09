import { Message, Whatsapp, create } from "venom-bot";

import { ChatCompletionRequestMessage } from "openai";

import { openai } from "./lib/openai";

//Console.log('Hello World!');
//Adapter, pode trocar isso por whats oficial
//Primeiro BOT
// Retirado do site: https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
// Aqui faz a chamada para o chat-gpt, recebendo a resposta
async function completion(
  messages: ChatCompletionRequestMessage[]
): Promise<string | undefined> {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    max_tokens: 256,
    messages,
  });

  return completion.data.choices[0].message?.content;
}

create({
  session: "pizza-gpt",
  disableWelcome: true,
})
  .then(async (client: Whatsapp) => await start(client))
  .catch((err) => {
    console.log(err);
  });

// Recebe o parâmetro e faz a conexão com o WhatsApp
// Aqui faz a integração da biblioteca com as mensagens
async function start(client: Whatsapp) {
  client.onMessage(async (message: Message) => {
    if (!message.body || message.isGroupMsg) return;

    console.log("message", message.body);

    const response =
      (await completion([
        { role: "user", content: message.body },
      ])) || "Não entendi...";
    //const response = `Olá!`;

    await client.sendText(message.from, response);
  });
}
