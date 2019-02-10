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

```bash
curl -X POST http://localhost:3000/v1/carts
```

