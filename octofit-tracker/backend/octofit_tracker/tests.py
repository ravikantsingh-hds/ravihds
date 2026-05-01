from django.test import TestCase
from django.urls import reverse


class ApiRootTests(TestCase):
    def test_api_root_returns_links(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.json())
        self.assertIn('teams', response.json())
        self.assertIn('activities', response.json())
        self.assertIn('workouts', response.json())
        self.assertIn('leaderboard', response.json())
