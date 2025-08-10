import { io } from "socket.io-client";

let socketInstance;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });
  }
  return socketInstance;
}

export function onMessage(callback) {
  const socket = getSocket();
  socket.on("message", callback);
}

export function offMessage(callback) {
  const socket = getSocket();
  socket.off("message", callback);
}

export function subscribeToChannel(channel) {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit("subscribe", channel);
  } else {
    // Ensure subscription happens once connected
    const handleConnectAndSubscribe = () => {
      socket.emit("subscribe", channel);
      socket.off("connect", handleConnectAndSubscribe);
    };
    socket.on("connect", handleConnectAndSubscribe);
  }
}

export function unsubscribeFromChannel(channel) {
  const socket = getSocket();
  // If server supports unsubscribe semantics
  try {
    socket.emit("unsubscribe", channel);
  } catch {
    // no-op if not supported
  }
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = undefined;
  }
}
