// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
const identity = (v) => v;


const clone = (v)=> {
  return Object.assign(
    // Copy methods
    Object.create(Object.getPrototypeOf(v)),
    // Copy root level symbols
    v,
    // Copy data that can be serialized
    ((window as any).structuredClone ? structuredClone : identity)(v)
  );
}

class SomeService {
  constructor() {}
}

class Source {
  service = new SomeService();
}

const SOURCE = Symbol('source');
class Entry {
  [SOURCE]: Source;
  constructor(source: Source, public message = {value: 'Hi'}) {
    this[SOURCE] = source;
  }
  greet() {
    console.log(this.message.value)
  }
}

const entry = new Entry(new Source());

console.log(clone(entry)[SOURCE].service === entry[SOURCE].service);
const cloned = clone(entry)
cloned.message.value = 'test'
entry.greet();
console.log(cloned.greet());

