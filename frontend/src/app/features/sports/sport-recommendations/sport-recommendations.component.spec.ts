import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportRecommendationsComponent } from './sport-recommendations.component';

describe('SportRecommendationsComponent', () => {
  let component: SportRecommendationsComponent;
  let fixture: ComponentFixture<SportRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
