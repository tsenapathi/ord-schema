# Webform

This directory is for a webform, which allows users to enter reactions according to the schema.

Code is largely derived from <https://github.com/json-editor/json-editor>.

## Usage

To run locally, install Docker Compose. Then, run `./build.sh` (to copy some external dependencies). Next, `run sudo docker-compose up --build` from within the `docker` folder (the --build flag can be very important!). Finally, navigate to <http://localhost:80/editor/clone>.  Note that this does not use uWSGI.

Or, try it out on <http://34.95.67.173/editor/clone>! Note that **this version may use an out-of-date schema**. This uses uWSGI and Django on Google Compute Engine for deployment.

## Goals

A markup of the form, and validation features to be implemented, can be found [here](https://docs.google.com/document/d/1kinvTzbyCM3YVUqZoSbhFKePGoYNPElhrGs7PILDPWo/edit).

## Deployment

TODO explain these more
How to deploy on Google