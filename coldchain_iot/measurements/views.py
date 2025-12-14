from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from django.conf import settings

from .models import Measurement
from .serializers import MeasurementSerializer, MeasurementReadSerializer
from sensors.models import Sensor
from incidents.models import Incident


# 🔹 API ESP8266 → POST mesures (clé API)
class MeasurementCreateAPIView(APIView):
    authentication_classes = []   # pas de JWT pour l’ESP
    permission_classes = []

    def post(self, request):
        api_key = request.headers.get("X-API-KEY")

        if api_key != settings.ESP_API_KEY:
            raise PermissionDenied("Invalid ESP API Key")

        serializer = MeasurementSerializer(data=request.data)

        if serializer.is_valid():
            measurement = serializer.save()
            sensor = measurement.sensor
            temp = measurement.temperature

            # Vérification des seuils
            if temp < sensor.min_temp or temp > sensor.max_temp:
                Incident.objects.create(
                    sensor=sensor,
                    temperature=temp,
                    description="Température hors seuil"
                )

            return Response(
                {"message": "Measurement saved"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔹 API Dashboard React → GET mesures (JWT obligatoire)
class MeasurementListAPIView(ListAPIView):
    serializer_class = MeasurementReadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Measurement.objects.all().order_by('-created_at')

        if sensor_id:
            qs = qs.filter(sensor_id=sensor_id)

        return qs
