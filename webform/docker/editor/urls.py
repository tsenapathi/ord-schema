from django.urls import path

from . import views

urlpatterns = [
    path('clone', views.clone, name='clone'),
    path('identifier', views.identifier, name='identifier'),
    path('send_protobuf', views.send_protobuf, name='send_protobuf')
]