import AWS = require("aws-sdk");
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

let serviceConfigOptions: ServiceConfigurationOptions = {
  region: "us-west-2",
  endpoint: "http://192.168.99.122:8000",
};

AWS.config.update(serviceConfigOptions);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";
var params = {
  TableName: table,
  Key: {
    "title": title,
    "year": year,
  },
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to delete item. Error JSON:",
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});
