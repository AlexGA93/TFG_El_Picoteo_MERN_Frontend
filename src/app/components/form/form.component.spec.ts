import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoginForm } from 'src/utils/constants';

// describe how this component should work
describe("LoginForm", () => {
    // component
    let component: FormComponent;
    // component instance
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormComponent],
            providers: [AuthService, HttpClient, HttpHandler],
            imports: [ReactiveFormsModule], // Import ReactiveFormsModule for form controls
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a defined form', () => {
      expect(component.myForm).toBeDefined();// should be defined
    });

    it('should have the form values initiated to ""', () => {
      expect(component.myForm).toBeTruthy(); // should exist
      expect(component.myForm.value.email).toBe(LoginForm.email);
      expect(component.myForm.value.password).toBe(LoginForm.password);
    });
});