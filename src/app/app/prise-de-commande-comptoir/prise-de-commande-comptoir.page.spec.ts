import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriseDeCommandeComptoirPage } from './prise-de-commande-comptoir.page';

describe('PriseDeCommandeComptoirPage', () => {
  let component: PriseDeCommandeComptoirPage;
  let fixture: ComponentFixture<PriseDeCommandeComptoirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PriseDeCommandeComptoirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
