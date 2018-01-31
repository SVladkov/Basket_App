from resources.users import (
    AuthenticationResource,
    LogoutResource,
    RegisterResource,
    ProfileResource
)
from resources.matches import MatchesResource
from basketball_apis.fantasydata_api import FantasydataApi

class Routing():
    def add_resources(api):
        api.add_resource(AuthenticationResource, '/login')
        api.add_resource(LogoutResource, '/logout')
        api.add_resource(RegisterResource, '/register')
        api.add_resource(ProfileResource, '/profile')

        api.add_resource(MatchesResource, '/yesterday-matches', resource_class_kwargs={'basketball_api': FantasydataApi})
