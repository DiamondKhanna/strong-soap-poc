var soap = require("strong-soap").soap;
const path = require("path");
const getSoapRequest = require("./request/soaprequest");

async function myCallbackFunction(error, client) {
  let res = client.httpClient.options.responseHandler;
  // let req = client.httpClient.options.request;

  console.log("error", error);

  // dummy request
  let requestArgs = getSoapRequest();

  //downstream method name or action from WSDL
  var method = client["getAllAISPBeneficiaries"];

  let result = await method(requestArgs).then(
    ({ result, envelope, soapHeader }) => {
      // response envelope
      // console.log("Response Envelope: \n" + envelope);

      //'result' is the response body
      // console.log("Result: \n" + JSON.stringify(result));
      return result;
    },
    (err) => {
      console.log("error after method invocation    ", err);
      res.send("ERROR IN DOWNSTREAM CONNECTION");
    }
  );
  console.log(JSON.stringify(result));

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(result));
}

module.exports = async (res) => {
  var wsdlDocument = path.resolve(
    __dirname,
    "../wsdl/BeneAddressBookService.wsdl"
  );
  var options = {
    endpoint:
      "http://shared-jenk-12.sandbox.local:9073/webseries/beneAddressBookService",
    responseHandler: res
  };

  soap.createClient(wsdlDocument, options, myCallbackFunction);
};
