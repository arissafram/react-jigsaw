import { describe, it, expect } from 'vitest';
import { generateBoardSlots } from './generate-board-slots';

describe('generateBoardSlots', () => {
  it('generates correct number of slots for 2x2 board', () => {
    const slots = generateBoardSlots(2, 2);
    expect(slots).toHaveLength(4);
  });

  it('generates correct number of slots for 3x3 board', () => {
    const slots = generateBoardSlots(3, 3);
    expect(slots).toHaveLength(9);
  });

  it('generates correct number of slots for 4x5 board', () => {
    const slots = generateBoardSlots(4, 5);
    expect(slots).toHaveLength(20);
  });

  it('generates slots with correct coordinates for 2x2 board', () => {
    const slots = generateBoardSlots(2, 2);

    expect(slots).toEqual([
      { pieceRow: 0, pieceCol: 0 }, // (0,0)
      { pieceRow: 0, pieceCol: 1 }, // (0,1)
      { pieceRow: 1, pieceCol: 0 }, // (1,0)
      { pieceRow: 1, pieceCol: 1 }, // (1,1)
    ]);
  });

  it('generates slots with correct coordinates for 3x2 board', () => {
    const slots = generateBoardSlots(3, 2);

    expect(slots).toEqual([
      { pieceRow: 0, pieceCol: 0 }, // (0,0)
      { pieceRow: 0, pieceCol: 1 }, // (0,1)
      { pieceRow: 1, pieceCol: 0 }, // (1,0)
      { pieceRow: 1, pieceCol: 1 }, // (1,1)
      { pieceRow: 2, pieceCol: 0 }, // (2,0)
      { pieceRow: 2, pieceCol: 1 }, // (2,1)
    ]);
  });

  it('generates slots with correct coordinates for 2x3 board', () => {
    const slots = generateBoardSlots(2, 3);

    expect(slots).toEqual([
      { pieceRow: 0, pieceCol: 0 }, // (0,0)
      { pieceRow: 0, pieceCol: 1 }, // (0,1)
      { pieceRow: 0, pieceCol: 2 }, // (0,2)
      { pieceRow: 1, pieceCol: 0 }, // (1,0)
      { pieceRow: 1, pieceCol: 1 }, // (1,1)
      { pieceRow: 1, pieceCol: 2 }, // (1,2)
    ]);
  });

  it('generates slots in row-major order', () => {
    const slots = generateBoardSlots(3, 4);

    // Should be in row-major order: (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), ...
    for (let i = 0; i < slots.length; i++) {
      const expectedRow = Math.floor(i / 4);
      const expectedCol = i % 4;
      expect(slots[i]).toEqual({
        pieceRow: expectedRow,
        pieceCol: expectedCol,
      });
    }
  });

  it('generates unique slots for each position', () => {
    const slots = generateBoardSlots(4, 5);

    // Each slot should be unique
    const uniqueSlots = new Set(slots.map((slot) => `${slot.pieceRow}-${slot.pieceCol}`));
    expect(uniqueSlots.size).toBe(slots.length);
  });

  it('generates slots with correct row range', () => {
    const slots = generateBoardSlots(5, 3);

    const rowNumbers = slots.map((slot) => slot.pieceRow);
    expect(Math.min(...rowNumbers)).toBe(0);
    expect(Math.max(...rowNumbers)).toBe(4);
  });

  it('generates slots with correct column range', () => {
    const slots = generateBoardSlots(3, 7);

    const colNumbers = slots.map((slot) => slot.pieceCol);
    expect(Math.min(...colNumbers)).toBe(0);
    expect(Math.max(...colNumbers)).toBe(6);
  });

  it('works with single row', () => {
    const slots = generateBoardSlots(1, 4);

    expect(slots).toHaveLength(4);
    slots.forEach((slot) => {
      expect(slot.pieceRow).toBe(0);
    });
  });

  it('works with single column', () => {
    const slots = generateBoardSlots(5, 1);

    expect(slots).toHaveLength(5);
    slots.forEach((slot, index) => {
      expect(slot.pieceRow).toBe(index);
      expect(slot.pieceCol).toBe(0);
    });
  });

  it('works with large board', () => {
    const slots = generateBoardSlots(10, 10);

    expect(slots).toHaveLength(100);

    // Check that all positions from (0,0) to (9,9) are covered
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const found = slots.some((slot) => slot.pieceRow === row && slot.pieceCol === col);
        expect(found).toBe(true);
      }
    }
  });
});
