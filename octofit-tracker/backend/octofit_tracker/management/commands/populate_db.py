from datetime import date
from django.core.management.base import BaseCommand
from octofit_tracker.models import Activity, LeaderboardEntry, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing OctoFit data...')
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel', description='Superhero fitness team for Marvel fans')
        dc = Team.objects.create(name='DC', description='Superhero fitness team for DC fans')

        self.stdout.write('Creating users...')
        peter = User.objects.create(
            email='peter.parker@example.com',
            first_name='Peter',
            last_name='Parker',
            fitness_level='Intermediate',
            team=marvel,
        )
        tony = User.objects.create(
            email='tony.stark@example.com',
            first_name='Tony',
            last_name='Stark',
            fitness_level='Advanced',
            team=marvel,
        )
        bruce = User.objects.create(
            email='bruce.wayne@example.com',
            first_name='Bruce',
            last_name='Wayne',
            fitness_level='Advanced',
            team=dc,
        )
        diana = User.objects.create(
            email='diana.prince@example.com',
            first_name='Diana',
            last_name='Prince',
            fitness_level='Intermediate',
            team=dc,
        )

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=peter, activity_type='Running', duration_minutes=30, calories_burned=320, date=date.today())
        Activity.objects.create(user=tony, activity_type='Cycling', duration_minutes=45, calories_burned=520, date=date.today())
        Activity.objects.create(user=bruce, activity_type='Strength Training', duration_minutes=50, calories_burned=480, date=date.today())
        Activity.objects.create(user=diana, activity_type='Yoga', duration_minutes=40, calories_burned=220, date=date.today())

        self.stdout.write('Creating workouts...')
        Workout.objects.create(user=peter, name='Spider Sprint', description='High-intensity interval training for speed', completed=True, date=date.today())
        Workout.objects.create(user=tony, name='Iron Circuit', description='Full-body strength and recovery workout', completed=False, date=date.today())
        Workout.objects.create(user=bruce, name='Bat Core', description='Advanced core and agility routine', completed=True, date=date.today())
        Workout.objects.create(user=diana, name='Amazon Flex', description='Mobility and strength session', completed=False, date=date.today())

        self.stdout.write('Creating leaderboard entries...')
        LeaderboardEntry.objects.create(user=tony, score=980, rank=1)
        LeaderboardEntry.objects.create(user=bruce, score=920, rank=2)
        LeaderboardEntry.objects.create(user=diana, score=880, rank=3)
        LeaderboardEntry.objects.create(user=peter, score=850, rank=4)

        self.stdout.write(self.style.SUCCESS('OctoFit test data populated successfully.'))
