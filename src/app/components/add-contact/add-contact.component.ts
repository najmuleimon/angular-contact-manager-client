import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  loading:boolean = false;
  contact:IContact = {} as IContact;
  errorMessage:string | null = null;
  groups:IGroup[] = [] as IGroup[];

  constructor(private contactService : ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contact.groupId='0';
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;
    }, (error) => {
      this.errorMessage = error;
    })
  }

  createContact(){
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
    },(error) => {
      this.errorMessage = error;
      this.router.navigate(['/contact/add']).then();
    });
  }

}
