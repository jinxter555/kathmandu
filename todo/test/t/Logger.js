class Logger {
  constructor () {
    this.printName = this.printName.bind(this);
  }
  printName (name = "there") {
    this.print(`hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const {printName} = logger;
printName();
//logger.printName();


