// npx ts-node sample.ts
import { from } from 'rxjs';
import { take } from 'rxjs/operators';



const source$ = from([' value 1', ' value 2', ' value 3']);


source$.pipe(
    // take(2)
).subscribe({
    next: v => console.log('next: ', v),
    complete: () => console.log(' completed '),
})