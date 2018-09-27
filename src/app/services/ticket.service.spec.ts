import { TestBed, inject } from '@angular/core/testing';

import { TicketService } from './ticket.service';

describe('TicketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService]
    });
  });

  it('should be created', inject([TicketService], (service: TicketService) => {
    expect(service).toBeTruthy();
  }));
});
