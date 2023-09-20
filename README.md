## Клиентская часть программы обучения ##

**Установка**

Перед установкой должен быть установлен nodejs и npm.
После этого выполнить.
```bash
yarn
```
Будут загружены необходимые пакеты.

**Тестирование**

````bash
yarn test
````

или

````bash
yarn run test
````

**Запуск**

```bash
yarn run

info Project commands
   - build
      npm run build-css && react-scripts build
   - build-css
      node-sass src/ -o src/
   - cover
      react-scripts test --env=jsdom --coverage
   - eject
      react-scripts eject
   - start
      npm-run-all -p watch-css start-js
   - start-js
      react-scripts start
   - test
      react-scripts test --env=jsdom
   - watch-css
      npm run build-css && node-sass src/ -o src/ --watch --recursive
error No command specified.
Done in 2.65s.
> start-js
```

или

````
yarn run start-js
````

[Демо-версия](http://v.perm.ru/teach)
```
Имя: Черепахин
Пароль: 2222
```
