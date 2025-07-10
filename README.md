# Vibe Coder-in-Residence: Live Application Demo

### 🚀 [Click Here for the Live Demo](https://digitaltwinagent.vercel.app/) 🚀

This repository contains the source code for my submission for the Vibe Coder-in-Residence (GenAI Tech EA) role at Analog Devices.

Instead of a simple script, I believe in "shipping daily," so I've shipped my application as a live, interactive product. The web application demonstrates the core tasks requested: summarizing the job description and drafting an introductory email in the VP's voice, all while providing a polished user experience and performance metrics.

---

## Architecture & Technical Choices

This project was built as a modern, full-stack web application to showcase proficiency across the required skill set.

* **Front-End:** **Next.js (React)** was chosen for its robust framework, which allows for a seamless combination of a static front-end with server-side logic.
* **Styling:** **Tailwind CSS** for rapid, utility-first styling to create a clean, minimalist, and fully responsive UI.
* **Back-End:** **Next.js API Routes** act as a lightweight backend, creating a serverless function that serves as a bridge to the Python agent. This is a scalable and efficient approach for handling API requests.
* **AI Agent:** **Python** is the core of the AI logic, leveraging the `google-generativeai` library to interact with Google's Gemini models. This separation of concerns keeps the AI logic independent of the web front-end.
* **Hosting:** The entire application is deployed on **Vercel**, directly hitting the "Rapid full-stack micro-site builder (e.g. Vercel)" requirement from the job description.

## How to Run Locally

1. **Clone the repository:**  
git clone https://github.com/OuterSpacee/DigitalTwin.git  
cd DigitalTwin
2. **Set up your API Key:**  
   * Create a file named `.env.local` in the root of the project.  
   * Add your API key to it: `GEMINI_API_KEY=your_key_here`
3. **Install JavaScript dependencies:**  
npm install
4. **Set up Python Environment:**  
   * It is highly recommended to use a virtual environment.  
python3 -m venv venv  
source venv/bin/activate  # On Windows: venv\Scripts\activate  
   * Install Python dependencies:  
pip install -r requirements.txt
5. **Run the development server:**  
npm run dev

Open <http://localhost:3000> in your browser to see the application.

## About

[Live Demo on Vercel](https://digitaltwinagent.vercel.app/)

[Source Code on GitHub](https://github.com/OuterSpacee/DigitalTwin)
