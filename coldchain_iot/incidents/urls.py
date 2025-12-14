from django.urls import path
from .views import (
    IncidentListAPIView,
    AcceptIncidentAPIView,
    RefuseIncidentAPIView,
    ResolveIncidentAPIView
)

urlpatterns = [
    # LISTE DES INCIDENTS
    path("", IncidentListAPIView.as_view(), name="incident-list"),

    # ACTIONS
    path("accept/<int:pk>/", AcceptIncidentAPIView.as_view(), name="incident-accept"),
    path("refuse/<int:pk>/", RefuseIncidentAPIView.as_view(), name="incident-refuse"),
    path("resolve/<int:pk>/", ResolveIncidentAPIView.as_view(), name="incident-resolve"),
]
