import AWS = require("aws-sdk");
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

let serviceConfigOptions: ServiceConfigurationOptions = {
  region: "us-west-2",
  endpoint: "http://192.168.99.122:8000",
};

AWS.config.update(serviceConfigOptions);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");
var params: AWS.DynamoDB.DocumentClient.QueryInput = {
  TableName: "Movies",
  ProjectionExpression: "#yr, title, info.rating",
  FilterExpression: "#yr between :start_yr and :end_yr",
  ExpressionAttributeNames: {
    "#yr": "year",
  },
  ExpressionAttributeValues: {
    ":start_yr": 1950,
    ":end_yr": 1959,
  },
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(
  err: AWS.AWSError,
  data: AWS.DynamoDB.DocumentClient.QueryOutput,
) {
  if (err) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(err, null, 2),
    );
  } else {
    // print all the movies
    console.log("Scan succeeded.");
    if (data && data.Items) {
      data.Items.forEach(function (movie) {
        console.log(
          movie.year + ": ",
          movie.title,
          "- rating:",
          movie.info.rating,
        );
      });
    }

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    }
  }
}
