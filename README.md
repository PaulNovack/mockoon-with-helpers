### mockoon with helpers
Install dependancies

<code>npm install --save-dev @mockoon/cli handlebars handlebars-helpers</code>

### Helpful commands

#### Start

<code>
sudo ./startMockoon.sh
</code>

### Kill Server

Already done in startMockoon.sh script.

<code>
sudo kill -9 $(lsof -ti :3001)
</code>`

### Add Commands
Follow the examples of hello, cardType and errorCode

### Docker

docker build -t fu_mockoon .

docker run --rm -it   -v "$(pwd)":/app   -p 3000:3000   fu_mockoon


### Get endpoint included

curl -X GET "http://127.0.0.1:3000/?title=Hello&number=4688390729972915&letter=5&amount=99104"

Configuration for this endpoint in demo.json

Configurations are editable by Mockoon UI.

The custom handlebars helper methods will not run with the server that the UI starts.

The server must be started here.

<code>
{
  "data": "hello",

  "uuid": "{{uuid}}",

  "created_at": "{{now 'yyyy-MM-ddTHH:mm:ss.SSS'}}",

  "debugNumber": "{{queryParam 'number'}}",

  "helloworld" : "{{hello}}",

  "body": "{{add 7 5}}",

  "test": "{{test "foobar" (toRegex "^foo$")}}",

  "body2": "2 + 3 = {{add 2 3}}, hello = {{hello}}",

  "cardType": "{{cardType (queryParam 'number')}}",

  "errorCode" : "{{declineCode (queryParam 'amount')}}",

  "errorDescription": {{errorDescription (queryParam 'amount')}}""


}
</code>

![Screenshot from 2025-06-01 22-17-50.png](Screenshot%20from%202025-06-01%2022-17-50.png)

