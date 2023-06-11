import { WebSocketServer } from "ws";
import { runSQL } from "./kafka";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", async (data) => {
    const { command, payload } = JSON.parse(data.toString());
    try {
      ws.send(
        JSON.stringify({
          command,
          payload: await runSQL(payload),
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          command,
          error,
        })
      );
    }
  });
});
