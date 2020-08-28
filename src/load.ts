var fs = require("fs");
import AWS = require("aws-sdk");
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

let serviceConfigOptions: ServiceConfigurationOptions = {
  region: "us-west-2",
  endpoint: "http://192.168.99.122:8000",
};

AWS.config.update(serviceConfigOptions);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = <any[]> JSON.parse(fs.readFileSync("moviedata.json", "utf8"));
allMovies.forEach(function (movie) {
  var params = {
    TableName: "Movies",
    Item: {
      "year": movie.year,
      "title": movie.title,
      "info": movie.info,
    },
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add movie",
        movie.title,
        ". Error JSON:",
        JSON.stringify(err, null, 2),
      );
    } else {
      console.log("PutItem succeeded:", movie.title);
    }
  });
});
