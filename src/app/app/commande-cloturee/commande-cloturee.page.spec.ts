import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandeClotureePage } from './commande-cloturee.page';

describe('CommandeClotureePage', () => {
  let component: CommandeClotureePage;
  let fixture: ComponentFixture<CommandeClotureePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommandeClotureePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
