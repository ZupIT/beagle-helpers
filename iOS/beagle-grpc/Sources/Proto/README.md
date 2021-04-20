## Generating the source code

Requirements:

- Protocol Buffer Compiler `protoc`, binary releases are available on [GitHub][protobuf-releases].
- [gRPC-Swift][grpc-swift] plugins `protoc-gen-swift` and `protoc-gen-grpc-swift`, [see how to build them][grpc-plugins].

How to generate the code:

```bash
protoc ./*.proto \
  --plugin=protoc-gen-swift \
  --swift_out=. \
  --swift_opt=Visibility=Public \
  --plugin=protoc-gen-grpc-swift \
  --grpc-swift_out=. \
  --grpc-swift_opt=Visibility=Public,Client=true,TestClient=true,Server=false
```

[Check the docs][plugin-options] to see all the options available.

[protobuf-releases]: https://github.com/protocolbuffers/protobuf/releases
[grpc-swift]: https://github.com/grpc/grpc-swift
[grpc-plugins]: https://github.com/grpc/grpc-swift#getting-the-protoc-plugins
[plugin-options]: https://github.com/grpc/grpc-swift/blob/main/docs/plugin.md#plugin-options
