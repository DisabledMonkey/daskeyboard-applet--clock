// Library to send signal to Q keyboards
const q = require('daskeyboard-applet');
const moment = require('moment');

const logger = q.logger;

class Clock extends q.DesktopApp {
  constructor() {
    super();
    this.pollingInterval = 1000;
    logger.info("Clock ready to go!");
  }

  // call this function every pollingInterval
  async run() {
    let time = moment();
    let formatted = time.format('h:mm a');
    // console.log(this);
    return new q.Signal({
      points: this.generatePoints(time),
      name: 'Das Clock',
      message: 'The time is '+formatted,
      isMuted: true,
    });

  }

  generatePoints(time) {
    let row1 = [];
    // populate am/pm indicator
    let half = time.format('a');
    row1.push(new q.Point(this.getColor('pm',half)));

    row1.push(new q.Point(this.config.backgroundColor)); // blank spot between esc and f1
    // populate hour indicators
    let hour = time.format('h');
    for (var i=1; i<13; i++) {
      if (i==5) {
        row1.push(new q.Point(this.config.backgroundColor)); // blank spot between f4 and f5
      }
      row1.push(new q.Point(this.getColor(i,hour)));
    }

    let row2 = [new q.Point(this.config.backgroundColor)]; // blank spot for ~ before 1
    // populate minute indicators
    let minute = time.format('m').split('').map(Number);
    for (var i=1; i<11; i++) {
      row2.push(new q.Point(this.getColor(i%10,minute)));
    }
    for (var i=0;i<3;i++) {
      row2.push(new q.Point(this.config.backgroundColor)); // blank keys at end of second row
    }

    return [row1,row2];
  }

  getColor(index,current) {
    if (index==current) {
      return this.config.primaryColor;
    } else if (current instanceof Array) {
      let isDouble = (current[0]==current[1]&&current[0]==index);
      let isPrimary = (current[0]==index);
      let isSecondary = (current[1]==index);
      switch (true) {
        case isDouble: return this.config.doubleColor;
        case isPrimary: return this.config.primaryColor;
        case isSecondary: return this.config.secondaryColor;
      }
    }
    return this.config.backgroundColor;
  }
}

module.exports = {
  Clock: Clock
};
const clock = new Clock();