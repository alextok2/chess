# Generated by Django 4.0.6 on 2022-07-22 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FIO', models.CharField(blank=True, max_length=255)),
                ('login', models.CharField(max_length=64)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
    ]
