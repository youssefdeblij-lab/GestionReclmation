import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResoulutionPage } from './resoulution.page';

describe('ResoulutionPage', () => {
  let component: ResoulutionPage;
  let fixture: ComponentFixture<ResoulutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResoulutionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResoulutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
