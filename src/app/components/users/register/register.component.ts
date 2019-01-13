import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {}

  onRegister(): void {
    this.authService.registerUser(this.email, this.password)
      .then(res => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImageUser.nativeElement.value
            }).then(() => {
              this.onRegisterRedirect();
            }).catch(err => {
              console.log('ERROR', err);
            });
          }
        });
      }).catch(err => console.log(err.message));
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onRegisterRedirect(): void {
    this.router.navigate(['user/profile']);
  }
}
