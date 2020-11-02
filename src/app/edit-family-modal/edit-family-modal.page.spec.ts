import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFamilyModalPage } from './edit-family-modal.page';

describe('EditFamilyModalPage', () => {
  let component: EditFamilyModalPage;
  let fixture: ComponentFixture<EditFamilyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFamilyModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFamilyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
