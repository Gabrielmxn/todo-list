const file = require('fs');

file.writeFile('text.json', '[{\n "nome": "gabriel", \n "matricula": 18101098 }]', err => {
  console.log(err);
})