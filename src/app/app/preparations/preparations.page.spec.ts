import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreparationsPage } from './preparations.page';

describe('PreparationsPage', () => {
  let component: PreparationsPage;
  let fixture: ComponentFixture<PreparationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreparationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
