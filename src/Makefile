gen_pb:
	protoc --proto_path=proto proto/*.proto \
    --js_out=import_style=commonjs:./proto \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto

clean:
	rm proto/*.js

