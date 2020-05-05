from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from editor.small_pb2 import *

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
    int_values = [x for x in body]
    print(int_values)
    print(ReactionIdentifier)
    return HttpResponse("Here's a response")