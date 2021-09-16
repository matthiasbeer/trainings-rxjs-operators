// npx ts-node sample.ts
import { interval, Observer, take } from 'rxjs';



const observable = interval(1000).pipe(
    take(5)
);

const observerA: Observer<number> = {
    next: val => console.log(' next: ', val),
    error: err => console.log(' error: ', err),
    complete: () => console.log(' completed')
};
 


observable.subscribe(observerA);