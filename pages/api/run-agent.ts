import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path'; // Import the 'path' module

// Define the structure for the response data
interface AgentResponse {
  summary: string;
  email: string;
  voiceAnalysis: object;
  metrics: object;
}

// Define the structure for the error response
interface ErrorResponse {
  error: string;
  details?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgentResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { jobDescription } = req.body;

  // --- THE FIX IS HERE ---
  // Determine the correct, absolute path to the Python executable inside the venv
  // For Windows, it's in venv\Scripts\python.exe
  // For MacOS/Linux, it's in venv/bin/python
  const pythonExecutable = process.platform === 'win32' 
    ? path.join(process.cwd(), 'venv', 'Scripts', 'python.exe')
    : path.join(process.cwd(), 'venv', 'bin', 'python');
  
  // The path to the python script
  const pythonScriptPath = path.join(process.cwd(), 'agent', 'main.py');

  // Use the absolute path to the python executable
  const pythonProcess = spawn(pythonExecutable, [pythonScriptPath]);
  // --- END OF FIX ---


  let pythonData = '';
  let pythonError = '';

  // Send job description to Python script's standard input
  pythonProcess.stdin.write(JSON.stringify({ jobDescription }));
  pythonProcess.stdin.end();

  // Collect data from the Python script
  pythonProcess.stdout.on('data', (data: Buffer) => {
    pythonData += data.toString();
  });

  // Collect errors from the Python script
  pythonProcess.stderr.on('data', (data: Buffer) => {
    pythonError += data.toString();
  });

  // Handle the process exit
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error('Python STDERR:', pythonError);
      return res.status(500).json({ error: 'Python script failed', details: pythonError });
    }

    try {
      const result: AgentResponse = JSON.parse(pythonData);
      res.status(200).json(result);
    } catch (e) {
      console.error('Failed to parse Python script output:', e);
      console.error('Raw Python STDOUT:', pythonData);
      res.status(500).json({ error: 'Failed to parse script output' });
    }
  });
}