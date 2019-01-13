import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {PetInterface} from '../models/pet';
import {Observable} from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    this.petsCollection = afs.collection<PetInterface>('pets');
    this.pets = this.petsCollection.valueChanges();
  }

  private petsCollection: AngularFirestoreCollection<PetInterface>;
  private pets: Observable<PetInterface[]>;

  getAllPets() {
    return this.pets = this.petsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PetInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  addPet() {
  }

  updatePet() {
  }

  removePet() {
  }
}
