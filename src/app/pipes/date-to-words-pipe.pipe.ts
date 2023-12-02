import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToWordsPipe'
})
export class DateToWordsPipePipe implements PipeTransform {

  transform(value: string | Date): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'MMMM d, y');
    return formattedDate || '';
  }

}
