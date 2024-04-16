const io = require("socket.io-client");

const socket = io("ws://62.171.176.99:3000");

socket.on("connect", () => console.log("Connected to server"));

(async () => {
  const todayPredictions = new Map();

  socket.on("new_predictions", (predictions) => {
    predictions.forEach((prediction) =>
      todayPredictions.set(prediction._id, prediction)
    );
  });

  socket.on("successful_prediction", (successfulPrediction) => {
    const foundPrediction = todayPredictions.has(
      successfulPrediction.prediction._id
    );
    if (foundPrediction) {
      const prediction = todayPredictions.get(
        successfulPrediction.prediction._id
      );
      console.log("++++++++PREDICTION++++++++", prediction);
      console.log(
        "++++++++EARTHQUAKE++++++++",
        successfulPrediction.earthquake
      );
    }
  });
})();
