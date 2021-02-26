import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleShowPage } from './single-show.page';

describe('SingleShowPage', () => {
  let component: SingleShowPage;
  let fixture: ComponentFixture<SingleShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
