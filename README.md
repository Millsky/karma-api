# Karma API

## About

The Karma API is a way to give users karma!

## Getting Started

### Prerequisites

1. Docker
2. Docker Compose
3. Port 8080 is available

### Running the API locally

Simply run `export POSTGRES_DB=karma && export POSTGRES_PASSWORD=admin && POSTGRES_USER=admin && docker-compose up`, the API should then be available at `localhost:8080`.

#### Note

Please update these environment variable values with a database user and not the superuser.

## API

### POST `api/v1/user`

Adds a user

#### REQUEST BODY:

```JSON
  {
    "email": "example@example.com"
  }
```
#### RESPONSE BODY:

```JSON
{
  "user_id": "e799061c-ce77-4082-9d05-8a9dde8a96c4",
  "created_at": "TIMESTAMP",
  "email": "example@example.com"
}
```

### GET `api/v1/user/${user_id}`

Retrieves the user

#### RESPONSE BODY:

```JSON
{
  "user_id": "e799061c-ce77-4082-9d05-8a9dde8a96c4",
  "created_at": "TIMESTAMP",
  "email": "example@example.com"
}
```

### GET `api/v1/user/${user_id}/karma`

Retrieves the users karma

#### RESPONSE BODY:

```JSON

```

### POST `api/v1/karma`

Adds an entry to the users Karma

#### REQUEST BODY:

```JSON
{
  "from_user_id": "e799061c-ce77-4082-9d05-8a9dde8a96c4",
  "to_user_id": "f799061c-de77-7082-5e05-2a9ffe4a91c5",
  "group_id": "g799061c-de77-9082-6q90-4v9nnq4e91c5",
  "message": "some string here"
}
```

#### RESPONSE BODY:

```JSON
{
  "from_user_id": "e799061c-ce77-4082-9d05-8a9dde8a96c4",
  "to_user_id": "f799061c-de77-7082-5e05-2a9ffe4a91c5",
  "group_id": "g799061c-de77-9082-6q90-4v9nnq4e91c5"
  "message": "some string here"
}
```
