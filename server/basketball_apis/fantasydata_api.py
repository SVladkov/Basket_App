from basketball_apis.base_basketball_api import BaseBasketballApi
from configurations import configurations
import json
import requests
from basketball_apis.fantasydata_transformers import FantasyDataTransformers
from datetime import datetime, timedelta

MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

class FantasydataApi(BaseBasketballApi):
    def __init__(self):
        self.data_transformers = FantasyDataTransformers()

    def get_teams_data(self):
        try:
            url = 'http://api.fantasydata.net/v3/nba/scores/JSON/teams'
            params = {}
            headers = {
                'Ocp-Apim-Subscription-Key': configurations['api_key'],
            }
            response = requests.get(url=url, params=params, headers=headers)

            return response.json()
        except Exception as e:
            print(e)

    def get_yesterday_matches(self):
        try:
            yesterday = datetime.today() - timedelta(days=1)
            print(yesterday.day)
            print(yesterday.month)
            print(yesterday.year)

            url = 'http://api.fantasydata.net/v3/nba/scores/JSON/GamesByDate/{}-{}-{}'.format(yesterday.year, MONTHS[yesterday.month-1], yesterday.day)
            print(url)

            url = 'http://api.fantasydata.net/v3/nba/scores/JSON/GamesByDate/2017-DEC-25'
            params = {}
            headers = {
                'Ocp-Apim-Subscription-Key': configurations['api_key'],
            }
            response = requests.get(url=url, params=params, headers=headers)

            teams = self.get_teams_data()
            teams_as_dict = self.data_transformers.get_teams_names_and_logos_as_dict(teams)

            response_data = self.data_transformers.get_matches_teams_and_scores(response.json(), teams_as_dict)

            return response_data
        except Exception as e:
            print(e)