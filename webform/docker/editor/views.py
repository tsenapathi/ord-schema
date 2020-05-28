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
from django.http import JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from ord_schema import validations
from ord_schema.proto import reaction_pb2

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
    # print("bytearray:", [x for x in body])
    # print("decoded:", body.decode('utf-8'))

    reaction = reaction_pb2.Reaction()
    reaction.ParseFromString(body)
    print(reaction)

    response = "Got the reaction\n"
    response += "Identifier types:\n"
    identifiers = reaction.identifiers
    identifier_type_enum = reaction_pb2.ReactionIdentifier.IdentifierType
    for identifier in identifiers:
        identifier_type_name = identifier_type_enum.Name(identifier.type)
        print(identifier_type_name)
        response += identifier_type_name + "\n"

    return HttpResponse(response)