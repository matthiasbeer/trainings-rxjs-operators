// npx ts-node sample.ts
import { interval, Observer, take } from 'rxjs';



const observable = interval(1000).pipe(
    take(5)
);

class BridgeObserver  {
    observers: Observer<number>[] = [];
    next = val => this.observers.forEach(observer => observer.next(val));
    error = error => this.observers.forEach(observer => observer.error(error));
    complete = () => this.observers.forEach(observer => observer.complete());
    addObserver = (obsever: Observer<number>) => this.observers.push(obsever);

}

const bridge = new BridgeObserver();


const observerA: Observer<number> = {
    next: val => console.log('A next: ', val),
    error: err => console.log('A error: ', err),
    complete: () => console.log('A completed')
};

const observerB: Observer<number> = {
    next: val => console.log('B next: ', val),
    error: err => console.log('B error: ', err),
    complete: () => console.log('B completed')
};
 
bridge.addObserver(observerA);


// if we want to follow teh same events with different observers, we can only have one subscribe
observable.subscribe(bridge);
