from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    progress = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = '__all__'