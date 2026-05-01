"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views.
"""

from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from octofit_tracker.views import (
    ActivityViewSet,
    LeaderboardEntryViewSet,
    TeamViewSet,
    UserViewSet,
    WorkoutViewSet,
    api_root,
)

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('teams', TeamViewSet)
router.register('activities', ActivityViewSet)
router.register('workouts', WorkoutViewSet)
router.register('leaderboard', LeaderboardEntryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
