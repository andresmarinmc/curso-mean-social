import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Regístrate';
    this.user = new User('', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    console.log('Componente de registro cargado');
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          console.log(response.user);
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
          
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
}
