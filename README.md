# Basket_App
A simple web application that shows to the user the scores from NBA mathes from the previous day. 

Backend: Python with Flask

Database: mySQL

Frontend: React

## Setup
Get the code in your machine, for example cloning it:
```
git clone https://github.com/SVladkov/Basket_App
```

### Server
Go to server/ directory and install the requirements (create a virtualenv if you want):
```
pip install -r requirements.txt
```

Create a configurations.py file, a copy of exampleConfigurations.py. Set the ```api_key``` for the score api and the ```username``` and ```password``` of the database.

Create the database:
``` 
mysql -u USER -pPASSWORD
CREATE DATABASE Basketball;
```

### Client
Go to client/ directory and install the modules:
```
npm install
```

## Runing the application
### Server
In server/ directory:
```
python api.py
```

### Client
In client/ directory:
```
npm install
```

Please give me feedback :)
