from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import random

class EmailView(APIView):

    def post(self, request):

        email = request.data.get("email")
        # otp = random.randint(1000, 9999)
        otp = 1111
        password_ = str(otp)
        isRegistered = User.objects.filter(email=email)
        if not isRegistered:
            user = User.objects.create_user(username=email, email=email, password=password_)
            auth = authenticate(username=email, password=password_)
            user.save()
        else:
            user = isRegistered[0]
            print("updating password", user)
            user.set_password(password_)
            user.save()
        # sendOTP(email, otp)
        print("otp", password_)
        response = {
            "message": f"OTP Sent Successfully {otp}"
        }
        return Response(response, status=status.HTTP_200_OK)

class VerifyEmailView(APIView):

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        user = User.objects.get(email=email)
        print(user)
        user_ = authenticate(request, username=email, password=str(otp))
        if not user_:
            response = {
                "message": "Incorrect OTP"
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)

        try:
            old_token = Token.objects.filter(user=user)
            old_token.delete()
            token = Token.objects.create(user=user)
        except:
            token = Token.objects.create(user=user)


        # if not old_token:
        #     token = Token.objects.create(user=user)
        # else:
        #     old_token.delete()
        #     token = Token.objects.create(user=user)

        response = {
            "email": email,
            "token": token.key,
        }
        return Response(response, status=status.HTTP_200_OK)

class TestingView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response("ok", status=status.HTTP_200_OK)