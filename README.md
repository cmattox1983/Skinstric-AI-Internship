# Skinstric AI – Facial Recognition & Demographic Analysis

Skinstric AI is a multi-phase web application that uses facial recognition to analyze and predict user demographic data based on uploaded or live-captured images. The application provides confidence-based predictions for age, race, and gender, along with an interactive UI that allows users to review, adjust, and explore results dynamically.

---

## Overview

Skinstric AI allows users to either upload an image from their device or capture a live photo through their camera. The image is processed through an external API that performs facial recognition and returns demographic predictions with confidence percentages.

The application is designed to guide users through a structured workflow consisting of identity verification, image submission, data analysis, and results review—while maintaining consistent state and smooth navigation across pages.

---

## Key Features

- **Image Input Options**
  - Upload an image from device files
  - Capture a live photo using the device camera via browser access

- **Facial Recognition Analysis**
  - Predicts:
    - Gender (Male / Female)
    - Age ranges (9 categories)
    - Race (7 categories)
  - Each category includes confidence percentages

- **Interactive Results UI**
  - Users can select the demographic category that best represents them
  - Selecting a row dynamically updates the top demographic displayed
  - Clicking any demographic displays its confidence percentage in a circular graph
  - Smooth visual transitions and consistent layout across steps

- **Multi-Phase Workflow**
  - Phase 1: User verification (name + location)
  - Phase 2: Image upload and demographic analysis
  - Phase 3: Live camera capture with retake / confirm logic

---

## Application Flow

### Phase 1 – User Verification
- User enters their name and location
- Data is stored locally and sent with the initial API request

### Phase 2 – Image Upload
- User selects an image from their device
- Image is converted to Base64 format
- Image is sent to the API for facial recognition
- Returned demographic data is stored in `sessionStorage` as `demographicData`
- User navigates from `/select` → `/summary`

### Phase 3 – Live Camera Capture
- User navigates to `/camera/capture`
- Browser camera access is enabled
- User can take a live snapshot
- Image freezes and user chooses to:
  - **Use Image** → convert to Base64 → send to API
  - **Retake Image** → reset state and restart camera
- Results are stored as `demographicData`
- Workflow continues identically to Phase 2

---

## State Management & Data Consistency

- Demographic results are stored in `sessionStorage` as `demographicData`
- Data retrieval logic is shared across `/select` and `/summary`
- Ensures consistent rendering and smooth navigation between pages
- Dynamic mapping functions are used to render demographic categories and confidence values

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React
- **Styling:** Tailwind CSS
- **Design Assets:** Figma
- **Image Handling:** Base64 image conversion
- **Data Visualization:** Circular progress graph (third-party React component)
- **Storage:** sessionStorage
- **APIs:** External facial recognition & demographic analysis APIs

---

## Highlights & Challenges

- Implemented full camera capture workflow with retake and confirm logic
- Managed complex multi-phase state while maintaining UX consistency
- Dynamically mapped nested API data into interactive UI components
- Integrated image conversion and API handling without breaking navigation flow
- Built pixel-accurate UI from Figma designs

---

## Purpose

This project was built as an **internship / portfolio project** to demonstrate real-world frontend engineering skills, including API integration, camera access, state management, and complex UI logic using modern web technologies.

---

## Notes

- All demographic data is generated via API-based facial recognition and confidence scoring
- User-selected corrections dynamically update displayed results without re-fetching data
- The application prioritizes workflow clarity and interactive data exploration
