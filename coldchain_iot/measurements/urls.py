from django.urls import path
from .views import MeasurementCreateAPIView, MeasurementListAPIView

urlpatterns = [
    path('mesures/', MeasurementCreateAPIView.as_view()),
    path('mesures/all/', MeasurementListAPIView.as_view()),
]
