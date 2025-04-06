// Express route handler
export async function registerRoutes(app: Express): Promise<Server> {
  // Doctors endpoints
  app.get('/api/doctors', async (req, res) => {
    try {
      const doctors = await storage.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
  });

  app.get('/api/doctors/:id', async (req, res) => {
    try {
      const doctor = await storage.getDoctor(parseInt(req.params.id));
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doctor' });
    }
  });

  // Create HTTP server for WebSocket support
  const httpServer = createServer(app);
  
  return httpServer;
}
