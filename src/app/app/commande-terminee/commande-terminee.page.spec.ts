import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandeTermineePage } from './commande-terminee.page';

describe('CommandeTermineePage', () => {
  let component: CommandeTermineePage;
  let fixture: ComponentFixture<CommandeTermineePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommandeTermineePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
