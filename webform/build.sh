cd ..
cp proto/reaction.proto webform/docker/editor/static/editor
python3 setup.py build
cp build/lib/ord_schema/proto/reaction_pb2.py webform/docker/editor
cp ord_schema webform/docker -r
rm -r build