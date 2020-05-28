cd ..
cp proto/reaction.proto webform/docker/editor/static/editor

python3 setup.py build
cp ord_schema webform/docker -r
rm -r build