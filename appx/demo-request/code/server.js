const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// 加载.proto文件
const packageDefinition = protoLoader.loadSync('../../proto/hello.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const hello = protoDescriptor.hello;

function good(call, callback) {
  console.log('good:', call, call.request.name);
  callback(null, { message: 'xxx ' + call.request.name });
}

function main() {
  const server = new grpc.Server();
  server.addService(hello.AppService.service, { good: good });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running on port 50051...');
}

main();
