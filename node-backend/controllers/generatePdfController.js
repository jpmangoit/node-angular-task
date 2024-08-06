const puppeteer = require('puppeteer');
const dotenv = require("dotenv");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
dotenv.config();
const UPLOAD_DIR = 'uploads/'; 

module.exports = {
    async generatePdf(req, res) {
        try {
            const htmlFilePath = path.join(__dirname, 'public', '../../public/pdf.html');
            
            if (!htmlFilePath) {
                return res.status(400).json({ success: false, error: 'No HTML file path provided' });
            }

            // Launch Puppeteer and create a PDF from the HTML page
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Use the file URL instead of localhost
            await page.goto(`file:${path.resolve(htmlFilePath)}`, { waitUntil: 'networkidle2' });
            const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

            await browser.close();

            // Generate a timestamp and use it to create a unique filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format timestamp
            const pdfFilePath = path.join(UPLOAD_DIR, `generated_${timestamp}.pdf`);
            fs.writeFileSync(pdfFilePath, pdfBuffer);

            // Send the PDF as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=generated_${timestamp}.pdf`);
            res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    upload: upload.single('pdf'), // Middleware to handle file upload
};
