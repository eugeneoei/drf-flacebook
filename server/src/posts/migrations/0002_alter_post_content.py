# Generated by Django 4.1.1 on 2022-09-30 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("posts", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="content",
            field=models.TextField(),
        ),
    ]
