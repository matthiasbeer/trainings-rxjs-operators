// npx ts-node sample.ts
import { interval, Observer, take } from 'rxjs';



const observable = interval(1000).pipe(
    take(5)
);

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
 


observable.subscribe(observerA);
setTimeout(() => observable.subscribe(observerB) , 500);