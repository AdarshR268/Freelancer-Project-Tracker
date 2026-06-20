from django.db import models

class Project(models.Model):
    STATUS_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    project_name = models.CharField(max_length=200)
    client_name = models.CharField(max_length=200)
    start_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    @property
    def progress(self):
        progress_map = {
            'Not Started': 0,
            'In Progress': 50,
            'Completed': 100
        }
        return progress_map.get(self.status, 0)

    def __str__(self):
        return self.project_name