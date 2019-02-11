# serverless-cart-api

## Usage

### Running the service locally
Run a local version of Dynamo DB
- npm run start-db 

Run the migration and seeding
- npm run db-init

Run API gateway and lambda locally using serverless offline
- npm run start-service

### Running the tests
- First start the db, run the migration and seeding
- npm run test

## Endpoints

### Echo

```bash
curl http://localhost:3000/v1/echo
```

Note: created this to check my set up

### Get all products

```bash
curl http://localhost:3000/v1/products
```

Response example
```
[{"name":"Sledgehammer","price":125.76,"id":"c9b9a282-5fab-49c3-85a2-b47440193744"},{"name":"Hacksaw","price":19.45,"id":"c9626ea2-6a9a-4c50-8c2a-d9f85556c362"},{"name":"Bandsaw","price":562.14,"id":"6e1b5cce-5fbd-4522-b789-a74483684e6c"},{"name":"Axe","price":190.51,"id":"5e691e38-b2c9-4ecc-93f9-083c186a6142"},{"name":"Chisel","price":13.9,"id":"d57d0350-6d82-4436-8f8c-03072cb8da9c"}]
```

### Create a cart

```bash
curl -X POST http://localhost:3000/v1/carts
```
Response example
```
{"id":"614db0ad-e62d-44a0-833b-44f1d1df3946","products":[]}
```


### Get a cart

```bash
curl http://localhost:3000/v1/carts/614db0ad-e62d-44a0-833b-44f1d1df3946
```
Response example
```
{"id":"614db0ad-e62d-44a0-833b-44f1d1df3946","products":[{"name":"Chisel","price":13.9,"id":"d57d0350-6d82-4436-8f8c-03072cb8da9c","quantity":2,"total":27.8},{"name":"Bandsaw","price":562.14,"id":"6e1b5cce-5fbd-4522-b789-a74483684e6c","quantity":5,"total":2810.7}],"total":2838.5}%
```

### update a cart
e.g. add 7 bandsaws
```bash
curl -X PUT http://localhost:3000/v1/carts/614db0ad-e62d-44a0-833b-44f1d1df3946/products/6e1b5cce-5fbd-4522-b789-a74483684e6c --data '{ "quantity": 7 }'
```
Response example
```
{"id":"614db0ad-e62d-44a0-833b-44f1d1df3946","products":[{"name":"Chisel","price":13.9,"id":"d57d0350-6d82-4436-8f8c-03072cb8da9c","quantity":2,"total":27.8},{"name":"Bandsaw","price":562.14,"id":"6e1b5cce-5fbd-4522-b789-a74483684e6c","quantity":7,"total":3934.98}],"total":3962.78}
```


### remove product from cart
e.g remove the bandsaws
```bash
curl -X PUT http://localhost:3000/v1/carts/614db0ad-e62d-44a0-833b-44f1d1df3946/products/6e1b5cce-5fbd-4522-b789-a74483684e6c --data '{ "quantity": 0 }'
```
Response example
```
"id":"614db0ad-e62d-44a0-833b-44f1d1df3946","products":[{"name":"Chisel","price":13.9,"id":"d57d0350-6d82-4436-8f8c-03072cb8da9c","quantity":2,"total":27.8}],"total":27.8}
```