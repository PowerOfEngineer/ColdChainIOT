from rest_framework import serializers
from .models import Measurement
from sensors.models import Sensor

class MeasurementSerializer(serializers.ModelSerializer):
    sensor_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Measurement
        fields = ['id', 'sensor_id', 'temperature', 'humidity', 'created_at']
        read_only_fields = ['id', 'created_at']  # 🔥 OBLIGATOIRE

    def create(self, validated_data):
        sensor_id = validated_data.pop("sensor_id")
        sensor = Sensor.objects.get(id=sensor_id)
        measurement = Measurement.objects.create(sensor=sensor, **validated_data)
        return measurement


class MeasurementReadSerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.name', read_only=True)
    sensor_location = serializers.CharField(source='sensor.location', read_only=True)

    class Meta:
        model = Measurement
        fields = [
            'id',
            'sensor_name',
            'sensor_location',
            'temperature',
            'humidity',
            'created_at'
        ]
