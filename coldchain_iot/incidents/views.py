from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Incident, IncidentHistory
from .serializers import IncidentSerializer


# ==============================
# LISTE DES INCIDENTS
# ==============================
class IncidentListAPIView(ListAPIView):
    queryset = Incident.objects.all().order_by("-created_at")
    serializer_class = IncidentSerializer
    permission_classes = [IsAuthenticated]


# ==============================
# ACCEPTER UN INCIDENT
# ==============================
class AcceptIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, incident_id):
        incident = get_object_or_404(Incident, id=incident_id)

        if incident.status != "ACTIVE":
            return Response(
                {"detail": "Incident déjà pris en charge"},
                status=400
            )

        incident.status = "IN_PROGRESS"
        incident.assigned_technician = request.user
        incident.save()

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="ACCEPTED",
            comment="Incident accepté par le technicien"
        )

        return Response({"message": "Incident accepté"})


# ==============================
# REFUSER UN INCIDENT + ESCALADE
# ==============================
class RefuseIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, incident_id):
        incident = get_object_or_404(Incident, id=incident_id)

        incident.attempt_count += 1

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="REFUSED",
            comment=f"Refus tentative {incident.attempt_count}/3"
        )

        # Escalade après 3 refus
        if incident.attempt_count >= 3:
            incident.status = "ESCALATED"
            incident.attempt_count = 0
            incident.assigned_technician = None

            IncidentHistory.objects.create(
                incident=incident,
                action="ESCALATED",
                comment="Incident escaladé vers un autre technicien"
            )

        incident.save()

        return Response({"message": "Refus enregistré"})


# ==============================
# RÉSOUDRE UN INCIDENT
# ==============================
class ResolveIncidentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, incident_id):
        incident = get_object_or_404(Incident, id=incident_id)

        if incident.assigned_technician != request.user:
            return Response(
                {"detail": "Vous n’êtes pas assigné à cet incident"},
                status=403
            )

        if incident.status != "IN_PROGRESS":
            return Response(
                {"detail": "Incident non en cours"},
                status=400
            )

        incident.status = "RESOLVED"
        incident.resolved_at = timezone.now()
        incident.save()

        IncidentHistory.objects.create(
            incident=incident,
            technician=request.user,
            action="RESOLVED",
            comment="Incident résolu par le technicien"
        )

        return Response({"message": "Incident marqué comme résolu"})
