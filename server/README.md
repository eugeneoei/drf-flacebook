# Django REST Framework API

# Getting Started

TODO

# Dependencies

- `django`
- `djangorestframework`
- `psycopg2-binary`
- `djangorestframework-simplejwt`
- `python-dotenv`
- `drf-nested-routers`

# Commands

### Create an app

- `python manage.py startapp <app-name>`

### Generate migration file

- `python manage.py makemigrations <app-name>`

### Execute migration

- `python manage.py migrate <app-name>`

### Start Django Server

- `python manage.py runserver`


# Resources

- [What is the difference between `create` method in `views.py` vs `create` method in `serializers.py`](https://stackoverflow.com/questions/63630590/drf-create-method-in-viewset-or-in-serializer)

- [When to use Serializer's create() and ModelViewset's perform_create()](https://stackoverflow.com/questions/41094013/when-to-use-serializers-create-and-modelviewsets-perform-create)

- [Understanding Views in Django Rest Framework](https://testdriven.io/blog/drf-views-part-1/)

- [Creating a custom user model](https://testdriven.io/blog/django-custom-user-model/)

- [Implementing djangorestframework-simplejwt](https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8)

- Implementing custom pagination
    - [Using custom pagination](https://stackoverflow.com/questions/72105628/get-next-page-number-instead-of-next-page-link-django-rest-framework)
    - [Return relative url instead of absolute url](https://stackoverflow.com/questions/26895616/django-rest-pagination-relative-url-instead-of-absolute-url-in-listapiview)