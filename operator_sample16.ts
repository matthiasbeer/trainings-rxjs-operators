// npx ts-node sample.ts


import { interval, Observable, of, take, tap } from 'rxjs';
import { throwError } from 'rxjs';

const source$ = interval(1000).pipe(

    tap(v => {
      console.log(`(interval: ${v})`);
    }),
    tap(() => { throw new Error('Invalid time') }),
    take(1),
  );
  
  function double(source: Observable<number>): Observable<number> {
    return new Observable(observer => {
      const subscription = source.subscribe({
        next: v => observer.next(v * 2),
        // error: e => observer.error(e),
        complete: () => observer.complete(),
      })
      return () => {
          console.log(' completed : we need to unsubscribe in order to stop interval')
          subscription.unsubscribe();
      }
    });
  }


 const sub =  source$
    .pipe(
        double,
        take(3), 

    )
    .subscribe({
      next: (value) => console.log('next', value),
      error: ({ message }) => console.warn(`errorMsg: ${message}`),
      complete: () => console.log('completed'),
    });


