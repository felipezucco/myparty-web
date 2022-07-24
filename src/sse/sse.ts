import { EventSourcePolyfill } from "event-source-polyfill";

export const createConnectionSSE = (username: string, token: string): EventSourcePolyfill => {
  console.log("chegou no connectSSE");
  const sse = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_MYPARTY_API}/api/notification/sse/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    heartbeatTimeout: 60 * 60 * 1000
  });

  sse.onopen = e => console.log("conectou", e);
  return sse;
}

export const disconnectSSE = (sse: EventSourcePolyfill) => {
  if (sse) {
    console.log("Disconnecting SSE");
    sse.close();
  }
}


