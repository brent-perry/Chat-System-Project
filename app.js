const cluster = require('cluster');
const cores = require('os').cpus().length;

if (cluster.isMaster){
  for (let i = 0; i < cores; ++i)
    cluster.fork();
} else {
  require('./worker');
};
