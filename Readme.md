### Test task
Для запуска приложения необходимо:
1. Склонировать его себе на локальный компьтер, с помощью команды.
```shell
  git clone https://github.com/DennyTim/TestTask.git
```
2. Создать в папке `config` файл `default.json` c необходимым содержим, которое будет включать ссылку с авторизационными данными к базе данных `mongo` к примеру на облачных хранилищах `Mlab`
или `MongoAtlas`:
```JSON
{
  "mongoURI": "mongodb+srv://<login>:<password>@cluster11111aq.mongodb.net/test?retryWrites=true"
}
```
3. Далее необходимо установить в корневой директории необходимые зависимости:
```shell
npm install
```
и также в клиентской части 
```shell
$ cd client
$ npm install
```
4. После удачной установки, перейти на уровень выше и запустить проект:
```shell
$ cd ..
$ npm run dev
```