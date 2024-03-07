import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriseDeCommandePage } from './prise-de-commande.page';

describe('PriseDeCommandePage', () => {
  let component: PriseDeCommandePage;
  let fixture: ComponentFixture<PriseDeCommandePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PriseDeCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
