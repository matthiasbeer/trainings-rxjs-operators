// npx ts-node sample.ts

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';


const source$ = new Observable(observer => {
    observer.next(' value 1');
    observer.next(' value 2');
    observer.next(' value 3');
    // observer.complete();
    return () => {
        console.log(' observer unsubscribed. ')
    }
});

source$.pipe(
    // take(2)
).subscribe({
    next: v => console.log('next: ', v),
})