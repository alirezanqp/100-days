const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/",  (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', (req, res) => {
  const resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
})

app.get("/api/:time_str", (req, res) => {
  try {
    const dateString = req.params.time_str

    if (/\d{5,}/.test(dateString)) {
      let dateInt = parseInt(dateString);
      const date = new Date(dateInt)
      res.json({ unix: date.valueOf(), utc: date.toUTCString() });
    } else {
      let dateObject = new Date(dateString);

      if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
      } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
    }
  }
  } catch (error) {
    console.error(error)
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
