# MediCompare AI

"Discover and compare the real cost of medical procedures — powered by BigQuery, Fivetran, and Vertex AI."

## Overview

MediCompare AI is an AI-powered platform that enables users to compare the cost of medical procedures across hospitals in an intuitive and patient-friendly way. It leverages Medicare CMS inpatient datasets, hospital chargemaster data, and AI-generated insights to make healthcare pricing transparent and understandable.

### Background & Motivation

Recent changes in Medicare’s payment policies under the Inpatient Prospective Payment System (PPS) and the Long-Term Care Hospital PPS required hospitals to make their Chargemaster (CDM) data publicly available in machine-readable formats (XML or CSV) starting January 1, 2019.

While this step improved transparency, the raw data is not easily understandable by patients. Chargemaster files are large, complex, and technical—making it hard for people to meaningfully compare procedure prices across hospitals.

### Problem Statement

Patients lack accessible tools to understand and compare the costs of medical procedures. Although hospitals publish their data, it’s not patient-friendly. Users struggle to interpret chargemaster data, map procedures, and make cost-effective healthcare decisions.

## Solution

MediCompare AI is a patient-centric cost explorer that helps users:

*   Search using natural language queries (e.g., “Compare knee replacement costs in Boston”).
*   View AI-generated summaries explaining cost variations and hospital ratings.
*   Explore hospital chargemaster data through interactive comparison cards.
*   Sort and filter results by procedure type, cost, and hospital rating.

## Key Features

*   **Hero Search Page:** A full-screen hero section with a blurred hospital image and a glassmorphic center card for natural language queries.
*   **AI Insights:** AI-generated summaries explaining cost variations, patient questions to ask providers, and other relevant information.
*   **Compare Cards:** Beautiful side-by-side comparison of hospitals based on attributes like name, rating, average total payment, Medicare payment, location, and distance.
*   **Hospital Grid:** A scrollable grid of additional hospitals ranked by cost, with options to compare or view details.

## Architecture Overview

### Data Layer

*   **Fivetran Custom Connector:** Extracts Medicare CMS and hospital chargemaster datasets.
*   **Google BigQuery:** Stores and manages large-scale structured healthcare data.

### Backend Layer

*   **FastAPI:** Handles REST API requests, processes natural language queries, and integrates with AI.
*   **Gemini AI Studio:** Interprets user input and generates insights about cost and quality.

### Frontend Layer

*   **Next.js:** Provides a fast, interactive web interface with search and result visualization.
*   **TailwindCSS:** Ensures a modern, responsive, and accessible design.

## Workflow

1.  User enters a natural language query on the home page.
2.  FastAPI backend processes the query and interacts with Gemini AI Studio.
3.  AI interprets the request, identifies relevant DRG codes, and retrieves matching data from BigQuery.
4.  The backend combines structured data with AI-generated insights.
5.  The frontend displays results through comparison cards and visual insights.

## Technologies Used

*   **Frontend:** Next.js, React, Tailwind CSS, Material UI, Lucide React
*   **Backend:** FastAPI, Python
*   **AI/NLP:** Gemini AI Studio (Vertex AI)
*   **Data Integration:** Fivetran, Google BigQuery
*   **Data Sources:** Medicare CMS inpatient datasets, hospital chargemaster data, general hospital information

## Setup and Installation

To get MediCompare AI up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/medicompare-ai.git
    cd medicompare-ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

*   `/api/parse-query`: Extracts procedure + location from user input (Vertex prompt).
*   `/api/get-hospitals`: Queries BigQuery for matching DRG/location.
*   `/api/generate-insight`: Sends context rows to Vertex text-generation.
*   `/api/compare`: Combines the above steps for a single call from the UI.

## Visual Style

*   **Color Palette:** Soft medical blues + white (Primary: `#3B82F6`, Accent: `#93C5FD`, Background: `#F9FAFB`)
*   **Typography:** Inter or Poppins
*   **Icons:** `lucide-react` (🏥, 💬, 💲)
*   **Motion:** Subtle fade-in for cards (Framer Motion)
*   **Responsiveness:** Stacks vertically on mobile.

## Future Enhancements

*   Integrate geolocation-based hospital recommendations.
*   Provide personalized cost estimates using insurance or demographic inputs.
*   Add data visualization dashboards for deeper insights.
*   Expand dataset coverage to include outpatient and specialty procedures.

## Contributing

Contributions are welcome! Please refer to the contribution guidelines (if available) for more information.
