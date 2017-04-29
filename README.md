[![Build Status](https://travis-ci.org/baruinho/cashier.svg?branch=master)](https://travis-ci.org/baruinho/cashier)

# Cashier
It resumes your accounts balance at a given time.

# Config

The configuration file is `conf/cashier.yml`.

# MongoDB

Cashier depends on mongodb. Its URI can be set on config file.

# Environment

All the environment variables can be set with a `.env` file. When cashier is started for the first time, this file will be created at the root of the app.

Table: Available environment variables

| Name | Default | Description |
|:----:|:-------:|:-----------:|
| NODE_ENV | production | Can be set to `development`, enabling alpha features and more detailed logs. |

# Running

```
npm install
npm start
```

The API will be running on http://localhost:8081/api/v1
