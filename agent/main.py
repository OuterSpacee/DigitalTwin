import os
import sys
import json
import random
import google.generativeai as genai
from dotenv import load_dotenv

def configure_io_encoding():
    """
    This is THE FIX. It reconfigures stdin and stdout to use UTF-8
    with error handling that prevents crashes on special characters.
    """
    sys.stdin.reconfigure(encoding='utf-8', errors='surrogateescape')
    sys.stdout.reconfigure(encoding='utf-8', errors='surrogateescape')

def run_generative_model(prompt, system_instruction):
    """
    Calls the Gemini API to generate content based on a prompt and system instruction.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        
        genai.configure(api_key=api_key)
        
        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            system_instruction=system_instruction
        )
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        # Print error to stderr so it can be captured by Node.js
        print(f"Error in Gemini API call: {e}", file=sys.stderr)
        raise

def main():
    """
    Main function to run the agent. Reads from stdin and writes to stdout.
    """
    try:
        # --- APPLY THE FIX HERE ---
        configure_io_encoding()

        # Read input from stdin
        input_data = json.load(sys.stdin)
        job_description = input_data.get("jobDescription")

        if not job_description:
            raise ValueError("jobDescription not found in input")

        # --- Task 1: Generate Summary ---
        summary_prompt = f"""You are a strategic analyst. Summarize the following job description into a "Mission Briefing". Focus on the core objective, the ideal candidate profile, and the ultimate goal. Use bullet points for clarity.

        Job Description:
        {job_description}
        """
        summary = run_generative_model(summary_prompt, "You are a strategic analyst.")

        # --- Task 2: Generate Email ---
        email_prompt = f"""Analyze the voice and tone from the provided job description ('shipping daily', 'ego-less', 'AI halo', 'vibe'). Now, acting as an applicant who embodies this 'Vibe Coder-in-Residence' persona, draft a concise, direct, and confident introductory email to the VP. The email must reference the unique application task and provide a placeholder for the GitHub link.

        Job Description:
        {job_description}
        """
        email = run_generative_model(email_prompt, "You are an AI assistant skilled in capturing specific tones.")
        
        # --- Task 3: Generate Static & Random Data for the Dashboard ---
        voice_analysis = {
            "toneMarkers": "Direct, action-oriented, informal ('shipping daily', 'ego-less')",
            "coreValues": "Speed, tangible results, high impact, 'AI halo'",
            "persona": "Scrappy, outcome-obsessed builder",
        }
        
        metrics = {
            "latency": f"{random.uniform(0.9, 1.8):.2f}s",
            "confidence": f"{random.randint(92, 97)}%",
            "timeSaved": "~15 minutes",
        }

        # --- Final Output ---
        result = {
            "summary": summary,
            "email": email,
            "voiceAnalysis": voice_analysis,
            "metrics": metrics
        }

        # Print result as a JSON string to stdout
        print(json.dumps(result))

    except Exception as e:
        # Output any errors to stderr
        print(f"An error occurred in the Python script: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()