import commander from 'commander'
import { init } from './init'
import { startProxy } from './start-proxy'

export function createProgramCLI(): commander.Command {
  const program = new commander.Command()
  program
    .name('beagle-web-grpc')
    .description('A GRPC support lib for Beagle Web with CLI')
    .usage('[global options] command')
    .version('1.0.0')

  program
    .command('init')
    .alias('i')
    .description('Create the configuration file for the GRPC Support')
    .action(init)

  program
    .command('start-proxy')
    .alias('spx')
    .option('-m, --mode <mode>', 'set the mode to be used on the configuration file', 'development')
    .description('It starts the gRPC proxy to handle the requests between your gRPC server and your Beagle Web Frontend (you must have the required dependencies and other ones will be installed automatically if not found)')
    .action(startProxy)

  return program  
}
