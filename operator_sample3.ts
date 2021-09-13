// npx ts-node sample.ts
import { from, concat } from 'rxjs';
import { take } from 'rxjs/operators';



const source$ = concat(
    from([' value 1', ' value 2', ' value 3']),
    from([' value 4', ' value 5', ' value 6']),
);


source$.pipe(
    // take(2)
).subscribe({
    next: v => console.log('next: ', v),
    complete: () => console.log(' completed '),
})