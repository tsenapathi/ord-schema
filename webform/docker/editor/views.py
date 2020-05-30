# Copyright 2020 The Open Reaction Database Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.http import HttpResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from ord_schema import validations
from ord_schema.proto import reaction_pb2
import json

def clone(request):
    template = loader.get_template('editor/clone.html')
    context = {}
    return HttpResponse(template.render(context, request))

def identifier(request):
    template = loader.get_template('editor/identifier.html')
    context = {}
    return HttpResponse(template.render(context, request))

@require_http_methods(["GET", "POST"])
def send_protobuf(request):
    body = request.body
    reaction = reaction_pb2.Reaction()
    reaction.ParseFromString(body)
    print("received reaction:", reaction)

    response = ""

    errors = validations.validate_message(reaction, raise_on_error=False)
    print(errors)
    # # TODO Is sending an empty message (to represent no erros) problematic?
    # # It could be a confusing sentinel value
    # if len(errors) == 0:
    #     errors += "No errors found in validation"
    response += json.dumps(errors)

    # 1/0
    return HttpResponse(response)