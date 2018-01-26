from basketball_apis.base_basketball_api import BaseBasketballApi
from configurations import configurations
import json
import requests

class FantasydataApi(BaseBasketballApi):
    def get_yesterday_matches(self):
        try:
            url = 'http://api.fantasydata.net/v3/nba/scores/JSON/GamesByDate/2018-JAN-25'
            params = {}
            headers = {
                'Ocp-Apim-Subscription-Key': configurations['api_key'],
            }

            response = requests.get(url=url, params=params, headers=headers)
            print(dir(response))
            print(response.json())

            response_data = []

            for match in response.json():
                response_data.append({
                    'firts_team': match['HomeTeam'],
                    'second_team': match['AwayTeam'],
                    'first_team_score': match['HomeTeamScore'],
                    'second_team_score': match['AwayTeamScore']
                })

            return response_data
        except Exception as e:
            print(e)