from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework.response import Response

class ObtainJWTView(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        print("WOW:",response.data)
        if(response.data and response.data['token']):
            serializer = self.get_serializer(data=request.data)
            if(serializer.is_valid()):
                user = serializer.object.get('user')
                response.data['usergroup'] = user.groups.all()[0].name
        return response

obtain_jwt_token = ObtainJWTView.as_view()
