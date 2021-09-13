// npx ts-node sample.ts
import { from, concat, throwError, of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';



const source$ = new Observable(observer => {
    observer.next(' value 1');
    let count = 2;
    const interval = setInterval(() => {
        console.log(' broadcasting ');
        observer.next(` value ${count++}`);
        if (count > 4 ){
            observer.error(' too big')
        }
    }, 1000);

    return () => {
        console.log(' here is the unsubscribe section ');
        clearInterval(interval);
    }
})

source$.subscribe({
    next: v => console.log('next: ', v),
    complete: () => console.log(' completed '),
    error: err => console.log(' errored: ', err)
})