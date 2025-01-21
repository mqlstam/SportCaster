import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService],
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the location', () => {
    service.setLocation(52.3676, 4.9041); // Amsterdam
    const location = service.getCurrentLocation();
    expect(location).toEqual({ lat: 52.3676, lon: 4.9041 });
  });

  it('should return null if location is not set', () => {
    const location = service.getCurrentLocation();
    expect(location).toBeNull();
  });

  describe('fetchUserLocation', () => {
    it('should fetch the user location successfully', (done) => {
      // Mock geolocation.getCurrentPosition
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successCallback) => {
        const position: GeolocationPosition = {
          coords: {
            latitude: 52.3676,
            longitude: 4.9041,
            accuracy: 5,               // accuracy toegevoegd
            altitude: 10,              // altitude toegevoegd
            altitudeAccuracy: 10,      // altitudeAccuracy toegevoegd
            heading: 0,                // heading toegevoegd
            speed: 0,                  // speed toegevoegd
            toJSON: () => ({})         // toJSON toegevoegd
          },
          timestamp: Date.now(),  // Voeg een timestamp toe
          toJSON: () => ({})       // toJSON toegevoegd voor het GeolocationPosition object
        };
        successCallback(position);
      });

      service.fetchUserLocation().subscribe({
        next: (location) => {
          expect(location).toEqual({ lat: 52.3676, lon: 4.9041 });
          done();
        },
        error: () => {
          fail('Should not call error callback');
        },
      });
    });

    it('should handle geolocation error', (done) => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((_, errorCallback) => {
        const error: GeolocationPositionError = {
          code: 1,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        };
        if (errorCallback) {
          errorCallback(error);
        }
      });

      service.fetchUserLocation().subscribe({
        next: () => {
          fail('Should not call success callback');
        },
        error: (error) => {
          expect(error).toBe('Unable to retrieve location. Please allow location access.');
          done();
        },
      });
    });

    it('should handle unsupported geolocation', (done) => {
      const geolocationMock = {
        getCurrentPosition: jasmine.createSpy('getCurrentPosition'),
        clearWatch: jasmine.createSpy('clearWatch'), // Voeg clearWatch toe
        watchPosition: jasmine.createSpy('watchPosition') // Voeg watchPosition toe
      };
      spyOnProperty(navigator, 'geolocation', 'get').and.returnValue(geolocationMock);

      service.fetchUserLocation().subscribe({
        next: () => {
          fail('Should not call success callback');
        },
        error: (error) => {
          expect(error).toBe('Geolocation is not supported by your browser.');
          done();
        },
      });
    });
  });

  describe('getCountryCode', () => {
    it('should fetch the country code successfully', (done) => {
      const mockResponse = {
        address: {
          country_code: 'nl',
        },
      };

      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response));

      service.getCountryCode(52.3676, 4.9041).subscribe({
        next: (countryCode) => {
          expect(countryCode).toBe('NL');
          done();
        },
        error: () => {
          fail('Should not call error callback');
        },
      });
    });

    it('should handle error if country code is not available', (done) => {
      const mockResponse = { address: {} };

      spyOn(window, 'fetch').and.returnValue(Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response));

      service.getCountryCode(52.3676, 4.9041).subscribe({
        next: () => {
          fail('Should not call success callback');
        },
        error: (error) => {
          expect(error).toBe('Unable to determine country code.');
          done();
        },
      });
    });

    it('should handle fetch error', (done) => {
      spyOn(window, 'fetch').and.returnValue(Promise.reject('Network error'));

      service.getCountryCode(52.3676, 4.9041).subscribe({
        next: () => {
          fail('Should not call success callback');
        },
        error: (error) => {
          expect(error).toBe('Error fetching country code: Network error');
          done();
        },
      });
    });
  });
});
