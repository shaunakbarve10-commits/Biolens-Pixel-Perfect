## BIO LENS – API Contract
**A 3D Visualization Platform for Medical Understanding & Learning**
This document is the **single source of truth** for all API communication between the frontend and backend.
## 1. User Management
### 1.1 User Registration
**Feature:** User Registration
**HTTP Method:** POST
**Endpoint Path:** /api/users/register
**Description:** Registers a new user (patient, student, or educator).
**Request Body**
```json
{
  "name": "John Cena",
  "email": "john@example.com",
  "password": "securePass123",
  "role": "patient"
}
```
Success Response (201 Created):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64b2f5c9d4e7a",
    "name": "John Cena",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

Error Responses:
**400 Bad Request**
```json
{ "error": "Name, email, and password are required." }
```
**409 Conflict**
```json
{ "error": "Email already registered." }
```
### 1.2 User Login
**Feature:** User Login
**HTTP Method:** POST
**Endpoint Path:** /api/users/login
**Description:** Authenticates a user and returns a JWT token.
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```
**Success Response (200 OK):**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "64b2f5c9d4e7a",
    "name": "John Cena",
    "role": "patient"
  }
}
```
**Error Response:**
**401 Unauthorized**
```json
{ "error": "Invalid email or password." }
```
## 2. Medical Report Analysis (Patients)
### 2.1 Upload Medical Report
**Feature:** Upload Medical Report
**HTTP Method:** POST
**Endpoint Path:** /api/reports/upload
**Description:** Uploads a medical report (PDF, image) for analysis.
**Request Body (multipart/form-data):**
```json
file: <uploaded_report.pdf>
patient_id: "64b2f5c9d4e7a"
```
**Success Response (200 OK):**
```json
{
  "message": "Report uploaded successfully",
  "report_id": "rep_123456",
  "status": "processing"
}
```
**Error Response:**
**400 Bad Request**
```json
{ "error": "Valid medical report file is required." }
```
### 2.2 Get Report Analysis
**Feature:** Get Report Analysis
**HTTP Method:** GET
**Endpoint Path:** /api/reports/:report_id
**Description:** Retrieves analyzed medical report data and linked 3D model info.
**Success Response (200 OK):**
```json
{
  "report_id": "rep_123456",
  "patient_id": "64b2f5c9d4e7a",
  "analysis_text": "Mild cardiac arrhythmia detected...",
  "affected_organs": [
    {
      "organ": "Heart",
      "highlight_areas": ["left_atrium"]
    }
  ],
  "3d_model_url": "https://storage.example.com/models/heart_model.glb"
}
```
**Error Response:**
**404 Not Found**
```json
{ "error": "Report not found." }
```
## 3. Anatomy Learning (Students)
### 3.1 Get List of 3D Models
**Feature:** Get List of 3D Models
**HTTP Method:** GET
**Endpoint Path:** /api/models
**Description:** Retrieves metadata for all available 3D anatomical models.
**Success Response (200 OK):**
```json
[
  {
    "model_id": "mdl_001",
    "name": "Human Heart",
    "category": "Circulatory System",
    "preview_image_url": "https://storage.example.com/previews/heart.jpg"
  }
]
```
### 3.2 Get Specific 3D Model Details
**Feature:** Get Specific 3D Model Details
**HTTP Method:** GET
**Endpoint Path:** /api/models/:model_id
**Description:** Retrieves detailed info and asset URLs for a specific 3D model.
**Success Response (200 OK):**
```json
{
  "model_id": "mdl_001",
  "name": "Human Heart",
  "description": "Detailed interactive 3D model of the human heart.",
  "layers": ["Outer", "Muscle", "Vessels"],
  "model_file_url": "https://storage.example.com/models/heart.glb"
}
```
## 4. Progress Tracking (Students)
### 4.1 Update Learning Progress
**Feature:** Update Learning Progress
**HTTP Method:** POST
**Endpoint Path:** /api/progress
**Description:** Updates student’s progress in a learning module.
**Request Body:**
```json
{
  "user_id": "64b2f5c9d4e7a",
  "module_id": "mdl_001",
  "progress": 80
}
```
**Success Response (200 OK):**
```json
{ "message": "Progress updated successfully" }
```
## Error Response Structure
All error responses follow this format:
```json
{ "error": "Error message here." }
```
