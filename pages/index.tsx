import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>Home</div>
    <Calculator></Calculator>
  </div>
)

type FOperator = (l: number, r: number) => number;
type FNumber = () => number;

type IState = {
  number: string,
  process: string,
  history: number[],
  queue: Queue,
}

interface QItem {
  type: string;
  value: any;
  func: any;
}

class QNumber implements QItem {
  type: string;
  value: number;
  func: FNumber = () => { return this.value};
}

class QOperator implements QItem {
  type: string;
  value: string;
  func: FOperator;
}

class Queue {
  arr: QItem[];

  constructor() {
    this.arr = [];
  }

  add(item: QItem) {
    this.arr.push(item);
  }

  next() {
    return this.arr.length > 0 ? true : false;
  }

  get() {
    const item = this.arr[0];
    this.arr.shift();

    return item;
  } 

  toString() {
    let str: string = '';
    for(const item of this.arr) {
      str += item.value;
    }

    return str;
  }
}

class Calculator extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      number: '0',
      process: '',
      history: [],
      queue: new Queue(),
    };
  }

  clickClearBtn(): void {
    this.setState({ process: '' });
  }

  clickPlus(): void {
    const q = this.state.queue;

    const n = new QNumber();
    n.type = 'n';
    n.value = Number(this.state.number);
    q.add(n);

    const o = new QOperator();
    o.type= 'o';
    o.value= '+';
    o.func = (l: number, r: number) => { return l + r };
    q.add(o);

    this.setState({
      number: '0',
      queue: q
    });
  }

  clickNumber(i: number): void {
    const input = String(Number(this.state.number.concat(String(i))));
    this.setState({ number: input });
  }

  clickEqual() {
    const q = this.state.queue;
    while(q.next()) {
      console.log(q.get());
    }
  }

  clickPlusBtn() {
    // const history: number[] = this.state.history.slice();

    // const left: number = history.slice(-1)[0];
    // const right: number = Number(this.state.stac);
    // const result: number = left + right;

    // const newProcess: string = this.state.process.concat('+');
    // const newHistory: number[] = history.concat(result);


    // const numbers: number[] = this.state.history.slice();
    // const newNumbers: number[] =  numbers.concat(Number(this.state.stac));
    // const operators: Operator[] = this.state.operators.slice();
    // const newOperators: Operator[] = operators.concat( (num: number) => {return num} );

    // this.setState({
      // stac: '0',
      // process: newProcess,
      // history: newHistory,
    // });
  }

  clickNumBtn(num: number) {
    const newNumber = String(Number((this.state.number.concat(String(num)))));
    const newProcess: string = this.state.process.concat(newNumber);

    this.setState({
      number: newNumber,
      process: newProcess,
    });
  }

  clickEqualBtn() {

  }

  render() {
    return (
      <div className={styles.container}>
        <Display process={this.state.queue.toString()} result={this.state.number} />
        <div className={styles.row}>
          <div className={styles.cell25}>
            <Button text="C" handleClick={() => this.clickClearBtn()} />
          </div>
          <div className={styles.cell25} />
          <div className={styles.cell25} />
          <div className={styles.cell25}>
            <Button text="/" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell25}>
            <Button text="7" handleClick={() => this.clickNumber(7)} />
          </div>
          <div className={styles.cell25}>
            <Button text="8" handleClick={() => this.clickNumber(8)} />
          </div>
          <div className={styles.cell25}>
            <Button text="9" handleClick={() => this.clickNumber(9)} />
          </div>
          <div className={styles.cell25}>
            <Button text="*" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell25}>
            <Button text="4" handleClick={() => this.clickNumber(4)} />
          </div>
          <div className={styles.cell25}>
            <Button text="5" handleClick={() => this.clickNumber(5)} />
          </div>
          <div className={styles.cell25}>
            <Button text="6" handleClick={() => this.clickNumber(6)} />
          </div>
          <div className={styles.cell25}>
            <Button text="-" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell25}>
            <Button text="1" handleClick={() => this.clickNumber(1)} />
          </div>
          <div className={styles.cell25}>
            <Button text="2" handleClick={() => this.clickNumber(2)} />
          </div>
          <div className={styles.cell25}>
            <Button text="3" handleClick={() => this.clickNumber(3)} />
          </div>
          <div className={styles.cell25}>
            <Button text="+" handleClick={() => this.clickPlus()} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell50}>
            <Button text="0" handleClick={() => this.clickNumber(0)} />
          </div>
          <div className={styles.cell25}>
            <Button text="." />
          </div>
          <div className={styles.cell25}>
            <Button text="=" handleClick={() => this.clickEqual()} />
          </div>
        </div>
      </div>
    );
  }
}

function Display(props) {
  return (
    <div className={styles.display}>
      <div className={styles.display__process}>{props.process}</div>
      <div className={styles.display__result}>{props.result}</div>
    </div>
  );
}

function Controller(props) {
  const rows = [];
  for(let i = 0; i < 5; i++) {
    rows.push(<Row count={i} />);
  }
  return {rows}
}

function Row(props) {
  return (
    <div className={styles.row}>
      {props.children}
    </div>
  )
}

function Cell(props) {
  return (
    <div className={styles.cell}>
      {props.children}
    </div>
  );
}

function Button(props) {
  return (
    <button className={styles.button}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default Home