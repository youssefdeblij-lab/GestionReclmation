import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RAddPage } from './r-add.page';

describe('RAddPage', () => {
  let component: RAddPage;
  let fixture: ComponentFixture<RAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
