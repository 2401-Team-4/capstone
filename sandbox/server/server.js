const express = require("express");
const cors = require("cors");
const uap = require("ua-parser-js");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const allRecordedEvents = [];

app.post("/record", (req, res) => {
  let ua = uap(req.headers["user-agent"]);
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
  console.log(ua);
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
  res.json(allRecordedEvents);
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
