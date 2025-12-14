from rest_framework import serializers
from .models import Incident

class IncidentSerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.name', read_only=True)
    sensor_location = serializers.CharField(source='sensor.location', read_only=True)

    class Meta:
        model = Incident
        fields = [
            'id',
            'sensor_name',
            'sensor_location',
            'temperature',
            'status',
            'created_at'
        ]
