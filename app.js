const httpService = require('./http-service');

async function main() {
  const response = await httpService.get('http://localhost:3000/');

  if (response.error) {
    console.error(response.error);
  } else {
    console.log(response.data);
  }
}

main();
