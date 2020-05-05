from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from editor import small_pb2

def index(request):
    template = loader.get_template('editor/webform.html')
    context = {}
    return HttpResponse(template.render(context, request))

def small(request):
    template = loader.get_template('editor/small.html')
    context = {}
    return HttpResponse(template.render(context, request))

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

    print(body)
    print(type(body))
    int_values = [x for x in body]
    print(int_values)
    print("decoded:" + body.decode('utf-8'))
    
    reaction_unrepeated = small_pb2.ReactionUnrepeated()
    reaction_unrepeated.ParseFromString(body)
    print(reaction_unrepeated)

    identifier_type_enum = reaction_unrepeated.identifiers.IdentifierType
    identifier_type_name = identifier_type_enum.Name(reaction_unrepeated.identifiers.type)
    print(identifier_type_name)

    return HttpResponse("Got the identifier type of " + identifier_type_name)