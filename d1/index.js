const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/",  (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp', (req, res) => {
  const resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
})

app.get("/api/:time_str", (req, res) => {
  try {
    
    const time = req.params.time_str
    
    let resTime;
    if (!time) {
      resTime = new Date()
    } else {
      resTime = new Date(time)
    }

    res.json({
      unix: resTime.valueOf(),
      utc: resTime.toUTCString()
    })
    
  } catch (error) {
    console.error(error)
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
