const client = require('ale-prometheus');

class Prometheus  {
    constructor(gateway, jobName, label, product, groupings, graphType, appName ) {
        this.gateway = new client.Pushgateway(gateway, { timeout: 5000 }); 
        this.jobName = jobName;
        this.product = product;
        this.label = label;
        this.groupings = groupings;
        this.graphType = graphType;
        this.appName = appName;
    }
    
    pushGateway(start, parameters, help) {
        let graph = this.createGraph(this.graphType, help);
        const end = new Date();
        const timeProcess = end - start;
        for(let key in this.groupings) {
            parameters[key] = this.groupings[key];
        }
        switch(this.graphType){
            case 'gauge':
                graph.set(timeProcess, (new Date()).getTime());
                break;
            case 'histogram':
            case 'summary':
                graph.observe(timeProcess, (new Date()).getTime());
                break;
            case 'counter':
                graph.inc(timeProcess,(new Date()).getTime());
                break;
            default:
                console.error('Metric not found !!');
                return;
        }
        this.gateway.pushAdd({ jobName: this.jobName,  groupings: { time: timeProcess, label: this.appName} }, function(err, resp, body) {});
    }

    createGraph(type, help) {
        let graph = {};
        switch(type){
            case 'gauge':
                graph = new client.Gauge({ name: this.jobName, product: this.product, help: help});   
                break;
            case 'histogram':
                graph = new client.Histogram({ name: this.jobName, product: this.product, help: help });
                break;
            case 'summary':
                graph = new client.Summary({ name: this.jobName, product: this.product, help: help });
                break;
            case 'counter':
                graph = new client.Counter({ name: this.jobName, product: this.product, help: help });
                break;
            default:
                console.error('Prometheus graph not found !!');
                return;
        }
        return graph;
    }

};


module.exports = Prometheus;
