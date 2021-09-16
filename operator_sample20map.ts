// npx ts-node sample.ts


import { interval, map, Observable, of, OperatorFunction, take, tap } from 'rxjs';
import { throwError } from 'rxjs';

const source$ = interval(1000).pipe(

    tap(v => {
      console.log(`(interval: ${v})`);
    }),

  );
  

  const multiply = (factor: number): OperatorFunction<number, number> => map(val => factor * val);
  

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


