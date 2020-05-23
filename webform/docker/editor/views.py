from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from editor import small_pb2

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
    reaction = small_pb2.Reaction()
    reaction.ParseFromString(body)
    print(reaction)

    response = "Got the reaction\n"

    response += "Identifier types:\n"
    identifiers = reaction.identifiers
    identifier_type_enum = small_pb2.ReactionIdentifier.IdentifierType
    for identifier in identifiers:
        identifier_type_name = identifier_type_enum.Name(identifier.type)
        print(identifier_type_name)
        response += identifier_type_name + "\n"

    return HttpResponse(response)