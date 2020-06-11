import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';

import { Publication } from '../../models/publication';

import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit {
    public status: string;
    public identity;
    public token;
    public stats;
    public url;
    public publication: Publication;

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication('', '', '', '', this.identity._id);
    }

    ngOnInit() {
        console.log('Componente de sidebar cargado');
    }

    onSubmit(form) {
        console.log(this.publication);
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                console.log(response.publication);
                if(response.publication){
                    //this.publication = response.publication;
                    this.status = "success";
                    form.reset();
                }else{
                    this.status = "error";
                }
              },
              error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                  this.status = errorMessage;
                }
              }
        );
        
    }
}