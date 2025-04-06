// WebSocket server setup
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  
  // Send initial data
  const sendQueueUpdate = async () => {
    if (ws.readyState === WebSocket.OPEN) {
      const patients = await storage.getAllPatients();
      ws.send(JSON.stringify({
        type: 'QUEUE_UPDATE',
        data: patients
      }));
    }
  };
  
  // Send updates periodically or on events
  sendQueueUpdate();
  
  // Handle incoming messages
  ws.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      
      if (parsedMessage.type === 'REQUEST_QUEUE_UPDATE') {
        await sendQueueUpdate();
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});
