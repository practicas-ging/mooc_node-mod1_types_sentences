# Entrega mooc_node-mod1_types_sentences

Puede descargar este programa
al ordenador local, como un fichero ZIP. El programa puede clonarse también con `git clone ..` (si
git está instalado).

Una vez descargado, se debe entrar en el directorio `mooc_node-mod1_types_sentences` (descargado) y
completar el programa pedido en el fichero `mooc_node-mod1_types_sentences.js` (este fichero esta ya vacío
en dicho directorio). El fichero `mooc_node-mod1_types_sentences.js` debe editarse o sustituirse por otro con
la solución. La ejecución del programa-de-test indica que partes del código del fichero
`mooc_node-mod1_types_sentences.js` se han realizado correctamente y cuales no.

El programa-de-test se copia, instala y ejecuta con los siguientes comandos:

```bash
$ ## El .zip del programa-de-test puede descargarse o copiarse con el siguiente comando:
$ git clone https://github.com/practicas-ging/mooc_node-mod1_types_sentences
$
$ cd mooc_node-mod1_types_sentences ## El directorio de trabajo pasa a ser el del proyecto copiado: entrega_
$
$ npm install ## Instala el programa-de-test, que es un paquete npm
$
$ npm run checks ## Pasa los tests indicando que partes de mooc_node-mod1_types_sentences.js
……..………………… ## están correctamente implementadas y cuales no.
...(realimentación)....
$
```

Los tests pueden pasarse tantas veces como sea necesario; incluso con el ejercicio incompleto.
El programa-de-test incluye además un comando para generar el fichero ZIP

```bash
$
$ npm run zip ## Este comando comprime los ficheros a entregar como un fichero xx.zip
$             ## El directorio de trabajo contiene ahora el fichero: mooc_node-mod1_types_sentences.zip
```

El fichero `mooc_node-mod1_types_sentences.zip` contiene los ficheros de la practica comprimidos y puede subirse a la plataforma para su evaluación.
