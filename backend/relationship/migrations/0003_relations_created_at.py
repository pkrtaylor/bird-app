# Generated by Django 4.2.1 on 2023-06-14 02:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('relationship', '0002_relations_relation_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='relations',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]