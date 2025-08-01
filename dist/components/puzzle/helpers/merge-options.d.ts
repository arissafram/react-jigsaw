import { DEFAULT_PUZZLE_OPTIONS } from '@/constants';
import { InitialPuzzleOptions } from '@/types';
/**
 * Merges default puzzle options with user-provided options, ensuring type safety and proper merging.
 *
 * This function recursively merges the properties of the two objects, with user-provided values taking precedence.
 * It handles nested objects and arrays, ensuring that the merged result is a valid PuzzleOptions object.
 *
 * @param defaults - The default puzzle options to use as the base
 * @param options - The user-provided puzzle options to merge with the defaults
 * @returns A new PuzzleOptions object with the merged properties
 */
export declare const mergeOptions: (defaults: typeof DEFAULT_PUZZLE_OPTIONS, options?: InitialPuzzleOptions) => typeof DEFAULT_PUZZLE_OPTIONS;
//# sourceMappingURL=merge-options.d.ts.map