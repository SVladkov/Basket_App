class FantasyDataTransformers():
    def get_matches_teams_and_scores(self, matches, teams):
        response_data = []

        for match in matches:
            first_team = teams[match['HomeTeam']]
            second_team = teams[match['AwayTeam']]

            response_data.append({
                'first_team': {
                    'name': first_team['name'],
                    'logo': first_team['logo'],
                    'score': match['HomeTeamScore']
                },
                'second_team': {
                    'name': second_team['name'],
                    'logo': second_team['logo'],
                    'score': match['AwayTeamScore']
                }
            })

        return response_data

    def get_teams_names_and_logos_as_dict(self, teams):
        response_data = {}

        for team in teams:
            response_data[team['Key']] = {
                'name': team['Name'],
                'logo': team['WikipediaLogoUrl']
            }

        return response_data
