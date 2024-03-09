import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriseDeCommandeQuantiteComponent } from './prise-de-commande-quantite.component';

describe('PriseDeCommandeQuantiteComponent', () => {
  let component: PriseDeCommandeQuantiteComponent;
  let fixture: ComponentFixture<PriseDeCommandeQuantiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriseDeCommandeQuantiteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriseDeCommandeQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
