from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework.response import Response

class ObtainJWTView(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if(response.data and 'token' in response.data):
            serializer = self.get_serializer(data=request.data)
            if(serializer.is_valid()):
                user = serializer.object.get('user')
                response.data['usergroup'] = user.groups.all()[0].name
                response.data['multi_profile'] = (response.data['usergroup']=='PATIENT' and user.person.patient_type=='E')
        return response

obtain_jwt_token = ObtainJWTView.as_view()
