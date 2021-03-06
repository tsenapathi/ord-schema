# A Reaction Editor

A web app for browsing, modifying, and creating submissions to the
Open Reactions Databse.

## Getting Started

```
$ make
$ ./serve.sh
```

This starts service at [http://localhost:5000/](http://localhost:5000/).

## Dependencies

The build needs:
* the `protoc` protobuf compiler;
* the protobuf runtime libraries for Javascript; and
* the Closure Library for Javascript.

Serving depends on:
* the protobuf python package; and
* the Flask python web framework.

And everything requires Python 3.

The editor currently requires HEAD protobuf to get experimental "optional"
declarations in proto3.

```
$ git clone git@github.com:protocolbuffers/protobuf.git
$ cd protobuf
$ ./autogen.sh && ./configure && make
````

The editor has been tested with [Closure
v20200517](https://github.com/google/closure-library/releases/).

Unpack both protobuf and closure-library in this directory so that make can
find them. For the sake of automated testing, statically linked protobuf
dependencies built at GitHub commit 1dae8fdd have been built for Mac and Linux
and are available for download [here](https://storage.googleapis.com/ord-editor-test/editor_test_protobuf_1dae8fdd.tar).

To install the python packages,

```
$ pip install flask
$ pip install protobuf
```

## Testing and Validation

There is an end-to-end test that reads a densely populated Dataset into the
editor, writes it back out again, and asserts that the proto is unchanged.

```
$ ./serve.sh
$ make test
```

The test depends on [Node.js](https://nodejs.org/en/download/) and the
Puppeteer headless Chrome package.

```
$ npm i puppeteer
```

## Packaging and Deployment

There is a make target that bundles all required runtime resources for
deployment to a real server. The output appears at package/ord.tgz.

```
$ make package
```

The output includes the serve.sh script, but you probably want to use a better
web server instead.

You can bundle the built package into a Docker image like

```
docker build -t ord-editor .
```

and then make the editor available on port 80 like

```
docker run -it -p 80:5000 ord-editor
```

Work saved in the Docker container will be lost when the container shuts down,
so remember to download your Dataset when you are done.

## How it Works

Datasets to be edited are stored in the `db/` directory as `.pbtxt` files (protobuf
text format).

When you load a Reaction in the editor, the editor reads the entire Dataset
from the server and maps the content of the chosen Reaction onto the DOM. When
you save, it reverses the process. Javascript functions called "load..." go
from Reaction to DOM, and functions called "unload..." do the reverse.

Some fields like images are too big to go in the DOM. These fields have type
"bytes". When a bytes field is loaded, the load function creates a random token
for it, puts the token in the DOM element, and saves the bytes data in a table.
The unload function reads back the token and uses it to restore the bytes data.

You modify a bytes field by uploading a file. Since Javascript does not have
access to files, the model in this case is different. When you save, the bytes
field in the Reaction is assigned its token and the file is uploaded in a
separate connection with the same token. The server merges the Reaction and its
upload after both are available.

Since the backing store is a file system, writes happen in multiple steps, and
there are no incremental updates, users must take care.

* There is no database. If you kill the server while it's writing you will corrupt the entire Dataset. Forget about concurrent access.

* Really large Datasets need to pass both ways on the network every time you edit them, including all their images.

* Binary data are added by uploading files, and Javascript is not allowed to access files. This means that if you attach a new image to a Reaction, the two must be uploaded separately and merged on the server. This is another opportunity for corruption if the process is interrupted.
