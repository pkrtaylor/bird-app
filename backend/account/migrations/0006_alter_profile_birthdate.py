# Generated by Django 4.2.2 on 2023-07-20 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_profile_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='birthdate',
            field=models.DateField(auto_now_add=True),
        ),
    ]
