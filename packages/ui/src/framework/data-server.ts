import { atom } from "nanostores";
const socket = new WebSocket("ws://localhost:3001");

const listenToCommand = <Payload>(
  command: string,
  handler: (payload: Payload) => void
) =>
  socket.addEventListener("message", async ({ data }) => {
    const { command: cmd, payload } = JSON.parse(data.toString());

    if (command !== cmd) return;

    handler(payload);
  });

export const listen = (command: string, initialValue: unknown) => {
  const observable = atom(initialValue);
  listenToCommand(
    command,
    async (payload: (unknown | { payload: string })[]) => {
      // TODO: Make especific per command
      if (typeof payload?.[0]?.payload === "string") {
        console.log(11);
        observable.set(
          payload.map((data) => ({
            ...data,
            payload: JSON.parse(data.payload),
          }))
        );
        return;
      }

      observable.set(payload);
    }
  );

  return observable;
};

export const send = (command: string, payload: unknown) => {
  const data = JSON.stringify({
    command,
    payload,
  });
  if (socket.readyState === socket.OPEN) {
    socket.send(data);
  } else {
    socket.addEventListener("open", () => {
      socket.send(data);
    });
  }
};
