import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/sign-in/user.model';
import { UserService } from '../user/sign-in/user-service.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
user: IUser | null = null;
showSignOutMenu: boolean = false;

constructor(private userSerivce: UserService){

}
  ngOnInit(): void {
    this.userSerivce.getUser().subscribe(user=>
      {
        this.user = user;
      })
  }

  toggleSignOut(){
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut(){
    this.userSerivce.signOut();
    this.showSignOutMenu = false;
  }
}
