import { Component, OnInit } from '@angular/core';
import { BlockedService } from 'src/app/services/blocked.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  words: Array<any>;
  badWord: string;
  constructor(private blockedService: BlockedService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWords();
  }
  getWords() {
    this.blockedService.getBadWords().subscribe(
      response => {
        console.log(response);
        this.words = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  delete(word) {
    console.log(word);
    this.blockedService.deleteBadWord(word._id).subscribe(
      response => {
        console.log("Deleted");
        const index = this.words.indexOf(word);
        if (index > -1) {
          this.words.splice(index, 1);
        }
      },
      error => {
        this.toastr.error("Error in deleting")
        console.log(error);
      }
    );
  }
  add() {
    this.blockedService.addBadWord(this.badWord).subscribe(
      response => {
        this.toastr.success("Added")

        console.log(this.badWord);
        let word: {
          word: string
        } = {
          word: this.badWord
        }
        this.words.push(word);
        this.refresh();
      },
      error => {
        this.toastr.error("Error in adding the word")

        console.log(error);
      }
    );
  }

  refresh() {
    this.badWord = '';
  }

}
