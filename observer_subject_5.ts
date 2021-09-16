import { interval, take } from 'rxjs';

// node -r esm .\observer_subject_5.ts


const observable = interval(1000).pipe(
    take(8)
);

class BridgeObserver  {
    observers = [];
    next = val => this.observers.forEach(observer => observer.next(val));
    error = error => this.observers.forEach(observer => observer.error(error));
    complete = () => this.observers.forEach(observer => observer.complete());
    addObserver = (obsever) => this.observers.push(obsever);

}

const bridge = new BridgeObserver();


const observerA = {
    next: val => console.log('A next: ', val),
    error: err => console.log('A error: ', err),
    complete: () => console.log('A completed')
};

const observerB = {
    next: val => console.log('B next: ', val),
    error: err => console.log('B error: ', err),
    complete: () => console.log('B completed')
};
 
bridge.addObserver(observerA);


// if we want to follow teh same events with different observers, we can only have one subscribe
observable.subscribe(bridge);

setTimeout(() => bridge.addObserver(observerB), 2500);
