// npx ts-node sample.ts


import { interval, Observable, take, tap } from 'rxjs';

const source$ = interval(1000).pipe(
    tap(v => {
      console.log(`(interval: ${v})`);
    }),
  );
  
  function double(source: Observable<number>): Observable<number> {
    return new Observable(observer => {
      const subscription = source.subscribe({
        next: v => observer.next(v * 2),
        error: e => observer.error(e),
        complete: () => observer.complete(),
      })
      return () => {
          console.log(' completed : we need to unsubscribe in order to stop interval')
          // subscription.unsubscribe();
      }
    });
  }


  source$
    .pipe(
      double,
      take(3),
    )
    .subscribe({
      next: (value) => console.log('next', value),
      error: ({ message }) => console.warn(`error: ${message}`),
      complete: () => console.log('completed'),
    });