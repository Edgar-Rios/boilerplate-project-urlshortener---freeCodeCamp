require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MI CODIGO
const { read: data, write } = require('./store');

app.post('/api/shorturl', (req, res) => {

  const { url } = req.body;
  console.log(req.body)
  if (!url.includes('http://') && !url.includes('https://'))
    return res.json({ "error": 'Invalid url' });

  let newSite = write({ original_url: url });
  console.log(newSite)
  res.json(newSite);

})

app.get('/api/shorturl/:idUrl', (req, res) => {
  try {
    const { idUrl } = req.params;

    if (isNaN(idUrl)) throw Error("Wrong format");
    // console.log(data)
    let url;
    data.forEach(({ short_url, original_url }) => {
      if (short_url == idUrl)
        url = original_url;
    })

    if (!url) throw Error("No short short_url found for the given input")


    return res.redirect(url)
  } catch (err) {
    res.json({ error: err.message })
  }
})

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ MI CODIGO


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
