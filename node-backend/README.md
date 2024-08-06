### Setup Requirements
- Node.js version 18

**Installation and Running:**

1. **Install Packages:**
   ```bash
   npm install
   ```

2. **Start the Project:**
   ```bash
   npm start
   ```
   The project will run on port `3000`.

### Node.js API Endpoints

Both endpoints can be accessed without any authorization.

1. **Generate PDF**
   - **URL:** `http://localhost:3000/api/generate-pdf`
   - **Description:** Generates and downloads a PDF that includes a background image with the text "Hello World" centered on the page. The downloaded PDF will be stored in the `uploads` folder.

2. **Fetch Latest Email**
   - **URL:** `http://localhost:3000/api/latest-email`
   - **Description:** Retrieves the latest email from the mailbox. Each request returns a single, most recent email.
