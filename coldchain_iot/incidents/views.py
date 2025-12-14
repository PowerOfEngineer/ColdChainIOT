from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Incident, IncidentHistory
from .serializers import IncidentSerializer


class IncidentListAPIView(ListAPIView):
    queryset = Incident.objects.all().order_by("-created_at")
    serializer_class = IncidentSerializer
    permission_classes = [IsAuthenticated]


class AcceptIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        incident.status = "IN_PROGRESS"
        incident.assigned_to = request.user
        incident.save()

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="ACCEPTED",
            comment="Incident accepté par le technicien"
        )

        return Response({"message": "Incident accepté"})


class RefuseIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        incident.attempt_count += 1
        incident.save()

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="REFUSED",
            comment=f"Refus tentative {incident.attempt_count}"
        )

        return Response({"message": "Incident refusé"})


class ResolveIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        incident = get_object_or_404(Incident, pk=pk)

        incident.status = "RESOLVED"
        incident.resolved_at = timezone.now()
        incident.save()

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="RESOLVED",
            comment="Incident résolu"
        )

        return Response({"message": "Incident résolu"})
