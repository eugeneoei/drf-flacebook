# Generated by Django 4.1.1 on 2022-09-27 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("comments", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="comment",
            options={"ordering": ["created_at"]},
        ),
    ]
