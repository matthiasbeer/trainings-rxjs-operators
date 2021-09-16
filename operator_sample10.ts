// npx ts-node sample.ts


import { interval, Observable, take, tap } from 'rxjs';

const source$ = interval(1000).pipe(
    // take(1),
    tap(v => {
      console.log(`(interval: ${v})`);
    }),
  );
  
  // operator ist eine funktion, die nimmt eine observable und gibt eine observable zurück
  function double(source: Observable<number>): Observable<number> {
    return new Observable(observer => {
      const subscription = source.subscribe({
        next: v => observer.next(v * 2),
        error: e => observer.error(e),
        complete: () => observer.complete(),
      })
      return () => subscription.unsubscribe();
    });
  }

  // short hand notation for unsubscribe => return subscription:
  function triple(source: Observable<number>): Observable<number> {
    return new Observable(observer => {
      return source.subscribe({
        next: v => observer.next(v * 3),
        error: e => observer.error(e),
        complete: () => observer.complete(),
      })
    });
  }

  const multiply = (factor: number) => (source: Observable<number>): Observable<number> => {
    console.log(' multiply function was called ... ')
    return new Observable(observer => {
      return source.subscribe({
        next: v => observer.next(v * factor),
        error: e => observer.error(e),
        complete: () => observer.complete(),
      })
    });
  };

  const quadruple = multiply(4);

  source$
    .pipe(
      quadruple,
      quadruple,
      take(5),
    )
    .subscribe({
      next: (value) => console.log('next', value),
      error: ({ message }) => console.warn(`error: ${message}`),
      complete: () => console.log('completed'),
    });