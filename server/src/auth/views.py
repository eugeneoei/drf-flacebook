from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from users.serializers import UserSerializer


# from .permissions import IsAuthOwner


class AuthDetail(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get_object(email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user = self.get_object(request.user.email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
