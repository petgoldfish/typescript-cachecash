#!/bin/sh

# TODO: protobuf defintion should be a submodule?

protoc \
	--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
	--ts_out=service=true:./src/proto \
	--js_out=import_style=commonjs,binary:./src/proto \
	--proto_path=../go-cachecash/ccmsg \
	../go-cachecash/ccmsg/cachecash.proto
node_modules/.bin/prettier --write src/proto/*.ts src/proto/*.js
