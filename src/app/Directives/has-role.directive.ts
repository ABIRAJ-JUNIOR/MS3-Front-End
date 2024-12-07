import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  private currentRole:string = ""
  constructor(
    private templateRef:TemplateRef<any>,
    private viewContainer:ViewContainerRef
  ) { }

  @Input() set appHasRole(role:string){
    this.currentRole = role;
    this.updateView();
  }

  private updateView(){
    const token = localStorage.getItem("token");
    const decode:any =jwtDecode(token!)

    if(decode.Role == this.currentRole){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainer.clear();
    }

  }

}
