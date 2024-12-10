import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(helmet());  // Enhance security with Helmet
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Allow requests from frontend
    methods: 'GET,POST',
}));

// API routes
app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Salam Anna du siehst meine Website als erstes :D!' });
});

app.get('/api/user/:id', (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;
    res.json({ userId });
});

// Catch-all route for undefined paths
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});

// General error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
