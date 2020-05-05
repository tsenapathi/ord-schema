# Webform

This directory is for a webform, which allows users to enter reactions according to the schema.

Code is largely derived from <https://github.com/json-editor/json-editor>.

## Usage

Try it out on <http://34.95.67.173/editor/clone>! This uses uWSGI and Django on Google Compute Engine for deployment.

To run locally, install Docker and Docker Compose. Then, run `sudo docker-compose up --build` from within the `docker` folder, and navigate to <http://localhost:80/editor/clone>. (The --build flag can be very important!) Note that this does not use uWSGI.

Or, in lieu of Docker Compose (only Docker), use the first `CMD` line in the Dockerfile (to not use uWSGI), then run `sudo docker build --tag webform .` and `sudo docker run -p 80:80 webform:latest`. Then navigate to <http://localhost:80/editor/clone>.

## Goals

A markup of the form, and validation features to be implemented, can be found [here](https://docs.google.com/document/d/1kinvTzbyCM3YVUqZoSbhFKePGoYNPElhrGs7PILDPWo/edit).

## Deployment

TODO explain these more
Generate new pb2 file when necessary
How to deploy on Google
docker-compose up --build (--build flag to install new requirements, this is important!!)
