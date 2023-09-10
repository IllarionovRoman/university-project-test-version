from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = 'image'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = '__all__'

class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainers
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)
    class Meta:
        model = Event
        fields = '__all__'

class PodEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodEvent
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)

    class Meta:
        model = Sections
        fields = '__all__'


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Awards
        fields = '__all__'


