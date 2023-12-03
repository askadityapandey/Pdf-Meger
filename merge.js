const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdfs } = require('./result');

const app = express();
const port = 3000;

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve static files from the 'templates' directory
app.use('/templates', express.static(path.join(__dirname, 'templates')));
// Serve static files from the 'dist' directory
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  console.log(req.files);
  let d = await mergePdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
