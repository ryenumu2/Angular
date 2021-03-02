import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BookFormComponent } from './book-form.component';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BookFormComponent 
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on click', () => {
    spyOn(component.createBook, 'emit');

    //trigger the click
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //check output event was triggered
    expect(component.createBook.emit).toHaveBeenCalled();
  });
});
