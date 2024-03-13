import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServirPage } from './servir.page';

describe('ServirPage', () => {
  let component: ServirPage;
  let fixture: ComponentFixture<ServirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
