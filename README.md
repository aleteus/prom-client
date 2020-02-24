# Prometheus client for node.js [![Build Status](https://travis-ci.org/siimon/prom-client.svg?branch=master)](https://travis-ci.org/siimon/prom-client) [![Build status](https://ci.appveyor.com/api/projects/status/k2e0gwonkcee3lp9/branch/master?svg=true)](https://ci.appveyor.com/project/siimon/prom-client/branch/master) [![Actions Status](https://github.com/siimon/prom-client/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/siimon/prom-client/actions)

## Instalação 

```npm i alemetheus```

## Implementando

No início do código declaramos o pacote que iremos utilizar:

```js
const client = require('alemetheus');
```

Após declarar o pacote, criaremos o client do Prometheus para a criação das métricas e exportar as informações de acordo com as configuraçes desejadas. Lembrando que 

```js
const prometheusClient = new client.Prometheus(process.env.PUSH_GATEWAY, 'nome_da_metrica', '','nome_do_produto',this.parameters,'(histogram, summary, gauge, counter)', 'nome_da_aplicação' );
```

## 

## Tipos de métricas

### Counter

'Counters' tem a utilidade de seu próprio significado, simplesmente um contado, o qual se reinicia no final do processo.

```js
const client = require('alemetheus');
const counter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help'
});
counter.inc(); // Inc with 1
counter.inc(10); // Inc with 10
```

### Gauge

'Gauges' são similarres aos 'Counters', mas o valor de um Gauge pode subir ou descer.

```js
const client = require('alemetheus');
const gauge = new client.Gauge({ name: 'metric_name', help: 'metric_help' });
gauge.set(10); // Set to 10
gauge.inc(); // Inc with 1
gauge.inc(10); // Inc with 10
gauge.dec(); // Dec with 1
gauge.dec(10); // Dec with 10
```

### Histogram

'Histograms' captam eventos e a frequência que estes ocorrem.

```js
const client = require('alemetheus');
const histogram = new client.Histogram({
  name: 'metric_name',
  help: 'metric_help'
});
histogram.observe(10); // Observa o valor no 'histogram'
```

### Summary

Summaries calculam a porcentagem de valorem em observação.

```js
const client = require('alemetheus');
new client.Summary({
  name: 'metric_name',
  help: 'metric_help',
  percentiles: [0.01, 0.1, 0.9, 0.99]
});
```
