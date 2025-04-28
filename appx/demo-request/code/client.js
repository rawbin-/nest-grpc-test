const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../../proto/hello.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: false,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const hello = protoDescriptor.hello;

const client = new hello.AppService(
  'localhost:6000',
  grpc.credentials.createInsecure(),
);

client.good({}, function (err, response) {
  console.log('Greeting:', response);
});
