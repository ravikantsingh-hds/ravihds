from rest_framework import serializers
from .models import Activity, LeaderboardEntry, Team, User, Workout


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return data


class TeamSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description']


class UserSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'fitness_level',
            'team',
        ]


class ActivitySerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Activity
        fields = [
            'id',
            'user',
            'activity_type',
            'duration_minutes',
            'calories_burned',
            'date',
        ]


class WorkoutSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Workout
        fields = [
            'id',
            'user',
            'name',
            'description',
            'completed',
            'date',
        ]


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = LeaderboardEntry
        fields = [
            'id',
            'user',
            'score',
            'rank',
        ]
