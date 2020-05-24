cd ..
cp proto/small.proto webform/docker/editor/static/editor
python3 setup.py build
cp build/lib/ord_schema/proto/small_pb2.py webform/docker/editor
rm -r build