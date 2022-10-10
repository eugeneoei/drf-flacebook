from rest_framework.pagination import CursorPagination


class CustomCursorPagination(CursorPagination):
    # in descending order
    ordering = "-created_at"