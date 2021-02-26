import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RShowsPage } from './r-shows.page';

describe('RShowsPage', () => {
  let component: RShowsPage;
  let fixture: ComponentFixture<RShowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RShowsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RShowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
