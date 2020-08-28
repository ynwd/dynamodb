import AWS = require("aws-sdk");
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

let serviceConfigOptions: ServiceConfigurationOptions = {
  region: "us-west-2",
  endpoint: "http://192.168.99.122:8000",
};

AWS.config.update(serviceConfigOptions);

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Movies",
};

dynamodb.deleteTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to delete table. Error JSON:",
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log(
      "Deleted table. Table description JSON:",
      JSON.stringify(data, null, 2),
    );
  }
});
