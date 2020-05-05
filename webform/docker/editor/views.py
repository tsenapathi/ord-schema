from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader


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


def send_protobuf(request):
    return JsonResponse({'key': "Here's a response"})