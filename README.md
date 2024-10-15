<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execute in development

1. Clone repository
2. Execute 
```
npm install

```
3.  Nest Cli install
```
npm i -g @nesjs/cli

```
4. Up Db
```
docker-compose up -d
```


5. Clone file __.env.template__ and rename : __.env__

6. Fill the enviroments vars with real data.

7. Execute the app in dev.
``` 
nest start --watch

``` 
8. Refresh Bd ( GET )
```
 http://localhost:3000/api/v2/seed
 
``` 

# Stack
* MongoBd
* NestJs

