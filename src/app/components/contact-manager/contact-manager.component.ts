import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  loading: boolean = false;
  contacts: IContact[] = [];
  errorMessage: string | null = null;
  contact=<IContact>{};
  fullData:IContact[] = []
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  getAllContactsFromServer() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
        this.fullData = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  deleteModalFunc(contact: any) {
    this.contact = contact;
  }

  deleteContact() {
    this.contactService.deleteContact(this.contact.id).subscribe(
      (data) => {
        this.getAllContactsFromServer();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  filterContact:any;

  searchContacts(event:any){

    // this.filterContact = this.contacts.filter((item) =>  item.name.toLowerCase().split(' ')[0] == event.target.value.toLowerCase())
    let val = new RegExp(event.target.value.toLowerCase());

    this.filterContact = this.contacts.filter((item) => item.name.toLowerCase().match(val));

    if ( event.target.value.length <= 0) {
      this.contacts = this.fullData
    }else{
      this.contacts = this.filterContact
    }

  }
}
