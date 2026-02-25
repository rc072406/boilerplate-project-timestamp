// index.js
// where your node app starts

var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200})); 
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;
  let date;

  // 1. Handle empty date (Tests 7 & 8)
  if (!dateInput) {
    date = new Date();
  } else {
    // 2. Handle Unix Timestamp (Tests 2 & 4)
    // If the string consists only of numbers, parse it as an integer
    if (/^\d+$/.test(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      // 3. Handle Date String (Test 5)
      date = new Date(dateInput);
    }
  }

  // 4. Handle Invalid Date (Test 6)
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Return JSON (Tests 2 & 3)
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
