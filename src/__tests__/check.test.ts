import { isValidUrl } from '../ts/check';

describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
        expect(isValidUrl('http://example.com')).toBe(true);
        expect(isValidUrl('https://example.com')).toBe(true);
        expect(isValidUrl('http://www.example.com')).toBe(true);
        expect(isValidUrl('https://www.example.com')).toBe(true);
        expect(isValidUrl('http://example.com/path')).toBe(true);
        expect(isValidUrl('https://example.com/path?query=string')).toBe(true);
        expect(isValidUrl('http://example.com:8080')).toBe(true);
        expect(isValidUrl('https://example.com:8080')).toBe(true);
        expect(isValidUrl('http://192.168.178.33:8080/path')).toBe(true);
        expect(isValidUrl('example.com')).toBe(true);
    });
    
    it('should return false for invalid URLs', () => {
        expect(isValidUrl('htp://example.com')).toBe(false);
        expect(isValidUrl('http:/example.com')).toBe(false);
        expect(isValidUrl('http://example')).toBe(false);        
        expect(isValidUrl('http://')).toBe(false);
        expect(isValidUrl('')).toBe(false);
        expect(isValidUrl('http://example.com:invalidport')).toBe(false);
    });
});
