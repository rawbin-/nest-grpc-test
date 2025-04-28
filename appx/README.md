This is a repo demo for HTTP and GRPC API

# for HTTP

```aiignore
curl http://localhost:5000/great
```

We get(always)

```aiignore
{
    "code": 0,
    "statusCode": 1,
    "data": {
        "nullValue": null,
        "zeroValue": 0,
        "message": "great"
    }
}
```

# for GRPC

## With Jetbrains HTTPClient

But it's OK with Postman(with the zero value code)

```aiignore
GRPC localhost:6000/hello.AppService/great
```

We get(always)

```aiignore
{
  "data": {
    "nullValue": "null",
    "undefinedValue": "undefined",
    "zeroValue": "0",
    "message": "great"
  },
  "statusCode": 1
}
```

## With Postman

We get(always)

```aiignore
{
    "data": {
        "nullValue": "null",
        "undefinedValue": "undefined",
        "zeroValue": "0",
        "message": "great"
    },
    "code": 0,
    "statusCode": 1
}
```

## With grpcurl

```aiignore
grpcurl --import-path ./appx/proto/ --proto hello.proto  --plaintext localhost:6000 hello.AppService/great
```

We get

```aiignore
{
  "data": {
    "message": "great",
    "nullValue": "null",
    "undefinedValue": "undefined",
    "zeroValue": "0"
  },
  "statusCode": 1
}
```

## With Code

```aiignore
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../proto/hello.proto', {
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

```

the concerned difference is the zero value code in GRPC response is missing even when we has configured

```aiignore
app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:6000', // gRPC 服务的地址和端口
        package: 'hello', // proto 文件中的 package 名称
        protoPath: join(__dirname, '../proto/hello.proto'), // proto 文件路径
        loader: {
          defaults: true, // expected to get the zero value code in response
          arrays: true,
          objects: true,
          json: true,
        },
      },
    },
```

# summary

for GRPC

- with Postman we always get the zero value code in response whether loader.defaults is true
- with GRPC Client code we always get the zero value code in response whether loader.defaults is true
- with grpcurl we always cannot get the zero value code in response whether loader.defaults is true
- with Jetbrains HTTPClient we always cannot get the zero value code in response whether loader.defaults is true
