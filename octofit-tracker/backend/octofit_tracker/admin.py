from django.contrib import admin
from .models import Activity, LeaderboardEntry, Team, User, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'fitness_level', 'team')
    search_fields = ('email', 'first_name', 'last_name')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration_minutes', 'calories_burned', 'date')
    list_filter = ('activity_type', 'date')


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'completed', 'date')
    list_filter = ('completed', 'date')


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'rank')
    ordering = ('rank',)
