# from rest_framework.permissions import BasePermission
#
#
# class IsAuthOwner(BasePermission):
#     """
#     # custom message to return should permission fails
#     """
#     message = "Forbidden from accessing user."
#
#     def has_object_permission(self, request, view, obj):
#         return obj.email == request.user.email
