import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferences-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './preferences-dialog.component.html',
  styleUrl: './preferences-dialog.component.css'
})
export class PreferencesDialogComponent {
  preferences = {
    intensity: 'medium',
    duration: 30,
    location: 'outdoor'
  };

  constructor(public dialogRef: MatDialogRef<PreferencesDialogComponent>) {}

  onSave(): void {
    this.dialogRef.close(this.preferences);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}