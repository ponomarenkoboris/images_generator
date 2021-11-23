from django.urls import path
from .views import Collectables, TokenMetadata, AlgorithmConfiguration, GetConf

urlpatterns = [
    path('create-assets/', Collectables.as_view()),
    path('set-token-metadata/', TokenMetadata.as_view()),
    path('set-algorithm-config/', AlgorithmConfiguration.as_view()),
    path('get-setup/', GetConf.as_view())
]