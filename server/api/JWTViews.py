from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework.response import Response
from django.contrib.auth import user_logged_in

class ObtainJWTView(ObtainJSONWebToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if(response.data and 'token' in response.data):
            serializer = self.get_serializer(data=request.data)
            if(serializer.is_valid()):
                user = serializer.object.get('user')
                reaction = user_logged_in.send(sender=None, request=request, user=user)
                # print(reaction)
                response.data['usergroup'] = user.groups.all()[0].name
                response.data['multi_profile'] = (response.data['usergroup']=='PATIENT' and user.person.patient_type=='E')
                response.data['logout_info'] = reaction[1][1].id
        return response

obtain_jwt_token = ObtainJWTView.as_view()
