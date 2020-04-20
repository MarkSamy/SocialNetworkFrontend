import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  sendFollowers = false;
  files: any[];
  images: any[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

  handleFileInput(files: any) {
    this.files = files;
  }

  save() {
    this.images = new Array();
    if (this.files !== undefined && this.files.length !== 0) {
      var readers = new Array();
      for (let i = 0; i < this.files.length; i++) {
        readers.push(new FileReader());
      }
      for (let i = 0; i < this.files.length; i++) {
        readers[i].readAsDataURL(this.files[i]);
        readers[i].onload = (_event) => {
          console.log(readers[i].result);
          this.images.push(readers[i].result);
        }
      }
    } else {
      if (this.form.value.description === null) {
        return;
      }
    }

    let data: {
      value: string,
      images: any[],
      followers: Boolean
    }
      = {
      value: this.form.value,
      images: this.images,
      followers: this.sendFollowers
    }
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }

  OnChangeCheckbox() {
    this.sendFollowers = !this.sendFollowers;
  }

}
