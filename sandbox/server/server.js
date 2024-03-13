const express = require("express");
const cors = require("cors");
const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const ipMiddleware = function (req, res, next) {
  if (!userMetadata.ip) {
    //let testIP = "68.145.123.233";
    //userMetadata.ip = testIP;
    userMetadata.ip = requestIp.getClientIp(req);
    fetch(`https://api.country.is/${userMetadata.ip}`)
      .then((res) => res.json())
      .then((data) => (userMetadata.location = data.country));
  }

  next();
};

app.use(ipMiddleware);

const allRecordedEvents = [];

const userMetadata = {
  ip: null,
  browser: null,
  os: null,
  location: null,
};

app.post("/record", (req, res) => {
  if (!userMetadata.browser || !userMetadata.os) {
    let ua = uap(req.headers["user-agent"]);
    userMetadata.browser = ua.browser;
    userMetadata.os = ua.os;
  }
  console.log(userMetadata);
  /* ua references this object
  {
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    browser: { name: 'Chrome', version: '122.0.0.0', major: '122' },
    engine: { name: 'Blink', version: '122.0.0.0' },
    os: { name: 'Windows', version: '10' },
    device: { vendor: undefined, model: undefined, type: undefined },
    cpu: { architecture: 'amd64' }
  }
  */
  //Could assign a property to the batchOfEvents array that references this `ua` object, that way we can grab the metadata from any batch of events
  //  If we were to do that, would need to extract on client before flattening the 2 dimensional array
  const batchOfEvents = req.body;
  // let consolePayloads = batchOfEvents.filter((obj) => obj.data.plugin);
  // if (consolePayloads.length > 0) {
  //   consolePayloads.forEach((consolePayload) => {
  //     console.log("Payload: ", consolePayload);
  //   });
  // } else {
  //   console.log("No console payload");
  // }

  // let networkEventPayload = batchOfEvents.filter((obj) => obj.type === 50);
  // if (networkEventPayload.length > 0) {
  //   networkEventPayload.forEach((event) => {
  //     console.log("Network event: ", event);
  //   });
  // } else {
  //   console.log("No network event payload");
  // }
  console.log(batchOfEvents);
  allRecordedEvents.push(batchOfEvents);
  res.sendStatus(200);
});

app.get("/allRecordedEvents", (req, res) => {
  const sessionData = {
    events: allRecordedEvents,
    userMetadata,
  };
  res.json(sessionData);
});

app.get("/random", (req, res) => {
  res.json("aslkdfgnalksgnalksdgnaksl");
});

app.delete("/deleteTest", (req, res) => {
  res.status(500).json("deleted");
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
