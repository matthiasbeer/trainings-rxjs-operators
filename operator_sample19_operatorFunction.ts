// npx ts-node sample.ts


import { interval, Observable, of, OperatorFunction, take, tap } from 'rxjs';
import { throwError } from 'rxjs';

const source$ = interval(1000).pipe(

    tap(v => {
      console.log(`(interval: ${v})`);
    }),

  );
  

  const multiply = (factor: number): OperatorFunction<number, number> => (source): Observable<number> => {
    return new Observable(observer => {
      return source.subscribe({  // short form for unsubscribe if returned
        next: v => observer.next(v * factor),
        error: e => observer.error(e),
        complete: () => observer.complete(),
      })
    });
  }

  const fivetimes = multiply(5);


 const sub = source$
    .pipe(
        fivetimes,
        take(4), 

    )
    .subscribe({
      next: (value) => console.log('next', value),
      error: ({ message }) => console.warn(`errorMsg: ${message}`),
      complete: () => console.log('completed'),
    });


