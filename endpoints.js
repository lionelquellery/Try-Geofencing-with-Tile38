const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const batch = require('batch-node')('APIkey', 'APIkey');




app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/endpoints', (req, res) => { 

  console.log(req.body.detect);
  if (req.body.detect === 'outside'){
    console.log('outside baby',req.body.id);
      batch.sendNotification({
        group_id: 'test',
        recipients: {
            install_ids: ['']
        },
        message: {
            "title": "You should never see this notifications",
            "body": "data.articles[i].description",

        },
        deeplink: "data.articles[i].url",
    }, function(err, cb) {
        console.log(err, cb);
    });
  }
});

app.listen(4000, () => console.log('Endpoint is running on port 4000!'));
