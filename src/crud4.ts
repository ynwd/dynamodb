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
    "year": year,
    "title": title,
  },
  UpdateExpression: "set info.rating = info.rating + :val",
  ExpressionAttributeValues: {
    ":val": 1,
  },
  ReturnValues: "UPDATED_NEW",
};

console.log("Updating the item...");

docClient.update(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});
