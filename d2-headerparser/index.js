const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.set('trust proxy', true)

app.get("/api/whoami", (req, res) => {
  const ipaddress = req.headers["x-forwarded-for"]
  const language = req.headers["accept-language"]
  const software = req.headers["user-agent"]

  const data = {
    ipaddress,
    language,
    software
  }
  
  res.send(data)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
