from datetime import date
from djongo import models


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class User(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    fitness_level = models.CharField(max_length=80, default='Beginner')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=120)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    date = models.DateField(default=date.today)

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f'{self.activity_type} for {self.user.email} on {self.date}'


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    date = models.DateField(default=date.today)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name


class LeaderboardEntry(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'
        ordering = ['rank']

    def __str__(self):
        return f'{self.user.email} - Rank {self.rank}'
