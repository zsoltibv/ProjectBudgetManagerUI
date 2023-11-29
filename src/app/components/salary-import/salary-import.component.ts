import { SalaryService } from './../../services/salary.service';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-salary-import',
  templateUrl: './salary-import.component.html',
  styleUrls: ['./salary-import.component.scss']
})
export class SalaryImportComponent {
  file: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private salaryService: SalaryService) { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.file = files[0];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      this.file = files[0];
    }
  }

  clearFile(): void {
    this.file = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  importSalaries(): void {
    if (this.file) {
      this.salaryService.importFile(this.file);
    }
  }
}
