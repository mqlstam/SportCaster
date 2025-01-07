import { Component, OnInit } from '@angular/core';
import { RcmdService } from '../../../service/rcmd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-recommendations.component.html',
  styleUrl: './sport-recommendations.component.css'
})
export class SportRecommendationsComponent implements OnInit {
  suggestedSports: any[] = [];

  constructor(private rcmdService: RcmdService) { }

  ngOnInit(): void {
    console.log(`Sport recommendations console called`)
    this.getSuggestedSports;
  }

  getSuggestedSports() {
    this.rcmdService.listSuggestedSports();
    this.rcmdService.suggestedSports$.subscribe(sports => {
      this.suggestedSports = sports;
    })
  }

}
