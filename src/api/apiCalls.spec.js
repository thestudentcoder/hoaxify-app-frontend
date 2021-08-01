import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('signup', () => {
    it('calls /api/1.0/users', () => {
        // create nocksignUp function
        const mockSignup = jest.fn();
        // replace axios post function with mock function
        axios.post = mockSignup;
        // call our apiCalls signup function
        apiCalls.signup();

        // 0th index of call history, parameters array
        const path = mockSignup.mock.calls[0][0]
        expect(path).toBe('/api/1.0/users');
    })
})