# Webform

This directory is for a webform, which allows users to enter reactions according to the schema.

Code is largely derived from <https://github.com/json-editor/json-editor>.

## Usage

Try it out on <http://34.95.67.173/editor/clone>! This uses uWSGI and Django for deployment.

To run locally, install Docker. Then, run `sudo docker-compose up` from within the `docker` folder, and navigate to <http://localhost:8000/editor/clone>.

## Goals

A markup of the form, and validation features to be implemented, can be found [here](https://docs.google.com/document/d/1kinvTzbyCM3YVUqZoSbhFKePGoYNPElhrGs7PILDPWo/edit).

## Deployment

TODO explain these more
Generate new pb2 file when necessary
How to deploy on Google
docker-compose up --build (--build flag to install new requirements, this is important!!)
