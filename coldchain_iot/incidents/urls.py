from django.urls import path
from .views import (
    IncidentListAPIView,
    AcceptIncidentAPIView,
    RefuseIncidentAPIView,
    ResolveIncidentAPIView
)

urlpatterns = [
    path("all/", IncidentListAPIView.as_view()),
    path("accept/<int:incident_id>/", AcceptIncidentAPIView.as_view()),
    path("refuse/<int:incident_id>/", RefuseIncidentAPIView.as_view()),
    path("resolve/<int:incident_id>/", ResolveIncidentAPIView.as_view()),
]
