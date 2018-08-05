import * as connectFour from '../connectFour';

const { E, X, O } = connectFour;

describe('connectFour', () => {
  describe('getWinner', () => {
    it('should return null for the initial board', () => {
      const state = {
        board: [
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
        ],
      };
      const expected = null;
      expect(connectFour.getWinner(state)).toBe(expected);
    });

    it('should return null if only 3 are connected', () => {
      const state = {
        board: [
          [O, E, O, O, O, E, X],
          [E, O, X, O, O, O, X],
          [X, X, X, O, X, X, X],
          [X, E, E, X, E, X, O],
          [E, E, X, E, E, X, O],
          [O, O, O, E, O, O, O],
        ],
      };
      const expected = null;
      expect(connectFour.getWinner(state)).toBe(expected);
    });

    it('should return X if there are only 4 connected Xs in a line', () => {
      let state = {
        board: [
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, X, X, X, X],
        ],
      };
      let expected = X;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [X, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
        ],
      };
      expected = X;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
          [E, X, E, E, E, E, E],
          [E, E, X, E, E, E, E],
          [E, E, E, X, E, E, E],
        ],
      };
      expected = X;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, X],
          [E, E, E, E, E, X, E],
          [E, E, E, E, X, E, E],
          [E, E, E, X, E, E, E],
        ],
      };
      expected = X;
      expect(connectFour.getWinner(state)).toBe(expected);
    });

    it('should return O if there are 4 Os connected (with Xs) in a line', () => {
      let state = {
        board: [
          [X, X, X, O, O, O, O],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
          [E, E, E, E, E, E, E],
        ],
      };
      let expected = O;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [O, E, E, E, E, E, E],
          [O, E, E, E, E, E, E],
          [O, E, E, E, E, E, E],
          [O, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
          [X, E, E, E, E, E, E],
        ],
      };
      expected = O;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [E, X, E, E, E, E, E],
          [E, E, O, E, E, E, E],
          [E, E, E, O, E, E, E],
          [E, E, E, E, O, E, E],
          [E, E, E, E, E, O, E],
          [E, E, E, E, E, E, X],
        ],
      };
      expected = O;
      expect(connectFour.getWinner(state)).toBe(expected);
      state = {
        board: [
          [E, E, E, E, E, X, E],
          [E, E, E, E, O, E, E],
          [E, E, E, O, E, E, E],
          [E, E, O, E, E, E, E],
          [E, O, E, E, E, E, E],
          [X, E, E, E, E, E, E],
        ],
      };
      expected = O;
      expect(connectFour.getWinner(state)).toBe(expected);
    });
  });
});
